<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;

class AppController extends Controller
{
	public function index($value='')
	{
		# code...
	}

	public function saveLog(Request $request){
		$alamat_ip = $request->alamat_ip ? $request->alamat_ip : $_SERVER['REMOTE_ADDR'];
		$judul_aplikasi = $request->judul_aplikasi ? $request->judul_aplikasi : null;
		$kode_wilayah_aplikasi = $request->kode_wilayah_aplikasi ? $request->kode_wilayah_aplikasi : null;
		$wilayah_aplikasi = $request->wilayah_aplikasi ? $request->wilayah_aplikasi : null;
		$semester_id_aplikasi = $request->semester_id_aplikasi ? $request->semester_id_aplikasi : null;

		$exe = DB::connection('pgsql_log')->table('app_log')->insert([
			'app_log_id' => DB::raw("uuid_generate_v4()"),
			'alamat_ip' => $alamat_ip,
			'judul_aplikasi' => $judul_aplikasi,
			'kode_wilayah_aplikasi' => $kode_wilayah_aplikasi,
			'wilayah_aplikasi' => $wilayah_aplikasi,
			'semester_id_aplikasi' => $semester_id_aplikasi,
			'create_date' => DB::raw("now()"),
			'last_update' => DB::raw("now()"),
			'soft_delete' => 0
		]);

		return $exe ? 'true' : 'false';

	}

	public function loginKoreg(Request $request){
		$npsn = $request->npsn ? $request->npsn : null;
		$kode_registrasi = $request->kode_registrasi ? $request->kode_registrasi : null;
		$login = false;

		$fetch = DB::connection('sqlsrv')->table(DB::raw("sekolah with(nolock)"))
        ->where('soft_delete','=',0)
		->where('npsn','=',$npsn)
		->get()
        ;

		$koreg = strtoupper(base_convert($kode_registrasi,32,10));
		
		if(sizeof($fetch) > 0){
			//ketemu sekolahnya

			if($koreg === $fetch[0]->kode_registrasi){
				//koregnya sama
				$login = true;
				$pesan = 'Sekolah ditemukan di dapodik dan koreg sesuai';
				$rows = $fetch;
			}else{
				//koregnya tidak sama
				$pesan = 'Kode registrasi tidak sesuai';
				$rows = [];
			}
			
		}else{
			//nggak ketemu usernya
			$pesan = 'Sekolah tidak ditemukan di dapodik';
			$rows = [];
		}

		return response(
            [
				'sukses' => $login,
				'pesan' => $pesan,
				'rows' => $rows,
				'kode_registrasi' => $koreg
            ],
            200
        );

	}

