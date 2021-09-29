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
    BlockTitle,
    List,
    ListItem,
    Row,
    Col,
    Button,
    Searchbar,
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    Icon,
    MenuItem,
    MenuDropdown,
    MenuDropdownItem,
    Subnavbar,
    Segmented,
    Panel,
    View,
    Tabs,
    Tab,
    BlockHeader
} from 'framework7-react';

// import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";

import { Doughnut, Bar } from 'react-chartjs-2';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';
import SelectSemester from '../SelectSemester';

class formIndexPendidikan extends Component {
    state = {
        error: null,
        loading: true,
        routeParams: {
            kode_wilayah: this.$f7route.params['kode_wilayah'] ? this.$f7route.params['kode_wilayah'] : localStorage.getItem('kode_wilayah_aplikasi'),
            id_level_wilayah: this.$f7route.params['id_level_wilayah'] ? this.$f7route.params['id_level_wilayah']: localStorage.getItem('id_level_wilayah_aplikasi'),
            semester_id:localStorage.getItem('semester_id_aplikasi'),
            tahun_ajaran_id:localStorage.getItem('semester_id_aplikasi').substring(0,4),
            bentuk_pendidikan_id: localStorage.getItem('jenjang_aplikasi'),
            status_sekolah: '99'
        },
        index_pendidikan: {
            rows: [],
            total: 0
        }
    }

    componentDidMount = () => {
        
        this.setState({
            routeParams: {
                kode_wilayah: this.state.routeParams.kode_wilayah
            }
        },()=>{
            this.props.getIndexPendidikan(this.state.routeParams).then((result)=>{
                this.setState({
                    index_pendidikan: result.payload
                })
            })
        });


    }

