import React, {Component} from 'react';
import {
  App,
  Panel,
  Views,
  View,
  Statusbar,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  Link,
  Block,
  BlockTitle,
  LoginScreen,
  List,
  ListItem,
  AccordionContent} from 'framework7-react';
import LoginPage from '../pages/login';
// import {Provider} from 'react-redux';
// import store from 'store';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

import cordovaApp from '../js/cordova-app';
import routes from '../js/routes';

import 'framework7-icons';

class app extends Component {
  state = {
    // Framework7 Parameters
    wilayah_aplikasi: localStorage.getItem('wilayah_aplikasi'),
    f7params: {
      id: 'io.timkayu.simdik', // App bundle ID
      name: 'Simdik', // App name
      theme: 'ios', // Automatic theme detection
      // App root data
      data: function () {
        return {
          user: {
            firstName: 'Khalid',
            lastName: 'Saifuddin',
          },

        };
      },

      // App routes
      routes: routes,
      // Enable panel left visibility breakpoint
      panel: {
        leftBreakpoint: 960,
      },

      // Register service worker
      serviceWorker: this.$device.cordova ? {} : {
        path: '/service-worker.js',
      },
      // Input settings
      input: {
        scrollIntoViewOnFocus: this.$device.cordova && !this.$device.electron,
        scrollIntoViewCentered: this.$device.cordova && !this.$device.electron,
      },
      // Cordova Statusbar settings
      statusbar: {
        overlay: this.$device.cordova && this.$device.ios || 'auto',
        iosOverlaysWebView: true,
        androidOverlaysWebView: false,
      },
    },
    tabBar:{
      beranda: true,
      kategori: false,
      cari: false,
      materi: false,
      profil: false
    },
    // Login screen demo data
    username: '',
    password: '',
  };

    // this.onClickLinkTab = this.onClickLinkTab.bind(this);
    // this.onClickMenu = this.onClickMenu.bind(this);
  
  onClickLinkTab = (menu) => {
    // console.log(event);
    
    for (var property in this.props.tabBar) {
      // console.log(this.state.tabBar[property]);
      this.props.tabBar[property] = false;
    }
    
    this.props.tabBar[menu] = true;
    
    // console.log(this.props.tabBar);

    this.props.setTabActive(this.props.tabBar);
    // console.log(this.props.tabBar);

    // this.setState({
    //   ...this.state,
    //   tabBar: this.props.tabBar
    // });
  }

  onClickMenu(){
    console.log(this.props);
    // alert(menu);
  }

  componentDidMount = () => {
    // console.log(this);
    // console.log(this);
    // this.$f7route.navigate(localStorage.getItem('initial_route'));
    this.props.getWilayah({kode_wilayah:localStorage.getItem('kode_wilayah_aplikasi')}).then((result)=>{
      if(result.payload.rows.length > 0){
        // alert('jalan')
        // localStorage.setItem('wilayah_aplikasi', result.payload.rows[0].nama)
        this.setState({
          wilayah_aplikasi: result.payload.rows[0].nama
        })
      }
    })
  }

  gantiSemester = (b) => {
    localStorage.setItem('semester_id_aplikasi', b.target.value);
    console.log(localStorage.getItem('semester_id_aplikasi'));
  }

  keluar = () =>{
    // this.$f7.dialog.alert('oke');
    localStorage.setItem('sudah_login', '0');
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');

    if(localStorage.getItem('device') === 'android'){
        
        window.location.reload(true);

    }else{
        
        window.location.href="/";
        
    }
  }