    public function getWilayah(Request $request){
			$kode_wilayah = $request->input('kode_wilayah') ? $request->input('kode_wilayah') : null;
			$id_level_wilayah = $request->input('id_level_wilayah') ? $request->input('id_level_wilayah') : null;
			$mst_kode_wilayah = $request->input('mst_kode_wilayah') ? $request->input('mst_kode_wilayah') : null;
			$skip = $request->input('skip') ? $request->input('skip') : 0;
			$take = $request->input('take') ? $request->input('take') : 50;

			if(!Cache::get('getWilayah_'.$kode_wilayah.$id_level_wilayah.$mst_kode_wilayah.$skip.$take.date('Y-m-d'))){

				$fetch = DB::connection('pgsql')->table(DB::raw("ref.mst_wilayah"))
				// $fetch = DB::connection('sqlsrv')->table(DB::raw("ref.mst_wilayah"))
				->leftJoin(DB::raw("ref.mst_wilayah as induk"), 'induk.kode_wilayah','=', 'ref.mst_wilayah.mst_kode_wilayah')
				->leftJoin(DB::raw("ref.mst_wilayah as induk2"), 'induk2.kode_wilayah','=', 'induk.mst_kode_wilayah')
				->whereNull('ref.mst_wilayah.expired_date')
				->select(
					'ref.mst_wilayah.*',
					'induk.nama as induk',
					'induk.id_level_wilayah as id_level_wilayah_induk'
				)
				;
		
				if($kode_wilayah && !$mst_kode_wilayah && !$id_level_wilayah){
					$fetch->where('ref.mst_wilayah.kode_wilayah','=',DB::raw("'".$kode_wilayah."'"));
				}
		
				if($id_level_wilayah){
					switch ($id_level_wilayah) {
						case 1:
							$fetch->where(DB::raw('trim(ref.mst_wilayah.mst_kode_wilayah)'),'=','000000');
							break;
						case 3:
						case 2:
							$fetch->where(DB::raw('trim(ref.mst_wilayah.mst_kode_wilayah)'),'=',$mst_kode_wilayah);
							break;
						case 4:
							$fetch->where(DB::raw('trim(ref.mst_wilayah.kode_wilayah)'),'=',$mst_kode_wilayah);
							break;
						default:
							$fetch->where(DB::raw('trim(ref.mst_wilayah.mst_kode_wilayah)'),'=','000000');
							break;
					}
				}else if($request->input('ref.mst_wilayah.id_level_wilayah') == "0"){
					$fetch->where(DB::raw('trim(ref.mst_wilayah.mst_kode_wilayah)'),'=','000000');
				}
		
				// return $fetch->toSql();die;
		
				$return = array();
		
				$return['total'] = $fetch->select(DB::raw("sum(1) as total"))->first()->{'total'};
				$return['rows'] = $fetch->select(
					'ref.mst_wilayah.*',
					'induk.nama as induk',
					'induk.kode_wilayah as kode_wilayah_induk',
					'induk.id_level_wilayah as id_level_wilayah_induk',
					'induk2.nama as induk2',
					'induk2.kode_wilayah as kode_wilayah_induk2',
					'induk2.id_level_wilayah as id_level_wilayah_induk2'
				)->skip($skip)->take($take)->orderBy('ref.mst_wilayah.kode_wilayah','ASC')->get();
		
				Cache::put('getWilayah_'.$kode_wilayah.$id_level_wilayah.$mst_kode_wilayah.$skip.$take.date('Y-m-d'), $return);

				return $return;
			}else{
				return Cache::get('getWilayah_'.$kode_wilayah.$id_level_wilayah.$mst_kode_wilayah.$skip.$take.date('Y-m-d'));
			}

    }

