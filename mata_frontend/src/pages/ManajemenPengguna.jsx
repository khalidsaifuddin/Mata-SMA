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
    MenuDropdownItem
} from 'framework7-react';

// import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";

import { Doughnut, Bar } from 'react-chartjs-2';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

// import 'framework7-icons';

class ManajemenPengguna extends Component {
    state = {
        error: null,
        loading: true,
        routeParams: {
            kode_wilayah: this.$f7route.params['kode_wilayah'] ? this.$f7route.params['kode_wilayah'] : localStorage.getItem('kode_wilayah_aplikasi'),
            id_level_wilayah: this.$f7route.params['id_level_wilayah'] ? this.$f7route.params['id_level_wilayah']: localStorage.getItem('id_level_wilayah_aplikasi'),
            semester_id:localStorage.getItem('semester_id_aplikasi'),
            tahun_ajaran_id:localStorage.getItem('semester_id_aplikasi').substring(0,4),
            bentuk_pendidikan_id: localStorage.getItem('jenjang_aplikasi'),
            start:0,
            limit: 20
        },
        pengguna:{
            rows: [{
                pengguna_id: ''
            }],
            total: 0
        }
    }

    cariKeyword = (event)  => {
        this.setState({
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                keyword: event.target[0].value,
                start: 0
            }
        },()=>{
            this.props.getPengguna(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false,
                    pengguna: this.props.pengguna
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
                [b.target.getAttribute('name')]: b.target.value,
                start: 0
            }
        },()=>{
            // console.log(this.state.routeParams);
            this.props.getPengguna(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false,
                    pengguna: this.props.pengguna
                });
            });
        });
    }

    componentDidMount = () => {
        this.setState({
            ...this.state,
            loading: true
        },()=>{
            this.props.getPengguna(this.state.routeParams).then((result)=>{
                this.setState({
                    loading: false,
                    pengguna: this.props.pengguna
                });

                this.props.setIsiKanan((
                    <List>
                        <Searchbar
                            className="searchbar-demo"
                            // expandable
                            placeholder="Nama Pengguna"
                            searchContainer=".search-list"
                            searchIn=".item-title"
                            onSubmit={this.cariKeyword}
                        ></Searchbar>
                        <ListItem
                            title="Peran"
                            smartSelect
                            smartSelectParams={{searchbar: true, searchbarPlaceholder: 'Saring Peran'}}
                        >
                            <select onChange={this.setParamValue} name="peran_id" defaultValue={99}>
                                <option value={99}>Semua</option>
                                <option value={1}>Administrator</option>
                                <option value={54}>Operator LPMP</option>
                                <option value={6}>Operator Disdik Provinsi</option>
                                <option value={8}>Operator Disdik Kabupaten/Kota</option>
                            </select>
                        </ListItem>
                        <ListItem
                            title="Status"
                            smartSelect
                            smartSelectParams={{searchbar: true, searchbarPlaceholder: 'Saring Status Verifikasi'}}
                        >
                            <select onChange={this.setParamValue} name="verified" defaultValue={99}>
                                <option value={99}>Semua</option>
                                <option value={0}>Belum Terverifikasi</option>
                                <option value={10}>Proses Verifikasi</option>
                                <option value={1}>Terverifikasi</option>
                            </select>
                        </ListItem>
                        {/* <List>  
                            <ListItem style={{cursor:'pointer'}} title="Unduh Excel" onClick={()=>{window.open(
                                    localStorage.getItem('api_base')+"/api/Sekolah/getRekapSekolahRingkasanExcel"
                                    +"?semester_id="+localStorage.getItem('semester_id_aplikasi')
                                    +"&tahun_ajaran_id="+localStorage.getItem('semester_id_aplikasi').substring(0,4)
                                    +"&id_level_wilayah="+(this.state.routeParams.id_level_wilayah)
                                    +"&kode_wilayah="+(this.state.routeParams.kode_wilayah)
                                    +"&bentuk_pendidikan_id="+(this.state.routeParams.bentuk_pendidikan_id ? this.state.routeParams.bentuk_pendidikan_id : '')
                                    +"&status_sekolah="+(this.state.routeParams.status_sekolah ? this.state.routeParams.status_sekolah : '')
                                    +"&keyword="+(this.state.routeParams.keyword ? this.state.routeParams.keyword : '')
                                    +"&limit=20000"
                                )}}>
                                <img slot="media" src="static/icons/xls.png" width="25" />
                            </ListItem>
                        </List> */}
                    </List>
                ));
            });
        });

    }

    formatAngka = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    klikNext = () => {
        // alert('tes');
        
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: (parseInt(this.state.routeParams.start) + parseInt(this.state.routeParams.limit))
            }
        },()=>{
            this.props.getPengguna(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false,
                    pengguna: this.props.pengguna
                });
            });
        });
    }
    
    klikPrev = () => {
        // alert('tes');
        
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: (parseInt(this.state.routeParams.start) - parseInt(this.state.routeParams.limit))
            }
        },()=>{
            this.props.getPengguna(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false,
                    pengguna: this.props.pengguna
                });
            });
        });
    }

    bukaPengaturan = () => {
        // alert('oke');
        this.props.setJudulKanan('Menu Manajemen Pengguna');
    }

    batalkanVerifikasi = (pengguna_id) => {
        // alert(pengguna_id);
        this.$f7.dialog.confirm('Apakah Anda ingin membatalkan verifikasi pengguna ini?', 'Konfirmasi', () => {
            this.setState({
                routeParams: {
                    ...this.state.routeParams,
                    pengguna_id: pengguna_id,
                    data: {
                        verified: 0
                    }
                }
            },()=>{
                this.props.setPengguna(this.state.routeParams).then((result)=>{
                    if(result.payload.status === 'berhasil'){
                        this.$f7.dialog.alert('Berhasil membatalkan verifikasi pengguna!', 'Informasi');
                    }else{
                        this.$f7.dialog.alert('Gagal membatalkan verifikasi pengguna!', 'Informasi');
                    }

                    this.setState({
                        loading: true,
                        routeParams: {
                            ...this.state.routeParams,
                            pengguna_id: null
                        }
                    },()=>{
                        this.props.getPengguna(this.state.routeParams).then((result)=>{
                            this.setState({
                                loading: false,
                                pengguna: this.props.pengguna
                            });
                        });
                    });

                    // this.$f7router.navigate('/ManajemenPengguna');
                });
            });
        });
    }

    refresh = (event, done) => {
        this.setState({
            loading: true,
        },()=>{

            this.props.getPengguna(this.state.routeParams).then((result)=>{
                this.setState({
                    loading: false,
                    pengguna: this.props.pengguna
                },()=>{
                    done();
                });
    
            });
        });
    }

    render()
    {
        return (
            <Page name="ManajemenPengguna" hideBarsOnScroll ptr onPtrRefresh={this.refresh}>
                <Navbar sliding={false} backLink="Pengaturan" onBackClick={this.backClick}>
                    {/* <NavLeft>
                        <Link iconIos="f7:chevron_left" iconAurora="f7:chevron_left" iconMd="material:chevron_left" href="/">Beranda</Link>
                    </NavLeft> */}
                    <NavTitle sliding>Manajemen Pengguna</NavTitle>
                    <NavTitleLarge>
                        Manajemen Pengguna
                    </NavTitleLarge>
                    <NavRight >
                        <Link panelOpen="right" onClick={this.bukaPengaturan} iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu">&nbsp;Menu</Link>
                    </NavRight>
                </Navbar>
                <Block strong style={{
                    marginTop:'0px', 
                    paddingLeft:'0px', 
                    paddingRight:'0px', 
                    paddingTop:'0px', 
                    paddingBottom:'0px'
                }}>
                    <div className="data-table-footer" style={{display:'block'}}>
                        <div className="data-table-pagination">
                            <a onClick={this.klikPrev} href="#" className={"link "+(this.state.routeParams.start < 1 ? "disabled" : "" )}>
                                <i class="icon icon-prev color-gray"></i>
                            </a>
                            <a onClick={this.klikNext} href="#" className={"link "+((parseInt(this.state.routeParams.start)+20) > parseInt(this.state.pengguna.total) ? "disabled" : "" )}>
                                <i className="icon icon-next color-gray"></i>
                            </a>
                            <span className="data-table-pagination-label">{(this.state.routeParams.start+1)}-{(this.state.routeParams.start)+parseInt(this.state.routeParams.limit)} dari {this.formatAngka(this.state.pengguna.total)} pengguna</span>
                        </div>
                    </div>
                    <div className="data-table" style={{overflowY:'hidden', paddingBottom:'100px'}}>
                        <table>
                            <thead style={{background:'#eeeeee'}}>
                                <tr>
                                    <th className="label-cell" style={{minWidth:'40px'}}>&nbsp;</th>
                                    <th className="label-cell" style={{minWidth:'40px'}}>Verifikasi</th>
                                    <th className="label-cell" style={{minWidth:'200px', color:'#434343', fontSize:'15px'}}>Nama</th>
                                    <th className="label-cell" style={{minWidth:'200px', color:'#434343', fontSize:'15px'}}>Username</th>
                                    <th className="label-cell" style={{minWidth:'120px', color:'#434343', fontSize:'15px'}}>Peran</th>
                                    <th className="label-cell" style={{minWidth:'120px', color:'#434343', fontSize:'15px'}}>Wilayah</th>
                                </tr>
                            </thead>
                            {this.state.loading ? 
                            <tbody>
                                {this.props.dummy_rows.rows.map((result)=>{
                                    return (
                                        <tr>
                                            <td className="label-cell skeleton-text skeleton-effect-blink" style={{minWidth:'40px'}}>
                                                <Button tooltip={"Terverifikasi"} style={{background:'transparent', paddingLeft:'0px', paddingRight:'0px', paddingTop:'2px',width:'8px'}}>
                                                    <i tooltip="Terverifikasi" className="f7-icons" style={{fontSize:'20px', color:'green', fontWeight:'bold'}}>menu</i>
                                                </Button>
                                            </td>
                                            <td className="label-cell skeleton-text skeleton-effect-blink" style={{minWidth:'40px'}}>
                                                <Button tooltip={"Terverifikasi"} style={{background:'transparent', paddingLeft:'0px', paddingRight:'0px', paddingTop:'2px',width:'8px'}}>
                                                    <i tooltip="Terverifikasi" className="f7-icons" style={{fontSize:'20px', color:'green', fontWeight:'bold'}}>checkmark_shield_fill</i>
                                                </Button>
                                            </td>
                                            <td className="label-cell skeleton-text skeleton-effect-blink" style={{minWidth:'200px', color:'#434343', fontSize:'12px'}}>option.nama</td>
                                            <td className="label-cell skeleton-text skeleton-effect-blink" style={{minWidth:'200px', color:'#434343', fontSize:'12px'}}>option.username</td>
                                            <td className="label-cell skeleton-text skeleton-effect-blink" style={{minWidth:'120px', color:'#434343', fontSize:'12px'}}>option.peran</td>
                                            <td className="label-cell skeleton-text skeleton-effect-blink" style={{minWidth:'120px', color:'#434343', fontSize:'12px'}}>option.wilayah</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            :
                            <tbody>
                                {this.state.pengguna.rows.map((option)=>{
                                    return (
                                        <tr>
                                            <td className="label-cell" style={{minWidth:'40px'}}>
                                                {/* <Button tooltip={"Menu Detail "+option.nama} style={{background:'#eeeeee', paddingLeft:'0px', paddingRight:'0px', paddingTop:'2px',width:'8px'}}>
                                                    <i className="f7-icons" style={{fontSize:'20px', color:'#434343', fontWeight:'bold'}}>ellipsis_vertical</i>
                                                </Button> */}
                                                <MenuItem style={{marginLeft: 'auto', marginTop: '4px', marginBottom: '4px'}} iconF7="menu" dropdown className="MenuDetail">
                                                    <MenuDropdown left style={{zIndex:999999}}>
                                                        <MenuDropdownItem href={"/ProfilPengguna/"+option.pengguna_id}>
                                                            <span>Profil {option.nama}</span>
                                                            <Icon className="margin-left" f7="person" />
                                                        </MenuDropdownItem>
                                                        {parseInt(option.verified) !== 1 &&
                                                        <MenuDropdownItem href={"/VerifikasiPengguna/"+option.pengguna_id}>
                                                            <span>Verifikasi Pengguna</span>
                                                            <Icon className="margin-left" f7="checkmark_shield_fill" />
                                                        </MenuDropdownItem>
                                                        }
                                                        {parseInt(option.verified) === 1 &&
                                                        <MenuDropdownItem onClick={()=>this.batalkanVerifikasi(option.pengguna_id)}>
                                                            <span>Batalkan Verifikasi</span>
                                                            <Icon className="margin-left" f7="shield_slash" />
                                                        </MenuDropdownItem>
                                                        }
                                                    </MenuDropdown>
                                                </MenuItem>
                                            </td>
                                            <td className="label-cell" style={{minWidth:'40px'}}>
                                                {parseInt(option.verified) === 1 &&
                                                <Button tooltip={"Terverifikasi"} style={{background:'transparent', paddingLeft:'0px', paddingRight:'0px', paddingTop:'2px',width:'8px'}}>
                                                    <i tooltip="Terverifikasi" className="f7-icons" style={{fontSize:'20px', color:'green'}}>checkmark_shield_fill</i>
                                                </Button>
                                                }
                                                {parseInt(option.verified) === 10 &&
                                                <Button tooltip={"Proses Verifikasi"} style={{background:'transparent', paddingLeft:'0px', paddingRight:'0px', paddingTop:'2px',width:'8px'}}>
                                                    <i tooltip="Proses Verifikasi" className="f7-icons" style={{fontSize:'20px', color:'#F48112'}}>shield_lefthalf_fill</i>
                                                </Button>
                                                }
                                                {parseInt(option.verified) === 0 &&
                                                <Button tooltip={"Belum terverifikasi"} style={{background:'transparent', paddingLeft:'0px', paddingRight:'0px', paddingTop:'2px',width:'8px'}}>
                                                    <i tooltip="Belum terverifikasi" className="f7-icons" style={{fontSize:'20px', color:'red'}}>shield</i>
                                                </Button>
                                                }
                                            </td>
                                            <td className="label-cell" style={{minWidth:'200px', color:'#434343', fontSize:'12px'}}>{option.nama}</td>
                                            <td className="label-cell" style={{minWidth:'200px', color:'#434343', fontSize:'12px'}}>{option.username}</td>
                                            <td className="label-cell" style={{minWidth:'120px', color:'#434343', fontSize:'12px'}}>{option.peran}</td>
                                            <td className="label-cell" style={{minWidth:'120px', color:'#434343', fontSize:'12px'}}>{option.wilayah}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            }
                        </table>
                    </div>
                    <div className="data-table-footer" style={{display:'block'}}>
                        <div className="data-table-pagination">
                            <a onClick={this.klikPrev} href="#" className={"link "+(this.state.routeParams.start < 1 ? "disabled" : "" )}>
                                <i class="icon icon-prev color-gray"></i>
                            </a>
                            <a onClick={this.klikNext} href="#" className={"link "+((parseInt(this.state.routeParams.start)+20) > parseInt(this.state.pengguna.total) ? "disabled" : "" )}>
                                <i className="icon icon-next color-gray"></i>
                            </a>
                            <span className="data-table-pagination-label">{(this.state.routeParams.start+1)}-{(this.state.routeParams.start)+parseInt(this.state.routeParams.limit)} dari {this.formatAngka(this.state.pengguna.total)} pengguna</span>
                        </div>
                    </div>
                </Block>
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
      getPengguna: Actions.getPengguna,
      setPengguna: Actions.setPengguna,
      setIsiKanan: Actions.setIsiKanan
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
        pengguna: App.pengguna
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(ManajemenPengguna));