  render() {
    // console.log(this.props.tabBar.beranda);
    // const {classes} = this.props;
    
    // console.log(classes);

    return (
      <App params={ this.state.f7params } hideToolbarOnScroll>
      {/* <Provider store={store}> */}
        {/* Status bar overlay for fullscreen mode*/}
        <Statusbar></Statusbar>

        {/* Left panel with cover effect when hidden */}
        {localStorage.getItem('harus_login') === "N" && parseInt(localStorage.getItem('sudah_login')) !== 1 &&
        <Panel left cover className="panelMenuUtama">
          <View>
            <Page>
              {localStorage.getItem('logo_aplikasi_2') &&
              <Navbar title={(<img src="/static/icons/logo_putih.png" style={{width:'135px'}} />)}/>
              }
              {!localStorage.getItem('logo_aplikasi_2') &&
              <Navbar title={localStorage.getItem('judul_aplikasi')}/>
              }
              {/* <List style={{marginBottom:'0px',marginTop:'0px'}}>
                Periode Semester
              </List> */}
              <List style={{marginBottom:'0px',marginTop:'0px'}}>
                <ListItem
                  title="Semester"
                  smartSelect
                >
              {/* <Block smartSelect strong style={{marginTop:'0px', marginBottom:'0px'}}> */}
                  <select onChange={this.gantiSemester} name="semester_id" defaultValue={localStorage.getItem('semester_id_aplikasi')}>
                    <option value="20202">2020/2021 Genap</option>
                    <option value="20201">2020/2021 Ganjil</option>
                    <option value="20192">2019/2020 Genap</option>
                    <option value="20191">2019/2020 Ganjil</option>
                    {/* <option value="20182">2018/2019 Genap</option>
                    <option value="20181">2018/2019 Ganjil</option> */}
                  </select>
                {/* </Block> */}
                </ListItem>
              </List>
              <Block strong style={{marginTop:'0px', marginBottom:'0px'}}>
                Wilayah <b>{this.state.wilayah_aplikasi}</b>
              </Block>
              {/* <BlockTitle>Left View Navigation</BlockTitle>
              <List>
                <ListItem link="/left-page-1/" title="Left Page 1"/>
                <ListItem link="/left-page-2/" title="Left Page 2"/>
              </List> */}
              <BlockTitle>Menu</BlockTitle>
              <List noHairlines>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/" view=".view-main" panelClose panel-close title="Beranda">
                  {/* <Icon slot="media" ios="f7:house"></Icon> */}
                  <i slot="media" className="f7-icons">house</i>
                </ListItem>
                {localStorage.getItem('kode_aplikasi') !== 'SPM' && localStorage.getItem('sudah_login') === '1' &&
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/DataPokokSekolah/" view=".view-main" panelClose panel-close title="Cari Sekolah">
                  {/* <Icon slot="media" ios="f7:search"></Icon> */}
                  <i slot="media" className="f7-icons">search</i>
                </ListItem>
                }
                {localStorage.getItem('kode_aplikasi') !== 'SPM' &&
                <ListItem noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link={"/RaporDapodikRingkasan/"+localStorage.getItem('id_level_wilayah_aplikasi')+"/"+localStorage.getItem('kode_wilayah_aplikasi')} view=".view-main" panelClose panel-close title={(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')}>
                {/* <ListItem link={(localStorage.getItem('id_level_wilayah_aplikasi') === '0' ? "/RaporDapodik/" : (localStorage.getItem('id_level_wilayah_aplikasi') === '1' ? "/RaporDapodikProvinsi/"+localStorage.getItem('kode_wilayah_aplikasi') : "/RaporDapodikKabupaten/"+localStorage.getItem('kode_wilayah_aplikasi')))} view=".view-main" panelClose panel-close title={(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')}> */}
                  {/* <Icon slot="media" ios="f7:book"></Icon> */}
                  <i slot="media" className="f7-icons">book</i>
                </ListItem>
                }
                {localStorage.getItem('kode_aplikasi') !== 'SPM' && localStorage.getItem('sudah_login') === '1' && parseInt(JSON.parse(localStorage.getItem('user')).verified) === 1 && localStorage.getItem('jenjang_aplikasi') === '13' &&
                <ListItem noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link={"/ValidasiData/"+(JSON.parse(localStorage.getItem('user')).kode_wilayah ? JSON.parse(localStorage.getItem('user')).kode_wilayah : localStorage.getItem('id_level_wilayah_aplikasi'))+"/"+localStorage.getItem('kode_wilayah_aplikasi')} view=".view-main" panelClose panel-close title={'Validasi Data'}>
                {/* <ListItem link={(localStorage.getItem('id_level_wilayah_aplikasi') === '0' ? "/RaporDapodik/" : (localStorage.getItem('id_level_wilayah_aplikasi') === '1' ? "/RaporDapodikProvinsi/"+localStorage.getItem('kode_wilayah_aplikasi') : "/RaporDapodikKabupaten/"+localStorage.getItem('kode_wilayah_aplikasi')))} view=".view-main" panelClose panel-close title={(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')}> */}
                  {/* <Icon slot="media" ios="f7:book"></Icon> */}
                  <i slot="media" className="f7-icons">checkmark_shield_fill</i>
                </ListItem>
                }
                {/* {localStorage.getItem('kode_aplikasi') !== 'SPM' &&
                <ListItem noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link={"/RaporSNP/"+localStorage.getItem('id_level_wilayah_aplikasi')+"/"+localStorage.getItem('kode_wilayah_aplikasi')} view=".view-main" panelClose panel-close title="Rapor SNP">
                  <i slot="media" className="f7-icons">book</i>
                </ListItem>
                } */}
                {localStorage.getItem('kode_aplikasi') === 'SIMDIK' &&
                <ListItem noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link="/RekapData/" view=".view-main" panelClose panel-close title="Rekap Data">
                  {/* <Icon slot="media" ios="f7:folder"></Icon> */}
                  <i slot="media" className="f7-icons">folder</i>
                </ListItem>
                }
                {localStorage.getItem('kode_aplikasi') !== 'SPM' &&
                <ListItem noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link={"/Transisi/PetaSekolah"} view=".view-main" panelClose panel-close title={"Peta Sebaran Sekolah"}>
                {/* <ListItem link={(localStorage.getItem('id_level_wilayah_aplikasi') === '0' ? "/RaporDapodik/" : (localStorage.getItem('id_level_wilayah_aplikasi') === '1' ? "/RaporDapodikProvinsi/"+localStorage.getItem('kode_wilayah_aplikasi') : "/RaporDapodikKabupaten/"+localStorage.getItem('kode_wilayah_aplikasi')))} view=".view-main" panelClose panel-close title={(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')}> */}
                  {/* <Icon slot="media" ios="f7:book"></Icon> */}
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                }
                {/* {localStorage.getItem('kode_aplikasi') === 'SIMDIK' &&
                <ListItem noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link="/ProfilPendidikan" view=".view-main" panelClose panel-close title="Profil Pendidikan">
                  <i slot="media" className="f7-icons">chart_pie_fill</i>
                </ListItem>
                } */}
                {localStorage.getItem('kode_aplikasi') === 'SIMDIK' && localStorage.getItem('sudah_login') === '1' &&
                <ListItem noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link="/Peta" view=".view-main" panelClose panel-close title="Peta">
                  {/* <Icon slot="media" ios="f7:house"></Icon> */}
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                }
                {localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' &&
                <ListItem noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link="/Peta" view=".view-main" panelClose panel-close title="Peta">
                  {/* <Icon slot="media" ios="f7:house"></Icon> */}
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                }
                {/* {localStorage.getItem('kode_aplikasi') === 'SIMDIK' && localStorage.getItem('kode_wilayah_aplikasi') === '000000' && */}
                {localStorage.getItem('kode_aplikasi') === 'SIMDIK' && localStorage.getItem('sudah_login') === '1' &&
                <ListItem noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link="/CustomQuery/" view=".view-main" panelClose panel-close title="Custom Query">
                  {/* <Icon slot="media" ios="f7:house"></Icon> */}
                  <i slot="media" className="f7-icons">quote_bubble</i>
                </ListItem>
                }
                {localStorage.getItem('kode_aplikasi') === 'SIMDIK' && localStorage.getItem('kode_wilayah_aplikasi') === '020800' && localStorage.getItem('sudah_login') === '1' &&
                <ListItem noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link="/formIndexPendidikan/" view=".view-main" panelClose panel-close title="Indikator Pendidikan">
                  {/* <Icon slot="media" ios="f7:house"></Icon> */}
                  <i slot="media" className="f7-icons">quote_bubble</i>
                </ListItem>
                }
                {/* {localStorage.getItem('kode_aplikasi') === 'SIMDIK' &&
                <ListItem noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link="/rpp" view=".view-main" panelClose panel-close title="RPP (Form Layout)">
                  <i slot="media" className="f7-icons">doc_append</i>
                </ListItem>
                } */}
                {/* <ListItem onClick={()=>{this.onClickMenu('kategori')}} link="/cari/" view=".view-main" panelClose panel-close title="Cari">
                  <Icon slot="media" ios="f7:search"></Icon>
                </ListItem> */}
                {/* <ListItem onClick={()=>{this.onClickMenu('kategori')}} link="/kategori/" view=".view-main" panelClose panel-close title="Kategori">
                  <Icon slot="media" ios="f7:list_fill"></Icon>
                </ListItem>
                <ListItem onClick={()=>{this.onClickMenu('kategori')}} link="/materi/" view=".view-main" panelClose panel-close title="Materi">
                  <Icon slot="media" ios="f7:document_text_fill"></Icon>
                </ListItem>
                <ListItem onClick={()=>{this.onClickMenu('tentang')}} link="/about/" view=".view-main" panelClose panel-close title="Tentang">
                  <Icon slot="media" ios="f7:info_round"></Icon>
                </ListItem> */}
                {/* <ListItem onClick={()=>{this.onClickMenu('masuk')}} view=".view-main" panelClose panel-close >
                  <Button fill loginScreenOpen="#my-login-screen" style={{width:'100%'}}>
                    <Icon slot="media" ios="f7:enter_fill"></Icon>
                    Masuk
                  </Button>
                </ListItem> */}
                {/* <ListItem onClick={()=>{this.onClickMenu('form')}} link="/form/" view=".view-main" panelClose panel-close title="Form"/>
                <ListItem onClick={()=>{this.onClickMenu('catalog')}} link="/catalog/" view=".view-main" panelClose panel-close title="Catalog"/>
                <ListItem onClick={()=>{this.onClickMenu('back_history')}} link="#" view=".view-main" back panelClose panel-close title="Back in history"/> */}
              </List>
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <BlockTitle>Pendataan</BlockTitle>
              }
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <List>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/formATS" view=".view-main" panelClose panel-close title="Anak Tidak Sekolah">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/formAnakMiskin" view=".view-main" panelClose panel-close title="PD Miskin">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
              </List>
              }
              
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <BlockTitle>Rekapitulasi</BlockTitle>
              }
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <List>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/SPMUsiaSekolah" view=".view-main" panelClose panel-close title="Usia Sekolah (1.3a)">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/SPMLuarWilayah" view=".view-main" panelClose panel-close title="Peserta Didik (1.3b)">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/SPMSatuanPendidikan" view=".view-main" panelClose panel-close title="Satuan Pendidikan  (1.3c)">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/SPMPendidik" view=".view-main" panelClose panel-close title="Pendidik (1.3d)">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/SPMKepsek" view=".view-main" panelClose panel-close title="Kepala Sekolah (1.3e)">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/SPMTenagaPenunjang" view=".view-main" panelClose panel-close title="Tenaga Penunjang (1.3f)">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                {/* <ListItem noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link="/adv" view=".view-main" panelClose panel-close title="Tenaga Laboran">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem> */}
              </List>
              }
              
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <BlockTitle>Perhitungan</BlockTitle>
              }
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <List>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/tabel21" view=".view-main" panelClose panel-close title="Anak Tidak Sekolah (2.1)">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/formPenerimaSPM" view=".view-main" panelClose panel-close title="Penerima SPM (2.2)">
                  <i slot="media" className="f7-icons">layers_fill</i>
                </ListItem>
              </List>
              }
              
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <BlockTitle>Perencanaan</BlockTitle>
              }
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <List>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/tabel31" view=".view-main" panelClose panel-close title="Anak Tidak Sekolah (3.1)">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/formRencanaPemenuhanSPM" view=".view-main" panelClose panel-close title="Penerima SPM (3.2)">
                  <i slot="media" className="f7-icons">lightbulb_fill</i>
                </ListItem>
              </List>
              }
              
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <BlockTitle>Pelaksanaan</BlockTitle>
              }
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <List>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/tabel41" view=".view-main" panelClose panel-close title="Anak Tidak Sekolah (4.1)">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/tabel42" view=".view-main" panelClose panel-close title="Penerima SPM (4.2)">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
              </List>
              }
              
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <BlockTitle>Pelaporan</BlockTitle>
              }
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <List>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/tabel43" view=".view-main" panelClose panel-close title="Capaian SPM (4.3)">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
              </List>
              }

              {localStorage.getItem('sudah_login') === '0' && 
              <List>
                  <ListItem link="/login" view=".view-main" panelClose panel-close title="Login/Masuk">
                    <i slot="media" className="f7-icons">square_arrow_right</i>
                  </ListItem>
              </List>
              }
              {localStorage.getItem('sudah_login') === '1' && 
              <>
              <BlockTitle>Pengaturan</BlockTitle>
              <List>
                  <ListItem style={{background:'#E3F2FD'}} link="/ProfilPengguna" view=".view-main" panelClose panel-close title="Profil Pengguna">
                    <i slot="media" className="f7-icons">person_crop_square_fill</i>
                  </ListItem>
                  
                  {localStorage.getItem('user') && parseInt(JSON.parse(localStorage.getItem('user')).peran_id) === 1 && localStorage.getItem('kode_aplikasi') !== 'SPM' &&
                  <ListItem style={{background:'#E3F2FD'}} link="/Pengaturan" view=".view-main" panelClose panel-close title="Pengaturan">
                    <i slot="media" className="f7-icons">gear_alt</i>
                  </ListItem>
                  }
                  <ListItem onClick={this.keluar} panelClose panel-close title="Keluar" style={{background:'#ef5350', cursor: 'pointer', color:'white'}}>
                    <i slot="media" className="f7-icons">square_arrow_left</i>
                  </ListItem>
              </List>
              </>
              }
            </Page>
          </View>
        </Panel>
        }

        {parseInt(localStorage.getItem('sudah_login')) === 1 &&
        <Panel left cover className="panelMenuUtama">
          <View>
            <Page>
              {/* <Navbar title={localStorage.getItem('judul_aplikasi')}/> */}
              {localStorage.getItem('logo_aplikasi_2') &&
              <Navbar title={(<img src="/static/icons/logo_putih.png" style={{width:'135px'}} />)}/>
              }
              {!localStorage.getItem('logo_aplikasi_2') &&
              <Navbar title={localStorage.getItem('judul_aplikasi')}/>
              }
              {/* <List style={{marginBottom:'0px',marginTop:'0px'}}>
                Periode Semester
              </List> */}
              <List style={{marginBottom:'0px',marginTop:'0px'}}>
                <ListItem
                  title="Semester"
                  smartSelect
                >
              {/* <Block smartSelect strong style={{marginTop:'0px', marginBottom:'0px'}}> */}
                  <select onChange={this.gantiSemester} name="semester_id" defaultValue={localStorage.getItem('semester_id_aplikasi')}>
                    <option value="20201">2020/2021 Genap</option>
                    <option value="20201">2020/2021 Ganjil</option>
                    <option value="20192">2019/2020 Genap</option>
                    <option value="20191">2019/2020 Ganjil</option>
                    {/* <option value="20182">2018/2019 Genap</option>
                    <option value="20181">2018/2019 Ganjil</option> */}
                  </select>
                {/* </Block> */}
                </ListItem>
              </List>
              <Block strong style={{marginTop:'0px', marginBottom:'0px'}}>
                Wilayah <b>{this.state.wilayah_aplikasi}</b>
              </Block>
              {/* <BlockTitle>Left View Navigation</BlockTitle>
              <List>
                <ListItem link="/left-page-1/" title="Left Page 1"/>
                <ListItem link="/left-page-2/" title="Left Page 2"/>
              </List> */}
              <BlockTitle>Menu</BlockTitle>
              <List noHairlines>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/" view=".view-main" panelClose panel-close title="Beranda">
                  {/* <Icon slot="media" ios="f7:house"></Icon> */}
                  <i slot="media" className="f7-icons">house</i>
                </ListItem>
                {localStorage.getItem('kode_aplikasi') !== 'SPM' && localStorage.getItem('sudah_login') === '1' &&
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/DataPokokSekolah/" view=".view-main" panelClose panel-close title="Cari Sekolah">
                  {/* <Icon slot="media" ios="f7:search"></Icon> */}
                  <i slot="media" className="f7-icons">search</i>
                </ListItem>
                }
                {localStorage.getItem('kode_aplikasi') !== 'SPM' &&
                <ListItem noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link={"/RaporDapodikRingkasan/"+localStorage.getItem('id_level_wilayah_aplikasi')+"/"+localStorage.getItem('kode_wilayah_aplikasi')} view=".view-main" panelClose panel-close title={(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')}>
                {/* <ListItem link={(localStorage.getItem('id_level_wilayah_aplikasi') === '0' ? "/RaporDapodik/" : (localStorage.getItem('id_level_wilayah_aplikasi') === '1' ? "/RaporDapodikProvinsi/"+localStorage.getItem('kode_wilayah_aplikasi') : "/RaporDapodikKabupaten/"+localStorage.getItem('kode_wilayah_aplikasi')))} view=".view-main" panelClose panel-close title={(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')}> */}
                  {/* <Icon slot="media" ios="f7:book"></Icon> */}
                  <i slot="media" className="f7-icons">book</i>
                </ListItem>
                }
                {/* {localStorage.getItem('kode_aplikasi') !== 'SPM' && localStorage.getItem('sudah_login') === '1' && parseInt(JSON.parse(localStorage.getItem('user')).verified) === 1 && localStorage.getItem('jenjang_aplikasi') === '13' &&
                <ListItem noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link={"/ValidasiData/"+(JSON.parse(localStorage.getItem('user')).kode_wilayah ? JSON.parse(localStorage.getItem('user')).kode_wilayah : localStorage.getItem('id_level_wilayah_aplikasi'))+"/"+localStorage.getItem('kode_wilayah_aplikasi')} view=".view-main" panelClose panel-close title={'Validasi Data'}>
                  <i slot="media" className="f7-icons">checkmark_shield_fill</i>
                </ListItem>
                } */}
                {/* {localStorage.getItem('kode_aplikasi') !== 'SPM' &&
                <ListItem noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link={"/RaporSNP/"+localStorage.getItem('id_level_wilayah_aplikasi')+"/"+localStorage.getItem('kode_wilayah_aplikasi')} view=".view-main" panelClose panel-close title="Rapor SNP">
                  <i slot="media" className="f7-icons">book</i>
                </ListItem>
                } */}
                {localStorage.getItem('kode_aplikasi') === 'SIMDIK' &&
                <ListItem noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link="/RekapData/" view=".view-main" panelClose panel-close title="Rekap Data">
                  {/* <Icon slot="media" ios="f7:folder"></Icon> */}
                  <i slot="media" className="f7-icons">folder</i>
                </ListItem>
                }
                {/* {localStorage.getItem('kode_aplikasi') === 'SIMDIK' &&
                <ListItem noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link="/ProfilPendidikan" view=".view-main" panelClose panel-close title="Profil Pendidikan">
                  <i slot="media" className="f7-icons">chart_pie_fill</i>
                </ListItem>
                } */}
                {localStorage.getItem('kode_aplikasi') !== 'SPM' &&
                <ListItem noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link={"/Transisi/PetaSekolah"} view=".view-main" panelClose panel-close title={"Peta Sebaran Sekolah"}>
                {/* <ListItem link={(localStorage.getItem('id_level_wilayah_aplikasi') === '0' ? "/RaporDapodik/" : (localStorage.getItem('id_level_wilayah_aplikasi') === '1' ? "/RaporDapodikProvinsi/"+localStorage.getItem('kode_wilayah_aplikasi') : "/RaporDapodikKabupaten/"+localStorage.getItem('kode_wilayah_aplikasi')))} view=".view-main" panelClose panel-close title={(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')}> */}
                  {/* <Icon slot="media" ios="f7:book"></Icon> */}
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                }
                {localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' &&
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/Peta" view=".view-main" panelClose panel-close title="Peta">
                  {/* <Icon slot="media" ios="f7:house"></Icon> */}
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                }
                {/* {localStorage.getItem('kode_aplikasi') === 'SIMDIK' && localStorage.getItem('kode_wilayah_aplikasi') === '000000' && */}
                {localStorage.getItem('kode_aplikasi') === 'SIMDIK' && localStorage.getItem('sudah_login') === '1' &&
                <ListItem view=".view-main" accordionItem title="Custom Query" style={{background:'#E3F2FD', fontSize:'14px'}}>
                  <i slot="media" className="f7-icons">cube_box</i>
                  <AccordionContent>
                    {localStorage.getItem('kode_aplikasi') === 'SIMDIK' &&
                    <ListItem className="itemSub" noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link="/CustomQuery/" view=".view-main" panelClose panel-close title="Custom Query Sekolah">
                      <i slot="media" className="f7-icons">quote_bubble</i>
                    </ListItem>
                    }
                    {localStorage.getItem('kode_aplikasi') === 'SIMDIK' && 
                    <ListItem className="itemSub"  noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link="/CustomQueryPesertaDidik/" view=".view-main" panelClose panel-close title="Custom Query PD">
                      <i slot="media" className="f7-icons">quote_bubble</i>
                    </ListItem>
                    }
                    {localStorage.getItem('kode_aplikasi') === 'SIMDIK' && 
                    <ListItem className="itemSub"  noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link="/CustomQueryGTK/" view=".view-main" panelClose panel-close title="Custom Query GTK">
                      <i slot="media" className="f7-icons">quote_bubble</i>
                    </ListItem>
                    }
                    {localStorage.getItem('kode_aplikasi') === 'SIMDIK' && 
                    <ListItem className="itemSub"  noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link="/CustomQuerySarpras/" view=".view-main" panelClose panel-close title="Custom Query Sarpras">
                      <i slot="media" className="f7-icons">quote_bubble</i>
                    </ListItem>
                    }
                  </AccordionContent>
                </ListItem>
                }
                {/* {localStorage.getItem('kode_aplikasi') === 'SIMDIK' && 
                <ListItem noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link="/CustomQuerySekolah/" view=".view-main" panelClose panel-close title="Custom Query Sekolah">
                  <i slot="media" className="f7-icons">quote_bubble</i>
                </ListItem>
                } */}
                {localStorage.getItem('kode_aplikasi') === 'SIMDIK' && localStorage.getItem('kode_wilayah_aplikasi') === '020800' &&
                <ListItem noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link="/formIndexPendidikan/" view=".view-main" panelClose panel-close title="Index Pendidikan">
                  {/* <Icon slot="media" ios="f7:house"></Icon> */}
                  <i slot="media" className="f7-icons">quote_bubble</i>
                </ListItem>
                }
                {/* {localStorage.getItem('kode_aplikasi') === 'SIMDIK' &&
                <ListItem noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link="/rpp" view=".view-main" panelClose panel-close title="RPP (Form Layout)">
                  <i slot="media" className="f7-icons">doc_append</i>
                </ListItem>
                } */}
                {/* <ListItem onClick={()=>{this.onClickMenu('kategori')}} link="/cari/" view=".view-main" panelClose panel-close title="Cari">
                  <Icon slot="media" ios="f7:search"></Icon>
                </ListItem> */}
                {/* <ListItem onClick={()=>{this.onClickMenu('kategori')}} link="/kategori/" view=".view-main" panelClose panel-close title="Kategori">
                  <Icon slot="media" ios="f7:list_fill"></Icon>
                </ListItem>
                <ListItem onClick={()=>{this.onClickMenu('kategori')}} link="/materi/" view=".view-main" panelClose panel-close title="Materi">
                  <Icon slot="media" ios="f7:document_text_fill"></Icon>
                </ListItem>
                <ListItem onClick={()=>{this.onClickMenu('tentang')}} link="/about/" view=".view-main" panelClose panel-close title="Tentang">
                  <Icon slot="media" ios="f7:info_round"></Icon>
                </ListItem> */}
                {/* <ListItem onClick={()=>{this.onClickMenu('masuk')}} view=".view-main" panelClose panel-close >
                  <Button fill loginScreenOpen="#my-login-screen" style={{width:'100%'}}>
                    <Icon slot="media" ios="f7:enter_fill"></Icon>
                    Masuk
                  </Button>
                </ListItem> */}
                {/* <ListItem onClick={()=>{this.onClickMenu('form')}} link="/form/" view=".view-main" panelClose panel-close title="Form"/>
                <ListItem onClick={()=>{this.onClickMenu('catalog')}} link="/catalog/" view=".view-main" panelClose panel-close title="Catalog"/>
                <ListItem onClick={()=>{this.onClickMenu('back_history')}} link="#" view=".view-main" back panelClose panel-close title="Back in history"/> */}
              </List>
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <BlockTitle>Pendataan</BlockTitle>
              }
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <List>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/formATS" view=".view-main" panelClose panel-close title="Anak Tidak Sekolah">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/formAnakMiskin" view=".view-main" panelClose panel-close title="PD Miskin">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
              </List>
              }
              
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <BlockTitle>Rekapitulasi</BlockTitle>
              }
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <List>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/SPMUsiaSekolah" view=".view-main" panelClose panel-close title="Usia Sekolah (1.3a)">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/SPMLuarWilayah" view=".view-main" panelClose panel-close title="Peserta Didik (1.3b)">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/SPMSatuanPendidikan" view=".view-main" panelClose panel-close title="Satuan Pendidikan  (1.3c)">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/SPMPendidik" view=".view-main" panelClose panel-close title="Pendidik (1.3d)">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/SPMKepsek" view=".view-main" panelClose panel-close title="Kepala Sekolah (1.3e)">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/SPMTenagaPenunjang" view=".view-main" panelClose panel-close title="Tenaga Penunjang (1.3f)">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                {/* <ListItem noHairlines  style={{background:'#E3F2FD', fontSize:'14px'}} link="/adv" view=".view-main" panelClose panel-close title="Tenaga Laboran">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem> */}
              </List>
              }
              
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <BlockTitle>Perhitungan</BlockTitle>
              }
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <List>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/tabel21" view=".view-main" panelClose panel-close title="Anak Tidak Sekolah (2.1)">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/formPenerimaSPM" view=".view-main" panelClose panel-close title="Penerima SPM (2.2)">
                  <i slot="media" className="f7-icons">layers_fill</i>
                </ListItem>
              </List>
              }
              
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <BlockTitle>Perencanaan</BlockTitle>
              }
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <List>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/tabel31" view=".view-main" panelClose panel-close title="Anak Tidak Sekolah (3.1)">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/formRencanaPemenuhanSPM" view=".view-main" panelClose panel-close title="Penerima SPM (3.2)">
                  <i slot="media" className="f7-icons">lightbulb_fill</i>
                </ListItem>
              </List>
              }
              
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <BlockTitle>Pelaksanaan</BlockTitle>
              }
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <List>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/tabel41" view=".view-main" panelClose panel-close title="Anak Tidak Sekolah (4.1)">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/tabel42" view=".view-main" panelClose panel-close title="Penerima SPM (4.2)">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
              </List>
              }
              
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <BlockTitle>Pelaporan</BlockTitle>
              }
              {localStorage.getItem('kode_aplikasi') === 'SPM' &&
              <List>
                <ListItem noHairlines style={{background:'#E3F2FD', fontSize:'14px'}} link="/tabel43" view=".view-main" panelClose panel-close title="Capaian SPM (4.3)">
                  <i slot="media" className="f7-icons">map</i>
                </ListItem>
              </List>
              }

              {localStorage.getItem('sudah_login') === '0' && 
              <List>
                  <ListItem link="/login" view=".view-main" panelClose panel-close title="Login/Masuk">
                    <i slot="media" className="f7-icons">square_arrow_right</i>
                  </ListItem>
              </List>
              }
              {localStorage.getItem('sudah_login') === '1' && 
              <>
              <BlockTitle>Pengaturan</BlockTitle>
              <List>
                  <ListItem style={{background:'#E3F2FD'}} link="/ProfilPengguna" view=".view-main" panelClose panel-close title="Profil Pengguna">
                    <i slot="media" className="f7-icons">person_crop_square_fill</i>
                  </ListItem>
                  
                  {localStorage.getItem('user') && parseInt(JSON.parse(localStorage.getItem('user')).peran_id) === 1 && localStorage.getItem('kode_aplikasi') !== 'SPM' &&
                  <ListItem style={{background:'#E3F2FD'}} link="/Pengaturan" view=".view-main" panelClose panel-close title="Pengaturan">
                    <i slot="media" className="f7-icons">gear_alt</i>
                  </ListItem>
                  }
                  <ListItem onClick={this.keluar} panelClose panel-close title="Keluar" style={{background:'#ef5350', cursor: 'pointer', color:'white'}}>
                    <i slot="media" className="f7-icons">square_arrow_left</i>
                  </ListItem>
              </List>
              </>
              }
            </Page>
          </View>
        </Panel>
        }


        {/* Right panel with reveal effect*/}
        <Panel right cover themeDark style={{width:'320px'}}>
            <View>
                <Page>
                    <Navbar title={this.props.judul_panel_kanan}/>
                    <Block style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      {this.props.isi_panel_kanan}
                    </Block>
                </Page>
            </View>
        </Panel>


        {/* Your main view, should have "view-main" class */}
        {/* <View main className="safe-areas" url="/" /> */}

        {/* Views/Tabs container */}
        <Views tabs className="safe-areas" hideToolbarOnScroll>
          {/* Tabbar for switching views-tabs */}

          {localStorage.getItem('harus_login') === 'N' && parseInt(localStorage.getItem('sudah_login')) !== 1 &&
          <Toolbar labels bottom className="mobileTab" hideToolbarOnScroll>
            <Link 
              href="/" 
              // onClick={()=>{this.onClickLinkTab('beranda')}} 
              tabLinkActive={this.props.tabBar.beranda} 
              iconIos="f7:house" 
              iconAurora="f7:house" 
              iconMd="f7:house" 
              text="Beranda" 
              style={{fontSize:'12px'}} 
            />
            <Link 
              href="/DataPokokSekolah/" 
              // onClick={()=>{this.onClickLinkTab('DataPokokSekolah')}} 
              tabLinkActive={this.props.tabBar.DataPokokSekolah} 
              iconIos="f7:search_fil" 
              iconMd="f7:search_fil" 
              text="Cari" 
              style={{fontSize:'12px'}} 
            />
            {localStorage.getItem('kode_aplikasi') !== 'SPM' &&
            <>
            <Link 
              // href="/RaporDapodik/" 
              href={"/RaporDapodikRingkasan/"+localStorage.getItem('id_level_wilayah_aplikasi')+"/"+localStorage.getItem('kode_wilayah_aplikasi')}
              // href={(localStorage.getItem('id_level_wilayah_aplikasi') === '0' ? "/RaporDapodik/" : (localStorage.getItem('id_level_wilayah_aplikasi') === '1' ? "/RaporDapodikProvinsi/"+localStorage.getItem('kode_wilayah_aplikasi') : "/RaporDapodikKabupaten/"+localStorage.getItem('kode_wilayah_aplikasi')))}
              // onClick={()=>{this.onClickLinkTab('RaporDapodik')}} 
              tabLinkActive={this.props.tabBar.RaporDapodik} 
              iconIos="f7:book"
              iconMd="f7:book"
              text="Rapor" 
              style={{fontSize:'12px'}} 
            />
            {localStorage.getItem('kode_aplikasi') === 'SIMDIK' && localStorage.getItem('sudah_login') !== '0' && parseInt(JSON.parse(localStorage.getItem('user')).verified) === 1 && localStorage.getItem('jenjang_aplikasi') === 13 && 
            <Link 
              href={("/ValidasiData/"+(JSON.parse(localStorage.getItem('user')).kode_wilayah ? (JSON.parse(localStorage.getItem('user')).kode_wilayah.substring(0,2) === '00' ? '0' : (JSON.parse(localStorage.getItem('user')).kode_wilayah.substring(2,4) === '00' ? '1' : (JSON.parse(localStorage.getItem('user')).kode_wilayah.substring(4,6) === '00' ? '3' : '0') ) ) : localStorage.getItem('id_level_wilayah_aplikasi'))+"/"+(JSON.parse(localStorage.getItem('user')).kode_wilayah ? JSON.parse(localStorage.getItem('user')).kode_wilayah : localStorage.getItem('kode_wilayah_aplikasi')))} 
              // onClick={()=>{this.onClickLinkTab('RekapData')}} 
              tabLinkActive={this.props.tabBar.RaporData} 
              iconIos="f7:checkmark_shield_fill" 
              iconMd="f7:checkmark_shield_fill" 
              text="Validasi" 
              style={{fontSize:'12px'}} 
            />
            }            
            {localStorage.getItem('kode_aplikasi') === 'SIMDIK' &&
            <Link 
              href="/RekapData/" 
              // onClick={()=>{this.onClickLinkTab('RekapData')}} 
              tabLinkActive={this.props.tabBar.RaporData} 
              iconIos="f7:folder" 
              iconMd="f7:folder" 
              text="Rekap" 
              style={{fontSize:'12px'}} 
            />
            }
            {localStorage.getItem('kode_aplikasi') === 'SIMDIK' && localStorage.getItem('kode_wilayah_aplikasi') === '000000' &&
            <Link 
              href="/CustomQuery/" 
              // onClick={()=>{this.onClickLinkTab('RekapData')}} 
              tabLinkActive={this.props.tabBar.RaporData} 
              iconIos="f7:quote_bubble" 
              iconMd="f7:quote_bubble" 
              text="Custom Query" 
              style={{fontSize:'12px'}} 
            />
            }
            {localStorage.getItem('kode_aplikasi') === 'SIMDIK' && localStorage.getItem('kode_wilayah_aplikasi') === '020800' && parseInt(localStorage.getItem('sudah_login')) === 1 &&
            <Link 
            href="/formIndexPendidikan/" 
            tabLinkActive={this.props.tabBar.RaporData} 
            iconIos="f7:quote_bubble" 
            iconMd="f7:quote_bubble" 
            text="Index Pendidikan" 
            style={{fontSize:'12px'}} 
            />
            }
            {localStorage.getItem('sudah_login') === '0' &&
              <Link 
                href="/login" 
                // onClick={()=>{this.onClickLinkTab('beranda')}} 
                tabLinkActive={this.props.tabBar.beranda} 
                iconIos="f7:square_arrow_right" 
                iconAurora="f7:square_arrow_right" 
                iconMd="material:square_arrow_right" 
                text="Login" 
                style={{fontSize:'12px'}} 
              />
            }
            </>
            }
            {localStorage.getItem('kode_aplikasi') === 'SPM' &&
            <Link 
              href="/formPenerimaSPM" 
              tabLinkActive={this.props.tabBar.beranda} 
              iconIos="f7:layers_fill" 
              iconAurora="f7:layers_fill" 
              iconMd="material:layers_fill" 
              text="Hitung Penerima" 
              style={{fontSize:'12px'}} 
            />
            }
            {localStorage.getItem('kode_aplikasi') === 'SPM' &&
            <Link 
              href="/formRencanaPemenuhanSPM" 
              tabLinkActive={this.props.tabBar.beranda} 
              iconIos="f7:lightbulb_fill" 
              iconAurora="f7:lightbulb_fill" 
              iconMd="material:lightbulb_fill" 
              text="Pemenuhan" 
              style={{fontSize:'12px'}} 
            />
            }
            <Link 
              iconIos="f7:ellipsis" 
              iconAurora="f7:ellipsis" 
              iconMd="material:ellipsis" 
              text="More"
              panelOpen="left" 
              style={{fontSize:'12px'}}
            />
          </Toolbar>
          }

          {parseInt(localStorage.getItem('sudah_login')) === 1 &&
          <Toolbar labels bottom className="mobileTab" hideToolbarOnScroll>
            <Link 
              href="/" 
              // onClick={()=>{this.onClickLinkTab('beranda')}} 
              tabLinkActive={this.props.tabBar.beranda} 
              iconIos="f7:house" 
              iconAurora="f7:house" 
              iconMd="f7:house" 
              text="Beranda" 
              style={{fontSize:'12px'}} 
            />
            <Link 
              href="/DataPokokSekolah/" 
              // onClick={()=>{this.onClickLinkTab('DataPokokSekolah')}} 
              tabLinkActive={this.props.tabBar.DataPokokSekolah} 
              iconIos="f7:search_fil" 
              iconMd="f7:search_fil" 
              text="Cari" 
              style={{fontSize:'12px'}} 
            />
            {localStorage.getItem('kode_aplikasi') !== 'SPM' &&
            <>
            <Link 
              // href="/RaporDapodik/" 
              href={"/RaporDapodikRingkasan/"+localStorage.getItem('id_level_wilayah_aplikasi')+"/"+localStorage.getItem('kode_wilayah_aplikasi')}
              // href={(localStorage.getItem('id_level_wilayah_aplikasi') === '0' ? "/RaporDapodik/" : (localStorage.getItem('id_level_wilayah_aplikasi') === '1' ? "/RaporDapodikProvinsi/"+localStorage.getItem('kode_wilayah_aplikasi') : "/RaporDapodikKabupaten/"+localStorage.getItem('kode_wilayah_aplikasi')))}
              // onClick={()=>{this.onClickLinkTab('RaporDapodik')}} 
              tabLinkActive={this.props.tabBar.RaporDapodik} 
              iconIos="f7:book"
              iconMd="f7:book"
              text="Rapor" 
              style={{fontSize:'12px'}} 
            />
            {localStorage.getItem('kode_aplikasi') === 'SIMDIK' && localStorage.getItem('sudah_login') !== '0' && parseInt(JSON.parse(localStorage.getItem('user')).verified) === 1 && localStorage.getItem('jenjang_aplikasi') === 13 && 
            <Link 
              href={("/ValidasiData/"+(JSON.parse(localStorage.getItem('user')).kode_wilayah ? (JSON.parse(localStorage.getItem('user')).kode_wilayah.substring(0,2) === '00' ? '0' : (JSON.parse(localStorage.getItem('user')).kode_wilayah.substring(2,4) === '00' ? '1' : (JSON.parse(localStorage.getItem('user')).kode_wilayah.substring(4,6) === '00' ? '3' : '0') ) ) : localStorage.getItem('id_level_wilayah_aplikasi'))+"/"+(JSON.parse(localStorage.getItem('user')).kode_wilayah ? JSON.parse(localStorage.getItem('user')).kode_wilayah : localStorage.getItem('kode_wilayah_aplikasi')))} 
              // onClick={()=>{this.onClickLinkTab('RekapData')}} 
              tabLinkActive={this.props.tabBar.RaporData} 
              iconIos="f7:checkmark_shield_fill" 
              iconMd="f7:checkmark_shield_fill" 
              text="Validasi" 
              style={{fontSize:'12px'}} 
            />
            }
            {/* {localStorage.getItem('kode_aplikasi') === 'SIMDIK' &&
            <Link 
              href="/RekapData/" 
              // onClick={()=>{this.onClickLinkTab('RekapData')}} 
              tabLinkActive={this.props.tabBar.RaporData} 
              iconIos="f7:folder" 
              iconMd="f7:folder" 
              text="Rekap" 
              style={{fontSize:'12px'}} 
            />
            } */}
            {localStorage.getItem('kode_aplikasi') === 'SIMDIK' &&
            <Link 
              href="/RekapData/" 
              // onClick={()=>{this.onClickLinkTab('RekapData')}} 
              tabLinkActive={this.props.tabBar.RaporData} 
              iconIos="f7:folder" 
              iconMd="f7:folder" 
              text="Rekap" 
              style={{fontSize:'12px'}} 
            />
            }
            {localStorage.getItem('kode_aplikasi') === 'SIMDIK' && localStorage.getItem('kode_wilayah_aplikasi') === '000000' &&
            <Link 
              href="/CustomQuery/" 
              // onClick={()=>{this.onClickLinkTab('RekapData')}} 
              tabLinkActive={this.props.tabBar.RaporData} 
              iconIos="f7:quote_bubble" 
              iconMd="f7:quote_bubble" 
              text="Custom Query" 
              style={{fontSize:'12px'}} 
            />
            }
            {localStorage.getItem('kode_aplikasi') === 'SIMDIK' && localStorage.getItem('kode_wilayah_aplikasi') === '020800' && parseInt(localStorage.getItem('sudah_login')) === 1 &&
            <Link 
            href="/formIndexPendidikan/" 
            // onClick={()=>{this.onClickLinkTab('RekapData')}} 
            tabLinkActive={this.props.tabBar.RaporData} 
            iconIos="f7:quote_bubble" 
            iconMd="f7:quote_bubble" 
            text="Indikator Pendidikan" 
            style={{fontSize:'12px'}} 
            />
            }
            {/* {localStorage.getItem('sudah_login') === '1' &&
              <Link 
                href="/ProfilPengguna" 
                // onClick={()=>{this.onClickLinkTab('beranda')}} 
                tabLinkActive={this.props.tabBar.beranda} 
                iconIos="f7:person_alt" 
                iconAurora="f7:person_alt" 
                iconMd="material:person_alt" 
                text="Pengguna" 
                style={{fontSize:'12px'}} 
              />
            } */}
            {localStorage.getItem('sudah_login') === '0' &&
              <Link 
                href="/login" 
                // onClick={()=>{this.onClickLinkTab('beranda')}} 
                tabLinkActive={this.props.tabBar.beranda} 
                iconIos="f7:square_arrow_right" 
                iconAurora="f7:square_arrow_right" 
                iconMd="material:square_arrow_right" 
                text="Login" 
                style={{fontSize:'12px'}} 
              />
            }
            {/* {localStorage.getItem('kode_aplikasi') === 'SIMDIK' &&
            <Link 
              href="/ProfilPendidikan" 
              // onClick={()=>{this.onClickLinkTab('beranda')}} 
              tabLinkActive={this.props.tabBar.beranda} 
              iconIos="f7:chart_pie_fill" 
              iconAurora="f7:chart_pie_fill" 
              iconMd="material:chart_pie_fill" 
              text="Profil" 
              style={{fontSize:'12px'}} 
            />
            } */}
            {/* <Link 
              href="/kategori/" 
              onClick={()=>{this.onClickLinkTab('kategori')}} 
              tabLinkActive={this.props.tabBar.kategori} 
              iconIos="f7:list_fill" 
              iconAurora="f7:list_fill" 
              iconMd="material:view_list" 
              text="Kategori" 
              style={{fontSize:'12px'}} 
            />
            <Link 
              href="/cari/" 
              onClick={()=>{this.onClickLinkTab('cari')}} 
              tabLinkActive={this.props.tabBar.cari} 
              iconIos="f7:search_fill" 
              iconAurora="f7:search_fill" 
              iconMd="material:search" 
              text="Cari Materi" 
              style={{fontSize:'12px'}} 
            />
            <Link 
              href="/materi/" 
              onClick={()=>{this.onClickLinkTab('materi')}} 
              tabLinkActive={this.props.tabBar.materi} 
              iconIos="f7:document_text_fill" 
              iconAurora="f7:document_text_fill" 
              iconMd="material:document_text" 
              text="Materi" 
              style={{fontSize:'12px'}} 
            /> */}
            </>
            }
            {localStorage.getItem('kode_aplikasi') === 'SPM' &&
            <Link 
              href="/formPenerimaSPM" 
              // onClick={()=>{this.onClickLinkTab('beranda')}} 
              tabLinkActive={this.props.tabBar.beranda} 
              iconIos="f7:layers_fill" 
              iconAurora="f7:layers_fill" 
              iconMd="material:layers_fill" 
              text="Hitung Penerima" 
              style={{fontSize:'12px'}} 
            />
            }
            {localStorage.getItem('kode_aplikasi') === 'SPM' &&
            <Link 
              href="/formRencanaPemenuhanSPM" 
              // onClick={()=>{this.onClickLinkTab('beranda')}} 
              tabLinkActive={this.props.tabBar.beranda} 
              iconIos="f7:lightbulb_fill" 
              iconAurora="f7:lightbulb_fill" 
              iconMd="material:lightbulb_fill" 
              text="Pemenuhan" 
              style={{fontSize:'12px'}} 
            />
            }
            <Link 
              iconIos="f7:ellipsis" 
              iconAurora="f7:ellipsis" 
              iconMd="material:ellipsis" 
              text="More"
              panelOpen="left" 
              // loginScreenOpen="#my-login-screen" 
              style={{fontSize:'12px'}}
            />
            {/* <Link link="/" view=".view-main" tabLinkActive iconIos="f7:home_fil" iconAurora="f7:home_fil" iconMd="material:home" text="Home" />
            <Link link="/catalog/" view=".view-main" iconIos="f7:list_fill" iconAurora="f7:list_fill" iconMd="material:view_list" text="Catalog" />
            <Link link="/form/" view=".view-main" iconIos="f7:settings_fill" iconAurora="f7:settings_fill" iconMd="material:settings" text="About" /> */}
          </Toolbar>
          }
          {/* Your main view/tab, should have "view-main" class. It also has "tabActive" prop */}
          {/* <View id="view-beranda" main tab tabActive url="/" /> */}
          <View id="view-beranda" main tab tabActive url="/" pushState={localStorage.getItem('device') === 'web' ? true : false} />

          {/* Catalog View */}
          {/* <View id="view-kategori" name="kategori" tab url="/kategori/" /> */}

          {/* Settings View */}
          {/* <View id="view-cari" name="cari" tab url="/cari/" /> */}

          {/* Settings View */}
          {/* <View id="view-settings" name="About" tab url="/settings/" /> */}

        </Views>
        


        {/* Popup */}
        <Popup id="my-popup">
          <View>
            <Page>
              <Navbar title="Popup">
                <NavRight>
                  <Link popupClose>Close</Link>
                </NavRight>
              </Navbar>
              <Block>
                <p>Popup content goes here.</p>
              </Block>
            </Page>
          </View>
        </Popup>

        <LoginScreen id="my-login-screen">
          <LoginPage/>
          {/* <View>
            <Page loginScreen>
              <LoginScreenTitle>Masuk Aplikasi</LoginScreenTitle>
              <List form>
                <ListInput
                  type="text"
                  name="username"
                  placeholder="Your username"
                  value={this.state.username}
                  onInput={(e) => this.setState({username: e.target.value})}
                ></ListInput>
                <ListInput
                  type="password"
                  name="password"
                  placeholder="Your password"
                  value={this.state.password}
                  onInput={(e) => this.setState({password: e.target.value})}
                ></ListInput>
              </List>
              <List>
                <ListButton title="Sign In" loginScreenClose onClick={() => this.alertLoginData()} />
                <BlockFooter>
                  Some text about login information.<br />Click "Sign In" to close Login Screen
                </BlockFooter>
              </List>
            </Page>
          </View> */}
        </LoginScreen>
      {/* </Provider> */}
      </App>
    )
  }
  alertLoginData() {
    this.$f7.dialog.alert('Username: ' + this.state.username + '<br>Password: ' + this.state.password);
  }
  componentDidMount() {
    // console.log(this.props);
    // this.$f7.preloader.show();
    // this.$f7.dialog.preloader();
    setTimeout(() => {
      // this.$f7.preloader.hide();
      // this.$f7.dialog.close();
    }, 3000);

    this.$f7ready((f7) => {
      // Init cordova APIs (see cordova-app.js)
      if (f7.device.cordova) {
        cordovaApp.init(f7);
      }
      // Call F7 APIs here
      // this.props.getWilayah({kode_wilayah:localStorage.getItem('kode_wilayah_aplikasi')}).then((result)=>{
      //   if(result.payload.rows.length > 0){
      //     alert('jalan')
      //     // localStorage.setItem('wilayah_aplikasi', result.payload.rows[0].nama)
      //     this.setState({
      //       wilayah_aplikasi: result.payload.rows[0].nama
      //     })
      //   }
      // })
    });
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateWindowDimension: Actions.updateWindowDimension,
    setLoading: Actions.setLoading,
    setTabActive: Actions.setTabActive,
    getWilayah: Actions.getWilayah
  }, dispatch);
}

function mapStateToProps({ App }) {
  // console.log(App.tabBar);

  return {
      window_dimension: App.window_dimension,
      loading: App.loading,
      tabBar: App.tabBar,
      judul_panel_kanan: App.judul_panel_kanan,
      isi_panel_kanan: App.isi_panel_kanan
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(app));