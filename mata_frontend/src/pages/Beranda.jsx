import React, {Component} from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Toolbar,
  Block,
  Card,
  BlockTitle,
  List,
  ListItem,
  Row,
  Col,
  Button,
  Icon,
  SkeletonText,
  CardHeader,
  CardContent,
  CardFooter,
  Subnavbar,
  Gauge
} from 'framework7-react';

import { Doughnut, Bar, Radar } from 'react-chartjs-2';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';
import TypographyComponent from 'framework7/components/typography/typography';
import { getSPMKabupatenPerKecamatan, getGtkJenisPie } from '../store/actions';

import { Line } from 'react-chartjs-2';

import moment from 'moment';

class Beranda extends Component {

  state = {
    error: null,
    loading: true,
    data: {
      r_kelas: [],
      perpustakaan: []
    },
    dataTabel: {
      r_kelas: [],
      perpustakaan: []
    },
    routeParams: {
      kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi'),
      id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi'),
      tipe: 'chart',
      // sekolah_id: "D25DF326-C2E2-4A12-B6C9-03FD6854252B"
    },
    peringkat_kabupaten:{
        rows:[{
            kode_wilayah: '000000'
        }]
    },
    peringkat_provinsi:{
        rows:[{
            kode_wilayah: '000000'
        }]
    },
    peringkat_sekolah:{
        rows:[{
            sekolah_id: ''
        }]
    },
    sekolah_total: 0,
    pd_total: 0,
    guru_total: 0,
    pegawai_total: 0,
    rombel_total: 0,
    tanggal_rekap_terakhir: '2020-01-01',
    sd_negeri:0,
    sd_swasta:0,
    smp_negeri:0,
    smp_swasta:0,
    sma_negeri:0,
    sma_swasta:0,
    smk_negeri:0,
    smk_swasta:0,
    slb_negeri:0,
    slb_swasta:0
  };

