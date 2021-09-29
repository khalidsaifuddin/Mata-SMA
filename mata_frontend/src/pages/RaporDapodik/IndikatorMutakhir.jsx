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
    Tabs,
    Tab,
    Segmented,
    Subnavbar
} from 'framework7-react';

// import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";

import { Doughnut, Bar } from 'react-chartjs-2';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

// import 'framework7-icons';

class IndikatorMutakhir extends Component {
    state = {
        error: null,
        loading: true,
        indikator_sekolah: {
            rows: [{
                nama: '-'
            }]
        },
        indikator_ptk: {
            rows: [{
                nama: '-'
            }]
        },
        indikator_pd: {
            rows: [{
                nama: '-'
            }]
        },
        indikator_rombel: {
            rows: [{
                nama: '-'
            }]
        },
        indikator_sarpras: {
            rows: [{
                nama: '-'
            }]
        }
    }

    componentDidMount = () => {
        
        // this.props.getRefRaporDapodik(this.state.routeParams).then((result)=>{
            this.setState({
                ...this.state,
                loading: false,
                indikator_sekolah: this.props.ref_rapor_dapodik
            });
        // });
    }

    gantiTab = (kode) => {
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                induk_rapor_dapodik_id: kode
            }
        },()=>{
            let namaState = '';
            switch (kode) {
                case '01010000':
                    namaState = 'indikator_sekolah';
                    break;
                case '01020000':
                    namaState = 'indikator_ptk';
                    break;
                case '01030000':
                    namaState = 'indikator_pd';
                    break;
                case '01040000':
                    namaState = 'indikator_rombel';
                    break;
                case '01050000':
                    namaState = 'indikator_sarpras';
                    break;
                default:
                    break;
            }

            // this.props.getRefRaporDapodik(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false,
                    [namaState]: this.props.ref_rapor_dapodik
                },()=>{
                    // console.log(this.state);
                });
            // });
        });
    }

    render()
    {
        return (
            <Page name="Indikator" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    {/* <NavLeft>
                        <Link iconIos="f7:chevron_left" iconAurora="f7:chevron_left" iconMd="material:chevron_left" href="/">Beranda</Link>
                    </NavLeft> */}
                    <NavTitle sliding>Indikator {(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')}</NavTitle>
                    <NavTitleLarge>
                        Indikator {(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')}
                    </NavTitleLarge>
                    <Subnavbar>
                        <Segmented raised style={{marginLeft:'8px', marginRight:'8px', marginTop: '8px', marginBottom: '8px'}}>
                            <Button href="/RaporDapodik/Indikator">Akurat</Button>
                            <Button href="/RaporDapodik/IndikatorBerkelanjutan">Berkelanjutan</Button>
                            <Button href="/RaporDapodik/IndikatorMutakhir" tabLinkActive>Mutakhir</Button>
                            {/* <Button tabLink="#tab-4" onClick={()=>this.gantiTab('01040000')}>Rombel</Button>
                            <Button tabLink="#tab-5" onClick={()=>this.gantiTab('01050000')}>Sarpras</Button> */}
                        </Segmented>
                    </Subnavbar>
                </Navbar>

                {this.state.loading ?
                <>
                    <Block strong>
                        <div className="skeleton-text skeleton-effect-blink">
                            isi loading
                        </div>
                    </Block>
                </>
                :
                <>
                    {/* <Segmented raised style={{marginLeft:'8px', marginRight:'8px', marginTop: '8px', marginBottom: '8px'}}>
                        <Button tabLink="#tab-2" onClick={()=>this.gantiTab('01020000')}>PTK</Button>
                        <Button tabLink="#tab-3" onClick={()=>this.gantiTab('01030000')}>PD</Button>
                        <Button tabLink="#tab-4" onClick={()=>this.gantiTab('01040000')}>Rombel</Button>
                        <Button tabLink="#tab-5" onClick={()=>this.gantiTab('01050000')}>Sarpras</Button>
                    </Segmented> */}
                    <Tabs animated style={{marginBottom:'0px', marginTop:'0px', height:'auto'}}>
                        <Tab id="tab-2" className="page-content" style={{padding:'0px'}}>
                            <List mediaList style={{marginBottom:'0px', marginTop:'0px'}}>
                                <ListItem
                                    title="PTK"
                                    subtitle="Indikator Rapor PTK"
                                    >
                                    <i slot="media" className="f7-icons" style={{fontSize:'35px'}}>briefcase</i>
                                </ListItem>
                                <li>
                                    <ul>
                                    {/* {this.state.indikator_ptk.rows.map((option)=>{
                                        return (
                                            <ListItem key={option.rapor_dapodik_id}>
                                                <i slot="media" className="f7-icons">chart_bar_square</i>{option.nama}
                                            </ListItem>
                                        )
                                    })} */}
                                        <ListItem key={"mutakhir_ptk"}>
                                            <i slot="media" className="f7-icons">chart_bar_square</i> Sekolah melakukan pembaruan mata pelajaran diampu untuk masing-masing guru pada semester berjalan
                                        </ListItem>
                                    </ul>
                                </li>
                                <ListItem
                                    title="Peserta Didik"
                                    subtitle="Indikator Rapor Peserta Didik"
                                    >
                                    <i slot="media" className="f7-icons" style={{fontSize:'35px'}}>person_2_square_stack</i>
                                </ListItem>
                                <li>
                                    <ul>
                                    {/* {this.state.indikator_pd.rows.map((option)=>{
                                        return (
                                            <ListItem key={option.rapor_dapodik_id}>
                                                <i slot="media" className="f7-icons">chart_bar_square</i>{option.nama}
                                            </ListItem>
                                        )
                                    })} */}
                                        <ListItem key={"mutakhir_pd"}>
                                            <i slot="media" className="f7-icons">chart_bar_square</i> Sekolah melakukan pembaruan data tinggi badan, berat badan, dan lingkar kepala peserta didik pada semester berjalan
                                        </ListItem>
                                    </ul>
                                </li>
                                <ListItem
                                    title="Rombongan Belajar"
                                    subtitle="Indikator Rapor Rombongan Belajar"
                                    >
                                    <i slot="media" className="f7-icons" style={{fontSize:'35px'}}>square_list</i>
                                </ListItem>
                                <li>
                                    <ul>
                                    {/* {this.state.indikator_rombel.rows.map((option)=>{
                                        return (
                                            <ListItem key={option.rapor_dapodik_id}>
                                                <i slot="media" className="f7-icons">chart_bar_square</i>{option.nama}
                                            </ListItem>
                                        )
                                    })} */}
                                        <ListItem key={"mutakhir_rombel"}>
                                            <i slot="media" className="f7-icons">chart_bar_square</i> Sekolah melakukan pembaruan pembelajaran pada masing-masing rombel pada semester berjalan
                                        </ListItem>
                                    </ul>
                                </li>
                                <ListItem
                                    title="Sarpras"
                                    subtitle="Indikator Rapor Sarpras"
                                    >
                                    <i slot="media" className="f7-icons" style={{fontSize:'35px'}}>building_2_fill</i>
                                </ListItem>
                                <li>
                                    <ul>
                                    {/* {this.state.indikator_rombel.rows.map((option)=>{ */}
                                        {/* return ( */}
                                            <ListItem key={"mutakhir_sarpras"}>
                                                <i slot="media" className="f7-icons">chart_bar_square</i> Sekolah melakukan pembaruan data periodik kerusakan sarana prasarana pada semester berjalan
                                            </ListItem>
                                        {/* )
                                    })} */}
                                    </ul>
                                </li>
                            </List>
                        </Tab>
                    </Tabs>
                </>
                }
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
      getRaporDapodikSekolah: Actions.getRaporDapodikSekolah,
      getRefRaporDapodik: Actions.getRefRaporDapodik,
    }, dispatch);
}

function mapStateToProps({ App, PesertaDidik, Gtk, RaporDapodik }) {

    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        sekolah: App.sekolah,
        rekap_sekolah: App.rekap_sekolah,
        sekolah_individu: App.sekolah_individu,
        rapor_dapodik_wilayah: RaporDapodik.rapor_dapodik_wilayah,
        rapor_dapodik_sekolah: RaporDapodik.rapor_dapodik_sekolah,
        wilayah: App.wilayah,
        dummy_rows: App.dummy_rows,
        ref_rapor_dapodik: RaporDapodik.ref_rapor_dapodik,
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(IndikatorMutakhir));