    static function getGeoJsonBasic(Request $request){

		$kode_wilayah = $request->input('kode_wilayah');
		$mst_kode_wilayah = $request->input('mst_kode_wilayah') ? $request->input('mst_kode_wilayah') : '000000';
		$id_level_wilayah = $request->input('id_level_wilayah') ? $request->input('id_level_wilayah') : '0';
		
		$str = '[';

		//baru
		switch ($request->input('id_level_wilayah')) {
			case 0:
				$col_wilayah = 's.propinsi';
				$group_wilayah_1 = 's.kode_wilayah_propinsi';
				$group_wilayah_2 = 's.id_level_wilayah_propinsi';
				$group_wilayah_3 = 's.mst_kode_wilayah_propinsi';
				$group_wilayah_4 = '';
				$group_wilayah_4_group = '';
				$params_wilayah ='';
				break;
			case 1:
				$col_wilayah = 's.kabupaten';
				$group_wilayah_1 = 's.kode_wilayah_kabupaten';
				$group_wilayah_2 = 's.id_level_wilayah_kabupaten';
				$group_wilayah_3 = 's.mst_kode_wilayah_kabupaten';
				$group_wilayah_4 = 's.mst_kode_wilayah_propinsi AS mst_kode_wilayah_induk,';
				$group_wilayah_4_group = 's.mst_kode_wilayah_propinsi,';
				$params_wilayah = " AND s.kode_wilayah_propinsi = '".$kode_wilayah."'";
				break;
			case 2:
				$col_wilayah = 's.kecamatan';
				$group_wilayah_1 = 's.kode_wilayah_kecamatan';
				$group_wilayah_2 = 's.id_level_wilayah_kecamatan';
				$group_wilayah_3 = 's.mst_kode_wilayah_kecamatan';
				$group_wilayah_4 = 's.mst_kode_wilayah_kabupaten AS mst_kode_wilayah_induk,';
				$group_wilayah_4_group = 's.mst_kode_wilayah_kabupaten,';
				$params_wilayah = " AND s.kode_wilayah_kabupaten = '".$kode_wilayah."'";
				break;
			default:
				$col_wilayah = 's.propinsi';
				$group_wilayah_1 = 's.kode_wilayah_propinsi';
				$group_wilayah_2 = 's.id_level_wilayah_propinsi';
				$group_wilayah_3 = 's.mst_kode_wilayah_propinsi';
				$group_wilayah_4 = '';
				$group_wilayah_4_group = '';
				$params_wilayah ='';
				break;
		}

        if($request->input('bentuk_pendidikan_id')){
            $arrBentuk = explode("-", $request->input('bentuk_pendidikan_id'));
            $strBentuk = "(";

            for ($iBentuk=0; $iBentuk < sizeof($arrBentuk); $iBentuk++) { 
                if($arrBentuk[$iBentuk] == '13'){
                    $strBentuk .= "13,55,";
                }else if($arrBentuk[$iBentuk] == '5'){
                    $strBentuk .= "5,53,";
                }else if($arrBentuk[$iBentuk] == '6'){
                    $strBentuk .= "6,54,";
                }else{
                    $strBentuk .= $arrBentuk[$iBentuk].",";
                }
            }

            $strBentuk = substr($strBentuk, 0, (strlen($strBentuk)-1));
            $strBentuk .= ")";

            // return $strBentuk;
            $param_bentuk = "AND s.bentuk_pendidikan_id IN ".$strBentuk;

            // return $param_bentuk;die;
        }else{
            $param_bentuk = "";
        }

		// $sql = "SELECT
		// 		{$col_wilayah} AS nama,
		// 		{$group_wilayah_1} AS kode_wilayah,
		// 		{$group_wilayah_2} AS id_level_wilayah,
		// 		{$group_wilayah_3} AS mst_kode_wilayah,
		// 		{$group_wilayah_4}
		// 		sum(s.pd) as pd,
		// 		sum(s.guru) as ptk,
		// 		sum(s.guru + s.pegawai) as ptk_total,
		// 		sum(s.pegawai) as pegawai,
		// 		sum(s.rombel) as rombel,
		// 		sum(1) as sekolah
		// 	FROM
		// 		rekap_sekolah s
		// 	where 
		// 		s.semester_id = ".($request->input('semester_id') ? $request->input('semester_id') : '20201')."
		// 		{$param_bentuk}
		// 		{$params_wilayah}
		// 		AND s.soft_delete = 0
		// 	GROUP BY
		// 		{$group_wilayah_1},
		// 		{$group_wilayah_2},
		// 		{$group_wilayah_3},
		// 		{$group_wilayah_4_group}
		// 		{$col_wilayah}";

		// // return $sql;die;
        // $fetch = DB::connection('sqlsrv_2')->select(DB::raw($sql));

		$fetch = DB::connection('sqlsrv')->table(DB::raw("ref.mst_wilayah with(nolock)"))
        ->whereNull('expired_date')
        ;

        if($kode_wilayah && !$mst_kode_wilayah && !$id_level_wilayah){
            $fetch->where('kode_wilayah','=',DB::raw("'".$kode_wilayah."'"));
        }

		if($id_level_wilayah){
            switch ($id_level_wilayah) {
                case 1:
                    $fetch->where('mst_kode_wilayah','=','000000');
                    break;
                case 3:
                case 2:
                    $fetch->where('mst_kode_wilayah','=',$mst_kode_wilayah);
                    break;
                default:
                    $fetch->where('mst_kode_wilayah','=','000000');
                    break;
            }
        }else if($request->input('id_level_wilayah') == "0"){
            $fetch->where('mst_kode_wilayah','=','000000');
        }

		$fetch = $fetch->get();

        // return $fetch;die;
		// return json_encode($return);die;
        // $host = '223.27.152.200:640';
        
		$host = 'validasi.dikdasmen.kemdikbud.go.id';
		// $host = '118.98.166.44';
        
        // $host = 'validasi.dikdasmen.kemdikbud.go.id';

		foreach ($fetch as $rw) {

            $rw = (array)$rw;

			$geometry = @file_get_contents('http://'.$host.'/geoNew/'.substr($rw['kode_wilayah'],0,6).'.txt', true);

			if(substr($geometry, 0, 4) == '[[[['){
				$geometry = substr($geometry, 1, strlen($geometry)-2);
			}

			if(!array_key_exists('mst_kode_wilayah_induk', $rw) ){
				$induk = null;
			}else{
				$induk = $rw['mst_kode_wilayah_induk'];
			}

			$str .= '{
			    "type": "Feature",
			    "geometry": {
			        "type": "MultiPolygon",
			        "coordinates": ['.$geometry.']
			    },
			    "properties": {
			        "kode_wilayah": "'.substr($rw['kode_wilayah'],0,6).'",
			        "id_level_wilayah": "'.$rw['id_level_wilayah'].'",
			        "mst_kode_wilayah": "'.$rw['mst_kode_wilayah'].'"
			    }
			},';

		}

