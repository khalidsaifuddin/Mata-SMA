// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';

// Import Framework7
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import Framework7-React Plugin
import Framework7React from 'framework7-react';

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';

// Import App Component
import App from '../components/app.jsx';

// Init F7 Vue Plugin
Framework7.use(Framework7React)

//localStorage config
localStorage.setItem('api_base','http://118.98.166.82:8883');
// localStorage.setItem('api_base','http://api.spm.bandungkab.go.id');
// localStorage.setItem('api_base','http://simdikapi:8888');
// 
// localStorage.setItem('wilayah_aplikasi','Kota Palembang');
// localStorage.setItem('kode_wilayah_aplikasi','116000');
// localStorage.setItem('id_level_wilayah_aplikasi','2');
// localStorage.setItem('judul_aplikasi','SPM Sekolah');
// localStorage.setItem('sub_judul_aplikasi','Disdik Kota Palembang');
// localStorage.setItem('tema_warna_aplikasi','orange-1');
// localStorage.setItem('kode_aplikasi','SPM');
// localStorage.setItem('jenjang_aplikasi','5-6'); // 5=SD, 6=SMP, 13=SMA, 15=SMK, 29=SLB, 1=PAUD
// localStorage.setItem('versi_aplikasi','2019.11.03');
// localStorage.setItem('semester_id_aplikasi','20191'); // 5=SD, 6=SMP, 13=SMA, 15=SMK, 29=SLB, 1=PAUD
// localStorage.setItem('logo_aplikasi',"https://upload.wikimedia.org/wikipedia/commons/c/c3/Lambang_Kota_Palembang.gif");

// localStorage.setItem('wilayah_aplikasi','Indonesia');
// localStorage.setItem('kode_wilayah_aplikasi','000000');
// localStorage.setItem('id_level_wilayah_aplikasi','0');
// localStorage.setItem('judul_aplikasi','Rapor Dapodik');
// localStorage.setItem('tema_warna_aplikasi','biru-1');
// localStorage.setItem('sub_judul_aplikasi','Ditjen Dikdasmen');
// localStorage.setItem('kode_aplikasi','RAPORDAPODIK');
// localStorage.setItem('jenjang_aplikasi','5-6-13-15-29'); // 5=SD, 6=SMP, 13=SMA, 15=SMK, 29=SLB, 1=PAUD
// localStorage.setItem('versi_aplikasi','2020.01.01');
// localStorage.setItem('semester_id_aplikasi','20191'); // 5=SD, 6=SMP, 13=SMA, 15=SMK, 29=SLB, 1=PAUD
// localStorage.setItem('logo_aplikasi',"https://www.kemdikbud.go.id/main/files/large/83790f2b43f00be");

// localStorage.setItem('judul_aplikasi','Simdik Palembang');
// localStorage.setItem('sub_judul_aplikasi','Disdik Kota Palembang');
// localStorage.setItem('kode_aplikasi','SIMDIK');
// localStorage.setItem('tema_warna_aplikasi','biru-1');
// // localStorage.setItem('kode_aplikasi','RAPORDAPODIK');
// localStorage.setItem('kode_aplikasi','SIMDIK');
// localStorage.setItem('wilayah_aplikasi','Kota Palembang');
// localStorage.setItem('kode_wilayah_aplikasi','116000');
// localStorage.setItem('id_level_wilayah_aplikasi','2');
// localStorage.setItem('jenjang_aplikasi','5-6-13-15-29'); // 5=SD, 6=SMP, 13=SMA, 15=SMK, 29=SLB, 1=PAUD
// localStorage.setItem('semester_id_aplikasi','20191'); // 5=SD, 6=SMP, 13=SMA, 15=SMK, 29=SLB, 1=PAUD
// localStorage.setItem('versi_aplikasi','2020.01.01');
// localStorage.setItem('logo_aplikasi',"https://upload.wikimedia.org/wikipedia/commons/c/c3/Lambang_Kota_Palembang.gif");

localStorage.setItem('judul_aplikasi','Mata SMA');
localStorage.setItem('tema_warna_aplikasi','biru-1');
localStorage.setItem('sub_judul_aplikasi','Aplikasi Manajemen Data Direktorat SMA');
localStorage.setItem('kode_aplikasi','SIMDIK');
localStorage.setItem('jenjang_aplikasi','13'); // 5=SD, 6=SMP, 13=SMA, 15=SMK, 29=SLB, 1=PAUD
localStorage.setItem('versi_aplikasi','2021.07');
localStorage.setItem('semester_id_aplikasi','20202'); 
localStorage.setItem('logo_aplikasi',"https://www.kemdikbud.go.id/main/files/large/83790f2b43f00be");
localStorage.setItem('harus_login', "N");

