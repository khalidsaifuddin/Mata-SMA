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
  Subnavbar
} from 'framework7-react';

import { Doughnut, Bar, Radar } from 'react-chartjs-2';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';
import TypographyComponent from 'framework7/components/typography/typography';
import { getSPMKabupatenPerKecamatan, getGtkJenisPie } from '../store/actions';

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
    rekap_beranda_spm: {
        kip: {},
        miskin: {}
    }
  };

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
    if(parseInt(localStorage.getItem('sudah_login')) !== 1){
        this.$f7router.navigate('/login/');
    }
    // console.log(this.props.tabBar);

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

    this.props.getRekapBerandaSPM(this.state.routeParams).then((result)=>{
        this.setState({
            rekap_beranda_spm: {
                kip: this.props.rekap_beranda_spm.kip[0],
                miskin: this.props.rekap_beranda_spm.miskin[0]
            }
        });
    });
    
  }

  gantiSemester = (b) => {
    
    localStorage.setItem('semester_id_aplikasi', b.target.value);
    
  }

  render()
    {
        return (
          <Page name="Beranda" hideBarsOnScroll>
            {/* Top Navbar */}
            {parseInt(localStorage.getItem('sudah_login')) === 1 &&
            <Navbar 
              sliding={false} 
              large 
            >
              <NavLeft >
                <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" className="sideMenuToggle" />
              </NavLeft>
              <NavTitle style={{color:'white'}} sliding>{localStorage.getItem('judul_aplikasi_panjang')}</NavTitle>
              {/* <NavTitleLarge style={{background:'#F6BC31',color:'white'}}>{localStorage.getItem('judul_aplikasi_panjang')}</NavTitleLarge> */}
              {/* <NavTitleLarge style={{background:'#F6BC31',color:'white'}}>{localStorage.getItem('judul_aplikasi_panjang')}</NavTitleLarge> */}
              <NavRight>
                <Link style={{color:'white'}} iconIos="f7:search" iconAurora="f7:search" iconMd="material:search" href="/DataPokokSekolah/" ></Link>
              </NavRight>
            </Navbar>
            }
            <>
            <div className="merahAtas">
                <Row noGap>
                    <Col width="25" tabletWidth="15">
                        <img src={localStorage.getItem('logo_aplikasi')} style={{width:'90%'}}/>
                    </Col>
                    <Col width="75" tabletWidth="85">
                        <span style={{fontWeight:'bold', fontSize:'35px'}}>{localStorage.getItem('judul_aplikasi_panjang')}</span><br/>
                        <span style={{fontWeight:'bold', fontSize:'20px'}}>{localStorage.getItem('sub_judul_aplikasi')}</span>
                    </Col>
                </Row>
            </div>
            {/* <Block strong style={{marginBottom:'8px', marginTop:'8px'}}>
                <Row noGap>
                    <Col width="25" tabletWidth="10">
                        <img src={localStorage.getItem('logo_aplikasi')} style={{width:'80px'}}/>
                    </Col>
                    <Col width="75" tabletWidth="90">
                        <List style={{width:'100%',marginBottom:'0px',marginTop:'0px'}}>
                            <ListItem>
                                <span style={{fontWeight:'bold', fontSize:'25px'}}>{localStorage.getItem('sub_judul_aplikasi')}</span>
                            </ListItem>
                        </List>
                    </Col>
                </Row>
            </Block> */}
            </>
            <Row noGap style={{marginTop:'-100px'}}>
                <Col width="100" tabletWidth="100">
                    <Card>
                        <CardContent>
                            <Row>
                                <Col width="25" tabletWidth="15">
                                    <i className="f7-icons icons" style={{fontSize:'80px',color:'#FC4E1A'}}>info_circle_fill</i>
                                </Col>
                                <Col width="75" tabletWidth="85" style={{fontSize:'15px'}}>
                                    Standar Pelayanan Minimal Pendidikan Dasar (SPM Dikdas) adalah tolok ukur kinerja pelayanan pendidikan dasar melalui jalur pendidikan formal yang diselenggarakan Pemerintah Kabupaten/Kota. Tujuan SPM Dikdas adalah untuk menjamin bahwa di setiap SD/MI dan SMP/MTs tersedia kondisi minimal demi keberlangsungan proses belajar-mengajar yang berkualitas.
                                </Col>
                            </Row>
                        </CardContent>
                    </Card>
                </Col>
                <Col width="100" tabletWidth="50">
                    <Card style={{background:'url('+localStorage.getItem('api_base')+'/assets/berkas/12covid.jpg)', backgroundSize:'cover', color:'white'}}>
                        <CardHeader style={{textAlign:'center',display:'block'}}s>
                            Peserta Didik Penerima KIP Terdampak Covid-19
                        </CardHeader>
                        <CardContent style={{padding:'8px'}}>
                            <Row noGap>
                                <Col width="100" tabletWidth="100">
                                    <Card style={{background:'transparent'}}>
                                        <CardContent style={{textAlign:'center', padding:'8px'}}>
                                            Semua Jenjang
                                            <div style={{fontSize:'40px', fontWeight:'bold', color:'#F6BC31'}}>
                                                {(this.state.rekap_beranda_spm.kip.total ? this.formatAngka(parseInt(this.state.rekap_beranda_spm.kip.total)) : 0)}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Col>
                                <Col width="50" tabletWidth="50">
                                    <Card style={{background:'transparent'}}>
                                        <CardContent style={{textAlign:'center', padding:'8px'}}>
                                            SD
                                            <div style={{fontSize:'30px', fontWeight:'bold', color:'#F6BC31'}}>
                                                {(this.state.rekap_beranda_spm.kip.total_sd ? this.formatAngka(parseInt(this.state.rekap_beranda_spm.kip.total_sd)) : 0)}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Col>
                                <Col width="50" tabletWidth="50">
                                    <Card style={{background:'transparent'}}>
                                        <CardContent style={{textAlign:'center', padding:'8px'}}>
                                            SMP
                                            <div style={{fontSize:'30px', fontWeight:'bold', color:'#F6BC31'}}>
                                                {(this.state.rekap_beranda_spm.kip.total_smp ? this.formatAngka(parseInt(this.state.rekap_beranda_spm.kip.total_smp)) : 0)}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Col>
                                <Col width="50" tabletWidth="50">
                                    <Card style={{background:'transparent'}}>
                                        <CardContent style={{textAlign:'center', padding:'8px'}}>
                                            SMA
                                            <div style={{fontSize:'30px', fontWeight:'bold', color:'#F6BC31'}}>
                                                {(this.state.rekap_beranda_spm.kip.total_sma ? this.formatAngka(parseInt(this.state.rekap_beranda_spm.kip.total_sma)) : 0)}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Col>
                                <Col width="50" tabletWidth="50">
                                    <Card style={{background:'transparent'}}>
                                        <CardContent style={{textAlign:'center', padding:'8px'}}>
                                            SMK
                                            <div style={{fontSize:'30px', fontWeight:'bold', color:'#F6BC31'}}>
                                                {(this.state.rekap_beranda_spm.kip.total_smk ? this.formatAngka(parseInt(this.state.rekap_beranda_spm.kip.total_smk)) : 0)}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Col>
                            </Row>
                        </CardContent>
                    </Card>
                </Col>
                <Col width="100" tabletWidth="50">
                    <Card style={{background:'url('+localStorage.getItem('api_base')+'/assets/berkas/13covid.jpg)', backgroundSize:'cover', color:'white'}}>
                        <CardHeader style={{textAlign:'center',display:'block'}}>
                            Peserta Didik Miskin Terdampak Covid-19
                        </CardHeader>
                        <CardContent style={{padding:'8px'}}>
                            <Row noGap>
                                <Col width="100" tabletWidth="100">
                                    <Card style={{background:'transparent'}}>
                                        <CardContent style={{textAlign:'center', padding:'8px'}}>
                                            Semua Jenjang
                                            <div style={{fontSize:'40px', fontWeight:'bold', color:'#F6BC31'}}>
                                                {(this.state.rekap_beranda_spm.miskin.total ? this.formatAngka(parseInt(this.state.rekap_beranda_spm.miskin.total)) : 0)}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Col>
                                <Col width="50" tabletWidth="50">
                                    <Card style={{background:'transparent'}}>
                                        <CardContent style={{textAlign:'center', padding:'8px'}}>
                                            SD
                                            <div style={{fontSize:'30px', fontWeight:'bold', color:'#F6BC31'}}>
                                                {(this.state.rekap_beranda_spm.miskin.total_sd ? this.formatAngka(parseInt(this.state.rekap_beranda_spm.miskin.total_sd)) : 0)}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Col>
                                <Col width="50" tabletWidth="50">
                                    <Card style={{background:'transparent'}}>
                                        <CardContent style={{textAlign:'center', padding:'8px'}}>
                                            SMP
                                            <div style={{fontSize:'30px', fontWeight:'bold', color:'#F6BC31'}}>
                                                {(this.state.rekap_beranda_spm.miskin.total_smp ? this.formatAngka(parseInt(this.state.rekap_beranda_spm.miskin.total_smp)) : 0)}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Col>
                                <Col width="50" tabletWidth="50">
                                    <Card style={{background:'transparent'}}>
                                        <CardContent style={{textAlign:'center', padding:'8px'}}>
                                            SMA
                                            <div style={{fontSize:'30px', fontWeight:'bold', color:'#F6BC31'}}>
                                                {(this.state.rekap_beranda_spm.miskin.total_sma ? this.formatAngka(parseInt(this.state.rekap_beranda_spm.miskin.total_sma)) : 0)}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Col>
                                <Col width="50" tabletWidth="50">
                                    <Card style={{background:'transparent'}}>
                                        <CardContent style={{textAlign:'center', padding:'8px'}}>
                                            SMK
                                            <div style={{fontSize:'30px', fontWeight:'bold', color:'#F6BC31'}}>
                                                {(this.state.rekap_beranda_spm.miskin.total_smk ? this.formatAngka(parseInt(this.state.rekap_beranda_spm.miskin.total_smk)) : 0)}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Col>
                            </Row>
                        </CardContent>
                    </Card>
                </Col>
            </Row>
          </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateWindowDimension: Actions.updateWindowDimension,
    setLoading: Actions.setLoading,
    setTabActive: Actions.setTabActive,
    getRekapBerandaSPM: Actions.getRekapBerandaSPM
  }, dispatch);
}

function mapStateToProps({ App, Sarpras, RaporDapodik, Spm, RekapSekolah, PesertaDidik, Gtk }) {
  return {
      window_dimension: App.window_dimension,
      loading: App.loading,
      tabBar: App.tabBar,
      wilayah: App.wilayah,
      rekap_beranda_spm: Spm.rekap_beranda_spm
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Beranda);