		$str = substr($str,0,(strlen($str)-1));

		$str .= ']';
		
		return $str;
		
	}

	static function getGeoJsonWilayah(Request $request){
		// return "oke";die;
		$kode_wilayah = $request->kode_wilayah ? trim($request->kode_wilayah) : '000000';
		$nama = $request->nama ? $request->nama : '-';

		if(!Cache::get('getGeoJsonWilayah_'.$kode_wilayah.$nama.date('Y-m-d'))){

			$str = '[';
	
			// $host = 'validasi.dikdasmen.kemdikbud.go.id';
			$host = '118.98.166.44';
			// $host = '10.1.9.165';
			$geometry = @file_get_contents('http://'.$host.'/geoNew/'.substr($kode_wilayah,0,6).'.txt', true);
	
			if(substr($geometry, 0, 4) == '[[[['){
				$geometry = substr($geometry, 1, strlen($geometry)-2);
			}
	
			//datanya
			// $sql = "select * from (
			// select 
			// 	kode_provinsi,  
			// 	provinsi,
			// 	ROUND((CASE WHEN sekolah_total > 0 THEN ((sekolah_total - sekolah_total_tidak_ada_listrik) / cast(sekolah_total as float) * 100) ELSE 0 END),2) as persen_sekolah_listrik_total,
			// 	ROUND((CASE WHEN sekolah_total > 0 THEN ((sekolah_total - sekolah_total_tidak_ada_internet) / cast(sekolah_total as float) * 100) ELSE 0 END),2) as persen_sekolah_internet_total,
			// 	ROUND((CASE WHEN sekolah_total > 0 THEN (sekolah_total_tidak_ada_listrik / cast(sekolah_total as float) * 100) ELSE 0 END),2) as persen_sekolah_tidak_ada_listrik_total,
			// 	ROUND((CASE WHEN sekolah_total > 0 THEN (sekolah_total_tidak_ada_internet / cast(sekolah_total as float) * 100) ELSE 0 END),2) as persen_sekolah_tidak_ada_internet_total,
			// 	null as '-'
			// from (
			// SELECT
			// 	kode_provinsi,
			// 	provinsi,
			// 	SUM ( CASE WHEN bentuk_pendidikan_id IN ( 1, 2, 3, 4, 5, 53, 6, 54, 13, 55, 15, 7, 8, 14, 29 ) THEN 1 ELSE 0 END ) AS sekolah_total,
			// 	SUM ( CASE WHEN bentuk_pendidikan_id IN ( 1, 2, 3, 4 ) THEN 1 ELSE 0 END ) AS sekolah_paud,
			// 	SUM ( CASE WHEN bentuk_pendidikan_id IN ( 5, 53 ) THEN 1 ELSE 0 END ) AS sekolah_sd,
			// 	SUM ( CASE WHEN bentuk_pendidikan_id IN ( 6, 54 ) THEN 1 ELSE 0 END ) AS sekolah_smp,
			// 	SUM ( CASE WHEN bentuk_pendidikan_id IN ( 13, 55 ) THEN 1 ELSE 0 END ) AS sekolah_sma,
			// 	SUM ( CASE WHEN bentuk_pendidikan_id IN ( 15 ) THEN 1 ELSE 0 END ) AS sekolah_smk,
			// 	SUM ( CASE WHEN bentuk_pendidikan_id IN ( 7, 8, 14, 29 ) THEN 1 ELSE 0 END ) AS sekolah_slb,
				
			// 	SUM ( CASE WHEN bentuk_pendidikan_id IN ( 1, 2, 3, 4, 5, 53, 6, 54, 13, 55, 15, 7, 8, 14, 29 ) AND (sumber_listrik = 'Tidak diisi' or sumber_listrik = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_total_tidak_ada_listrik,
			// 	SUM ( CASE WHEN bentuk_pendidikan_id IN ( 1, 2, 3, 4 ) AND (sumber_listrik = 'Tidak diisi' or sumber_listrik = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_paud_tidak_ada_listrik,
			// 	SUM ( CASE WHEN bentuk_pendidikan_id IN ( 5, 53 ) AND (sumber_listrik = 'Tidak diisi' or sumber_listrik = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_sd_tidak_ada_listrik,
			// 	SUM ( CASE WHEN bentuk_pendidikan_id IN ( 6, 54 ) AND (sumber_listrik = 'Tidak diisi' or sumber_listrik = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_smp_tidak_ada_listrik,
			// 	SUM ( CASE WHEN bentuk_pendidikan_id IN ( 13, 55 ) AND (sumber_listrik = 'Tidak diisi' or sumber_listrik = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_sma_tidak_ada_listrik,
			// 	SUM ( CASE WHEN bentuk_pendidikan_id IN ( 15 ) AND (sumber_listrik = 'Tidak diisi' or sumber_listrik = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_smk_tidak_ada_listrik,
			// 	SUM ( CASE WHEN bentuk_pendidikan_id IN ( 7, 8, 14, 29 ) AND (sumber_listrik = 'Tidak diisi' or sumber_listrik = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_slb_tidak_ada_listrik,
				
			// 	SUM ( CASE WHEN bentuk_pendidikan_id IN ( 1, 2, 3, 4, 5, 53, 6, 54, 13, 55, 15, 7, 8, 14, 29 ) AND (akses_internet = 'Tidak Ada' and akses_internet_2 = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_total_tidak_ada_internet,
			// 	SUM ( CASE WHEN bentuk_pendidikan_id IN ( 1, 2, 3, 4 ) AND (akses_internet = 'Tidak Ada' and akses_internet_2 = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_paud_tidak_ada_internet,
			// 	SUM ( CASE WHEN bentuk_pendidikan_id IN ( 5, 53 ) AND (akses_internet = 'Tidak Ada' and akses_internet_2 = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_sd_tidak_ada_internet,
			// 	SUM ( CASE WHEN bentuk_pendidikan_id IN ( 6, 54 ) AND (akses_internet = 'Tidak Ada' and akses_internet_2 = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_smp_tidak_ada_internet,
			// 	SUM ( CASE WHEN bentuk_pendidikan_id IN ( 13, 55 ) AND (akses_internet = 'Tidak Ada' and akses_internet_2 = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_sma_tidak_ada_internet,
			// 	SUM ( CASE WHEN bentuk_pendidikan_id IN ( 15 ) AND (akses_internet = 'Tidak Ada' and akses_internet_2 = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_smk_tidak_ada_internet,
			// 	SUM ( CASE WHEN bentuk_pendidikan_id IN ( 7, 8, 14, 29 ) AND (akses_internet = 'Tidak Ada' and akses_internet_2 = 'Tidak Ada') THEN 1 ELSE 0 END ) AS sekolah_slb_tidak_ada_internet
			
			// FROM
			// 	skl.sekolah
			// where kode_provinsi = '{$kode_wilayah}' 
			// GROUP BY
			// 	kode_provinsi,
			// 	provinsi
			// ) aaa
			// ) bbb
			// ORDER BY
			// persen_sekolah_internet_total ASC";
	
			// $fetch = DB::connection('sqlsrv_dm')->select($sql);
	
			//datanya
			// $str .= '{"type": "Feature","geometry": {"type": "MultiPolygon","coordinates": ['.$geometry.']},"properties": {"kode_wilayah": "'.substr($kode_wilayah,0,6).'","nama": "'.$nama.'"}},';
	
			$str .= '{
				"type": "Feature",
				"geometry": {
					"type": "MultiPolygon",
					"coordinates": ['.$geometry.']
				},
				"properties": {
					"kode_wilayah": "'.substr($kode_wilayah,0,6).'",
					"nama": "'.$nama.'"
				}
			},';
	
			$str = substr($str,0,(strlen($str)-1));
	
			$str .= ']';

			Cache::put('getGeoJsonWilayah_'.$kode_wilayah.$nama.date('Y-m-d'), $str);
	
			return $str;
		}else{
			return Cache::get('getGeoJsonWilayah_'.$kode_wilayah.$nama.date('Y-m-d'));
		}


		// $return = array();
		// $return['str'] = $str;
		// $return['data'] = $fetch[0];


		// return $return;
	}



}