if(!localStorage.getItem('kode_wilayah_aplikasi')){
  localStorage.setItem('kode_wilayah_aplikasi','000000');
  localStorage.setItem('id_level_wilayah_aplikasi','0');
  localStorage.setItem('wilayah_aplikasi','Indonesia');
}


// localStorage.setItem('judul_aplikasi','Sirada Lumajang');
// localStorage.setItem('judul_aplikasi_panjang','Sistem Rapor Dapodik Kab.Lumajang');
// localStorage.setItem('sub_judul_aplikasi','Dinas Pendidikan Kabupaten Lumajang');
// localStorage.setItem('tema_warna_aplikasi','biru-1');
// localStorage.setItem('kode_aplikasi','SIMDIK');
// localStorage.setItem('versi_aplikasi','2020.04.01');
// localStorage.setItem('wilayah_aplikasi','Kabupaten Lumajang');
// localStorage.setItem('kode_wilayah_aplikasi','052100');
// localStorage.setItem('id_level_wilayah_aplikasi','2');
// localStorage.setItem('jenjang_aplikasi','5-6-13-15-29'); // 5=SD, 6=SMP, 13=SMA, 15=SMK, 29=SLB, 1=PAUD
// localStorage.setItem('semester_id_aplikasi','20201'); // 5=SD, 6=SMP, 13=SMA, 15=SMK, 29=SLB, 1=PAUD
// localStorage.setItem('logo_aplikasi', "https://upload.wikimedia.org/wikipedia/commons/f/f4/Lambang_Kabupaten_Lumajang.png");
// localStorage.setItem('harus_login', "N");

// // 020800  
// localStorage.setItem('judul_aplikasi','Sadetik Kab.Bandung');
// localStorage.setItem('sub_judul_aplikasi','Sabilulungan Data dan Statistik Pendidikan Kabupaten Bandung');
// localStorage.setItem('kode_aplikasi','SIMDIK');
// localStorage.setItem('tema_warna_aplikasi','biru-1');
// // localStorage.setItem('kode_aplikasi','RAPORDAPODIK');
// localStorage.setItem('kode_aplikasi','SIMDIK');
// localStorage.setItem('wilayah_aplikasi','Kab. Bandung');
// localStorage.setItem('kode_wilayah_aplikasi','020800');
// localStorage.setItem('id_level_wilayah_aplikasi','2');
// localStorage.setItem('jenjang_aplikasi','5-6-13-15-29-1-2-3-4-7-8-14-26-27-40'); // 5=SD, 6=SMP, 13=SMA, 15=SMK, 29=SLB, 1=PAUD
// localStorage.setItem('semester_id_aplikasi','20201'); // 5=SD, 6=SMP, 13=SMA, 15=SMK, 29=SLB, 1=PAUD
// localStorage.setItem('versi_aplikasi','2020.01.01');
// // localStorage.setItem('logo_aplikasi', "/static/icons/logo.png");
// localStorage.setItem('logo_aplikasi', "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Lambang_Kabupaten_Bandung%2C_Jawa_Barat%2C_Indonesia.svg/1200px-Lambang_Kabupaten_Bandung%2C_Jawa_Barat%2C_Indonesia.svg.png");
// localStorage.setItem('logo_aplikasi_2', "static/icons/logo.png");
// localStorage.setItem('harus_login', "N");

// localStorage.setItem('judul_aplikasi','SPM Kab. Bandung');
// localStorage.setItem('judul_aplikasi_panjang','SPM Pendidikan Kab. Bandung');
// localStorage.setItem('sub_judul_aplikasi','Dinas Pendidikan Kab. Bandung');
// localStorage.setItem('kode_aplikasi','SPM');
// localStorage.setItem('tema_warna_aplikasi','biru-1');
// localStorage.setItem('wilayah_aplikasi','Kab. Bandung');
// localStorage.setItem('kode_wilayah_aplikasi','020800');
// localStorage.setItem('id_level_wilayah_aplikasi','2');
// localStorage.setItem('jenjang_aplikasi','5-6-13-15-29'); // 5=SD, 6=SMP, 13=SMA, 15=SMK, 29=SLB, 1=PAUD
// localStorage.setItem('semester_id_aplikasi','20191'); // 5=SD, 6=SMP, 13=SMA, 15=SMK, 29=SLB, 1=PAUD
// localStorage.setItem('versi_aplikasi','2020.06.01');
// localStorage.setItem('logo_aplikasi', "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Lambang_Kabupaten_Bandung%2C_Jawa_Barat%2C_Indonesia.svg/1200px-Lambang_Kabupaten_Bandung%2C_Jawa_Barat%2C_Indonesia.svg.png");


