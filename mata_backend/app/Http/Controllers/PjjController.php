<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use DB;

class PjjController extends Controller
{
    static function getKlasterWilayah(Request $request){
        $kode_wilayah = $request->kode_wilayah ? $request->kode_wilayah : null;
        $id_level_wilayah = $request->id_level_wilayah ? $request->id_level_wilayah : null;

        $sql = "WITH jawaban_survey as (
                SELECT
                pengguna.username AS npsn,
                pilihan.teks as kluster_ptm,
                max(jawaban_kuis.create_date) as tanggal_isi_survey_pertama,
                max(jawaban_kuis.last_update) as tanggal_isi_survey_terakhir
            FROM
                jawaban_kuis
                JOIN pilihan_pertanyaan_kuis pilihan ON pilihan.pilihan_pertanyaan_kuis_id = jawaban_kuis.pilihan_pertanyaan_kuis_id
                JOIN pengguna ON pengguna.pengguna_id = jawaban_kuis.pengguna_id 
            WHERE
                jawaban_kuis.pertanyaan_kuis_id = 'f437ce3b-da75-49fb-a5a8-cca6ad461c74' 
            GROUP BY
                pengguna.username,
                pilihan.teks
        ),
        ptk_covid as (
        SELECT 
                        NULLIF (regexp_replace( CAST( regexp_matches(regexp_replace( REPLACE (REPLACE (REPLACE (REPLACE (REPLACE (REPLACE (REPLACE ( REPLACE (REPLACE(isian,'19',''),'Covid19',''),'2022',''),'2021',''),'2020',''),'_19',''),' 19',''),'-19',''),'covid19',''),'\D*',''),'\d+') as varchar(1000)),'\D','','g'),'') :: NUMERIC AS ptk_terpapar,
                        sekolah.sekolah_id 
        FROM
                jawaban_kuis
        JOIN pengguna ON pengguna.pengguna_id = jawaban_kuis.pengguna_id
        JOIN dapo.sekolah AS sekolah ON sekolah.npsn = pengguna.username 
        WHERE
                pertanyaan_kuis_id = '1f3af56c-afd7-42dd-b2ee-b4632dc59230'
        ),
        pd_covid as (
        SELECT 
                        NULLIF (regexp_replace( CAST( regexp_matches(regexp_replace( REPLACE (REPLACE (REPLACE (REPLACE (REPLACE (REPLACE (REPLACE ( REPLACE (REPLACE(isian,'19',''),'Covid19',''),'2022',''),'2021',''),'2020',''),'_19',''),' 19',''),'-19',''),'covid19',''),'\D*',''),'\d+') as varchar(1000)),'\D','','g'),'') :: NUMERIC AS pd_terpapar,
                        sekolah.sekolah_id
        FROM
                        jawaban_kuis 
        JOIN pengguna ON pengguna.pengguna_id = jawaban_kuis.pengguna_id
        JOIN dapo.sekolah AS sekolah ON sekolah.npsn = pengguna.username 
        WHERE
                        pertanyaan_kuis_id = '85f4e4cc-9f25-45d0-8116-ef08106a16bb'
        ),
        kluster_ptm as (
            SELECT
                        dapo_sekolah.sekolah_id,
                        dapo_sekolah.nama,
                        dapo_sekolah.status_sekolah,
                dapo_sekolah.bentuk_pendidikan,
                        dapo_sekolah.alamat_jalan,
                        dapo_sekolah.kecamatan,
                        dapo_sekolah.kabupaten,
                        dapo_sekolah.provinsi,
                        (CASE WHEN dapo_sekolah.jenjang IN ('KB','TK','TPA','SPS') THEN 'PAUD' ELSE dapo_sekolah.jenjang END) AS jenjang,
                        jawaban_survey.*,
                        (case when ptk_covid.ptk_terpapar < 100 then ptk_covid.ptk_terpapar else 0 end) as ptk_positif,
                        (case when pd_covid.pd_terpapar < 100 then pd_covid.pd_terpapar else 0 end) as pd_positif,
                        kepsek.nama as nama_kepsek,
                        kepsek.no_hp as no_hp_kepsek
            FROM
                dapo.sekolah AS dapo_sekolah
            JOIN jawaban_survey ON jawaban_survey.npsn = dapo_sekolah.npsn
                LEFT JOIN ptk_covid on ptk_covid.sekolah_id = dapo_sekolah.sekolah_id
                LEFT JOIN pd_covid on pd_covid.sekolah_id = dapo_sekolah.sekolah_id
                LEFT JOIN dapo.kepala_sekolah as kepsek on kepsek.sekolah_id = dapo_sekolah.sekolah_id
        ),
        flag_ptm as (
                SELECT
                        pengguna.username AS npsn,
                        SUM ( CASE WHEN jawaban_kuis.pilihan_pertanyaan_kuis_id = 'a4e2c4be-d098-40ba-84ed-997c01a2bbc2' THEN 1 ELSE 0 END ) AS sudah_ptm,
                        SUM ( CASE WHEN ( jawaban_kuis.pilihan_pertanyaan_kuis_id = '7bbdb431-a634-41af-9887-7d51ab6092e4' OR jawaban_kuis.pilihan_pertanyaan_kuis_id = 'a4e2c4be-d098-40ba-84ed-997c01a2bbc2' ) THEN 1 ELSE 0 END ) AS siap_ptm 
                FROM
                        jawaban_kuis
                        JOIN pengguna ON pengguna.pengguna_id = jawaban_kuis.pengguna_id 
                WHERE
                        jawaban_kuis.kuis_id = 'c046acc7-86bd-4109-b14c-603f5a96005f' 
                        AND jawaban_kuis.soft_delete = 0 
                        AND pengguna.soft_delete = 0 
                        AND pengguna.dari_dapodik = 1 
                GROUP BY
                        pengguna.username 
        )
        select 
            ".($kode_wilayah && $kode_wilayah !== '000000' ? "dapo_sekolah.kode_kabupaten" : "dapo_sekolah.kode_provinsi").",
            ".($kode_wilayah && $kode_wilayah !== '000000' ? "dapo_sekolah.kabupaten" : "dapo_sekolah.provinsi").",
            sum(1) as total_responden_sekolah,
            sum(case when kluster_ptm.kluster_ptm = 'Ada' AND (ptk_positif > 0 OR pd_positif > 0) then 1 else 0 end) as ada_kluster,
            sum(1) - sum(case when kluster_ptm.kluster_ptm = 'Ada' AND (ptk_positif > 0 OR pd_positif > 0) then 1 else 0 end) as tidak_ada_Kluster,
            sum(case when kluster_ptm.kluster_ptm = 'Ada' then ptk_positif else 0 end) as ptk_positif,
            sum(case when kluster_ptm.kluster_ptm = 'Ada' then pd_positif else 0 end) as pd_positif
        from 
            dapo.sekolah as dapo_sekolah
            JOIN kluster_ptm ON kluster_ptm.sekolah_id = dapo_sekolah.sekolah_id
            JOIN flag_ptm on flag_ptm.npsn = dapo_sekolah.npsn and flag_ptm.sudah_ptm = 1
        WHERE
            kluster_ptm.jenjang IS NOT NULL
            AND kluster_ptm.tanggal_isi_survey_terakhir > date_trunc('month', current_date)
        GROUP BY
            ".($kode_wilayah && $kode_wilayah !== '000000' ? "dapo_sekolah.kode_kabupaten" : "dapo_sekolah.kode_provinsi").",
            ".($kode_wilayah && $kode_wilayah !== '000000' ? "dapo_sekolah.kabupaten" : "dapo_sekolah.provinsi")."
        ORDER BY
            sum(case when kluster_ptm.kluster_ptm = 'Ada' AND (ptk_positif > 0 OR pd_positif > 0) then 1 else 0 end) DESC
        ;";

