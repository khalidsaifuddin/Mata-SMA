<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class CustomQueryController extends Controller
{

    public function getKategoriCustomQueryDatamart(Request $request){
        $nama_tabel = $request->nama_tabel ? $request->nama_tabel : 'ptk';

        $sql = "SELECT 
                    *,
                    COLUMN_NAME as nama,
                    COLUMN_NAME as keterangan
                FROM 
                    INFORMATION_SCHEMA.COLUMNS
                WHERE 
                    TABLE_NAME = '".$nama_tabel."'
                AND TABLE_SCHEMA = 'dbo'
                ORDER BY 
                    ORDINAL_POSITION
                ";
        
        // return $sql;die;
                
        $fetch = DB::connection('sqlsrv_dm')->select($sql);

        return $fetch;
    }

    public function getKategoriCustomQueryPesertaDidik(Request $request){
        $sql = "SELECT 
                    *,
                    COLUMN_NAME as nama,
                    COLUMN_NAME as keterangan
                FROM 
                    INFORMATION_SCHEMA.COLUMNS
                WHERE 
                    TABLE_NAME = 'peserta_didik'
                AND TABLE_SCHEMA = 'dbo'
                ORDER BY 
                    ORDINAL_POSITION
                ";
        
        // return $sql;die;
                
        $fetch = DB::connection('sqlsrv_dm')->select($sql);

        return $fetch;
    }

    public function getKategoriCustomQuerySekolah(Request $request){
        $sql = "SELECT 
                    *
                FROM 
                    INFORMATION_SCHEMA.COLUMNS
                WHERE 
                    TABLE_NAME = 'rekap_sekolah'
                AND TABLE_SCHEMA = 'dbo'
                ORDER BY 
                    ORDINAL_POSITION
                ";
        
        // return $sql;die;
                
        $fetch = DB::connection('sqlsrv_2')->select($sql);

        return $fetch;
    }

    public function getKategoriCustomQuery(Request $request){
        $kategori = $request->kategori ? $request->kategori : null;

        $fetch = DB::connection('sqlsrv_2')
        ->table('custom_query')
        ->where('soft_delete','=',0)
        ->orderBy('no_urut', 'ASC')
        // ->where('rumpun_kolom','=',$kategori)
        // ->get()
        ;

        if($kategori){
            $fetch->where('rumpun_kolom','=',$kategori);
        }

        return $fetch->get();
    }

    public function runCustomQueryExcel(Request $request){
        $data = json_decode($request->data);

        $request->merge(['data' => (array)$data]);
        // return $request;die;

        $data = self::runCustomQuery($request);

        // return $data;
        return view('excel/UnduhExcelGeneral', ['return' => $data, 'judul' => 'Custom Query Sekolah', 'sub_judul' => "Tanggal: ".date('Y-m-d H:i:s')]);
    }
    
    static function runCustomQuery(Request $request){
        $data = $request->data;
        $semester_id = $request->semester_id ? $request->semester_id : '20202';
        $bentuk_pendidikan_id = $request->bentuk_pendidikan_id ? $request->bentuk_pendidikan_id : 13;
        $kode_wilayah = $request->kode_wilayah ? $request->kode_wilayah : null;
        $id_level_wilayah = $request->id_level_wilayah ? $request->id_level_wilayah : null;
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 20;

        $fetch = DB::connection('sqlsrv_2')
        ->table(DB::raw('rekap_sekolah with(nolock)'))
        ->leftJoin(DB::raw('sekolah as sekolah with(nolock)'),'sekolah.sekolah_id','=','rekap_sekolah.sekolah_id')
        // ->leftJoin(DB::raw('validasi2001.rekap.rekap_rapor_dapodik_sekolah as rapor with(nolock)'),'rapor.sekolah_id','=','rekap_sekolah.sekolah_id')
        ->leftJoin(DB::raw('validasi2001.rekap.rekap_rapor_dapodik_sekolah as rapor with(nolock)'), function ($join) use ($semester_id) {
            $join->on('rapor.sekolah_id','=','rekap_sekolah.sekolah_id')
                ->on('rapor.semester_id','=', DB::raw("".$semester_id.""))
                ->on('rapor.soft_delete','=', DB::raw("0"))
                ;
        })
        ->where('rekap_sekolah.semester_id','=', DB::raw("".$semester_id.""))
        ->where('rekap_sekolah.soft_delete','=', DB::raw("0"))
        // ->where('rapor.semester_id','=', DB::raw("".$semester_id.""))
        // ->where('rapor.soft_delete','=', DB::raw("0"))
        // ->where('rekap_sekolah.bentuk_pendidikan_id','=', DB::raw("".$bentuk_pendidikan_id.""))
        ;

        if($bentuk_pendidikan_id){
            $fetch->whereIn('rekap_sekolah.bentuk_pendidikan_id', array(13,55));
        }else{
            $fetch->where('rekap_sekolah.bentuk_pendidikan_id','=', DB::raw("".$bentuk_pendidikan_id.""));
        }

        if($kode_wilayah && $id_level_wilayah){
            switch ($id_level_wilayah) {
                case 0:
                    //do nothing
                    break;
                case 1:
                    $fetch->where('rekap_sekolah.kode_wilayah_propinsi','=',$kode_wilayah);
                    break;
                case 2:
                    $fetch->where('rekap_sekolah.kode_wilayah_kabupaten','=',$kode_wilayah);
                    break;
                case 3:
                    $fetch->where('rekap_sekolah.kode_wilayah_kecamatan','=',$kode_wilayah);
                    break;
                default:
                    //do nothing
                    break;
            }
        }
        
        $arrSelect = array(
            'rekap_sekolah.sekolah_id'
            // ,
            // DB::raw("(CASE WHEN rekap_sekolah.status_sekolah = 1 then 'NEGERI' else 'SWASTA' end) as status")
        );

        $data = (array)$data;
        
        for ($i=0; $i < sizeof($data); $i++) {
            if(is_array($data[$i])){
                array_push($arrSelect, $data[$i]['kode_kolom']);
                
                if(array_key_exists('parameter_value',$data[$i]) && $data[$i]['parameter_value'] != '-'){
    
                    switch ($data[$i]['parameter']) {
                        case 'EQUALS':
                            $param_str = '=';
                            $fetch->where($data[$i]['kode_kolom'], $param_str, DB::raw("'".$data[$i]['parameter_value']."'"));
                            break;
                        case 'MORE_THAN':
                            $param_str = '>';
                            $fetch->where($data[$i]['kode_kolom'], $param_str, DB::raw("".$data[$i]['parameter_value'].""));
                            break;
                        case 'LESS_THAN':
                            $param_str = '<';
                            $fetch->where($data[$i]['kode_kolom'], $param_str, DB::raw("".$data[$i]['parameter_value'].""));
                            break;
                        case 'CONTAINS':
                            $param_str = 'like';
                            $fetch->where($data[$i]['kode_kolom'], $param_str, DB::raw("'%".$data[$i]['parameter_value']."%'"));
                            break;
                        default:
                            $param_str = '=';
                            $fetch->where($data[$i]['kode_kolom'], $param_str, DB::raw("'".$data[$i]['parameter_value']."'"));
                            break;
                    }
    
                }
            } else {
                array_push($arrSelect, $data[$i]->{'kode_kolom'});

                if(property_exists($data[$i], 'parameter_value') && $data[$i]->{'parameter_value'} != '-'){
    
                    switch ($data[$i]->{'parameter'}) {
                        case 'EQUALS':
                            $param_str = '=';
                            $fetch->where($data[$i]->{'kode_kolom'}, $param_str, DB::raw("'".$data[$i]->{'parameter_value'}."'"));
                            break;
                        case 'MORE_THAN':
                            $param_str = '>';
                            $fetch->where($data[$i]->{'kode_kolom'}, $param_str, DB::raw("".$data[$i]->{'parameter_value'}.""));
                            break;
                        case 'LESS_THAN':
                            $param_str = '<';
                            $fetch->where($data[$i]->{'kode_kolom'}, $param_str, DB::raw("".$data[$i]->{'parameter_value'}.""));
                            break;
                        case 'CONTAINS':
                            $param_str = 'like';
                            $fetch->where($data[$i]->{'kode_kolom'}, $param_str, DB::raw("'%".$data[$i]->{'parameter_value'}."%'"));
                            break;
                        default:
                            $param_str = '=';
                            $fetch->where($data[$i]->{'kode_kolom'}, $param_str, DB::raw("'".$data[$i]->{'parameter_value'}."'"));
                            break;
                    }
    
                }
            }


        }

        // return $fetch->toSql();die;
        
        $fetch->select($arrSelect);
        
        $return = array();
        $return['total'] = $fetch->count();
        $return['rows'] = $fetch->skip($start)->take($limit)->get();
        
        // return $data;die;
        return $return;

    }

    public function runCustomQueryPesertaDidikExcel(Request $request){
        $data = json_decode($request->data);
        $request->merge(['data' => (array)$data]);
        $data = self::runCustomQueryPesertaDidik($request);

        return view('excel/UnduhExcelGeneral', ['return' => $data, 'judul' => 'Custom Query Peserta Didik', 'sub_judul' => "Tanggal: ".date('Y-m-d H:i:s')]);
    }

    static function runCustomQueryPesertaDidik(Request $request){
        $data = $request->data;
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 20;

        $fetch = DB::connection('sqlsrv_dm')
        ->table(DB::raw('peserta_didik with(nolock)'))
        ;

        $arrSelect = array();

        $data = (array)$data;
        
        for ($i=0; $i < sizeof($data); $i++) {
            if(is_array($data[$i])){
                array_push($arrSelect, $data[$i]['nama']);
                
                if(array_key_exists('parameter_value',$data[$i]) && $data[$i]['parameter_value'] != '-'){
    
                    switch ($data[$i]['parameter']) {
                        case 'EQUALS':
                            $param_str = '=';
                            $fetch->where($data[$i]['nama'], $param_str, DB::raw("'".$data[$i]['parameter_value']."'"));
                            break;
                        case 'MORE_THAN':
                            $param_str = '>';
                            $fetch->where($data[$i]['nama'], $param_str, DB::raw("".$data[$i]['parameter_value'].""));
                            break;
                        case 'LESS_THAN':
                            $param_str = '<';
                            $fetch->where($data[$i]['nama'], $param_str, DB::raw("".$data[$i]['parameter_value'].""));
                            break;
                        case 'CONTAINS':
                            $param_str = 'like';
                            $fetch->where($data[$i]['nama'], $param_str, DB::raw("'%".$data[$i]['parameter_value']."%'"));
                            break;
                        default:
                            $param_str = '=';
                            $fetch->where($data[$i]['nama'], $param_str, DB::raw("'".$data[$i]['parameter_value']."'"));
                            break;
                    }
    
                }
            } else {
                array_push($arrSelect, $data[$i]->{'nama'});

                if(property_exists($data[$i], 'parameter_value') && $data[$i]->{'parameter_value'} != '-'){
    
                    switch ($data[$i]->{'parameter'}) {
                        case 'EQUALS':
                            $param_str = '=';
                            $fetch->where($data[$i]->{'nama'}, $param_str, DB::raw("'".$data[$i]->{'parameter_value'}."'"));
                            break;
                        case 'MORE_THAN':
                            $param_str = '>';
                            $fetch->where($data[$i]->{'nama'}, $param_str, DB::raw("".$data[$i]->{'parameter_value'}.""));
                            break;
                        case 'LESS_THAN':
                            $param_str = '<';
                            $fetch->where($data[$i]->{'nama'}, $param_str, DB::raw("".$data[$i]->{'parameter_value'}.""));
                            break;
                        case 'CONTAINS':
                            $param_str = 'like';
                            $fetch->where($data[$i]->{'nama'}, $param_str, DB::raw("'%".$data[$i]->{'parameter_value'}."%'"));
                            break;
                        default:
                            $param_str = '=';
                            $fetch->where($data[$i]->{'nama'}, $param_str, DB::raw("'".$data[$i]->{'parameter_value'}."'"));
                            break;
                    }
    
                }
            }


        }
        
        $fetch->select($arrSelect);

        // return $fetch->toSql();die;
        
        $return = array();
        $return['total'] = $fetch->count();
        $return['rows'] = $fetch->skip($start)->take($limit)->get();
        
        return $return;

    }

    public function runCustomQueryDatamartExcel(Request $request){
        $data = json_decode($request->data);
        $request->merge(['data' => (array)$data]);
        $data = self::runCustomQueryDatamart($request);

        return view('excel/UnduhExcelGeneral', ['return' => $data, 'judul' => 'Custom Query GTK', 'sub_judul' => "Tanggal: ".date('Y-m-d H:i:s')]);
    }

    static function runCustomQueryDatamart(Request $request){
        $data = $request->data;
        $nama_tabel = $request->nama_tabel ? $request->nama_tabel : 'ptk';
        $start = $request->start ? $request->start : 0;
        $limit = $request->limit ? $request->limit : 20;

        $fetch = DB::connection('sqlsrv_dm')
        ->table(DB::raw($nama_tabel.' with(nolock)'))
        ;

        $arrSelect = array();

        $data = (array)$data;
        
        for ($i=0; $i < sizeof($data); $i++) {
            if(is_array($data[$i])){
                array_push($arrSelect, $data[$i]['nama']);
                
                if(array_key_exists('parameter_value',$data[$i]) && $data[$i]['parameter_value'] != '-'){
    
                    switch ($data[$i]['parameter']) {
                        case 'EQUALS':
                            $param_str = '=';
                            $fetch->where($data[$i]['nama'], $param_str, DB::raw("'".$data[$i]['parameter_value']."'"));
                            break;
                        case 'MORE_THAN':
                            $param_str = '>';
                            $fetch->where($data[$i]['nama'], $param_str, DB::raw("".$data[$i]['parameter_value'].""));
                            break;
                        case 'LESS_THAN':
                            $param_str = '<';
                            $fetch->where($data[$i]['nama'], $param_str, DB::raw("".$data[$i]['parameter_value'].""));
                            break;
                        case 'CONTAINS':
                            $param_str = 'like';
                            $fetch->where($data[$i]['nama'], $param_str, DB::raw("'%".$data[$i]['parameter_value']."%'"));
                            break;
                        default:
                            $param_str = '=';
                            $fetch->where($data[$i]['nama'], $param_str, DB::raw("'".$data[$i]['parameter_value']."'"));
                            break;
                    }
    
                }
            } else {
                array_push($arrSelect, $data[$i]->{'nama'});

                if(property_exists($data[$i], 'parameter_value') && $data[$i]->{'parameter_value'} != '-'){
    
                    switch ($data[$i]->{'parameter'}) {
                        case 'EQUALS':
                            $param_str = '=';
                            $fetch->where($data[$i]->{'nama'}, $param_str, DB::raw("'".$data[$i]->{'parameter_value'}."'"));
                            break;
                        case 'MORE_THAN':
                            $param_str = '>';
                            $fetch->where($data[$i]->{'nama'}, $param_str, DB::raw("".$data[$i]->{'parameter_value'}.""));
                            break;
                        case 'LESS_THAN':
                            $param_str = '<';
                            $fetch->where($data[$i]->{'nama'}, $param_str, DB::raw("".$data[$i]->{'parameter_value'}.""));
                            break;
                        case 'CONTAINS':
                            $param_str = 'like';
                            $fetch->where($data[$i]->{'nama'}, $param_str, DB::raw("'%".$data[$i]->{'parameter_value'}."%'"));
                            break;
                        default:
                            $param_str = '=';
                            $fetch->where($data[$i]->{'nama'}, $param_str, DB::raw("'".$data[$i]->{'parameter_value'}."'"));
                            break;
                    }
    
                }
            }


        }
        
        $fetch->select($arrSelect);

        // return $fetch->toSql();die;
        
        $return = array();
        $return['total'] = $fetch->count();
        $return['rows'] = $fetch->skip($start)->take($limit)->get();
        
        return $return;

    }

}