// // // 026100
// localStorage.setItem('judul_aplikasi','Simdik Bogor');
// localStorage.setItem('sub_judul_aplikasi','Dinas Pendidikan Kota Bogor');
// localStorage.setItem('kode_aplikasi','SIMDIK');
// localStorage.setItem('tema_warna_aplikasi','biru-1');
// // localStorage.setItem('kode_aplikasi','RAPORDAPODIK');
// localStorage.setItem('kode_aplikasi','SIMDIK');
// localStorage.setItem('wilayah_aplikasi','Kota Bogor');
// localStorage.setItem('kode_wilayah_aplikasi','026100');
// localStorage.setItem('id_level_wilayah_aplikasi','2');
// localStorage.setItem('jenjang_aplikasi','5-6-13-15-29-1-2-3-4-7-8-14-26-27-40'); // 5=SD, 6=SMP, 13=SMA, 15=SMK, 29=SLB, 1=PAUD
// localStorage.setItem('semester_id_aplikasi','20192'); // 5=SD, 6=SMP, 13=SMA, 15=SMK, 29=SLB, 1=PAUD
// localStorage.setItem('versi_aplikasi','2021.05.01');
// localStorage.setItem('logo_aplikasi',"https://kotabogor.go.id/uploads/images/logokotabogor.gif");
// localStorage.setItem('harus_login', "N");


// // 040000
// localStorage.setItem('judul_aplikasi','Simdik Jogjakarta');
// localStorage.setItem('sub_judul_aplikasi','Disdik Prov. Jogjakarta');
// localStorage.setItem('kode_aplikasi','SIMDIK');
// localStorage.setItem('tema_warna_aplikasi','biru-1');
// // localStorage.setItem('kode_aplikasi','RAPORDAPODIK');
// localStorage.setItem('kode_aplikasi','SIMDIK');
// localStorage.setItem('wilayah_aplikasi','Prov Jogjakarta');
// localStorage.setItem('kode_wilayah_aplikasi','040000');
// localStorage.setItem('id_level_wilayah_aplikasi','1');
// localStorage.setItem('jenjang_aplikasi','5-6-13-15-29'); // 5=SD, 6=SMP, 13=SMA, 15=SMK, 29=SLB, 1=PAUD
// localStorage.setItem('semester_id_aplikasi','20191'); // 5=SD, 6=SMP, 13=SMA, 15=SMK, 29=SLB, 1=PAUD
// localStorage.setItem('versi_aplikasi','2020.02.01');
// localStorage.setItem('logo_aplikasi',"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Coat_of_arms_of_Yogyakarta.svg/1200px-Coat_of_arms_of_Yogyakarta.svg.png");

// // 031000  
// localStorage.setItem('judul_aplikasi','Simdik Kab. Klaten');
// localStorage.setItem('sub_judul_aplikasi','Disdik Kab. Klaten');
// localStorage.setItem('kode_aplikasi','SIMDIK');
// localStorage.setItem('tema_warna_aplikasi','biru-1');
// // localStorage.setItem('kode_aplikasi','RAPORDAPODIK');
// localStorage.setItem('kode_aplikasi','SIMDIK');
// localStorage.setItem('wilayah_aplikasi','Kab. Klaten');
// localStorage.setItem('kode_wilayah_aplikasi','031000');
// localStorage.setItem('id_level_wilayah_aplikasi','2');
// localStorage.setItem('jenjang_aplikasi','5-6-13-15-29'); // 5=SD, 6=SMP, 13=SMA, 15=SMK, 29=SLB, 1=PAUD
// localStorage.setItem('semester_id_aplikasi','20191'); // 5=SD, 6=SMP, 13=SMA, 15=SMK, 29=SLB, 1=PAUD
// localStorage.setItem('versi_aplikasi','2020.01.01');
// localStorage.setItem('logo_aplikasi', "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/LOGO_KABUPATEN_KLATEN.png/588px-LOGO_KABUPATEN_KLATEN.png");

// localStorage.setItem('initial_route','/DataPokokSekolah/');
// localStorage.setItem('show_toolbar','1');
// localStorage.setItem('google_api','517608616189-ecl7ou78k1guaksu8oh8i1rlmonf6uho.apps.googleusercontent.com');
localStorage.setItem('google_api','408984113206-5qrhpn45hsts6tr0ibfn90ve1rcj4kdh.apps.googleusercontent.com');

document.title = localStorage.getItem('judul_aplikasi') + " - " + localStorage.getItem('sub_judul_aplikasi');

if(localStorage.getItem('sudah_login') === null ||localStorage.getItem('sudah_login') === ''){
  localStorage.setItem('sudah_login', '0');
}

if(localStorage.getItem('riwayat_kata_kunci') === null){
  localStorage.setItem('riwayat_kata_kunci', '');
}

// localStorage.setItem('device', 'web');
// localStorage.setItem('device', 'android');

// Mount React App
ReactDOM.render(
  <Provider store={store}>
    {React.createElement(App)}
  </Provider>,
  document.getElementById('app'),
);