        $fetch = DB::connection('pgsql')->select($sql);

        return $fetch;
    }

    static function getInfografisKlaster(Request $request){
        $kode_wilayah = $request->kode_wilayah ? $request->kode_wilayah : null;

        $sql = "WITH jawaban_survey as (
            SELECT
            pengguna.username AS npsn,
            pilihan.teks as kluster_ptm,
            max(jawaban_kuis.create_date) as tanggal_isi_survey_pertama,
            max(jawaban_kuis.last_update) as tanggal_isi_survey_terakhir
          FROM
            jawaban_kuis
            JOIN pilihan_pertanyaan_kuis pilihan ON pilihan.pilihan_pertanyaan_kuis_id = jawaban_kuis.pilihan_pertanyaan_kuis_id
            JOIN pengguna ON pengguna.pengguna_id = jawaban_kuis.pengguna_id 
          WHERE
            jawaban_kuis.pertanyaan_kuis_id = 'f437ce3b-da75-49fb-a5a8-cca6ad461c74' 
          GROUP BY
            pengguna.username,
            pilihan.teks
        ),
        ptk_covid as (
        SELECT 
                NULLIF (regexp_replace( CAST( regexp_matches(regexp_replace( REPLACE (REPLACE (REPLACE (REPLACE (REPLACE (REPLACE (REPLACE ( REPLACE (REPLACE(isian,'19',''),'Covid19',''),'2022',''),'2021',''),'2020',''),'_19',''),' 19',''),'-19',''),'covid19',''),'\D*',''),'\d+') as varchar(1000)),'\D','','g'),'') :: NUMERIC AS ptk_terpapar,
                sekolah.sekolah_id 
        FROM
            jawaban_kuis
        JOIN pengguna ON pengguna.pengguna_id = jawaban_kuis.pengguna_id
        JOIN dapo.sekolah AS sekolah ON sekolah.npsn = pengguna.username 
        WHERE
            pertanyaan_kuis_id = '1f3af56c-afd7-42dd-b2ee-b4632dc59230'
        ),
        pd_covid as (
        SELECT 
                NULLIF (regexp_replace( CAST( regexp_matches(regexp_replace( REPLACE (REPLACE (REPLACE (REPLACE (REPLACE (REPLACE (REPLACE ( REPLACE (REPLACE(isian,'19',''),'Covid19',''),'2022',''),'2021',''),'2020',''),'_19',''),' 19',''),'-19',''),'covid19',''),'\D*',''),'\d+') as varchar(1000)),'\D','','g'),'') :: NUMERIC AS pd_terpapar,
                sekolah.sekolah_id
        FROM
                jawaban_kuis 
        JOIN pengguna ON pengguna.pengguna_id = jawaban_kuis.pengguna_id
        JOIN dapo.sekolah AS sekolah ON sekolah.npsn = pengguna.username 
        WHERE
                pertanyaan_kuis_id = '85f4e4cc-9f25-45d0-8116-ef08106a16bb'
        ),
        kluster_ptm as (
          SELECT
                dapo_sekolah.sekolah_id,
                dapo_sekolah.nama,
                dapo_sekolah.status_sekolah,
            dapo_sekolah.bentuk_pendidikan,
                dapo_sekolah.alamat_jalan,
                dapo_sekolah.kecamatan,
                dapo_sekolah.kabupaten,
                dapo_sekolah.provinsi,
                (CASE WHEN dapo_sekolah.jenjang IN ('KB','TK','TPA','SPS') THEN 'PAUD' ELSE dapo_sekolah.jenjang END) AS jenjang,
                jawaban_survey.*,
                (case when ptk_covid.ptk_terpapar < 100 then ptk_covid.ptk_terpapar else 0 end) as ptk_positif,
                (case when pd_covid.pd_terpapar < 100 then pd_covid.pd_terpapar else 0 end) as pd_positif,
                kepsek.nama as nama_kepsek,
                kepsek.no_hp as no_hp_kepsek
          FROM
            dapo.sekolah AS dapo_sekolah
          JOIN jawaban_survey ON jawaban_survey.npsn = dapo_sekolah.npsn
            LEFT JOIN ptk_covid on ptk_covid.sekolah_id = dapo_sekolah.sekolah_id
            LEFT JOIN pd_covid on pd_covid.sekolah_id = dapo_sekolah.sekolah_id
            LEFT JOIN dapo.kepala_sekolah as kepsek on kepsek.sekolah_id = dapo_sekolah.sekolah_id
        ),
        flag_ptm as (
            SELECT
                pengguna.username AS npsn,
                SUM ( CASE WHEN jawaban_kuis.pilihan_pertanyaan_kuis_id = 'a4e2c4be-d098-40ba-84ed-997c01a2bbc2' THEN 1 ELSE 0 END ) AS sudah_ptm,
                SUM ( CASE WHEN ( jawaban_kuis.pilihan_pertanyaan_kuis_id = '7bbdb431-a634-41af-9887-7d51ab6092e4' OR jawaban_kuis.pilihan_pertanyaan_kuis_id = 'a4e2c4be-d098-40ba-84ed-997c01a2bbc2' ) THEN 1 ELSE 0 END ) AS siap_ptm 
            FROM
                jawaban_kuis
                JOIN pengguna ON pengguna.pengguna_id = jawaban_kuis.pengguna_id 
            WHERE
                jawaban_kuis.kuis_id = 'c046acc7-86bd-4109-b14c-603f5a96005f' 
                AND jawaban_kuis.soft_delete = 0 
                AND pengguna.soft_delete = 0 
                AND pengguna.dari_dapodik = 1 
            GROUP BY
                pengguna.username 
        )
        select 
            TRIM ( kluster_ptm.jenjang ) AS jenjang,
            sum(1) as total_responden_sekolah,
            sum(case when kluster_ptm.kluster_ptm = 'Ada' AND (ptk_positif > 0 OR pd_positif > 0) then 1 else 0 end) as ada_kluster,
            sum(1) - sum(case when kluster_ptm.kluster_ptm = 'Ada' AND (ptk_positif > 0 OR pd_positif > 0) then 1 else 0 end) as tidak_ada_Kluster,
            sum(case when kluster_ptm.kluster_ptm = 'Ada' then ptk_positif else 0 end) as ptk_positif,
            sum(case when kluster_ptm.kluster_ptm = 'Ada' then pd_positif else 0 end) as pd_positif
        from 
            dapo.sekolah as dapo_sekolah
            JOIN kluster_ptm ON kluster_ptm.sekolah_id = dapo_sekolah.sekolah_id
            JOIN flag_ptm on flag_ptm.npsn = dapo_sekolah.npsn and flag_ptm.sudah_ptm = 1
        WHERE
            kluster_ptm.jenjang IS NOT NULL
            AND kluster_ptm.tanggal_isi_survey_terakhir > date_trunc('month', current_date)
            ".($kode_wilayah && $kode_wilayah !== '000000' ? "AND kode_provinsi = '".$kode_wilayah."'" : "")."
        GROUP BY 
            kluster_ptm.jenjang
        ;";

        $fetch = DB::connection('pgsql')->select($sql);

        return $fetch;
    }

    static function getInfografisKendala(Request $request){
        $kode_wilayah = $request->kode_wilayah ? $request->kode_wilayah : null;

        if(!Cache::get('getInfografisKendala_'.$kode_wilayah.date('Y-m-d'))){

            $sql = "SELECT 
                alasan.jenjang,
                sum(jawaban_a) as jawaban_a,
                sum(jawaban_b) as jawaban_b,
                sum(jawaban_c) as jawaban_c,
                sum(jawaban_d) as jawaban_d
            FROM (
            SELECT
                (case
                when bentuk_pendidikan in ('KB','TK','SPS','TPA') then 'PAUD'
                when bentuk_pendidikan in ('SD','SPK SD') then 'SD'
                when bentuk_pendidikan in ('SMP','SPK SMP') then 'SMP'
                when bentuk_pendidikan in ('SMA', 'SPK SMA') then 'SMA'
                when bentuk_pendidikan in ('SMK') then 'SMK'
                when bentuk_pendidikan in ('SLB','SDLB','SMPLB','SMLB') then 'SLB'
                when bentuk_pendidikan in ('PKBM','SKB') then 'PKBM'
                else '-'
                end) as jenjang,
                dapo_sekolah.nama,
                dapo_sekolah.npsn,
                dapo_sekolah.status_sekolah,
                dapo_sekolah.bentuk_pendidikan,
                dapo_sekolah.kecamatan,
                dapo_sekolah.kabupaten,
                dapo_sekolah.provinsi,
                jawaban_a,
                jawaban_b,
                jawaban_c,
                jawaban_d 
            FROM
                dapo.sekolah dapo_sekolah
                JOIN (
                SELECT
                    *,
                    (
                    CASE
                            
                            WHEN jawaban_a = 0 THEN
                            (
                            CASE
                                    
                                    WHEN jawaban_b = 0 THEN
                                    ( CASE WHEN jawaban_c = 0 THEN ( CASE WHEN jawaban_d = 0 THEN '-' ELSE'D' END ) ELSE'C' END ) ELSE'B' 
                                END 
                                ) ELSE'A' 
                            END 
                            ) AS jawabannya 
                        FROM
                            (
                            SELECT
                                pengguna.username AS npsn,
                                belum_siap.* 
                            FROM
                                pengguna
                                JOIN (
                                SELECT
                                    pengguna.pengguna_id,
                                    SUM ( CASE WHEN jawaban_kuis.pilihan_pertanyaan_kuis_id = '4daf3c1d-a976-4a3c-aaf4-46384c8b275b' THEN 1 ELSE 0 END ) AS jawaban_a,
                                    SUM ( CASE WHEN jawaban_kuis.pilihan_pertanyaan_kuis_id = 'c0212068-1c1e-43ee-bf2b-f522c4e9ddc7' THEN 1 ELSE 0 END ) AS jawaban_b,
                                    SUM ( CASE WHEN jawaban_kuis.pilihan_pertanyaan_kuis_id = '34a69dfa-2534-438a-81cf-f1911cdcfac8' THEN 1 ELSE 0 END ) AS jawaban_c,
                                    SUM ( CASE WHEN jawaban_kuis.pilihan_pertanyaan_kuis_id = 'd9c4ad2b-3833-4241-9e7e-db7a823a1301' THEN 1 ELSE 0 END ) AS jawaban_d 
                                FROM
                                    jawaban_kuis
                                    JOIN pengguna ON pengguna.pengguna_id = jawaban_kuis.pengguna_id
                                    JOIN pilihan_pertanyaan_kuis ON pilihan_pertanyaan_kuis.pilihan_pertanyaan_kuis_id = jawaban_kuis.pilihan_pertanyaan_kuis_id 
                                WHERE
                                    jawaban_kuis.soft_delete = 0 
                                    AND jawaban_kuis.kuis_id = 'c046acc7-86bd-4109-b14c-603f5a96005f' 
                                    AND jawaban_kuis.pilihan_pertanyaan_kuis_id IN ( SELECT pilihan_pertanyaan_kuis.pilihan_pertanyaan_kuis_id FROM pilihan_pertanyaan_kuis WHERE pertanyaan_kuis_id = 'f284ac29-145a-4e5e-9515-ee6d81b1db55' AND soft_delete = 0 ) 
                                    AND pengguna.dari_dapodik = 1 
                                GROUP BY
                                    pengguna.pengguna_id 
                                ) belum_siap ON belum_siap.pengguna_id = pengguna.pengguna_id 
                            WHERE
                                pengguna.soft_delete = 0 
                                AND pengguna.dari_dapodik = 1 
                            ) sudah_siap 
                ) abc ON dapo_sekolah.npsn = abc.npsn
                ".($kode_wilayah && $kode_wilayah !== '000000' ? "WHERE dapo_sekolah.kode_provinsi = '".$kode_wilayah."'" : "")."
            ) alasan
            group by alasan.jenjang";

            $fetch = DB::connection('pgsql')->select($sql);

            Cache::put('getInfografisKendala_'.$kode_wilayah.date('Y-m-d'), $fetch);
    
            return $fetch;
        }else{
            return Cache::get('getInfografisKendala_'.$kode_wilayah.date('Y-m-d'));
        }
    }

    static function getInfografisNasional(Request $request){

        
        $jenjang = $request->jenjang ? $request->jenjang : null;
        $kode_wilayah = $request->kode_wilayah ? $request->kode_wilayah : null;
        
        if(!Cache::get('getInfografisNasional_'.$jenjang.$kode_wilayah.date('Y-m-d'))){
        
            $str_jenjang = '';

            switch ($jenjang) {
                case 'PAUD':
                    $str_jenjang = "AND bentuk_pendidikan IN ('TK','KB','TPA','SPS')";
                    break;
                case 'SD':
                    $str_jenjang = "AND bentuk_pendidikan IN ('SD','SPK SD')";
                    break;
                case 'SMP':
                    $str_jenjang = "AND bentuk_pendidikan IN ('SMP','SPK SMP')";
                    break;
                case 'SMA':
                    $str_jenjang = "AND bentuk_pendidikan IN ('SMA','SPK SMA')";
                    break;
                case 'SMK':
                    $str_jenjang = "AND bentuk_pendidikan IN ('SMK','SPK SMK')";
                    break;
                case 'SLB':
                    $str_jenjang = "AND bentuk_pendidikan IN ('SLB','SDLB','SMPLB','SMLB')";
                    break;
                default:
                    break;
            }

            $sql = "SELECT
                    ".($kode_wilayah && trim($kode_wilayah) != '000000' ? "sekolah.kode_provinsi AS kode_wilayah,sekolah.provinsi AS nama," : "")."
                    1 AS id_level_wilayah,
                    SUM ( 1 ) AS sekolah_total,
                    SUM ( CASE WHEN ptm.sekolah_id IS NOT NULL THEN 1 ELSE 0 END ) AS sekolah_sudah_mengisi_siap,
                    SUM ( CASE WHEN aaa.npsn IS NOT NULL THEN 1 ELSE 0 END ) AS sekolah_sudah_mengisi_survey,
                    SUM ( CASE WHEN ptm.sekolah_id IS NOT NULL THEN 1 ELSE ( CASE WHEN aaa.npsn IS NOT NULL THEN 1 ELSE 0 END ) END ) AS sekolah_sudah_mengisi_gabungan,
                    SUM (CASE WHEN ptm.ptm=1 THEN 1 ELSE (CASE WHEN aaa.sudah_ptm=1 THEN 1 ELSE 0 END) END)/(CASE WHEN SUM (CASE WHEN ptm.sekolah_id IS NOT NULL THEN 1 ELSE (CASE WHEN aaa.npsn IS NOT NULL THEN 1 ELSE 0 END) END)> 0 THEN CAST (SUM (CASE WHEN ptm.sekolah_id IS NOT NULL THEN 1 ELSE (CASE WHEN aaa.npsn IS NOT NULL THEN 1 ELSE 0 END) END) AS FLOAT) ELSE 1 END)*100 AS sudah_ptm_persen,
                    SUM (CASE WHEN ptm.ptm=1 THEN 1 ELSE (CASE WHEN aaa.siap_ptm=1 THEN 1 ELSE 0 END) END)/(CASE WHEN SUM (CASE WHEN ptm.sekolah_id IS NOT NULL THEN 1 ELSE (CASE WHEN aaa.npsn IS NOT NULL THEN 1 ELSE 0 END) END)> 0 THEN CAST (SUM (CASE WHEN ptm.sekolah_id IS NOT NULL THEN 1 ELSE (CASE WHEN aaa.npsn IS NOT NULL THEN 1 ELSE 0 END) END) AS FLOAT) ELSE 1 END)*100 AS siap_ptm_persen,
                    SUM ( CASE WHEN ptm.ptm = 1 THEN 1 ELSE ( CASE WHEN aaa.sudah_ptm = 1 THEN 1 ELSE 0 END ) END ) AS sudah_ptm_gabungan,
                    SUM ( CASE WHEN ptm.ptm = 1 THEN 1 ELSE ( CASE WHEN aaa.siap_ptm = 1 THEN 1 ELSE 0 END ) END ) AS siap_ptm_gabungan,
                    SUM ( CASE WHEN ptm.ptm = 1 THEN 0 ELSE ( CASE WHEN aaa.siap_ptm = 1 THEN 1 ELSE 0 END ) END ) AS belum_siap_ptm_gabungan
                FROM
                    dapo.sekolah sekolah
                    JOIN REF.mst_wilayah kab ON kab.kode_wilayah = sekolah.kode_kabupaten 
                    AND kab.expired_date IS NULL 
                    AND kab.id_level_wilayah = 2 
                    AND kab.mst_kode_wilayah != '350000'
                    LEFT JOIN dapo.ptm_sekolah ptm ON ptm.sekolah_id = sekolah.sekolah_id
                    LEFT JOIN (
                    SELECT
                        npsn,
                        sudah_ptm,
                        ( CASE WHEN siap_ptm > 1 THEN 1 ELSE siap_ptm END ) AS siap_ptm 
                    FROM
                        (
                        SELECT
                            pengguna.username AS npsn,
                            SUM ( CASE WHEN jawaban_kuis.pilihan_pertanyaan_kuis_id = 'a4e2c4be-d098-40ba-84ed-997c01a2bbc2' THEN 1 ELSE 0 END ) AS sudah_ptm,
                            SUM ( CASE WHEN ( jawaban_kuis.pilihan_pertanyaan_kuis_id = '7bbdb431-a634-41af-9887-7d51ab6092e4' OR jawaban_kuis.pilihan_pertanyaan_kuis_id = 'a4e2c4be-d098-40ba-84ed-997c01a2bbc2' ) THEN 1 ELSE 0 END ) AS siap_ptm 
                        FROM
                            jawaban_kuis
                            JOIN pengguna ON pengguna.pengguna_id = jawaban_kuis.pengguna_id 
                        WHERE
                            jawaban_kuis.kuis_id = 'c046acc7-86bd-4109-b14c-603f5a96005f' 
                            AND jawaban_kuis.soft_delete = 0 
                            AND pengguna.soft_delete = 0 
                            AND pengguna.dari_dapodik = 1 
                        GROUP BY
                            pengguna.username 
                        ) aaa 
                    ) aaa ON aaa.npsn = sekolah.npsn 
                WHERE
                    bentuk_pendidikan IS NOT NULL
                    ".($kode_wilayah && trim($kode_wilayah) != '000000' ? "AND sekolah.kode_provinsi='".$kode_wilayah."'" : "")." 
                    ".$str_jenjang."
                    ".($kode_wilayah && trim($kode_wilayah) != '000000' ? "GROUP BY sekolah.kode_provinsi,sekolah.provinsi" : "")."
                ";
            
                // return $sql;die;

            $fetch = DB::connection('pgsql')->select($sql);

            Cache::put('getInfografisNasional_'.$jenjang.$kode_wilayah.date('Y-m-d'), $fetch);
    
            return $fetch;
        }else{
            return Cache::get('getInfografisNasional_'.$jenjang.$kode_wilayah.date('Y-m-d'));
        }
    }

    static function getIndexPTMSp(Request $request){
        $order = $request->order ? $request->order : 'sudah_ptm';
        $id_level_wilayah = $request->id_level_wilayah ? $request->id_level_wilayah : '0';
        $kode_wilayah = $request->kode_wilayah ? $request->kode_wilayah : '000000';
        $sekolah_id = $request->sekolah_id ? $request->sekolah_id : null;
        $jenjang = $request->jenjang ? $request->jenjang : 'semua';
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 2000000;

        if(!Cache::get('getIndexPTMSp_'.$order.$id_level_wilayah.$kode_wilayah.$sekolah_id.$jenjang.$start.$limit.date('Y-m-d'))){

            $sql = "SELECT
                sekolah.*,
                ( CASE WHEN ptm.ptm = 1 THEN 1 ELSE ( CASE WHEN aaa.sudah_ptm = 1 THEN 1 ELSE 0 END ) END ) AS sudah_ptm,
                ( CASE WHEN ptm.ptm = 1 THEN 1 ELSE ( CASE WHEN aaa.siap_ptm = 1 THEN 1 ELSE 0 END ) END ) AS siap_ptm
            FROM
                dapo.sekolah sekolah
                JOIN REF.mst_wilayah kab ON kab.kode_wilayah = sekolah.kode_kabupaten 
                AND kab.expired_date IS NULL 
                AND kab.id_level_wilayah = 2 
                AND kab.mst_kode_wilayah != '350000'
                LEFT JOIN dapo.ptm_sekolah ptm ON ptm.sekolah_id = sekolah.sekolah_id
                LEFT JOIN (
                SELECT
                    npsn,
                    sudah_ptm,
                    ( CASE WHEN siap_ptm > 1 THEN 1 ELSE siap_ptm END ) AS siap_ptm 
                FROM
                    (
                    SELECT
                        pengguna.username AS npsn,
                        SUM ( CASE WHEN jawaban_kuis.pilihan_pertanyaan_kuis_id = 'a4e2c4be-d098-40ba-84ed-997c01a2bbc2' THEN 1 ELSE 0 END ) AS sudah_ptm,
                        SUM ( CASE WHEN ( jawaban_kuis.pilihan_pertanyaan_kuis_id = '7bbdb431-a634-41af-9887-7d51ab6092e4' OR jawaban_kuis.pilihan_pertanyaan_kuis_id = 'a4e2c4be-d098-40ba-84ed-997c01a2bbc2' ) THEN 1 ELSE 0 END ) AS siap_ptm 
                    FROM
                        jawaban_kuis
                        JOIN pengguna ON pengguna.pengguna_id = jawaban_kuis.pengguna_id 
                    WHERE
                        jawaban_kuis.kuis_id = 'c046acc7-86bd-4109-b14c-603f5a96005f' 
                        AND jawaban_kuis.soft_delete = 0 
                        AND pengguna.soft_delete = 0 
                        AND pengguna.dari_dapodik = 1 
                    GROUP BY
                        pengguna.username 
                    ) aaa 
                ) aaa ON aaa.npsn = sekolah.npsn 
            WHERE
                bentuk_pendidikan IS NOT NULL 
            ".($jenjang != 'semua' ? ($jenjang == 'SLB' ? " AND bentuk_pendidikan IN ('SLB', 'SDLB', 'SMPLB', 'SMLB')" : ($jenjang == 'PAUD' ? " AND bentuk_pendidikan IN ('TK', 'KB', 'TPA', 'SPS')" : " AND bentuk_pendidikan IN ('".$jenjang."')" ) ) : " ")." 
            ".($id_level_wilayah == 0 ? ' AND kode_provinsi is not null' : ($id_level_wilayah == 1 ? " AND kode_provinsi = '".$kode_wilayah."' " : ($id_level_wilayah == 2 ? " AND kode_kabupaten = '".$kode_wilayah."' " : ($id_level_wilayah == 3 ? " AND kode_kecamatan = '".$kode_wilayah."'" : ' AND kode_provinsi is not null'))))."
            ".($sekolah_id ? " AND sekolah.sekolah_id = '".$sekolah_id."'" : "")."
            LIMIT ".$limit." OFFSET ".$start."
            ";
            
            $fetch = DB::connection('pgsql')->select($sql);

            Cache::put('getIndexPTMSp_'.$order.$id_level_wilayah.$kode_wilayah.$jenjang.$start.$limit.date('Y-m-d'), $fetch);
    
            return $fetch;
        }else{
            return Cache::get('getIndexPTMSp_'.$order.$id_level_wilayah.$kode_wilayah.$jenjang.$start.$limit.date('Y-m-d'));
        }


    }

    static function getIndexPTM(Request $request){

        // return date('Y-m-d');die;
        
        $order = $request->order ? $request->order : 'sudah_ptm';
        $id_level_wilayah = $request->id_level_wilayah ? ($request->id_level_wilayah != 'undefined' ? $request->id_level_wilayah : '0') : '0';
        $kode_wilayah = $request->kode_wilayah ? ($request->kode_wilayah != 'undefined' ? $request->kode_wilayah : '000000')  : '000000';
        $jenjang = $request->jenjang ? $request->jenjang : 'semua';
        
        // return Cache::get('getIndexPTM_'.$order.$id_level_wilayah.$kode_wilayah.$jenjang);die;
        
        if(!Cache::get('getIndexPTM_'.$order.$id_level_wilayah.$kode_wilayah.$jenjang.date('Y-m-d'))){

            $sql = "SELECT
                sekolah.".($id_level_wilayah == 0 ? 'kode_provinsi' : ($id_level_wilayah == 1 ? 'kode_kabupaten' : ($id_level_wilayah == 2 ? 'kode_kecamatan' : 'kode_kecamatan')))." AS kode_wilayah,
                sekolah.".($id_level_wilayah == 0 ? 'provinsi' : ($id_level_wilayah == 1 ? 'kabupaten' : ($id_level_wilayah == 2 ? 'kecamatan' : 'kecamatan')))." AS nama,
                ".($id_level_wilayah == 0 ? '1' : ($id_level_wilayah == 1 ? '2' : ($id_level_wilayah == 2 ? '3' : '1')))." as id_level_wilayah,
                SUM ( 1 ) AS sekolah_total,
                SUM ( CASE WHEN ptm.sekolah_id is not null then 1 else 0 end) as sekolah_sudah_mengisi_siap,
                SUM ( CASE WHEN aaa.npsn is not null then 1 else 0 end) as sekolah_sudah_mengisi_survey,
                SUM ( CASE WHEN ptm.sekolah_id is not null then 1 else ( CASE WHEN aaa.npsn is not null then 1 else 0 end) end) as sekolah_sudah_mengisi_gabungan,
                SUM ( CASE WHEN ptm.ptm = 1 THEN 1 ELSE ( CASE WHEN aaa.sudah_ptm = 1 THEN 1 ELSE 0 END ) END ) / (case when SUM ( CASE WHEN ptm.sekolah_id is not null then 1 else ( CASE WHEN aaa.npsn is not null then 1 else 0 end) end) > 0 then CAST ( SUM ( CASE WHEN ptm.sekolah_id is not null then 1 else ( CASE WHEN aaa.npsn is not null then 1 else 0 end) end) AS FLOAT ) else 1 end) * 100 AS sudah_ptm_persen,
	            SUM ( CASE WHEN ptm.ptm = 1 THEN 1 ELSE ( CASE WHEN aaa.siap_ptm = 1 THEN 1 ELSE 0 END ) END ) / (case when SUM ( CASE WHEN ptm.sekolah_id is not null then 1 else ( CASE WHEN aaa.npsn is not null then 1 else 0 end) end) > 0 then CAST ( SUM ( CASE WHEN ptm.sekolah_id is not null then 1 else ( CASE WHEN aaa.npsn is not null then 1 else 0 end) end) AS FLOAT ) else 1 end) * 100 AS siap_ptm_persen,
                SUM ( CASE WHEN ptm.ptm = 1 THEN 1 ELSE 0 END ) AS sudah_ptm_migrasi,
                SUM ( CASE WHEN ptm.ptm = 1 THEN 1 ELSE 0 END ) AS siap_ptm_migrasi,
                SUM ( CASE WHEN aaa.sudah_ptm = 1 THEN 1 ELSE 0 END ) AS sudah_ptm_survey,
                SUM ( CASE WHEN aaa.siap_ptm = 1 THEN 1 ELSE 0 END ) AS siap_ptm_survey,
                SUM ( CASE WHEN ptm.ptm = 1 THEN 1 ELSE ( CASE WHEN aaa.sudah_ptm = 1 THEN 1 ELSE 0 END ) END ) AS sudah_ptm_gabungan,
                -- SUM ( CASE WHEN ptm.ptm = 1 THEN 1 ELSE ( CASE WHEN aaa.siap_ptm = 1 THEN 1 ELSE 0 END ) END ) AS siap_ptm_gabungan,
                SUM ( CASE WHEN aaa.siap_ptm = 1 AND ptm.ptm != 1 AND aaa.sudah_ptm != 1 THEN 1 ELSE 0 END ) as siap_ptm_gabungan,
                SUM ( CASE WHEN ptm.ptm = 1 THEN 0 ELSE ( CASE WHEN aaa.siap_ptm = 1 THEN 1 ELSE 0 END ) END ) AS belum_siap_ptm_gabungan,
                SUM ( CASE WHEN ptm.ptm = 1 THEN 1 ELSE ( CASE WHEN aaa.sudah_ptm = 1 THEN 1 ELSE 0 END ) END ) / (case when SUM (1) > 0 THEN CAST ( SUM ( 1 ) AS FLOAT ) else 1 end) * 100 AS sudah_ptm_persen_total,
                SUM ( CASE WHEN ptm.ptm = 1 THEN 1 ELSE ( CASE WHEN aaa.siap_ptm = 1 THEN 1 ELSE 0 END ) END ) / (case when SUM (1) > 0 then CAST ( SUM ( 1 ) AS FLOAT ) else 1 end) * 100 AS siap_ptm_persen_total
            FROM
                dapo.sekolah sekolah
                JOIN REF.mst_wilayah kab ON kab.kode_wilayah = sekolah.kode_kabupaten 
                AND kab.expired_date IS NULL 
                AND kab.id_level_wilayah = 2 
                AND kab.mst_kode_wilayah != '350000'
                LEFT JOIN dapo.ptm_sekolah ptm ON ptm.sekolah_id = sekolah.sekolah_id
                LEFT JOIN (
                SELECT
                    npsn,
                    sudah_ptm,
                    ( CASE WHEN siap_ptm > 1 THEN 1 ELSE siap_ptm END ) AS siap_ptm 
                FROM
                    (
                    SELECT
                        pengguna.username AS npsn,
                        SUM ( CASE WHEN jawaban_kuis.pilihan_pertanyaan_kuis_id = 'a4e2c4be-d098-40ba-84ed-997c01a2bbc2' THEN 1 ELSE 0 END ) AS sudah_ptm,
                        SUM ( CASE WHEN ( jawaban_kuis.pilihan_pertanyaan_kuis_id = '7bbdb431-a634-41af-9887-7d51ab6092e4' OR jawaban_kuis.pilihan_pertanyaan_kuis_id = 'a4e2c4be-d098-40ba-84ed-997c01a2bbc2' ) THEN 1 ELSE 0 END ) AS siap_ptm 
                    FROM
                        jawaban_kuis
                        JOIN pengguna ON pengguna.pengguna_id = jawaban_kuis.pengguna_id 
                    WHERE
                        jawaban_kuis.kuis_id = 'c046acc7-86bd-4109-b14c-603f5a96005f' 
                        AND jawaban_kuis.soft_delete = 0 
                        AND pengguna.soft_delete = 0 
                        AND pengguna.dari_dapodik = 1 
                    GROUP BY
                        pengguna.username 
                    ) aaa 
                ) aaa ON aaa.npsn = sekolah.npsn
            WHERE bentuk_pendidikan is not null
            ".($jenjang != 'semua' ? ($jenjang == 'SLB' ? " AND bentuk_pendidikan IN ('SLB', 'SDLB', 'SMPLB', 'SMLB')" : ($jenjang == 'PAUD' ? " AND bentuk_pendidikan IN ('TK', 'KB', 'TPA', 'SPS')" : " AND bentuk_pendidikan IN ('".$jenjang."')" ) ) : " ")." 
            ".($id_level_wilayah == 0 ? ' AND kode_provinsi is not null' : ($id_level_wilayah == 1 ? " AND kode_provinsi = '".$kode_wilayah."' " : ($id_level_wilayah == 2 ? " AND kode_kabupaten = '".$kode_wilayah."' " : " AND kode_kecamatan = '".$kode_wilayah."'")))." 
            GROUP BY
                sekolah.".($id_level_wilayah == 0 ? 'kode_provinsi' : ($id_level_wilayah == 1 ? 'kode_kabupaten' : ($id_level_wilayah == 2 ? 'kode_kecamatan' : 'kode_kecamatan'))).",
                sekolah.".($id_level_wilayah == 0 ? 'provinsi' : ($id_level_wilayah == 1 ? 'kabupaten' : ($id_level_wilayah == 2 ? 'kecamatan' : 'kecamatan')))."
            ORDER BY
                ".$order."_persen DESC";
    
            // return $sql;die;
    
            $fetch = DB::connection('pgsql')->select($sql);

            Cache::put('getIndexPTM_'.$order.$id_level_wilayah.$kode_wilayah.$jenjang.date('Y-m-d'), $fetch);
    
            return $fetch;
        }else{
            return Cache::get('getIndexPTM_'.$order.$id_level_wilayah.$kode_wilayah.$jenjang.date('Y-m-d'));
        }
    }

    static function getListrikInternet(Request $request){
        $order = $request->order ? $request->order : 'listrik';
        $id_level_wilayah = $request->id_level_wilayah ? $request->id_level_wilayah : '0';
        $kode_wilayah = $request->kode_wilayah ? $request->kode_wilayah : '000000';

        $sql = "select 
            * 
        from (
        select 
            ".($id_level_wilayah == 0 ? 'kode_provinsi' : ($id_level_wilayah == 1 ? 'kode_kabupaten' : ($id_level_wilayah == 2 ? 'kode_kecamatan' : 'kode_provinsi')))." as kode_wilayah,  
            ".($id_level_wilayah == 0 ? 'provinsi' : ($id_level_wilayah == 1 ? 'kabupaten' : ($id_level_wilayah == 2 ? 'kecamatan' : 'provinsi')))." as nama,
            ".($id_level_wilayah == 0 ? '1' : ($id_level_wilayah == 1 ? '2' : ($id_level_wilayah == 2 ? '3' : '1')))." as id_level_wilayah,
            ROUND((CASE WHEN sekolah_total > 0 THEN ((sekolah_total - sekolah_total_tidak_ada_listrik) / cast(sekolah_total as float) * 100) ELSE 0 END),2) as persen_sekolah_listrik_total,
            ROUND((CASE WHEN sekolah_total > 0 THEN ((sekolah_total - sekolah_total_tidak_ada_internet) / cast(sekolah_total as float) * 100) ELSE 0 END),2) as persen_sekolah_internet_total,
            ROUND((CASE WHEN sekolah_total > 0 THEN (sekolah_total_tidak_ada_listrik / cast(sekolah_total as float) * 100) ELSE 0 END),2) as persen_sekolah_tidak_ada_listrik_total,
            ROUND((CASE WHEN sekolah_total > 0 THEN (sekolah_total_tidak_ada_internet / cast(sekolah_total as float) * 100) ELSE 0 END),2) as persen_sekolah_tidak_ada_internet_total,
            null as '-'
        from (
        SELECT
            ".($id_level_wilayah == 0 ? 'kode_provinsi' : ($id_level_wilayah == 1 ? 'kode_kabupaten' : ($id_level_wilayah == 2 ? 'kode_kecamatan' : 'kode_provinsi'))).",
            ".($id_level_wilayah == 0 ? 'provinsi' : ($id_level_wilayah == 1 ? 'kabupaten' : ($id_level_wilayah == 2 ? 'kecamatan' : 'provinsi'))).",
            ".($id_level_wilayah == 0 ? '1' : ($id_level_wilayah == 1 ? '2' : ($id_level_wilayah == 2 ? '3' : '1')))." as id_level_wilayah,
            SUM ( CASE WHEN bentuk_pendidikan_id IN ( 1, 2, 3, 4, 5, 53, 6, 54, 13, 55, 15, 7, 8, 14, 29 ) THEN 1 ELSE 0 END ) AS sekolah_total,
            SUM ( CASE WHEN bentuk_pendidikan_id IN ( 1, 2, 3, 4 ) THEN 1 ELSE 0 END ) AS sekolah_paud,
            SUM ( CASE WHEN bentuk_pendidikan_id IN ( 5, 53 ) THEN 1 ELSE 0 END ) AS sekolah_sd,
            SUM ( CASE WHEN bentuk_pendidikan_id IN ( 6, 54 ) THEN 1 ELSE 0 END ) AS sekolah_smp,
            SUM ( CASE WHEN bentuk_pendidikan_id IN ( 13, 55 ) THEN 1 ELSE 0 END ) AS sekolah_sma,
            SUM ( CASE WHEN bentuk_pendidikan_id IN ( 15 ) THEN 1 ELSE 0 END ) AS sekolah_smk,
            SUM ( CASE WHEN bentuk_pendidikan_id IN ( 7, 8, 14, 29 ) THEN 1 ELSE 0 END ) AS sekolah_slb,
            
            SUM ( CASE WHEN bentuk_pendidikan_id IN ( 1, 2, 3, 4, 5, 53, 6, 54, 13, 55, 15, 7, 8, 14, 29 ) AND (sumber_listrik = 'Tidak diisi' or sumber_listrik = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_total_tidak_ada_listrik,
            SUM ( CASE WHEN bentuk_pendidikan_id IN ( 1, 2, 3, 4 ) AND (sumber_listrik = 'Tidak diisi' or sumber_listrik = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_paud_tidak_ada_listrik,
            SUM ( CASE WHEN bentuk_pendidikan_id IN ( 5, 53 ) AND (sumber_listrik = 'Tidak diisi' or sumber_listrik = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_sd_tidak_ada_listrik,
            SUM ( CASE WHEN bentuk_pendidikan_id IN ( 6, 54 ) AND (sumber_listrik = 'Tidak diisi' or sumber_listrik = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_smp_tidak_ada_listrik,
            SUM ( CASE WHEN bentuk_pendidikan_id IN ( 13, 55 ) AND (sumber_listrik = 'Tidak diisi' or sumber_listrik = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_sma_tidak_ada_listrik,
            SUM ( CASE WHEN bentuk_pendidikan_id IN ( 15 ) AND (sumber_listrik = 'Tidak diisi' or sumber_listrik = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_smk_tidak_ada_listrik,
            SUM ( CASE WHEN bentuk_pendidikan_id IN ( 7, 8, 14, 29 ) AND (sumber_listrik = 'Tidak diisi' or sumber_listrik = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_slb_tidak_ada_listrik,
            
            SUM ( CASE WHEN bentuk_pendidikan_id IN ( 1, 2, 3, 4, 5, 53, 6, 54, 13, 55, 15, 7, 8, 14, 29 ) AND (akses_internet = 'Tidak Ada' and akses_internet_2 = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_total_tidak_ada_internet,
            SUM ( CASE WHEN bentuk_pendidikan_id IN ( 1, 2, 3, 4 ) AND (akses_internet = 'Tidak Ada' and akses_internet_2 = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_paud_tidak_ada_internet,
            SUM ( CASE WHEN bentuk_pendidikan_id IN ( 5, 53 ) AND (akses_internet = 'Tidak Ada' and akses_internet_2 = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_sd_tidak_ada_internet,
            SUM ( CASE WHEN bentuk_pendidikan_id IN ( 6, 54 ) AND (akses_internet = 'Tidak Ada' and akses_internet_2 = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_smp_tidak_ada_internet,
            SUM ( CASE WHEN bentuk_pendidikan_id IN ( 13, 55 ) AND (akses_internet = 'Tidak Ada' and akses_internet_2 = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_sma_tidak_ada_internet,
            SUM ( CASE WHEN bentuk_pendidikan_id IN ( 15 ) AND (akses_internet = 'Tidak Ada' and akses_internet_2 = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_smk_tidak_ada_internet,
            SUM ( CASE WHEN bentuk_pendidikan_id IN ( 7, 8, 14, 29 ) AND (akses_internet = 'Tidak Ada' and akses_internet_2 = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_slb_tidak_ada_internet
        
        FROM
            skl.sekolah
        ".($id_level_wilayah == 0 ? '' : ($id_level_wilayah == 1 ? " where kode_provinsi = '".$kode_wilayah."' " : ($id_level_wilayah == 2 ? " where kode_kabupaten = '".$kode_wilayah."' " : '')))."
        GROUP BY
            ".($id_level_wilayah == 0 ? 'kode_provinsi' : ($id_level_wilayah == 1 ? 'kode_kabupaten' : ($id_level_wilayah == 2 ? 'kode_kecamatan' : 'kode_provinsi'))).",
            ".($id_level_wilayah == 0 ? 'provinsi' : ($id_level_wilayah == 1 ? 'kabupaten' : ($id_level_wilayah == 2 ? 'kecamatan' : 'provinsi')))."
        ) aaa
        ) bbb
        ORDER BY
        persen_sekolah_".$order."_total DESC";

        $fetch = DB::connection('sqlsrv_dm')->select($sql);

        return $fetch;
    }
}