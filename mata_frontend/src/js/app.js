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

localStorage.setItem('google_api','408984113206-5qrhpn45hsts6tr0ibfn90ve1rcj4kdh.apps.googleusercontent.com');

document.title = localStorage.getItem('judul_aplikasi') + " - " + localStorage.getItem('sub_judul_aplikasi');

if(localStorage.getItem('sudah_login') === null ||localStorage.getItem('sudah_login') === ''){
  localStorage.setItem('sudah_login', '0');
}

if(localStorage.getItem('riwayat_kata_kunci') === null){
  localStorage.setItem('riwayat_kata_kunci', '');
}

// Mount React App
ReactDOM.render(
  <Provider store={store}>
    {React.createElement(App)}
  </Provider>,
  document.getElementById('app'),
);