  bulan = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember'
  ]

  formatAngka = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

  backClick = () => {

    let properti = 'beranda';
    // alert('tes');
    // console.log(this.props.f7router.url.replace("/","").replace("/",""));
    // console.log(this.props.tabBar);
    for (var property in this.props.tabBar) {
        // console.log(this.state.tabBar[property]);
        this.props.tabBar[property] = false;
    }
    if(this.props.f7router.url.replace("/","").replace("/","") !== ""){
        properti = this.props.f7router.url.replace("/","").replace("/","");
    }
    this.props.tabBar[properti] = true;

    this.props.setTabActive(this.props.tabBar);
    // console.log(this.props.tabBar.beranda);
}

  componentDidMount = () => {
    if(parseInt(localStorage.getItem('sudah_login')) !== 1 && localStorage.getItem('harus_login') === 'Y'){
        this.$f7router.navigate('/login/');
    }
    // console.log(JSON.parse(localStorage.getItem('user')).kode_wilayah.substring(0,2));
    // console.log(JSON.parse(localStorage.getItem('user')).kode_wilayah.substring(2,4));
    // console.log(JSON.parse(localStorage.getItem('user')).kode_wilayah.substring(4,6));
    // console.log(this.props.tabBar);
    // console.log("/ValidasiData/"+(JSON.parse(localStorage.getItem('user')).kode_wilayah ? (JSON.parse(localStorage.getItem('user')).kode_wilayah.substring(0,2) === '00' ? '0' : (JSON.parse(localStorage.getItem('user')).kode_wilayah.substring(2,4) === '00' ? '1' : (JSON.parse(localStorage.getItem('user')).kode_wilayah.substring(4,6) === '00' ? '3' : '0') ) ) : localStorage.getItem('id_level_wilayah_aplikasi'))+"/"+(JSON.parse(localStorage.getItem('user')).kode_wilayah ? JSON.parse(localStorage.getItem('user')).kode_wilayah : localStorage.getItem('kode_wilayah_aplikasi')))

    // this.$f7router.navigate(localStorage.getItem('initial_route'));
    // console.log(this.$f7router.navigate(localStorage.getItem('initial_route')));
    localStorage.setItem('current_url', this.$f7route.url);

    if(localStorage.getItem('user')){
        if(localStorage.getItem('user') !== ''){
            if( parseInt( JSON.parse( localStorage.getItem('user') ).verified ) === 0 ){
                this.$f7.dialog.confirm('Anda belum dapat menggunakan hak akses pengguna Anda secara penuh sebelum akun pengguna Anda terverifikasi oleh Administrator. Apakah Anda ingin melakukan verifikasi akun pengguna?', 'Informasi', () => {
                    this.$f7router.navigate('/ProfilPengguna');
                });
            } 
        }
    }

    // this.props.setLoading(false);
    // this.props.getRekapSekolahSarpras(this.state.routeParams);
    // this.props.getRekapSekolahSarprasWilayah(this.state.routeParams);
    this.setState({
        ...this.state,
        routeParams: {
            kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi') ? localStorage.getItem('kode_wilayah_aplikasi'): '090000',
            bentuk_pendidikan_id: localStorage.getItem('jenjang_aplikasi'),
            semester_id: localStorage.getItem('semester_id_aplikasi')
        }
    },()=>{
        
        this.props.getWilayah(this.state.routeParams).then((result)=>{

            this.setState({
                ...this.state,
                loading: true,
                nama_wilayah: this.props.wilayah.rows[0].nama,
                routeParams: {
                    mst_kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi') ? localStorage.getItem('kode_wilayah_aplikasi'): '090000',
                    bentuk_pendidikan_id: localStorage.getItem('jenjang_aplikasi'),
                    semester_id: localStorage.getItem('semester_id_aplikasi'),
                    order_by: 'rapor_final'
                    // id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi'),
                    // kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi') ? localStorage.getItem('kode_wilayah_aplikasi'): '090000',
                }
            },()=>{
    
                let rapor_akhir = 0;
                let rapor_pd = 0;
                let rapor_ptk = 0;
                let rapor_sekolah = 0;
                let rapor_rombel = 0;
                let rapor_sarpras = 0;
                let rapor_berkelanjutan = 0;
                let rapor_mutakhir_pd = 0;
                let rapor_mutakhir_ptk = 0;
                let rapor_mutakhir_rombel = 0;
                let rapor_mutakhir_sarpras = 0;
                let rapor_mutakhir = 0;

                let jumlah_total = 0;
                let tanggal = new Date('2020-01-01 00:00:00');

                if(localStorage.getItem('kode_aplikasi') === 'SPM'){

                    this.props.getSPMKabupaten(this.state.routeParams).then((result)=>{
    
                    });
    
                    this.props.getSPMKabupatenPerKecamatan(this.state.routeParams).then((result)=>{
    
                    });
    
                    this.props.getSPMKabupatenPerSekolah(this.state.routeParams).then((result)=>{
    
                    });
                
                }
                
                this.props.getRaporDapodikRadar(this.state.routeParams).then((result)=>{
                    console.log(this.props.rapor_dapodik_radar);
                });

                this.props.getRekapValidasiBeranda(this.state.routeParams).then((result)=>{
                    // console.log(this.props.rapor_dapodik_radar);
                });

                this.props.getRaporDapodikAkuratRadar(this.state.routeParams).then((result)=>{
                    console.log(this.props.rapor_dapodik_akurat_radar);
                });

                this.props.getRaporDapodikMutakhirRadar(this.state.routeParams).then((result)=>{
                    console.log(this.props.rapor_dapodik_akurat_radar);
                });
                
                this.props.getRaporDapodikWilayah(this.state.routeParams).then((result)=>{
                    // console.log(this.props.rapor_dapodik_wilayah);
                    for (let index = 0; index < this.props.rapor_dapodik_wilayah.total; index++) {
                        const element = this.props.rapor_dapodik_wilayah.rows[index];
        
                        // console.log(element);
                        rapor_akhir = rapor_akhir+parseFloat(element.rapor_akhir);
                        rapor_sekolah = rapor_sekolah+parseFloat(element.rapor_sekolah);
                        rapor_pd = rapor_pd+parseFloat(element.rapor_pd);
                        rapor_ptk = rapor_ptk+parseFloat(element.rapor_ptk);
                        rapor_rombel = rapor_rombel+parseFloat(element.rapor_rombel);
                        rapor_sarpras = rapor_sarpras+parseFloat(element.rapor_sarpras);
                        rapor_berkelanjutan = rapor_berkelanjutan+parseFloat(element.rapor_berkelanjutan);
                        rapor_mutakhir_pd = rapor_mutakhir_pd+parseFloat(element.rapor_mutakhir_pd);
                        rapor_mutakhir_ptk = rapor_mutakhir_ptk+parseFloat(element.rapor_mutakhir_ptk);
                        rapor_mutakhir_rombel = rapor_mutakhir_rombel+parseFloat(element.rapor_mutakhir_rombel);
                        rapor_mutakhir_sarpras = rapor_mutakhir_sarpras+parseFloat(element.rapor_mutakhir_sarpras);
                        rapor_mutakhir = rapor_mutakhir+parseFloat(element.rapor_mutakhir);
                        
                        jumlah_total++;
                        // tgl = new Date(element.tanggal_rekap_terakhir);
                        // tanggal = (tanggal.getTime() < tgl.getTime() ? element.tanggal_rekap_terakhir : tanggal.getFullYear());
                        
                    }

                    // console.log(tanggal);
    
                    this.setState({
                        ...this.state,
                        // loading: false,
                        rapor_akhir: (rapor_akhir/jumlah_total).toFixed(2),
                        rapor_sekolah: (rapor_sekolah/jumlah_total).toFixed(2),
                        rapor_pd: (rapor_pd/jumlah_total).toFixed(2),
                        rapor_ptk: (rapor_ptk/jumlah_total).toFixed(2),
                        rapor_rombel: (rapor_rombel/jumlah_total).toFixed(2),
                        rapor_sarpras: (rapor_sarpras/jumlah_total).toFixed(2),
                        rapor_berkelanjutan: (rapor_berkelanjutan/jumlah_total).toFixed(2),
                        rapor_mutakhir_pd: (rapor_mutakhir_pd/jumlah_total).toFixed(2),
                        rapor_mutakhir_ptk: (rapor_mutakhir_ptk/jumlah_total).toFixed(2),
                        rapor_mutakhir_rombel: (rapor_mutakhir_rombel/jumlah_total).toFixed(2),
                        rapor_mutakhir_sarpras: (rapor_mutakhir_sarpras/jumlah_total).toFixed(2),
                        rapor_mutakhir: (rapor_mutakhir/jumlah_total).toFixed(2),
                        rapor_dapodik_wilayah: this.props.rapor_dapodik_wilayah,
                        routeParams: {
                            ...this.state.routeParams,
                            override_wilayah: 1
                        },
                        tanggal_rekap_terakhir: this.props.rapor_dapodik_wilayah.tanggal_rekap_terakhir,
                        peringkat_provinsi: this.props.rapor_dapodik_wilayah
                    },()=>{

                        // console.log(this.state.rapor_berkelanjutan);

                        this.props.getRaporDapodikWilayah(this.state.routeParams).then((result)=>{
                            this.setState({
                                peringkat_kabupaten: this.props.rapor_dapodik_wilayah,
                                routeParams:{
                                    ...this.state.routeParams,
                                    mst_kode_wilayah:null,
                                    limit: 5,
                                    kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi') ? localStorage.getItem('kode_wilayah_aplikasi'): '090000'
                                }
                            },()=>{
                                this.props.getRaporDapodikSekolah(this.state.routeParams).then((result)=>{
                                    this.setState({
                                        peringkat_sekolah: this.props.rapor_dapodik_sekolah,
                                        routeParams:{
                                            ...this.state.routeParams,
                                            id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi'),
                                            kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi') ? localStorage.getItem('kode_wilayah_aplikasi'): '090000',
                                        }
                                    },()=>{

                                        this.props.getRekapSekolahRingkasan(this.state.routeParams).then((result)=>{
                                            // console.log('tes');
                                            // console.log(this.props.rekap_sekolah_ringkasan);
                        
                                            let sekolah_total = 0;
                                            let pd_total = 0;
                                            let guru_total = 0;
                                            let pegawai_total = 0;
                                            let rombel_total = 0;
                        
                                            for (let iRekapSekolah = 0; iRekapSekolah < this.props.rekap_sekolah_ringkasan.rows.length; iRekapSekolah++) {
                                                const element = this.props.rekap_sekolah_ringkasan.rows[iRekapSekolah];
                                                
                                                sekolah_total = sekolah_total+parseInt(element.total);
                                                pd_total = pd_total+parseInt(element.pd_total);
                                                guru_total = guru_total+parseInt(element.guru_total);
                                                pegawai_total = pegawai_total+parseInt(element.pegawai_total);
                                                rombel_total = rombel_total+parseInt(element.rombel_total);
                                            }
                        
                                            this.setState({
                                                sekolah_total: sekolah_total,
                                                pd_total: pd_total,
                                                guru_total: guru_total,
                                                pegawai_total: pegawai_total,
                                                rombel_total: rombel_total
                                                // tanggal_rekap_terakhir: element.tanggal_rekap_terakhir
                                            },()=>{
                                                
                                                //index pendidikan
                                                this.setState({
                                                    routeParams: {
                                                        kode_wilayah: this.state.routeParams.kode_wilayah
                                                    }
                                                },()=>{
                                                    this.props.getIndexPendidikan(this.state.routeParams).then((result)=>{
                                                        let labels = [];
                                                        let datasets_ipm = [];
                                                        let datasets_hls = [];
                                                        let datasets_rls = [];
                                                        let datasets_amh = [];
                                                        let datasets_apk = [];
                                                        let datasets_apm = [];
                                        
                                                        for (let index = 0; index < result.payload.rows.length; index++) {
                                                            const element = result.payload.rows[index];
                                                            
                                                            labels.push(element.tahun)
                                                            datasets_ipm.push(element.nilai_ipm ? element.nilai_ipm : 0)
                                                            datasets_hls.push(element.nilai_hls ? element.nilai_hls : 0)
                                                            datasets_rls.push(element.nilai_rls ? element.nilai_rls : 0)
                                                            datasets_amh.push(element.nilai_amh ? element.nilai_amh : 0)
                                                            datasets_apk.push(element.nilai_apk ? element.nilai_apk : 0)
                                                            datasets_apm.push(element.nilai_apm ? element.nilai_apm : 0)
                                        
                                                            // datasets.push({
                                                            //     label: 'IPM',
                                                            //     data: [12, 19, 3, 5, 2, 3],
                                                            //     fill: false,
                                                            //     backgroundColor: 'rgb(255, 99, 132)',
                                                            //     borderColor: 'rgba(255, 99, 132, 0.2)',
                                                            // })
                                                        }
                                        
                                                        this.setState({
                                                            loading: false,
                                                            data: {
                                                                ...this.state.data,
                                                                labels: labels,
                                                                datasets: [{
                                                                    label: 'IPM',
                                                                    data: datasets_ipm,
                                                                    fill: false,
                                                                    backgroundColor: 'rgb(255, 99, 132)',
                                                                    borderColor: 'rgba(255, 99, 132, 0.2)',
                                                                },
                                                                {
                                                                    label: 'HLS',
                                                                    data: datasets_hls,
                                                                    fill: false,
                                                                    backgroundColor: 'rgb(0, 99, 0)',
                                                                    borderColor: 'rgba(0, 99, 0, 0.2)',
                                                                },
                                                                {
                                                                    label: 'RLS',
                                                                    data: datasets_rls,
                                                                    fill: false,
                                                                    backgroundColor: 'rgb(255, 99, 0)',
                                                                    borderColor: 'rgba(255, 99, 0, 0.2)',
                                                                },
                                                                {
                                                                    label: 'AMH',
                                                                    data: datasets_amh,
                                                                    fill: false,
                                                                    backgroundColor: 'rgb(0, 0, 0)',
                                                                    borderColor: 'rgba(0, 0, 0, 0.2)',
                                                                },
                                                                {
                                                                    label: 'APK',
                                                                    data: datasets_apk,
                                                                    fill: false,
                                                                    backgroundColor: 'rgb(128, 0, 0)',
                                                                    borderColor: 'rgba(128, 0, 0, 0.2)',
                                                                },
                                                                {
                                                                    label: 'APM',
                                                                    data: datasets_apm,
                                                                    fill: false,
                                                                    backgroundColor: 'rgb(255, 0, 0)',
                                                                    borderColor: 'rgba(255, 0, 0, 0.2)',
                                                                }]
                                                            },
                                                            
                                                        })
                                                    })
                                                });

                                            });
                                        });
                        
                                        this.props.getRekapSekolahTotal(this.state.routeParams).then((result)=>{
                                            // console.log(this.props.rekap_sekolah_total)

                                            let sd_negeri = 0
                                            let sd_swasta = 0
                                            let smp_negeri = 0
                                            let smp_swasta = 0
                                            let sma_negeri = 0
                                            let sma_swasta = 0
                                            let smk_negeri = 0
                                            let smk_swasta = 0
                                            let slb_negeri = 0
                                            let slb_swasta = 0

                                            for (let index = 0; index < this.props.rekap_sekolah_total.rows.length; index++) {
                                                const element = this.props.rekap_sekolah_total.rows[index]

                                                if(parseInt(element.bentuk_pendidikan_id) === 5){
                                                    sd_negeri = element.negeri
                                                    sd_swasta = element.swasta

                                                    console.log(element.negeri)
                                                }
                                                
                                                if(parseInt(element.bentuk_pendidikan_id) === 6){
                                                    smp_negeri = element.negeri
                                                    smp_swasta = element.swasta
                                                }
                                                
                                                if(parseInt(element.bentuk_pendidikan_id) === 13){
                                                    sma_negeri = element.negeri
                                                    sma_swasta = element.swasta
                                                }
                                                
                                                if(parseInt(element.bentuk_pendidikan_id) === 15){
                                                    smk_negeri = element.negeri
                                                    smk_swasta = element.swasta
                                                }
                                                
                                                if(parseInt(element.bentuk_pendidikan_id) === 29){
                                                    slb_negeri = element.negeri
                                                    slb_swasta = element.swasta
                                                }
                                                
                                            }

                                            this.setState({
                                                sd_negeri:sd_negeri,
                                                sd_swasta:sd_swasta,
                                                smp_negeri:smp_negeri,
                                                smp_swasta:smp_swasta,
                                                sma_negeri:sma_negeri,
                                                sma_swasta:sma_swasta,
                                                smk_negeri:smk_negeri,
                                                smk_swasta:smk_swasta,
                                                slb_negeri:slb_negeri,
                                                slb_swasta:slb_swasta
                                            },()=>{
                                                this.props.getRekapPesertaDidikRingkasan({
                                                    ...this.state.routeParams,
                                                    id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi'),
                                                    semester_id: localStorage.getItem('semester_id_aplikasi'),
                                                    tahun_ajaran_id: localStorage.getItem('semester_id_aplikasi').substring(0,4),
                                                    status_sekolah: 99
                                                }).then((result)=>{

                                                    this.props.getRekapGTKRingkasan({
                                                        ...this.state.routeParams,
                                                        id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi'),
                                                        semester_id: localStorage.getItem('semester_id_aplikasi'),
                                                        tahun_ajaran_id: localStorage.getItem('semester_id_aplikasi').substring(0,4),
                                                        status_sekolah: 99
                                                    }).then((result)=>{
                                                        this.setState({
                                                            ...this.state,
                                                            loading: false
                                                        });
                                                    });

                                                    // this.setState({
                                                    //     ...this.state,
                                                    //     loading: false
                                                    // });
                                                });
                                            })
                                        });

                                        this.props.getPesertaDidikTingkatKelasPie(this.state.routeParams).then((result)=>{
                                            console.log(this.props.peserta_didik_tingkat_kelas_pie);
                                        });

                                        this.props.getGtkJenisPie(this.state.routeParams).then((result)=>{
                                            console.log(this.props.gtk_jenis_pie);
                                        });
                                        
                                    })
                                });
                            })
                        });

                    });

                    this.props.setLoading(false);
                });

                
            });
        });
    });

    // console.log(this.props);
    this.props.saveLog({
        judul_aplikasi: localStorage.getItem('judul_aplikasi'),
        kode_wilayah_aplikasi: localStorage.getItem('kode_wilayah_aplikasi'),
        wilayah_aplikasi: localStorage.getItem('wilayah_aplikasi'),
        semester_id_aplikasi: localStorage.getItem('semester_id_aplikasi')
    })
  }

  gantiSemester = (b) => {
    // this.setState({
    //     ...this.state,
    //     routeParams: {
    //         ...this.state.routeParams,
    //         params_wilayah: b.target.getAttribute('name'),
    //         [b.target.getAttribute('name')]: b.target.value
    //     }
    // });
    localStorage.setItem('semester_id_aplikasi', b.target.value);
    // console.log(localStorage.getItem('semester_id_aplikasi'));
  }

  render()
    {
        // console.log(localStorage.getItem('semester_id_aplikasi'));
        const options = {
            scales: {
                yAxes: [
                {
                    ticks: {
                    beginAtZero: true,
                    },
                },
                ],
            },
        }

        return (
          <Page name="Beranda" hideBarsOnScroll>
            {/* Top Navbar */}
            {parseInt(localStorage.getItem('sudah_login')) !== 1 && localStorage.getItem('harus_login') === "N" &&
            <Navbar 
              sliding={false} 
              large 
            >
              <NavLeft>
                <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" className="sideMenuToggle" />
              </NavLeft>
                {/* {localStorage.getItem('logo_aplikasi_2') &&
                <NavTitle sliding>
                    <img src="/static/icons/logo_putih.png" style={{width:'140px'}} />
                </NavTitle>
                }
                {!localStorage.getItem('logo_aplikasi_2') && */}
                <NavTitle sliding>{localStorage.getItem('judul_aplikasi')}</NavTitle>
                {/* } */}
                {!localStorage.getItem('logo_aplikasi_2') &&
                <NavTitleLarge style={{background: '#424242', color:'$ffffff'}}>
                    {localStorage.getItem('judul_aplikasi')}
                </NavTitleLarge>
                }
                {localStorage.getItem('logo_aplikasi_2') &&
                <NavTitleLarge style={{background: '#424242', color:'$ffffff'}}>
                    <img src="/static/icons/logo_putih.png" style={{width:'160px'}} />
                </NavTitleLarge>
                }
              <NavRight>
                <Link iconIos="f7:search" iconAurora="f7:search" iconMd="material:search" href="/DataPokokSekolah/" ></Link>
              </NavRight>
            </Navbar>
            }

            {parseInt(localStorage.getItem('sudah_login')) === 1 &&
            <Navbar 
              sliding={false} 
              large 
            //   style={{background:'#F6BC31'}}
              // backLink="Kembali" 
              // onBackClick={this.backClick}
              // style={{background: '#0063D2'}}
            >
              <NavLeft>
                <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" className="sideMenuToggle" />
              </NavLeft>
              <NavTitle sliding>{localStorage.getItem('judul_aplikasi')}</NavTitle>
                {!localStorage.getItem('logo_aplikasi_2') &&
                <NavTitleLarge style={{background: '#424242', color:'$ffffff'}}>
                    {localStorage.getItem('judul_aplikasi')}
                </NavTitleLarge>
                }
                {localStorage.getItem('logo_aplikasi_2') &&
                <NavTitleLarge style={{background: '#424242', color:'$ffffff'}}>
                    <img src="/static/icons/logo_putih.png" style={{width:'160px'}} />
                </NavTitleLarge>
                }
              {/* <NavTitleLarge>{localStorage.getItem('judul_aplikasi')}</NavTitleLarge> */}
              {/* <NavTitleLarge style={{background: '#424242', color:'$ffffff'}}>{localStorage.getItem('judul_aplikasi')}</NavTitleLarge> */}
              {/* <NavTitleLarge style={{background: '#F6BC31', color:'$ffffff'}}>{localStorage.getItem('judul_aplikasi')}</NavTitleLarge> */}
              {/* <NavTitleLarge style={{background: '#F6BC31', color:(localStorage.getItem('tema_warna_aplikasi') === 'biru-1' ? '#369CF4' : '#FA5F0C')}}>{localStorage.getItem('judul_aplikasi')}</NavTitleLarge> */}
              {/* <NavTitle sliding>{localStorage.getItem('judul_aplikasi')}</NavTitle>
              <NavTitleLarge>{localStorage.getItem('judul_aplikasi')}</NavTitleLarge> */}
              <NavRight>
                <Link iconIos="f7:search" iconAurora="f7:search" iconMd="material:search" href="/DataPokokSekolah/" ></Link>
              </NavRight>
              {/* <Subnavbar sliding>
                <h2>&nbsp;{localStorage.getItem('sub_judul_aplikasi')}</h2>
              </Subnavbar> */}
            </Navbar>
            }
            {/* {localStorage.getItem('kode_aplikasi') !== 'SIMDIK' &&
            <List style={{width:'100%',marginBottom:'0px',marginTop:'0px'}}>
                <ListItem
                title="Semester"
                smartSelect
                // onClick={this.gantiSemester}
                >
                    <select onChange={this.gantiSemester} name="semester_id" defaultValue={localStorage.getItem('semester_id_aplikasi')}>
                        <option value="20191">2019/2020 Ganjil</option>
                    </select>
                </ListItem>
            </List>
            } */}
            {localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' &&
            <>
            <Block strong style={{marginBottom:'8px', marginTop:'8px'}}>
                <Row noGap>
                    <Col width="25" tabletWidth="10">
                        <img src={localStorage.getItem('logo_aplikasi')} style={{width:'80px'}}/>
                    </Col>
                    <Col width="50" tabletWidth="70">
                        <List style={{width:'100%',marginBottom:'0px',marginTop:'0px'}}>
                            <ListItem>
                                <span style={{fontWeight:'bold', fontSize:'25px'}}>{localStorage.getItem('sub_judul_aplikasi')}</span>
                            </ListItem>
                        </List>
                        <List style={{width:'100%',marginBottom:'0px',marginTop:'0px'}}>
                            <ListItem
                            title="Semester"
                            smartSelect
                            // onClick={this.gantiSemester}
                            >
                                <select onChange={this.gantiSemester} name="semester_id" defaultValue={localStorage.getItem('semester_id_aplikasi')}>
                                    <option value="20201">2020/2021 Genap</option>
                                    <option value="20201">2020/2021 Ganjil</option>
                                    <option value="20192">2019/2020 Genap</option>
                                    <option value="20191">2019/2020 Ganjil</option>
                                    {/* <option value="20182">2018/2019 Genap</option>
                                    <option value="20181">2018/2019 Ganjil</option> */}
                                </select>
                            </ListItem>
                        </List>
                    </Col>
                    <Col width="25" tabletWidth="20">
                        <Button raised fill>
                            Tes
                        </Button>
                    </Col>
                </Row>
            </Block>
            </>
            }
            {localStorage.getItem('kode_aplikasi') === 'SIMDIK' &&
            <>
            <Block strong style={{marginBottom:'8px', marginTop:'8px'}}>
                <Row noGap>
                    <Col width="25" tabletWidth="10">
                        <img src={localStorage.getItem('logo_aplikasi')} style={{width:'80px'}}/>
                    </Col>
                    <Col width="50" tabletWidth="70">
                        <List style={{width:'100%',marginBottom:'0px',marginTop:'0px'}}>
                            <ListItem>
                                <span style={{fontWeight:'bold', fontSize:'16px'}}>{localStorage.getItem('sub_judul_aplikasi')}</span>
                            </ListItem>
                        </List>
                        <List style={{width:'100%',marginBottom:'0px',marginTop:'0px'}}>
                            <ListItem
                            title="Semester"
                            smartSelect
                            // onClick={this.gantiSemester}
                            >
                                <select onChange={this.gantiSemester} name="semester_id" defaultValue={localStorage.getItem('semester_id_aplikasi')}>
                                    <option value="20201">2020/2021 Genap</option>
                                    <option value="20201">2020/2021 Ganjil</option>
                                    <option value="20192">2019/2020 Genap</option>
                                    <option value="20191">2019/2020 Ganjil</option>
                                    {/* <option value="20182">2018/2019 Genap</option>
                                    <option value="20181">2018/2019 Ganjil</option> */}
                                </select>
                            </ListItem>
                        </List>
                    </Col>
                    <Col width="25" tabletWidth="20" style={{paddingLeft:'8px', paddingRight:'8px'}}>
                        <Button style={{height:'90px', border:'1px solid #eee'}} border raised onClick={()=>window.open("http://manajemendata.sma.kemdikbud.go.id:8035/edukasi/index.php/web")}>
                            <img style={{height:'75px', marginTop:'-4px'}} src="http://manajemendata.sma.kemdikbud.go.id:8035/edukasi/assets/img/logo_sma.png"/>
                            <div style={{marginTop:'-25px', fontWeight:'bold'}}>
                                Edukasi Data SMA
                            </div>
                        </Button>
                    </Col>
                </Row>
            </Block>
            </>
            }
            {/* {localStorage.getItem('kode_aplikasi') === 'SIMDIK' &&
            <Block strong style={{marginBottom:'8px', marginTop:'8px'}}>
                <BlockTitle className="publikasiJudul">Data Publikasi Pusdatin TA. 2019/2020</BlockTitle>
                <BlockTitle className="publikasiTanggal">Berdasarkan data tanggal 31 Desember 2019</BlockTitle>
                <Row noGap>
                    <Col width="50" tabletWidth="20">
                        <Card style={{background:'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',color:'#434343'}}>
                            <CardContent>
                                <b>Jumlah Sekolah</b>
                                <br/>   
                                <h1 style={{fontSize:'25px', marginBottom:'0px'}}>13.939</h1>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="50" tabletWidth="20">
                        <Card style={{background:'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',color:'#434343'}}>
                            <CardContent>
                                <b>Jumlah PD</b>
                                <br/>
                                <h1 style={{fontSize:'25px', marginBottom:'0px'}}>4.976.127</h1>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="50" tabletWidth="20">
                        <Card style={{background:'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',color:'#434343'}}>
                            <CardContent>
                                <b>Jumlah Guru</b>
                                <br/>
                                <h1 style={{fontSize:'25px', marginBottom:'0px'}}>321.914</h1>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="50" tabletWidth="20">
                        <Card style={{background:'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',color:'#434343'}}>
                            <CardContent>
                                <b>Jumlah Tendik</b>
                                <br/>
                                <h1 style={{fontSize:'25px', marginBottom:'0px'}}>58.998</h1>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="50" tabletWidth="20">
                        <Card style={{background:'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',color:'#434343'}}>
                            <CardContent>
                                <b>Jumlah Rombel</b>
                                <br/>
                                <h1 style={{fontSize:'25px', marginBottom:'0px'}}>159.177</h1>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
            </Block>
            } */}
            {localStorage.getItem('kode_aplikasi') === 'SIMDIK' &&
            <>
            {/* {localStorage.getItem('jenjang_aplikasi') === '13' &&
            <Block strong style={{marginBottom:'8px', marginTop:'8px'}}>
                <BlockTitle className="publikasiJudul">Data Publikasi Pusdatin TA. 2019/2020</BlockTitle>
                <BlockTitle className="publikasiTanggal">Berdasarkan data tanggal 31 Desember 2019</BlockTitle>
                <Row noGap>
                    <Col width="50" tabletWidth="20">
                        <Card style={{background:'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',color:'#434343'}}>
                            <CardContent>
                                <b>Jumlah Sekolah</b>
                                <br/>   
                                <h1 style={{fontSize:'25px', marginBottom:'0px'}}>13.939</h1>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="50" tabletWidth="20">
                        <Card style={{background:'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',color:'#434343'}}>
                            <CardContent>
                                <b>Jumlah PD</b>
                                <br/>
                                <h1 style={{fontSize:'25px', marginBottom:'0px'}}>4.976.127</h1>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="50" tabletWidth="20">
                        <Card style={{background:'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',color:'#434343'}}>
                            <CardContent>
                                <b>Jumlah Guru</b>
                                <br/>
                                <h1 style={{fontSize:'25px', marginBottom:'0px'}}>321.914</h1>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="50" tabletWidth="20">
                        <Card style={{background:'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',color:'#434343'}}>
                            <CardContent>
                                <b>Jumlah Tendik</b>
                                <br/>
                                <h1 style={{fontSize:'25px', marginBottom:'0px'}}>58.998</h1>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="50" tabletWidth="20">
                        <Card style={{background:'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',color:'#434343'}}>
                            <CardContent>
                                <b>Jumlah Rombel</b>
                                <br/>
                                <h1 style={{fontSize:'25px', marginBottom:'0px'}}>159.177</h1>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
            </Block>
            } */}
            <Block strong style={{marginBottom:'8px', marginTop:'8px'}}>
                <BlockTitle className="publikasiJudul">Rekap Data Pokok Pendidikan</BlockTitle>
                <BlockTitle className="publikasiTanggal">Berdasarkan data tanggal {moment(this.state.tanggal_rekap_terakhir).format('D')} {this.bulan[parseInt(moment(this.state.tanggal_rekap_terakhir).format('M')-1)]} {moment(this.state.tanggal_rekap_terakhir).format('YYYY')}, {moment(this.state.tanggal_rekap_terakhir).format('HH')}:{moment(this.state.tanggal_rekap_terakhir).format('mm')}</BlockTitle>
                <Row noGap>
                    <Col width="50" tabletWidth="20">
                        <Card style={{background:'linear-gradient(to right, #2193b0, #3DA9C4)',color:'white'}}>
                            <CardContent>
                                <b>Jumlah Sekolah</b>
                                <br/>   
                                <h1 style={{fontSize:'30px', marginBottom:'0px'}}>{this.formatAngka(this.state.sekolah_total)}</h1>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="50" tabletWidth="20">
                        <Card style={{background:'linear-gradient(to right, #9B3577, #753a88)',color:'white'}}>
                            <CardContent>
                                <b>Jumlah PD</b>
                                <br/>
                                <h1 style={{fontSize:'30px', marginBottom:'0px'}}>{this.formatAngka(this.state.pd_total)}</h1>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="50" tabletWidth="20">
                        <Card style={{background:'linear-gradient(to right, #ec008c, #F33B7D)',color:'white'}}>
                            <CardContent>
                                <b>Jumlah Guru</b>
                                <br/>
                                <h1 style={{fontSize:'30px', marginBottom:'0px'}}>{this.formatAngka(this.state.guru_total)}</h1>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="50" tabletWidth="20">
                        <Card style={{background:'linear-gradient(to right, #ec008c, #F33B7D)',color:'white'}}>
                            <CardContent>
                                <b>Jumlah Tendik</b>
                                <br/>
                                <h1 style={{fontSize:'30px', marginBottom:'0px'}}>{this.formatAngka(this.state.pegawai_total)}</h1>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="50" tabletWidth="20">
                        <Card style={{background:'linear-gradient(to right, #00467f, #3C7282)',color:'white'}}>
                            <CardContent>
                                <b>Jumlah Rombel</b>
                                <br/>
                                <h1 style={{fontSize:'30px', marginBottom:'0px'}}>{this.formatAngka(this.state.rombel_total)}</h1>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="100" tabletWidth="100">
                        <div className="data-table" style={{overflowY:'hidden'}}>
                            <table>
                                <thead style={{background:'#eeeeee'}}>
                                    <tr>
                                        <th className="label-cell" rowSpan="2" style={{minWidth:'100px'}}>&nbsp;</th>
                                        {/* <th className="label-cell" rowSpan="2" style={{minWidth:'200px', color:'#434343', fontSize:'15px'}}>Wilayah</th> */}
                                        <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'13px'}} colSpan="3">Sekolah</th>
                                        <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'13px'}} colSpan="3">Peserta Didik</th>
                                        <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'13px'}} colSpan="3">Guru</th>
                                        <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'13px'}} colSpan="3">Tendik</th>
                                        <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'13px'}} colSpan="3">Rombel</th>
                                    </tr>
                                    <tr>
                                        {/* <th className="label-cell" style={{minWidth:'40px'}}>&nbsp;</th> */}
                                        <th className="numeric-cell">Negeri</th>
                                        <th className="numeric-cell">Swasta</th>
                                        <th className="numeric-cell">Total</th>
                                        <th className="numeric-cell">Negeri</th>
                                        <th className="numeric-cell">Swasta</th>
                                        <th className="numeric-cell">Total</th>
                                        <th className="numeric-cell">Negeri</th>
                                        <th className="numeric-cell">Swasta</th>
                                        <th className="numeric-cell">Total</th>
                                        <th className="numeric-cell">Negeri</th>
                                        <th className="numeric-cell">Swasta</th>
                                        <th className="numeric-cell">Total</th>
                                        <th className="numeric-cell">Negeri</th>
                                        <th className="numeric-cell">Swasta</th>
                                        <th className="numeric-cell">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.loading ?
                                <>
                                    {this.props.dummy_rows.rows.map((option)=>{
                                        return (
                                            <tr>
                                                <td className="label-cell skeleton-text skeleton-effect-blink">
                                                    loremipsum
                                                </td>
                                                {/* <td className="label-cell skeleton-text skeleton-effect-blink">lorenipsumlorenipsum</td> */}
                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                            </tr>
                                        )
                                    })}
                                </>
                                :
                                <>
                                    {this.props.rekap_sekolah_total.rows.map((option)=>{
                                        return (
                                            <tr>
                                                <td className="label-cell">
                                                    {option.nama}
                                                </td>
                                                {/* <td className="label-cell">lorenipsumlorenipsum</td> */}
                                                <td className="numeric-cell">{option.negeri ? this.formatAngka(option.negeri) : "0"}</td>
                                                <td className="numeric-cell">{option.swasta ? this.formatAngka(option.swasta) : "0"}</td>
                                                <td className="numeric-cell">{option.total ? this.formatAngka(option.total) : "0"}</td>
                                                <td className="numeric-cell">{option.pd_negeri ? this.formatAngka(option.pd_negeri) : "0"}</td>
                                                <td className="numeric-cell">{option.pd_swasta ? this.formatAngka(option.pd_swasta) : "0"}</td>
                                                <td className="numeric-cell">{option.pd_total ? this.formatAngka(option.pd_total) : "0"}</td>
                                                <td className="numeric-cell">{option.guru_negeri ? this.formatAngka(option.guru_negeri) : "0"}</td>
                                                <td className="numeric-cell">{option.guru_swasta ? this.formatAngka(option.guru_swasta) : "0"}</td>
                                                <td className="numeric-cell">{option.guru_total ? this.formatAngka(option.guru_total) : "0"}</td>
                                                <td className="numeric-cell">{option.pegawai_negeri ? this.formatAngka(option.pegawai_negeri) : "0"}</td>
                                                <td className="numeric-cell">{option.pegawai_swasta ? this.formatAngka(option.pegawai_swasta) : "0"}</td>
                                                <td className="numeric-cell">{option.pegawai_total ? this.formatAngka(option.pegawai_total) : "0"}</td>
                                                <td className="numeric-cell">{option.rombel_negeri ? this.formatAngka(option.rombel_negeri) : "0"}</td>
                                                <td className="numeric-cell">{option.rombel_swasta ? this.formatAngka(option.rombel_swasta) : "0"}</td>
                                                <td className="numeric-cell">{option.rombel_total ? this.formatAngka(option.rombel_total) : "0"}</td>
                                            </tr>
                                        )
                                    })}
                                </>
                                }
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </Block>
            
            {/* <Block strong style={{marginBottom:'8px', marginTop:'8px'}}>
                <BlockTitle className="publikasiJudul">Grafik Index Pendidikan</BlockTitle>
                <Line 
                    data={this.state.data} options={options}
                />
            </Block>

            <Block strong style={{marginBottom:'8px', marginTop:'8px'}}>
                <BlockTitle className="publikasiJudul">Grafik Data Pendidikan</BlockTitle>
                <BlockTitle className="publikasiTanggal">Berdasarkan data tanggal {moment(this.state.tanggal_rekap_terakhir).format('D')} {this.bulan[parseInt(moment(this.state.tanggal_rekap_terakhir).format('M')-1)]} {moment(this.state.tanggal_rekap_terakhir).format('YYYY')}, {moment(this.state.tanggal_rekap_terakhir).format('HH')}:{moment(this.state.tanggal_rekap_terakhir).format('mm')}</BlockTitle>
                <Row noGap>
                    <Col width="100" tabletWidth="50">
                        <Card style={{marginBottom: '0px', minHeight: '510px', marginLeft: '0px', marginRight:'0px'}}>
                            <CardHeader>
                                Peserta Didik Berdasarkan Tingkat Pendidikan
                            </CardHeader>
                            <CardContent>
                                <Doughnut 
                                    data={this.props.peserta_didik_tingkat_kelas_pie}
                                    height={300}
                                    legend={{
                                        display: true,
                                        position: 'bottom',
                                        align: 'center'  
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="100" tabletWidth="50">
                        <Card style={{marginBottom: '0px', minHeight: '510px', marginRight: '0px', marginLeft:'0px'}}>
                            <CardHeader>
                                GTK Berdasarkan Jenis
                            </CardHeader>
                            <CardContent>
                                <Doughnut 
                                    data={this.props.gtk_jenis_pie}
                                    height={300}
                                    legend={{
                                        display: true,
                                        position: 'bottom',
                                        align: 'center'
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
            </Block> */}
            </>
            }
            {/* {localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' &&
            <Block strong style={{marginBottom:'8px', marginTop:'8px'}}>
                <h2>Selamat datang di Aplikasi {localStorage.getItem('judul_aplikasi')}!</h2>
                <p>Ini adalah versi {localStorage.getItem('versi_aplikasi')} beta dari Aplikasi {localStorage.getItem('judul_aplikasi')}. Terdapat beberapa menu yang masih perlu Kami perbaiki dan sempurnakan. Oleh karena itu, masukan dan saran dari Anda akan sangat bermanfaat untuk Kami. Silakan kirim masukan dan saran anda melalui <Link onClick={()=>window.open("https://forms.gle/jybCmmj3c4nsyKKY9")}>tautan ini</Link>. Terima kasih!</p>
            </Block>
            } */}
            {/* {localStorage.getItem('kode_aplikasi') === 'SPM' &&
            <Block strong style={{marginBottom:'8px', marginTop:'8px'}}>
                <h2>{localStorage.getItem('sub_judul_aplikasi')}</h2>
            </Block>
            } */}
            <Row noGap>
                {/* {localStorage.getItem('kode_aplikasi') === 'SPM' &&
                <>
                    <Col width="100" tabletWidth="50">                
                        <Card className="demo-card-header-pic" style={{minHeight: '160px', backgroundImage: 'linear-gradient(to top, #4481eb 0%, #04befe 100%)'}}>
                            <CardHeader
                                className="no-border"
                                style={{textAlign: 'center', display: 'block', color:'white'}}
                            >
                                {(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : (localStorage.getItem('kode_aplikasi') === 'SPM' ? 'Rapor SPM' : 'Rapor Kualitas Data'))} {this.props.wilayah.rows[0].nama}
                            </CardHeader>
                            <CardContent
                                style={{textAlign: 'center'}}
                            >
                                <span style={{fontSize:'50px', fontWeight: 'bold', color:'white'}}>
                                    {(this.props.spm_kabupaten[0].persen > 0 ? parseFloat(this.props.spm_kabupaten[0].persen).toFixed(2) : this.props.spm_kabupaten[0].persen)}%
                                </span>
                                <br/>
                                <span style={{fontSize:'10px', color:'white', fontStyle: 'italic'}}>
                                    Per {this.props.spm_kabupaten[0].tanggal_rekap_terakhir}
                                </span>
                            </CardContent>
                        </Card>
                    </Col>
                </>
                } */}
                {localStorage.getItem('kode_aplikasi') !== 'SPM' &&
                <Col width="100" tabletWidth="50">                
                    <Card className="demo-card-header-pic" style={{minHeight: '320px', backgroundImage: (localStorage.getItem('tema_warna_aplikasi') === 'biru-1' ? 'linear-gradient(to top, #4481eb 0%, #04befe 100%)' : 'linear-gradient(to top, #f83600 0%, #FAAE1F 100%)')}}>
                        <CardHeader
                            className="no-border"
                            style={{textAlign: 'center', display: 'block', color:'white'}}
                        >
                            {(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')} {this.props.wilayah.rows[0].nama}
                        </CardHeader>
                        <CardContent
                            style={{textAlign: 'center'}}
                        >
                            <span style={{fontSize:'70px', fontWeight: 'bold', color:'white'}}>
                                {this.state.loading ? <span className="skeleton-text skeleton-effect-blink">100.00</span> : ((parseFloat(this.state.rapor_akhir)+parseFloat(this.state.rapor_berkelanjutan)+parseFloat(this.state.rapor_mutakhir))/3).toFixed(2)}
                            </span>
                            <br/>
                            <span style={{fontSize:'10px', color:'white', fontStyle: 'italic'}}>
                                Per {this.state.loading ? <span className="skeleton-text skeleton-effect-blink">100.00</span> : this.state.tanggal_rekap_terakhir}
                            </span>
                            <br/>
                            <br/>
                            <Row width="100" style={{borderTop:'1px solid #ccc', paddingBottom:'8px'}}></Row>
                            <Row style={{color:'white'}}>
                                <Col width="33">
                                    Akurat<br/>
                                    <b style={{fontSize:'35px'}}>{this.state.loading ? <span className="skeleton-text skeleton-effect-blink">100.00</span> : <a style={{color:'white'}} href="/RaporDapodik">{this.state.rapor_akhir}</a>}</b>
                                </Col>
                                <Col width="33">
                                    Berkelanjutan<br/>
                                    <b style={{fontSize:'35px'}}>{this.state.loading ?  <span className="skeleton-text skeleton-effect-blink">100.00</span> : <a style={{color:'white'}} href={"/RaporDapodikBerkelanjutan/"+localStorage.getItem('id_level_wilayah_aplikasi')+"/"+localStorage.getItem('kode_wilayah_aplikasi')}>{this.state.rapor_berkelanjutan}</a>}</b>
                                </Col>
                                <Col width="33">
                                    Mutakhir<br/>
                                    <b style={{fontSize:'35px'}}>{this.state.loading ? <span className="skeleton-text skeleton-effect-blink">100.00</span> : <a style={{color:'white'}} href={"/RaporDapodikMutakhir/"+localStorage.getItem('id_level_wilayah_aplikasi')+"/"+localStorage.getItem('kode_wilayah_aplikasi')}>{this.state.rapor_mutakhir}</a>}</b>
                                </Col>
                                <Col width="100" tabletWidth="100">
                                    <i style={{fontSize:'10px'}}>* Nilai Rapor berdasarkan skala 1-100</i>
                                </Col>
                            </Row>
                            
                        </CardContent>
                    </Card>
                </Col>
                }
                {localStorage.getItem('kode_aplikasi') !== 'SPM' &&
                <Col width="100" tabletWidth="50">        
                    <Card className="demo-card-header-pic" style={{minHeight: '320px', backgroundImage: (localStorage.getItem('tema_warna_aplikasi') === 'biru-1' ? 'linear-gradient(to top, #4481eb 0%, #04befe 100%)' : 'linear-gradient(to top, #f83600 0%, #FAAE1F 100%)')}}>
                        <CardContent>
                            <Row>
                                <Col width="100" tabletWidth="100" style={{borderTop:'1px solid #ccc'}}>
                                    <h4 style={{marginBottom:'4px'}}>Akurat</h4>
                                </Col>
                                <Col width="50" tabletWidth="50">
                                    <Row>
                                        <Col width="60" style={{color:'white'}}>
                                            Sekolah:
                                        </Col>
                                        <Col width="40" style={{color:'white', textAlign:'right', paddingRight:'8px'}}>
                                            <b>{this.state.loading ? <span className="skeleton-text skeleton-effect-blink">100.00</span> : this.state.rapor_sekolah}</b>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col width="50" tabletWidth="50">
                                    <Row>
                                        <Col width="60" style={{color:'white'}}>
                                            Peserta Didik:
                                        </Col>
                                        <Col width="40" style={{color:'white', textAlign:'right', paddingRight:'8px'}}>
                                            <b>{this.state.loading ? <span className="skeleton-text skeleton-effect-blink">100.00</span> : this.state.rapor_pd}</b>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col width="50" tabletWidth="50">
                                    <Row>
                                        <Col width="60" style={{color:'white'}}>
                                            PTK:
                                        </Col>
                                        <Col width="40" style={{color:'white', textAlign:'right', paddingRight:'8px'}}>
                                            <b>{this.state.loading ? <span className="skeleton-text skeleton-effect-blink">100.00</span> : this.state.rapor_ptk}</b>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col width="50" tabletWidth="50">
                                    <Row>
                                        <Col width="60" style={{color:'white'}}>
                                            Rombel:
                                        </Col>
                                        <Col width="40" style={{color:'white', textAlign:'right', paddingRight:'8px'}}>
                                            <b>{this.state.loading ? <span className="skeleton-text skeleton-effect-blink">100.00</span> : this.state.rapor_rombel}</b>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col width="50" tabletWidth="50">
                                    <Row>
                                        <Col width="60" style={{color:'white'}}>
                                            Sarpras:
                                        </Col>
                                        <Col width="40" style={{color:'white', textAlign:'right', paddingRight:'8px'}}>
                                            <b>{this.state.loading ? <span className="skeleton-text skeleton-effect-blink">100.00</span> : this.state.rapor_sarpras}</b>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col width="100" tabletWidth="100" style={{borderTop:'1px solid #ccc'}}>
                                    <h4 style={{marginBottom:'4px'}}>Berkelanjutan</h4>
                                </Col>
                                <Col width="100" tabletWidth="100">
                                    <Row>
                                        <Col width="60" style={{color:'white'}}>
                                            Sinkron 4 Semester:
                                        </Col>
                                        <Col width="40" style={{color:'white', textAlign:'right', paddingRight:'8px'}}>
                                            <b>{this.state.loading ? <span className="skeleton-text skeleton-effect-blink">100.00</span> : this.state.rapor_berkelanjutan}</b>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col width="100" tabletWidth="100" style={{borderTop:'1px solid #ccc'}}>
                                    <h4 style={{marginBottom:'4px'}}>Mutakhir</h4>
                                </Col>
                                <Col width="50" tabletWidth="50">
                                    <Row>
                                        <Col width="60" style={{color:'white'}}>
                                            Peserta Didik:
                                        </Col>
                                        <Col width="40" style={{color:'white', textAlign:'right', paddingRight:'8px'}}>
                                            <b>{this.state.loading ? <span className="skeleton-text skeleton-effect-blink">100.00</span> : this.state.rapor_mutakhir_pd}</b>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col width="50" tabletWidth="50">
                                    <Row>
                                        <Col width="60" style={{color:'white'}}>
                                            PTK:
                                        </Col>
                                        <Col width="40" style={{color:'white', textAlign:'right', paddingRight:'8px'}}>
                                            <b>{this.state.loading ? <span className="skeleton-text skeleton-effect-blink">100.00</span> : this.state.rapor_mutakhir_ptk}</b>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col width="50" tabletWidth="50">
                                    <Row>
                                        <Col width="60" style={{color:'white'}}>
                                            Rombel:
                                        </Col>
                                        <Col width="40" style={{color:'white', textAlign:'right', paddingRight:'8px'}}>
                                            <b>{this.state.loading ? <span className="skeleton-text skeleton-effect-blink">100.00</span> : this.state.rapor_mutakhir_rombel}</b>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col width="50" tabletWidth="50">
                                    <Row>
                                        <Col width="60" style={{color:'white'}}>
                                            Sarpras:
                                        </Col>
                                        <Col width="40" style={{color:'white', textAlign:'right', paddingRight:'8px'}}>
                                            <b>{this.state.loading ? <span className="skeleton-text skeleton-effect-blink">100.00</span> : this.state.rapor_mutakhir_sarpras}</b>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col width="100" tabletWidth="100">
                                    <Button style={{marginTop:'10px', color:'white', border:'1px solid white'}} href="/RaporDapodik/Indikator">
                                        <i className="f7-icons" style={{fontSize:'17px'}}>question_circle</i> Indikator Penghitungan {(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')}
                                    </Button>
                                </Col>
                            </Row>
                        </CardContent>
                    </Card>
                </Col>
                }
                {localStorage.getItem('kode_aplikasi') === 'SPM' &&
                <>
                <Col width="100" tabletWidth="100">                
                    <Card className="demo-card-header-pic" style={{minHeight: '160px', backgroundImage: (localStorage.getItem('tema_warna_aplikasi') === 'biru-1' ? 'linear-gradient(to top, #4481eb 0%, #04befe 100%)' : 'linear-gradient(to right, #f83600 0%, #f9d423 100%)')}}>
                        <CardHeader
                            className="no-border"
                            style={{textAlign: 'center', display: 'block', color:'white'}}
                        >
                            {(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : (localStorage.getItem('kode_aplikasi') === 'SPM' ? 'Rapor SPM' : 'Rapor Kualitas Data'))} {this.props.wilayah.rows[0].nama}
                        </CardHeader>
                        <CardContent
                            style={{textAlign: 'center'}}
                        >
                            <span style={{fontSize:'50px', fontWeight: 'bold', color:'white'}}>
                                {(this.props.spm_kabupaten[0].persen > 0 ? parseFloat(this.props.spm_kabupaten[0].persen).toFixed(2) : this.props.spm_kabupaten[0].persen)}%
                            </span>
                            <br/>
                            <span style={{fontSize:'10px', color:'white', fontStyle: 'italic'}}>
                                Per {this.props.spm_kabupaten[0].tanggal_rekap_terakhir}
                            </span>
                        </CardContent>
                    </Card>
                </Col>
                <Col width="100" tabletWidth="50">
                    <Card className="demo-card-header-pic" style={{minHeight: '150px'}}>
                        <CardHeader
                            className="no-border"
                            style={{textAlign: 'center', display: 'block'}}
                        >
                            5 Kecamatan Terbaik {(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : (localStorage.getItem('kode_aplikasi') === 'SPM' ? 'Rapor SPM' : 'Rapor Kualitas Data'))}
                        </CardHeader>
                        <CardContent>
                            {this.props.spm_kabupaten_per_kecamatan.map((option)=>{
                                if(this.props.spm_kabupaten_per_kecamatan.indexOf(option) < 5){
                                    return(
                                        <Row key={option.nama} style={{borderBottom:'1px solid #ccc', marginTop:'2px', border:'1px solid #ccc', padding:'8px', borderRadius: '4px'}}>
                                            <Col width={80}>
                                                {/* <Link href={"/RaporDapodikProvinsi/"+option.kode_wilayah}> */}
                                                    {option.wilayah}
                                                {/* </Link> */}
                                            </Col>
                                            <Col width={20} style={{textAlign:'center', fontSize:'16px'}}>
                                                <b>{parseFloat(option.persen).toFixed(2)}%</b>
                                            </Col>
                                        </Row>
                                    )
                                }
                            })}
                        </CardContent>
                    </Card>
                </Col>
                <Col width="100" tabletWidth="50">
                    <Card className="demo-card-header-pic" style={{minHeight: '150px'}}>
                        <CardHeader
                            className="no-border"
                            style={{textAlign: 'center', display: 'block'}}
                        >
                            5 Sekolah Terbaik {(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : (localStorage.getItem('kode_aplikasi') === 'SPM' ? 'Rapor SPM' : 'Rapor Kualitas Data'))}
                        </CardHeader>
                        <CardContent>
                            {this.props.spm_kabupaten_per_sekolah.map((option)=>{
                                if(this.props.spm_kabupaten_per_sekolah.indexOf(option) < 5){
                                    return(
                                        <Row key={option.nama} style={{borderBottom:'1px solid #ccc', marginTop:'2px', border:'1px solid #ccc', padding:'8px', borderRadius: '4px'}}>
                                            <Col width={80}>
                                                {/* <Link href={"/RaporDapodikProvinsi/"+option.kode_wilayah}> */}
                                                    {option.nama}
                                                {/* </Link> */}
                                            </Col>
                                            <Col width={20} style={{textAlign:'center', fontSize:'16px'}}>
                                                <b>{parseInt(option.persen).toFixed(0)}%</b>
                                            </Col>
                                        </Row>
                                    )
                                }
                            })}
                        </CardContent>
                    </Card>
                </Col>
                </>
                }
                {localStorage.getItem('kode_aplikasi') !== 'SPM' &&
                <>
                {parseInt(localStorage.getItem('id_level_wilayah_aplikasi')) < 1 &&
                <>
                <Col width="100" tabletWidth="50">
                    <Card className="demo-card-header-pic" style={{minHeight: '150px'}}>
                        <CardHeader
                            className="no-border"
                            style={{textAlign: 'center', display: 'block'}}
                        >
                            5 Provinsi Terbaik {(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')}
                        </CardHeader>
                        <CardContent>
                            {this.state.peringkat_provinsi.rows.map((option)=>{
                                if(this.state.peringkat_provinsi.rows.indexOf(option) < 5){
                                    return(
                                        <Row key={option.nama} style={{borderBottom:'1px solid #ccc', marginTop:'2px', border:'1px solid #ccc', padding:'8px', borderRadius: '4px'}}>
                                            <Col width={80}>
                                                <Link href={"/RaporDapodikRingkasan/"+option.id_level_wilayah+"/"+option.kode_wilayah}>{option.nama}</Link>
                                            </Col>
                                            <Col width={20} style={{textAlign:'center', fontSize:'16px'}}>
                                                <b>{parseFloat(option.rapor_final).toFixed(2)}</b>
                                            </Col>
                                        </Row>
                                    )
                                }
                            })}
                        </CardContent>
                    </Card>
                </Col>
                <Col width="100" tabletWidth="50">
                    <Card className="demo-card-header-pic" style={{minHeight: '150px'}}>
                        <CardHeader
                            className="no-border"
                            style={{textAlign: 'center', display: 'block'}}
                        >
                            5 Kabupaten/Kota Terbaik {(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')}
                        </CardHeader>
                        <CardContent>
                            {this.state.peringkat_kabupaten.rows.map((option)=>{
                                if(this.state.peringkat_kabupaten.rows.indexOf(option) < 5){
                                    return(
                                        <Row key={option.nama} style={{borderBottom:'1px solid #ccc', marginTop:'2px', border:'1px solid #ccc', padding:'8px', borderRadius: '4px'}}>
                                            <Col width={80}>
                                                <Link href={"/RaporDapodikKabupaten/"+option.kode_wilayah}>{option.nama} ({option.induk})</Link>
                                            </Col>
                                            <Col width={20} style={{textAlign:'center', fontSize:'16px'}}>
                                                <b>{parseFloat(option.rapor_final).toFixed(2)}</b>
                                            </Col>
                                        </Row>
                                    )
                                }
                            })}
                        </CardContent>
                    </Card>
                </Col>
                <Col width="100" tabletWidth="100">
                    <Card className="demo-card-header-pic" style={{minHeight: '150px'}}>
                        <CardHeader
                            className="no-border"
                            style={{textAlign: 'center', display: 'block'}}
                        >
                            5 Sekolah Terbaik {(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')}
                        </CardHeader>
                        <CardContent>
                            {this.state.peringkat_sekolah.rows.map((option)=>{
                                if(this.state.peringkat_sekolah.rows.indexOf(option) < 5){
                                    return(
                                        <Row key={option.nama} style={{borderBottom:'1px solid #ccc', marginTop:'2px', border:'1px solid #ccc', padding:'8px', borderRadius: '4px'}}>
                                            <Col width={80}>
                                                <Link href={"/RaporDapodikProfil/"+option.sekolah_id}>{option.nama} ({option.npsn})</Link>
                                                <br/><span style={{fontSize: '10px'}}>{option.kecamatan}, {option.kabupaten}, {option.provinsi}</span>
                                            </Col>
                                            <Col width={20} style={{textAlign:'center', fontSize:'16px'}}>
                                                <b>{parseFloat(option.rapor_akhir).toFixed(2)}</b>
                                            </Col>
                                        </Row>
                                    )
                                }
                            })}
                        </CardContent>
                    </Card>
                </Col>
                </>
                }
                </>
                }

                {localStorage.getItem('kode_aplikasi') !== 'SPM' &&
                <>
                {parseInt(localStorage.getItem('id_level_wilayah_aplikasi')) === 1 &&
                <>
                <Col width="100" tabletWidth="50">
                    <Card className="demo-card-header-pic" style={{minHeight: '400px'}}>
                        <CardHeader
                            className="no-border"
                            style={{textAlign: 'center', display: 'block'}}
                        >
                            5 Kabupaten/Kota Terbaik {(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')}
                        </CardHeader>
                        <CardContent>
                            {this.state.peringkat_provinsi.rows.map((option)=>{
                                if(this.state.peringkat_provinsi.rows.indexOf(option) < 5){
                                    return(
                                        <Row key={option.nama} style={{borderBottom:'1px solid #ccc', marginTop:'2px', border:'1px solid #ccc', padding:'8px', borderRadius: '4px'}}>
                                            <Col width={80}>
                                                <Link href={"/RaporDapodikProvinsi/"+option.kode_wilayah}>{option.nama}</Link>
                                                <br/><span style={{fontSize: '10px'}}>{option.induk}</span>
                                            </Col>
                                            <Col width={20} style={{textAlign:'center', fontSize:'16px'}}>
                                                <b>{parseFloat(option.rapor_akhir).toFixed(2)}</b>
                                            </Col>
                                        </Row>
                                    )
                                }
                            })}
                        </CardContent>
                    </Card>
                </Col>
                <Col width="100" tabletWidth="50">
                    <Card className="demo-card-header-pic" style={{minHeight: '400px'}}>
                        <CardHeader
                            className="no-border"
                            style={{textAlign: 'center', display: 'block'}}
                        >
                            5 Sekolah Terbaik {(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')}
                        </CardHeader>
                        <CardContent>
                            {this.state.peringkat_sekolah.rows.map((option)=>{
                                if(this.state.peringkat_sekolah.rows.indexOf(option) < 5){
                                    return(
                                        <Row key={option.nama} style={{borderBottom:'1px solid #ccc', marginTop:'2px', border:'1px solid #ccc', padding:'8px', borderRadius: '4px'}}>
                                            <Col width={80}>
                                                <Link href={"/RaporDapodikProfil/"+option.sekolah_id}>{option.nama} ({option.npsn})</Link>
                                                <br/><span style={{fontSize: '10px'}}>{option.kecamatan}, {option.kabupaten}, {option.provinsi}</span>
                                            </Col>
                                            <Col width={20} style={{textAlign:'center', fontSize:'16px'}}>
                                                <b>{parseFloat(option.rapor_akhir).toFixed(2)}</b>
                                            </Col>
                                        </Row>
                                    )
                                }
                            })}
                        </CardContent>
                    </Card>
                </Col>
                </>
                }
                </>
                }

                {localStorage.getItem('kode_aplikasi') !== 'SPM' &&
                <>
                {parseInt(localStorage.getItem('id_level_wilayah_aplikasi')) > 1 &&
                <>
                <Col width="100" tabletWidth="50">
                    <Card className="demo-card-header-pic" style={{minHeight: '400px'}}>
                        <CardHeader
                            className="no-border"
                            style={{textAlign: 'center', display: 'block'}}
                        >
                            5 Kecamatan Terbaik {(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')}
                        </CardHeader>
                        <CardContent>
                            {this.state.peringkat_provinsi.rows.map((option)=>{
                                if(this.state.peringkat_provinsi.rows.indexOf(option) < 5){
                                    return(
                                        <Row key={option.nama} style={{borderBottom:'1px solid #ccc', marginTop:'2px', border:'1px solid #ccc', padding:'8px', borderRadius: '4px'}}>
                                            <Col width={80}>
                                                <Link href={"/RaporDapodikProvinsi/"+option.kode_wilayah}>{option.nama}</Link>
                                                <br/><span style={{fontSize: '10px'}}>{option.induk}</span>
                                            </Col>
                                            <Col width={20} style={{textAlign:'center', fontSize:'16px'}}>
                                                <b>{parseFloat(option.rapor_akhir).toFixed(2)}</b>
                                            </Col>
                                        </Row>
                                    )
                                }
                            })}
                        </CardContent>
                    </Card>
                </Col>
                <Col width="100" tabletWidth="50">
                    <Card className="demo-card-header-pic" style={{minHeight: '400px'}}>
                        <CardHeader
                            className="no-border"
                            style={{textAlign: 'center', display: 'block'}}
                        >
                            5 Sekolah Terbaik {(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')}
                        </CardHeader>
                        <CardContent>
                            {this.state.peringkat_sekolah.rows.map((option)=>{
                                if(this.state.peringkat_sekolah.rows.indexOf(option) < 5){
                                    return(
                                        <Row key={option.nama} style={{borderBottom:'1px solid #ccc', marginTop:'2px', border:'1px solid #ccc', padding:'8px', borderRadius: '4px'}}>
                                            <Col width={80}>
                                                <Link href={"/RaporDapodikProfil/"+option.sekolah_id}>{option.nama} ({option.npsn})</Link>
                                                <br/><span style={{fontSize: '10px'}}>{option.kecamatan}, {option.kabupaten}, {option.provinsi}</span>
                                            </Col>
                                            <Col width={20} style={{textAlign:'center', fontSize:'16px'}}>
                                                <b>{parseFloat(option.rapor_akhir).toFixed(2)}</b>
                                            </Col>
                                        </Row>
                                    )
                                }
                            })}
                        </CardContent>
                    </Card>
                </Col>
                </>
                }
                </>
                }
                <Col width={100} tabletWidth={100}>
                    <Card style={{minHeight:'290px'}}>
                        <CardHeader>
                            Rapor Dapodik Ringkasan
                        </CardHeader>
                        <CardContent>
                            <Radar 
                            data={this.props.rapor_dapodik_radar} 
                            height={150}
                            options ={{
                                scale: {
                                    angleLines: {
                                        display: true
                                    },
                                    ticks: {
                                        suggestedMin: 50,
                                        suggestedMax: 100
                                    }
                                }
                            }} />
                        </CardContent>
                    </Card>
                </Col>
                <Col width={100} tabletWidth={50}>
                    <Card style={{minHeight:'290px'}}>
                        <CardHeader>
                            Rapor Dapodik Akurat
                        </CardHeader>
                        <CardContent>
                            <Radar 
                            data={this.props.rapor_dapodik_akurat_radar} 
                            height={150}
                            options ={{
                                scale: {
                                    angleLines: {
                                        display: true
                                    },
                                    ticks: {
                                        suggestedMin: 50,
                                        suggestedMax: 100
                                    }
                                }
                            }} />
                        </CardContent>
                    </Card>
                </Col>
                <Col width={100} tabletWidth={50}>
                    <Card style={{minHeight:'290px'}}>
                        <CardHeader>
                            Rapor Dapodik Mutakhir
                        </CardHeader>
                        <CardContent>
                            <Radar 
                            data={this.props.rapor_dapodik_mutakhir_radar} 
                            height={150}
                            options ={{
                                scale: {
                                    angleLines: {
                                        display: true
                                    },
                                    ticks: {
                                        suggestedMin: 50,
                                        suggestedMax: 100
                                    }
                                }
                            }} />
                        </CardContent>
                    </Card>
                </Col>
                {/* <Col width="100">

                    <Block strong style={{marginTop:'8px', marginBottom:'8px'}}>
                        
                        // tes
                        <Row>
                            <Col width="50" tabletWidth="20" style={{border:'0px solid #ccc'}}>
                                <BlockTitle className="publikasiJudul">Rekap SD</BlockTitle>
                                <Card style={{background:'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',color:'#434343'}}>
                                    <CardContent>
                                        <b>SD Negeri</b>
                                        <br/>   
                                        <h1 style={{fontSize:'25px', marginBottom:'0px'}}>{this.state.sd_negeri}</h1>
                                    </CardContent>
                                </Card>
                                <Card style={{background:'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',color:'#434343'}}>
                                    <CardContent>
                                        <b>SD Swasta</b>
                                        <br/>   
                                        <h1 style={{fontSize:'25px', marginBottom:'0px'}}>{this.state.sd_swasta}</h1>
                                    </CardContent>
                                </Card>
                            </Col>
                            <Col width="50" tabletWidth="20" style={{border:'0px solid #ccc'}}>
                                <BlockTitle className="publikasiJudul">Rekap SMP</BlockTitle>
                                <Card style={{background:'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',color:'#434343'}}>
                                    <CardContent>
                                        <b>SMP Negeri</b>
                                        <br/>   
                                        <h1 style={{fontSize:'25px', marginBottom:'0px'}}>{this.state.smp_negeri}</h1>
                                    </CardContent>
                                </Card>
                                <Card style={{background:'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',color:'#434343'}}>
                                    <CardContent>
                                        <b>SMP Swasta</b>
                                        <br/>   
                                        <h1 style={{fontSize:'25px', marginBottom:'0px'}}>{this.state.smp_swasta}</h1>
                                    </CardContent>
                                </Card>
                            </Col>
                            <Col width="50" tabletWidth="20" style={{border:'0px solid #ccc'}}>
                                <BlockTitle className="publikasiJudul">Rekap SMA</BlockTitle>
                                <Card style={{background:'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',color:'#434343'}}>
                                    <CardContent>
                                        <b>SMA Negeri</b>
                                        <br/>   
                                        <h1 style={{fontSize:'25px', marginBottom:'0px'}}>{this.state.sma_negeri}</h1>
                                    </CardContent>
                                </Card>
                                <Card style={{background:'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',color:'#434343'}}>
                                    <CardContent>
                                        <b>SMA Swasta</b>
                                        <br/>   
                                        <h1 style={{fontSize:'25px', marginBottom:'0px'}}>{this.state.sma_swasta}</h1>
                                    </CardContent>
                                </Card>
                            </Col>
                            <Col width="50" tabletWidth="20" style={{border:'0px solid #ccc'}}>
                                <BlockTitle className="publikasiJudul">Rekap SMK</BlockTitle>
                                <Card style={{background:'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',color:'#434343'}}>
                                    <CardContent>
                                        <b>SMK Negeri</b>
                                        <br/>   
                                        <h1 style={{fontSize:'25px', marginBottom:'0px'}}>{this.state.smk_negeri}</h1>
                                    </CardContent>
                                </Card>
                                <Card style={{background:'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',color:'#434343'}}>
                                    <CardContent>
                                        <b>SMK Swasta</b>
                                        <br/>   
                                        <h1 style={{fontSize:'25px', marginBottom:'0px'}}>{this.state.smk_swasta}</h1>
                                    </CardContent>
                                </Card>
                            </Col>
                            <Col width="50" tabletWidth="20" style={{border:'0px solid #ccc'}}>
                                <BlockTitle className="publikasiJudul">Rekap SLB</BlockTitle>
                                <Card style={{background:'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',color:'#434343'}}>
                                    <CardContent>
                                        <b>SLB Negeri</b>
                                        <br/>   
                                        <h1 style={{fontSize:'25px', marginBottom:'0px'}}>{this.state.slb_negeri}</h1>
                                    </CardContent>
                                </Card>
                                <Card style={{background:'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',color:'#434343'}}>
                                    <CardContent>
                                        <b>SLB Swasta</b>
                                        <br/>   
                                        <h1 style={{fontSize:'25px', marginBottom:'0px'}}>{this.state.slb_swasta}</h1>
                                    </CardContent>
                                </Card>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col width="100" tabletWidth="50">
                                <Card>
                                    <CardContent>

                                        <BlockTitle className="publikasiJudul">Rekap PTK Wilayah</BlockTitle>
                                        <div className="data-table" style={{overflowY:'hidden'}}>
                                            <table>
                                                <thead style={{background:'#eeeeee'}}>
                                                    <tr>
                                                        <th className="label-cell" rowSpan="2" style={{minWidth:'40px'}}>&nbsp;</th>
                                                        <th className="label-cell" rowSpan="2" style={{minWidth:'200px', color:'#434343', fontSize:'15px'}}>Wilayah</th>
                                                        <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}} colSpan="3">Guru</th>
                                                        <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}} colSpan="3">Tendik</th>
                                                        <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}} colSpan="3">Total GTK</th>
                                                    </tr>
                                                    <tr>
                                                        <th className="numeric-cell">Negeri</th>
                                                        <th className="numeric-cell">Swasta</th>
                                                        <th className="numeric-cell">Total</th>
                                                        <th className="numeric-cell">Negeri</th>
                                                        <th className="numeric-cell">Swasta</th>
                                                        <th className="numeric-cell">Total</th>
                                                        <th className="numeric-cell">Negeri</th>
                                                        <th className="numeric-cell">Swasta</th>
                                                        <th className="numeric-cell">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.loading ?
                                                <>
                                                    {this.props.dummy_rows.rows.map((option)=>{
                                                        return (
                                                            <tr>
                                                                <td className="label-cell skeleton-text skeleton-effect-blink">
                                                                    loremipsum
                                                                </td>
                                                                <td className="label-cell skeleton-text skeleton-effect-blink">lorenipsumlorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </>
                                                :
                                                <>
                                                {this.props.rekap_gtk_ringkasan.rows.map((option)=>{
                                                    return(
                                                        <tr key={option.kode_wilayah}>
                                                            <td className="label-cell">
                                                                {option.nama}<br/>
                                                                {parseInt(option.id_level_wilayah) === 1 && <span></span>}
                                                                {parseInt(option.id_level_wilayah) === 2 && <span style={{fontSize:'11px', color:'#434343'}}>{option.induk_propinsi}</span>}
                                                                {parseInt(option.id_level_wilayah) === 3 && <span style={{fontSize:'11px', color:'#434343'}}>{option.induk_kabupaten}</span>}
                                                            </td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt(option.guru_negeri))}</td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt(option.guru_swasta))}</td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt((parseInt(option.guru_negeri)+parseInt(option.guru_swasta))))}</td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt(option.tendik_negeri))}</td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt(option.tendik_swasta))}</td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt((parseInt(option.tendik_negeri)+parseInt(option.tendik_swasta))))}</td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt(option.gtk_negeri))}</td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt(option.gtk_swasta))}</td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt((parseInt(option.gtk_negeri)+parseInt(option.gtk_swasta))))}</td>
                                                        </tr>
                                                    )
                                                })}
                                                </>
                                                }
                                                </tbody>
                                            </table>
                                            <div className="data-table-footer" style={{display:'block', height:'75px'}}>
                                                <div className="data-table-pagination">
                                                    &nbsp;
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Col>
                            <Col width="100" tabletWidth="50">
                                <Card>
                                    <CardContent>
                                        <BlockTitle className="publikasiJudul">Rekap Peserta Didik Wilayah</BlockTitle>
                                        <div className="data-table" style={{overflowY:'hidden'}}>
                                            <table>
                                                <thead style={{background:'#eeeeee'}}>
                                                    <tr>
                                                        <th className="label-cell" rowSpan="2" style={{minWidth:'40px'}}>&nbsp;</th>
                                                        <th className="label-cell" rowSpan="2" style={{minWidth:'200px', color:'#434343', fontSize:'15px'}}>Wilayah</th>
                                                        <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}} colSpan="3">Status</th>
                                                        <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}} colSpan="13">Tingkat Pendidikan</th>
                                                    </tr>
                                                    <tr>
                                                        <th className="numeric-cell">Negeri</th>
                                                        <th className="numeric-cell">Swasta</th>
                                                        <th className="numeric-cell">Total</th>
                                                        <th className="numeric-cell">Kelas 1</th>
                                                        <th className="numeric-cell">Kelas 2</th>
                                                        <th className="numeric-cell">Kelas 3</th>
                                                        <th className="numeric-cell">Kelas 4</th>
                                                        <th className="numeric-cell">Kelas 5</th>
                                                        <th className="numeric-cell">Kelas 6</th>
                                                        <th className="numeric-cell">Kelas 7</th>
                                                        <th className="numeric-cell">Kelas 8</th>
                                                        <th className="numeric-cell">Kelas 9</th>
                                                        <th className="numeric-cell">Kelas 10</th>
                                                        <th className="numeric-cell">Kelas 11</th>
                                                        <th className="numeric-cell">Kelas 12</th>
                                                        <th className="numeric-cell">Kelas 13</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.loading ?
                                                <>
                                                    {this.props.dummy_rows.rows.map((option)=>{
                                                        return (
                                                            <tr>
                                                                
                                                                <td className="label-cell skeleton-text skeleton-effect-blink">lorenipsumlorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                                <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </>
                                                :
                                                <>
                                                {this.props.rekap_peserta_didik_ringkasan.rows.map((option)=>{
                                                    return(
                                                        <tr key={option.kode_wilayah}>
                                                            
                                                            <td className="label-cell">
                                                                {option.nama}<br/>
                                                                {parseInt(option.id_level_wilayah) === 1 && <span></span>}
                                                                {parseInt(option.id_level_wilayah) === 2 && <span style={{fontSize:'11px', color:'#434343'}}>{option.induk_propinsi}</span>}
                                                                {parseInt(option.id_level_wilayah) === 3 && <span style={{fontSize:'11px', color:'#434343'}}>{option.induk_kabupaten}</span>}
                                                            </td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_negeri))}</td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_swasta))}</td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt((parseInt(option.pd_negeri)+parseInt(option.pd_swasta))))}</td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_1))}</td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_2))}</td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_3))}</td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_4))}</td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_5))}</td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_6))}</td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_7))}</td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_8))}</td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_9))}</td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_10))}</td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_11))}</td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_12))}</td>
                                                            <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_13))}</td>
                                                        </tr>
                                                    )
                                                })}
                                                </>
                                                }
                                                </tbody>
                                            </table>
                                            <div className="data-table-footer" style={{display:'block', height:'75px'}}>
                                                <div className="data-table-pagination">
                                                    &nbsp;
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Col>
                        </Row>

                    </Block>
                </Col> */}
                <Col width="100">

                    <Block strong style={{marginTop:'8px', marginBottom:'8px'}}>
                        <Row>

                            <Col width={50} tabletWidth={25}>
                                <Link style={{width:'100%'}} href="/DataPokokSekolah/">
                                    <Card style={{width:'100%'}}>
                                        <CardContent style={{textAlign:'center'}}>
                                            <i style={{fontSize:'50px'}} className="f7-icons">search</i>
                                            <br/>
                                            <h3 style={{marginBottom:'0px'}}>Cari Sekolah</h3>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Col>
                            {localStorage.getItem('kode_aplikasi') !== 'SPM' &&
                            <Col width={50} tabletWidth={25}>
                                <Link style={{width:'100%'}} href="/RaporDapodik/">
                                    <Card style={{width:'100%'}}>
                                        <CardContent style={{textAlign:'center'}}>
                                            <i style={{fontSize:'50px'}} className="f7-icons">book</i>
                                            <br/>
                                            <h3 style={{marginBottom:'0px'}}>{(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')}</h3>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Col>
                            }
                            {localStorage.getItem('kode_aplikasi') === 'SIMDIK' &&
                            <Col width={50} tabletWidth={25}>
                                <Link style={{width:'100%'}} href="/ProfilPendidikan/">
                                    <Card style={{width:'100%'}}>
                                        <CardContent style={{textAlign:'center'}}>
                                            <i style={{fontSize:'50px'}} className="f7-icons">chart_pie_fill</i>
                                            <br/>
                                            <h3 style={{marginBottom:'0px'}}>Profil Pendidikan</h3>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Col>
                            }
                            {localStorage.getItem('kode_aplikasi') === 'SIMDIK' &&
                            <Col width={50} tabletWidth={25}>
                                <Link style={{width:'100%'}} href="/RekapData/">
                                    <Card style={{width:'100%'}}>
                                        <CardContent style={{textAlign:'center'}}>
                                            <i style={{fontSize:'50px'}} className="f7-icons">folder</i>
                                            <br/>
                                            <h3 style={{marginBottom:'0px'}}>Rekap Pendidikan</h3>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Col>
                            }
                        </Row>
                    </Block>
                </Col>
            </Row>
            {/* {localStorage.getItem('kode_aplikasi') === 'SIMDIK' && parseInt(localStorage.getItem('sudah_login')) === 1 && localStorage.getItem('jenjang_aplikasi') === '13' &&
            <Block strong style={{marginBottom:'8px', marginTop:'8px'}}>
                <Row noGap>
                    <Col width="100" tabletWidth="100">
                        <Card style={{background:'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',color:'white'}}>
                            <CardContent style={{textAlign:'center'}}>
                                <Gauge
                                    type="circle"
                                    value={this.props.rekap_validasi_beranda.valid ? parseFloat(parseFloat(this.props.rekap_validasi_beranda.valid)/parseFloat(this.props.rekap_validasi_beranda.total)).toFixed(4) : '0'}
                                    valueText={this.props.rekap_validasi_beranda.valid ? ((parseFloat(parseFloat(this.props.rekap_validasi_beranda.valid)/parseFloat(this.props.rekap_validasi_beranda.total)).toFixed(4)*100)+"%") : '0%'}
                                    valueTextColor="#000"
                                    borderColor="#009688"
                                    // labelText="of $1000 spent"
                                    labelTextColor="#4caf50"
                                    labelFontWeight={800}
                                    labelFontSize={12}
                                    borderWidth={30}
                                />
                                
                                <div style={{color:'#434343', width:'100%', textAlign:'center', marginTop:'8px'}}><b>{this.props.rekap_validasi_beranda.valid}</b> dari {this.props.rekap_validasi_beranda.total} sekolah valid</div>
                                <br/>   
                                <Button raised fill onClick={()=>this.$f7router.navigate(("/ValidasiData/"+(JSON.parse(localStorage.getItem('user')).kode_wilayah ? (JSON.parse(localStorage.getItem('user')).kode_wilayah.substring(0,2) === '00' ? '0' : (JSON.parse(localStorage.getItem('user')).kode_wilayah.substring(2,4) === '00' ? '1' : (JSON.parse(localStorage.getItem('user')).kode_wilayah.substring(4,6) === '00' ? '3' : '0') ) ) : localStorage.getItem('id_level_wilayah_aplikasi'))+"/"+(JSON.parse(localStorage.getItem('user')).kode_wilayah ? JSON.parse(localStorage.getItem('user')).kode_wilayah : localStorage.getItem('kode_wilayah_aplikasi'))))}>
                                    Selengkapnya
                                </Button>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="50" tabletWidth="50">

                    </Col>
                </Row>
            </Block>
            } */}
          </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateWindowDimension: Actions.updateWindowDimension,
    setLoading: Actions.setLoading,
    setTabActive: Actions.setTabActive,
    getRekapSekolahSarpras: Actions.getRekapSekolahSarpras,
    getRekapSekolahSarprasWilayah: Actions.getRekapSekolahSarprasWilayah,
    getSarprasKerusakanWilayah: Actions.getSarprasKerusakanWilayah,
    getSarprasKerusakanWilayahTabel: Actions.getSarprasKerusakanWilayahTabel,
    getSarprasJenisWilayah: Actions.getSarprasJenisWilayah,
    getSarprasJenisWilayahTabel: Actions.getSarprasJenisWilayahTabel,
    getSarprasKebutuhanRkbWilayah: Actions.getSarprasKebutuhanRkbWilayah,
    getSarprasKebutuhanRkbWilayahTabel: Actions.getSarprasKebutuhanRkbWilayahTabel,
    getRaporDapodikWilayah: Actions.getRaporDapodikWilayah,
    setRaporDapodikWilayah: Actions.setRaporDapodikWilayah,
    getRaporDapodikSekolah: Actions.getRaporDapodikSekolah,
    getRaporDapodikRadar: Actions.getRaporDapodikRadar,
    getRaporDapodikAkuratRadar: Actions.getRaporDapodikAkuratRadar,
    getRaporDapodikMutakhirRadar: Actions.getRaporDapodikMutakhirRadar,
    getWilayah: Actions.getWilayah,
    getSPMKabupaten: Actions.getSPMKabupaten,
    getSPMKabupatenPerKecamatan: Actions.getSPMKabupatenPerKecamatan,
    getSPMKabupatenPerSekolah: Actions.getSPMKabupatenPerSekolah,
    getRekapSekolahRingkasan: Actions.getRekapSekolahRingkasan,
    getRekapSekolahTotal: Actions.getRekapSekolahTotal,
    getPesertaDidikTingkatKelasPie: Actions.getPesertaDidikTingkatKelasPie,
    getGtkJenisPie: Actions.getGtkJenisPie,
    getRekapValidasiBeranda: Actions.getRekapValidasiBeranda,
    getRekapPesertaDidikRingkasan: Actions.getRekapPesertaDidikRingkasan,
    getRekapGTKRingkasan: Actions.getRekapGTKRingkasan,
    getIndexPendidikan: Actions.getIndexPendidikan,
    saveLog: Actions.saveLog
  }, dispatch);
}

function mapStateToProps({ App, Sarpras, RaporDapodik, Spm, RekapSekolah, PesertaDidik, Gtk, ValidasiData, RekapPesertaDidik, RekapGTK }) {
  return {
      window_dimension: App.window_dimension,
      loading: App.loading,
      tabBar: App.tabBar,
      wilayah: App.wilayah,
      rekap_sekolah_sarpras: Sarpras.rekap_sekolah_sarpras,
      rekap_sekolah_sarpras_wilayah: Sarpras.rekap_sekolah_sarpras_wilayah,
      sarpras_kerusakan_wilayah: Sarpras.sarpras_kerusakan_wilayah,
      sarpras_kerusakan_wilayah_tabel: Sarpras.sarpras_kerusakan_wilayah_tabel,
      sarpras_jenis_wilayah: Sarpras.sarpras_jenis_wilayah,
      sarpras_jenis_wilayah_tabel: Sarpras.sarpras_jenis_wilayah_tabel,
      sarpras_kebutuhan_rkb_wilayah: Sarpras.sarpras_kebutuhan_rkb_wilayah,
      sarpras_kebutuhan_rkb_wilayah_tabel: Sarpras.sarpras_kebutuhan_rkb_wilayah_tabel,
      rapor_dapodik_wilayah: RaporDapodik.rapor_dapodik_wilayah,
      rapor_dapodik_sekolah: RaporDapodik.rapor_dapodik_sekolah,
      rapor_dapodik_radar: RaporDapodik.rapor_dapodik_radar,
      rapor_dapodik_akurat_radar: RaporDapodik.rapor_dapodik_akurat_radar,
      rapor_dapodik_mutakhir_radar: RaporDapodik.rapor_dapodik_mutakhir_radar,
      spm_kabupaten: Spm.spm_kabupaten,
      spm_kabupaten_per_kecamatan: Spm.spm_kabupaten_per_kecamatan,
      spm_kabupaten_per_sekolah: Spm.spm_kabupaten_per_sekolah,
      dummy_rows: App.dummy_rows,
      rekap_sekolah_ringkasan: RekapSekolah.rekap_sekolah_ringkasan,
      rekap_sekolah_total: RekapSekolah.rekap_sekolah_total,
      peserta_didik_tingkat_kelas_pie: PesertaDidik.peserta_didik_tingkat_kelas_pie,
      gtk_jenis_pie: Gtk.gtk_jenis_pie,
      rekap_peserta_didik_ringkasan: RekapPesertaDidik.rekap_peserta_didik_ringkasan,
      rekap_gtk_ringkasan: RekapGTK.rekap_gtk_ringkasan,
      rekap_validasi_beranda: ValidasiData.rekap_validasi_beranda
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Beranda);