    formatAngka = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    cariKeyword = (event)  => {
        this.setState({
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                keyword: event.target[0].value
            }
        },()=>{
            this.props.getRekapSekolahAkreditasi(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false
                });
            });
        })
    }

    setParamValue = (b) => {
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                [b.target.getAttribute('name')]: b.target.value
            }
        },()=>{
            
            this.props.getRekapSekolahAkreditasi(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false
                });
            });
        });
    }

    bukaPengaturan = () => {
        
        this.props.setJudulKanan('Menu Indikator Pendidikan');

    }

    tambahIndex = (tipe) => {
        this.$f7router.navigate('/tambahIndexPendidikan/'+tipe)
    }

    render()
    {
        return (
            <Page name="formIndexPendidikan" hideBarsOnScroll>
                {this.state.routeParams.kode_wilayah === localStorage.getItem('kode_wilayah_aplikasi') &&
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>{this.props.wilayah.rows[0].nama}</NavTitle>
                    <NavTitleLarge>
                        Indikator Pendidikan
                    </NavTitleLarge>
                    <NavRight >
                        <Link panelOpen="right" onClick={this.bukaPengaturan} iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu">&nbsp;Menu</Link>
                    </NavRight>
                </Navbar>
                }
                <Subnavbar>
                    <Segmented raised>
                        <Button tabLink="#tab1" tabLinkActive>Form Input</Button>
                        <Button tabLink="#tab2" href={"/chartIndexPendidikan/"}>Chart</Button>
                    </Segmented>
                </Subnavbar>
                <Row noGap>
                    <Col width="100">
                        <Card>
                            <CardContent>
                                {/* <List tabbar>
                                    <ListItem tabLinkActive button title="IPM" tabLink="#tab-1" subtitle="Index Pembangunan Manusia"></ListItem>
                                    <ListItem button title="HLS" tabLink="#tab-2" subtitle="Harapan Lama Sekolah"></ListItem>
                                    <ListItem button title="RLS" tabLink="#tab-3" subtitle="Rata-rata Lama Sekolah"></ListItem>
                                </List> */}
                                <Toolbar tabbar>
                                    <Link style={{margin:'16px'}} tabLink="#tab-1" tabLinkActive>IPM</Link>
                                    <Link style={{margin:'16px'}} tabLink="#tab-2">HLS</Link>
                                    <Link style={{margin:'16px'}} tabLink="#tab-3">RLS</Link>
                                    <Link style={{margin:'16px'}} tabLink="#tab-4">AMH</Link>
                                    <Link style={{margin:'16px'}} tabLink="#tab-5">APK</Link>
                                    <Link style={{margin:'16px'}} tabLink="#tab-6">APM</Link>
                                </Toolbar>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="100">
                        <Card>
                            <CardContent>
                                <Tabs animated>
                                    <Tab id="tab-1" className="page-content" style={{paddingTop:'0px'}} tabActive>
                                        <Block style={{marginTop:'0px', marginBottom:'0px'}}>
                                            <Row style={{marginBottom:'8px'}}>
                                                <Col width="80">
                                                    <BlockHeader>Index Pembangunan Manusia</BlockHeader>
                                                </Col>
                                                <Col width="20" style={{textAlign:'right'}}>
                                                    <Button style={{display:'inline-flex'}} raised fill onClick={()=>this.tambahIndex('ipm')}>
                                                        <i className="icons f7-icons" style={{fontSize:'20px'}}>plus</i>&nbsp;Tambah IPM
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <div className="data-table" style={{overflowY:'hidden'}}>
                                                <table>
                                                    <thead style={{background:'#eeeeee'}}>
                                                        <tr>
                                                            <th className="label-cell" style={{minWidth:'200px', color:'#434343', fontSize:'15px'}}>Tahun</th>
                                                            <th className="numeric-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}}>Nilai</th>
                                                            <th className="label-cell" style={{minWidth:'40px'}}>&nbsp;</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.index_pendidikan.rows.map((option)=>{
                                                        return (
                                                            <tr key={option.tahun}>
                                                                <td className="label-cell" style={{textAlign:'center'}} style={{minWidth:'200px'}}>{option.tahun}</td>
                                                                <td className="numeric-cell" style={{textAlign:'center'}}>{parseFloat(option.nilai_ipm).toFixed(1)}</td>
                                                                <td className="label-cell" style={{textAlign:'right'}} style={{minWidth:'20px'}}>
                                                                    <Button style={{textAlign:'right'}} onClick={()=>this.$f7router.navigate('/tambahIndexPendidikan/ipm/'+option.kode_wilayah+'/'+option.tahun)}>
                                                                        Edit
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                    </tbody>
                                                </table>
                                                <div className="data-table-footer" style={{display:'block', height:'75px'}}>
                                                    <div className="data-table-pagination">
                                                        &nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                        </Block>
                                    </Tab>
                                    <Tab id="tab-2" className="page-content" style={{paddingTop:'0px'}}>
                                        <Block style={{marginTop:'0px', marginBottom:'0px'}}>
                                            <Row style={{marginBottom:'8px'}}>
                                                <Col width="80">
                                                    <BlockHeader>Harapan Lama Sekolah</BlockHeader>
                                                </Col>
                                                <Col width="20" style={{textAlign:'right'}}>
                                                    <Button style={{display:'inline-flex'}} raised fill onClick={()=>this.tambahIndex('hls')}>
                                                        <i className="icons f7-icons" style={{fontSize:'20px'}}>plus</i>&nbsp;Tambah HLS
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <div className="data-table" style={{overflowY:'hidden'}}>
                                                <table>
                                                    <thead style={{background:'#eeeeee'}}>
                                                        <tr>
                                                            <th className="label-cell" style={{minWidth:'200px', color:'#434343', fontSize:'15px'}}>Tahun</th>
                                                            <th className="numeric-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}}>Nilai</th>
                                                            <th className="label-cell" style={{minWidth:'20px'}}>&nbsp;</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.index_pendidikan.rows.map((option)=>{
                                                        return (
                                                            <tr key={option.tahun}>
                                                                <td className="label-cell" style={{textAlign:'center'}} style={{minWidth:'200px'}}>{option.tahun}</td>
                                                                <td className="numeric-cell" style={{textAlign:'center'}}>{option.nilai_hls ? parseFloat(option.nilai_hls).toFixed(1) : '0'}</td>
                                                                <td className="label-cell" style={{textAlign:'right'}} style={{minWidth:'20px'}}>
                                                                    <Button style={{textAlign:'right'}} onClick={()=>this.$f7router.navigate('/tambahIndexPendidikan/hls/'+option.kode_wilayah+'/'+option.tahun)}>
                                                                        Edit
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                    </tbody>
                                                </table>
                                                <div className="data-table-footer" style={{display:'block', height:'75px'}}>
                                                    <div className="data-table-pagination">
                                                        &nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                        </Block>
                                    </Tab>
                                    <Tab id="tab-3" className="page-content" style={{paddingTop:'0px'}}>
                                        <Block style={{marginTop:'0px', marginBottom:'0px'}}>
                                            <Row style={{marginBottom:'8px'}}>
                                                <Col width="80">
                                                    <BlockHeader>Rata-rata Lama Sekolah</BlockHeader>
                                                </Col>
                                                <Col width="20" style={{textAlign:'right'}}>
                                                    <Button style={{display:'inline-flex'}} raised fill onClick={()=>this.tambahIndex('rls')}>
                                                        <i className="icons f7-icons" style={{fontSize:'20px'}}>plus</i>&nbsp;Tambah RLS
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <div className="data-table" style={{overflowY:'hidden'}}>
                                                <table>
                                                    <thead style={{background:'#eeeeee'}}>
                                                        <tr>
                                                            <th className="label-cell" style={{minWidth:'200px', color:'#434343', fontSize:'15px'}}>Tahun</th>
                                                            <th className="numeric-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}}>Nilai</th>
                                                            <th className="label-cell" style={{minWidth:'20px'}}>&nbsp;</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.index_pendidikan.rows.map((option)=>{
                                                        return (
                                                            <tr key={option.tahun}>
                                                                <td className="label-cell" style={{textAlign:'center'}} style={{minWidth:'200px'}}>{option.tahun}</td>
                                                                <td className="numeric-cell" style={{textAlign:'center'}}>{option.nilai_rls ? parseFloat(option.nilai_rls).toFixed(1) : '0'}</td>
                                                                <td className="label-cell" style={{textAlign:'right'}} style={{minWidth:'20px'}}>
                                                                    <Button style={{textAlign:'right'}} onClick={()=>this.$f7router.navigate('/tambahIndexPendidikan/rls/'+option.kode_wilayah+'/'+option.tahun)}>
                                                                        Edit
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                    </tbody>
                                                </table>
                                                <div className="data-table-footer" style={{display:'block', height:'75px'}}>
                                                    <div className="data-table-pagination">
                                                        &nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                        </Block>
                                    </Tab>
                                    <Tab id="tab-4" className="page-content" style={{paddingTop:'0px'}}>
                                        <Block style={{marginTop:'0px', marginBottom:'0px'}}>
                                            <Row style={{marginBottom:'8px'}}>
                                                <Col width="80">
                                                    <BlockHeader>Angka Melek Huruf</BlockHeader>
                                                </Col>
                                                <Col width="20" style={{textAlign:'right'}}>
                                                    <Button style={{display:'inline-flex'}} raised fill onClick={()=>this.tambahIndex('rls')}>
                                                        <i className="icons f7-icons" style={{fontSize:'20px'}}>plus</i>&nbsp;Tambah AMH
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <div className="data-table" style={{overflowY:'hidden'}}>
                                                <table>
                                                    <thead style={{background:'#eeeeee'}}>
                                                        <tr>
                                                            <th className="label-cell" style={{minWidth:'200px', color:'#434343', fontSize:'15px'}}>Tahun</th>
                                                            <th className="numeric-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}}>Nilai</th>
                                                            <th className="label-cell" style={{minWidth:'20px'}}>&nbsp;</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.index_pendidikan.rows.map((option)=>{
                                                        return (
                                                            <tr key={option.tahun}>
                                                                <td className="label-cell" style={{textAlign:'center'}} style={{minWidth:'200px'}}>{option.tahun}</td>
                                                                <td className="numeric-cell" style={{textAlign:'center'}}>{option.nilai_amh ? parseFloat(option.nilai_amh).toFixed(1) : '0'}</td>
                                                                <td className="label-cell" style={{textAlign:'right'}} style={{minWidth:'20px'}}>
                                                                    <Button style={{textAlign:'right'}} onClick={()=>this.$f7router.navigate('/tambahIndexPendidikan/amh/'+option.kode_wilayah+'/'+option.tahun)}>
                                                                        Edit
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                    </tbody>
                                                </table>
                                                <div className="data-table-footer" style={{display:'block', height:'75px'}}>
                                                    <div className="data-table-pagination">
                                                        &nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                        </Block>
                                    </Tab>
                                    <Tab id="tab-5" className="page-content" style={{paddingTop:'0px'}}>
                                        <Block style={{marginTop:'0px', marginBottom:'0px'}}>
                                            <Row style={{marginBottom:'8px'}}>
                                                <Col width="80">
                                                    <BlockHeader>Angka Partisipasi Kasar</BlockHeader>
                                                </Col>
                                                <Col width="20" style={{textAlign:'right'}}>
                                                    <Button style={{display:'inline-flex'}} raised fill onClick={()=>this.tambahIndex('rls')}>
                                                        <i className="icons f7-icons" style={{fontSize:'20px'}}>plus</i>&nbsp;Tambah APK
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <div className="data-table" style={{overflowY:'hidden'}}>
                                                <table>
                                                    <thead style={{background:'#eeeeee'}}>
                                                        <tr>
                                                            <th className="label-cell" style={{minWidth:'200px', color:'#434343', fontSize:'15px'}}>Tahun</th>
                                                            <th className="numeric-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}}>Nilai</th>
                                                            <th className="label-cell" style={{minWidth:'20px'}}>&nbsp;</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.index_pendidikan.rows.map((option)=>{
                                                        return (
                                                            <tr key={option.tahun}>
                                                                <td className="label-cell" style={{textAlign:'center'}} style={{minWidth:'200px'}}>{option.tahun}</td>
                                                                <td className="numeric-cell" style={{textAlign:'center'}}>{option.nilai_apk ? parseFloat(option.nilai_apk).toFixed(1) : '0'}</td>
                                                                <td className="label-cell" style={{textAlign:'right'}} style={{minWidth:'20px'}}>
                                                                    <Button style={{textAlign:'right'}} onClick={()=>this.$f7router.navigate('/tambahIndexPendidikan/apk/'+option.kode_wilayah+'/'+option.tahun)}>
                                                                        Edit
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                    </tbody>
                                                </table>
                                                <div className="data-table-footer" style={{display:'block', height:'75px'}}>
                                                    <div className="data-table-pagination">
                                                        &nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                        </Block>
                                    </Tab>
                                    <Tab id="tab-6" className="page-content" style={{paddingTop:'0px'}}>
                                        <Block style={{marginTop:'0px', marginBottom:'0px'}}>
                                            <Row style={{marginBottom:'8px'}}>
                                                <Col width="80">
                                                    <BlockHeader>Angka Partisipasi Murni</BlockHeader>
                                                </Col>
                                                <Col width="20" style={{textAlign:'right'}}>
                                                    <Button style={{display:'inline-flex'}} raised fill onClick={()=>this.tambahIndex('rls')}>
                                                        <i className="icons f7-icons" style={{fontSize:'20px'}}>plus</i>&nbsp;Tambah APM
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <div className="data-table" style={{overflowY:'hidden'}}>
                                                <table>
                                                    <thead style={{background:'#eeeeee'}}>
                                                        <tr>
                                                            <th className="label-cell" style={{minWidth:'200px', color:'#434343', fontSize:'15px'}}>Tahun</th>
                                                            <th className="numeric-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}}>Nilai</th>
                                                            <th className="label-cell" style={{minWidth:'20px'}}>&nbsp;</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.index_pendidikan.rows.map((option)=>{
                                                        return (
                                                            <tr key={option.tahun}>
                                                                <td className="label-cell" style={{textAlign:'center'}} style={{minWidth:'200px'}}>{option.tahun}</td>
                                                                <td className="numeric-cell" style={{textAlign:'center'}}>{option.nilai_apm ? parseFloat(option.nilai_apm).toFixed(1) : '0'}</td>
                                                                <td className="label-cell" style={{textAlign:'right'}} style={{minWidth:'20px'}}>
                                                                    <Button style={{textAlign:'right'}} onClick={()=>this.$f7router.navigate('/tambahIndexPendidikan/apm/'+option.kode_wilayah+'/'+option.tahun)}>
                                                                        Edit
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                    </tbody>
                                                </table>
                                                <div className="data-table-footer" style={{display:'block', height:'75px'}}>
                                                    <div className="data-table-pagination">
                                                        &nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                        </Block>
                                    </Tab>
                                </Tabs>
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
      getSekolah: Actions.getSekolah,
      getRekapSekolah: Actions.getRekapSekolah,
      getSekolahIndividu: Actions.getSekolahIndividu,
      getRaporDapodikWilayah: Actions.getRaporDapodikWilayah,
      setRaporDapodikWilayah: Actions.setRaporDapodikWilayah,
      getWilayah: Actions.getWilayah,
      getRekapSekolahAkreditasi: Actions.getRekapSekolahAkreditasi,
      setJudulKanan: Actions.setJudulKanan,
      setIsiKanan: Actions.setIsiKanan,
      getIndexPendidikan: Actions.getIndexPendidikan
    }, dispatch);
}

function mapStateToProps({ App, PesertaDidik, Gtk, RaporDapodik, RekapSekolah }) {

    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        sekolah: App.sekolah,
        rekap_sekolah: App.rekap_sekolah,
        sekolah_individu: App.sekolah_individu,
        wilayah: App.wilayah,
        dummy_rows: App.dummy_rows,
        rekap_sekolah_akreditasi: RekapSekolah.rekap_sekolah_akreditasi,
        judul_panel_kanan: App.judul_panel_kanan,
        isi_panel_kanan: App.isi_panel_kanan
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(formIndexPendidikan));