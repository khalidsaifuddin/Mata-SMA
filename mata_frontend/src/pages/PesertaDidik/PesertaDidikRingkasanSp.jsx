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
    Segmented
} from 'framework7-react';

// import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";

import { Doughnut, Bar } from 'react-chartjs-2';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';
import SelectSemester from '../SelectSemester';

// import 'framework7-icons';

class PesertaDidikRingkasanSp extends Component {
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
        }
    }

    componentDidMount = () => {
        // this.setState({
        //     ...this.state,
        //     loading: false
        // });
        
        this.setState({
            routeParams: {
                kode_wilayah: this.state.routeParams.kode_wilayah
            }
        },()=>{
            this.props.getWilayah(this.state.routeParams).then((result)=>{
                this.setState({
                    routeParams: {
                        kode_wilayah: this.$f7route.params['kode_wilayah'] ? this.$f7route.params['kode_wilayah'] : localStorage.getItem('kode_wilayah_aplikasi'),
                        id_level_wilayah: this.$f7route.params['id_level_wilayah'] ? this.$f7route.params['id_level_wilayah']: localStorage.getItem('id_level_wilayah_aplikasi'),
                        semester_id:localStorage.getItem('semester_id_aplikasi'),
                        tahun_ajaran_id:localStorage.getItem('semester_id_aplikasi').substring(0,4),
                        bentuk_pendidikan_id: localStorage.getItem('jenjang_aplikasi'),
                        start:0,
                        limit: 20
                    }
                },()=>{
                    this.props.getRekapPesertaDidikRingkasanSp(this.state.routeParams).then((result)=>{
                        this.setState({
                            ...this.state,
                            loading: false
                        });

                        console.log(this.state);
                    });

                    this.props.setIsiKanan((
                        <>
                        <List>
                            <Searchbar
                                className="searchbar-demo"
                                // expandable
                                placeholder="Nama Wilayah"
                                searchContainer=".search-list"
                                searchIn=".item-title"
                                onSubmit={this.cariKeyword}
                            ></Searchbar>
                            <ListItem
                                title="Bentuk"
                                smartSelect
                                smartSelectParams={{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Saring Bentuk'}}
                            >
                                <select onChange={this.setParamValue} name="bentuk_pendidikan_id" defaultValue={localStorage.getItem('jenjang_aplikasi')}>
                                    {localStorage.getItem('jenjang_aplikasi').includes('-') && <option value="5-6-13-15-29">Semua</option>}
                                    {localStorage.getItem('jenjang_aplikasi').includes('5') && <option value="5">SD</option>}
                                    {localStorage.getItem('jenjang_aplikasi').includes('6') && <option value="6">SMP</option>}
                                    {localStorage.getItem('jenjang_aplikasi').includes('5-6') && <option value="5-6">SD/SMP</option>}
                                    {localStorage.getItem('jenjang_aplikasi').includes('13') && <option value="13">SMA</option>}
                                    {localStorage.getItem('jenjang_aplikasi').includes('15') && <option value="15">SMK</option>}
                                    {localStorage.getItem('jenjang_aplikasi').includes('13-15') && <option value="13-15">SMA/SMK</option>}
                                    {localStorage.getItem('jenjang_aplikasi').includes('29') && <option value="29">SLB</option>}
                                </select>
                            </ListItem>
                            <ListItem
                                title="Status"
                                smartSelect
                                smartSelectParams={{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Saring Status'}}
                            >
                                <select onChange={this.setParamValue} name="status_sekolah" defaultValue="semua">
                                    <option value="99">Semua</option>
                                    <option value="1">Negeri</option>
                                    <option value="2">Swasta</option>
                                </select>
                            </ListItem>
                        </List>
                        <List>  
                            <ListItem style={{cursor:'pointer'}} title="Unduh Excel" onClick={()=>{window.open(
                                    localStorage.getItem('api_base')+"/api/PesertaDidik/getRekapPesertaDidikRingkasanSpExcel"
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
                        </List>
                        </>
                    ));
                })
            })
        });


    }

    formatAngka = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    pindahTab = (jenis) => {
        alert(jenis);
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
            this.props.getRekapPesertaDidikRingkasanSp(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false
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
            this.props.getRekapPesertaDidikRingkasanSp(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false
                });
            });
        });
    }

    setParamValue = (b) => {
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: 0,
                [b.target.getAttribute('name')]: b.target.value
            }
        },()=>{
            // console.log(this.state.routeParams);
            this.props.getRekapPesertaDidikRingkasanSp(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false
                });
            });
        });
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
            this.props.getRekapPesertaDidikRingkasanSp(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false
                });
            });
        })
    }

    bukaPengaturan = () => {
        // alert('oke');
        this.props.setJudulKanan('Menu Ringkasan Per Sekolah');

        // this.props.setIsiKanan((
        //     <>
        //     <List>
        //         <Searchbar
        //             className="searchbar-demo"
        //             // expandable
        //             placeholder="Nama Wilayah"
        //             searchContainer=".search-list"
        //             searchIn=".item-title"
        //             onSubmit={this.cariKeyword}
        //         ></Searchbar>
        //         <ListItem
        //             title="Bentuk"
        //             smartSelect
        //             smartSelectParams={{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Saring Bentuk'}}
        //         >
        //             <select onChange={this.setParamValue} name="bentuk_pendidikan_id" defaultValue={localStorage.getItem('jenjang_aplikasi')}>
        //                 {localStorage.getItem('jenjang_aplikasi').includes('-') && <option value="5-6-13-15-29">Semua</option>}
        //                 {localStorage.getItem('jenjang_aplikasi').includes('5') && <option value="5">SD</option>}
        //                 {localStorage.getItem('jenjang_aplikasi').includes('6') && <option value="6">SMP</option>}
        //                 {localStorage.getItem('jenjang_aplikasi').includes('5-6') && <option value="5-6">SD/SMP</option>}
        //                 {localStorage.getItem('jenjang_aplikasi').includes('13') && <option value="13">SMA</option>}
        //                 {localStorage.getItem('jenjang_aplikasi').includes('15') && <option value="15">SMK</option>}
        //                 {localStorage.getItem('jenjang_aplikasi').includes('13-15') && <option value="13-15">SMA/SMK</option>}
        //                 {localStorage.getItem('jenjang_aplikasi').includes('29') && <option value="29">SLB</option>}
        //             </select>
        //         </ListItem>
        //         <ListItem
        //             title="Status"
        //             smartSelect
        //             smartSelectParams={{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Saring Status'}}
        //         >
        //             <select onChange={this.setParamValue} name="status_sekolah" defaultValue="semua">
        //                 <option value="99">Semua</option>
        //                 <option value="1">Negeri</option>
        //                 <option value="2">Swasta</option>
        //             </select>
        //         </ListItem>
        //     </List>
        //     <List>  
        //         <ListItem style={{cursor:'pointer'}} title="Unduh Excel" onClick={()=>{window.open(
        //                 localStorage.getItem('api_base')+"/api/PesertaDidik/getRekapPesertaDidikRingkasanExcel"
        //                 +"?semester_id="+localStorage.getItem('semester_id_aplikasi')
        //                 +"&tahun_ajaran_id="+localStorage.getItem('semester_id_aplikasi').substring(0,4)
        //                 +"&id_level_wilayah="+(this.state.routeParams.id_level_wilayah)
        //                 +"&kode_wilayah="+(this.state.routeParams.kode_wilayah)
        //                 +"&bentuk_pendidikan_id="+(this.state.routeParams.bentuk_pendidikan_id ? this.state.routeParams.bentuk_pendidikan_id : '')
        //                 +"&status_sekolah="+(this.state.routeParams.status_sekolah ? this.state.routeParams.status_sekolah : '')
        //                 +"&keyword="+(this.state.routeParams.keyword ? this.state.routeParams.keyword : '')
        //                 +"&limit=20000"
        //             )}}>
        //             <img slot="media" src="static/icons/xls.png" width="25" />
        //         </ListItem>
        //     </List>
        //     </>
        // ));
    }

    render()
    {
        return (
            <Page name="PesertaDidikRingkasanSp" hideBarsOnScroll>
                {this.state.routeParams.kode_wilayah === localStorage.getItem('kode_wilayah_aplikasi') &&
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>{this.props.wilayah.rows[0].nama}</NavTitle>
                    <NavTitleLarge>
                        Ringkasan Peserta Didik
                    </NavTitleLarge>
                    <Subnavbar>
                        <Segmented raised>
                            <Button tabLink="#tab1" href={"/PesertaDidik/Ringkasan"}>Per Wilayah</Button>
                            <Button tabLink="#tab2" tabLinkActive>Per Sekolah</Button>
                        </Segmented>
                    </Subnavbar>
                    <NavRight >
                        <Link panelOpen="right" onClick={this.bukaPengaturan} iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu">&nbsp;Menu</Link>
                    </NavRight>
                </Navbar>
                }
                {this.state.routeParams.kode_wilayah !== localStorage.getItem('kode_wilayah_aplikasi') &&
                <Navbar sliding={false}>
                    <NavLeft >
                        <Link iconIos="f7:chevron_left" iconAurora="f7:chevron_left" iconMd="material:chevron_left" href={(parseInt(this.state.routeParams.id_level_wilayah) === 1 ? "/PesertaDidik/Ringkasan" : "/PesertaDidik/Ringkasan/1/"+this.state.routeParams.kode_wilayah.substring(0,2) + "0000" )}>Kembali</Link>
                    </NavLeft>
                    <NavTitle sliding>{this.props.wilayah.rows[0].nama}</NavTitle>
                    <NavTitleLarge>
                        Ringkasan Peserta Didik
                    </NavTitleLarge>
                    <Subnavbar>
                        <Segmented raised>
                            <Button tabLink="#tab1" href={(parseInt(this.state.routeParams.id_level_wilayah) === 1 ? "/PesertaDidik/Ringkasan/1/"+this.state.routeParams.kode_wilayah : "/PesertaDidik/Ringkasan/2/"+this.state.routeParams.kode_wilayah)}>Per Wilayah</Button>
                            <Button tabLink="#tab2" tabLinkActive>Per Sekolah</Button>
                        </Segmented>
                    </Subnavbar>
                    <NavRight >
                        <Link panelOpen="right" onClick={this.bukaPengaturan} iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu">&nbsp;Menu</Link>
                    </NavRight>
                </Navbar>
                }
                {/* <BlockTitle>Rekap Sekolah</BlockTitle> */}
                <SelectSemester/>
                <Block strong style={{
                    marginTop:'0px', 
                    paddingLeft:'0px', 
                    paddingRight:'0px', 
                    paddingTop:'0px', 
                    paddingBottom:'0px'
                }}>
                    <div className="data-table" style={{overflowY:'hidden'}}>
                        <div className="data-table-footer" style={{display:'block'}}>
                            <div className="data-table-pagination">
                                <a onClick={this.klikPrev} href="#" className={"link "+(this.state.routeParams.start < 1 ? "disabled" : "" )}>
                                    <i class="icon icon-prev color-gray"></i>
                                </a>
                                <a onClick={this.klikNext} href="#" className={"link "+((parseInt(this.state.routeParams.start)+20) > parseInt(this.props.rekap_peserta_didik_ringkasan_sp.total) ? "disabled" : "" )}>
                                    <i className="icon icon-next color-gray"></i>
                                </a>
                                <span className="data-table-pagination-label">{(this.state.routeParams.start+1)}-{(this.state.routeParams.start)+parseInt(this.state.routeParams.limit)} dari {this.formatAngka(this.props.rekap_peserta_didik_ringkasan_sp.total)} sekolah</span>
                            </div>
                        </div>
                        <table>
                            <thead style={{background:'#eeeeee'}}>
                                <tr>
                                    <th className="label-cell" rowspan="2" style={{minWidth:'40px'}}>&nbsp;</th>
                                    <th className="label-cell" rowspan="2" style={{minWidth:'250px', color:'#434343', fontSize:'15px'}}>Nama Sekolah</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}} colspan="14">Tingkat Pendidikan</th>
                                </tr>
                                <tr>
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
                            {this.props.rekap_peserta_didik_ringkasan_sp.rows.map((option)=>{
                                return(
                                    <tr>
                                        <td className="label-cell">
                                            <MenuItem style={{marginLeft: 'auto', marginTop: '4px', marginBottom: '4px'}} iconF7="menu" dropdown className="MenuDetail">
                                                <MenuDropdown left style={{zIndex:999999}}>
                                                    {/* <MenuDropdownItem href={"/PesertaDidik/Ringkasan/"+option.id_level_wilayah+"/"+option.kode_wilayah} onClick={()=>this.dataRaporWilayah(option.kode_wilayah.trim())}>
                                                        <span>Rekap Wilayah {option.nama}</span>
                                                        <Icon className="margin-left" f7="bookmark" />
                                                    </MenuDropdownItem> */}
                                                    {/* <MenuDropdownItem href={"/RaporDapodikSekolah/"+(parseInt(option.id_level_wilayah))+"/"+option.kode_wilayah.trim()}>
                                                        <span>Rekap Sekolah {option.nama}</span>
                                                        <Icon className="margin-left" f7="archievebox" />
                                                    </MenuDropdownItem> */}
                                                </MenuDropdown>
                                            </MenuItem>
                                        </td>
                                        <td className="label-cell">
                                            {option.nama} ({option.npsn})<br/>
                                            <span style={{fontSize:'11px', color:'#434343'}}>{option.kecamatan}, {option.kabupaten}</span>
                                        </td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.pd))}</td>
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
                        <div className="data-table-footer" style={{display:'block'}}>
                            <div className="data-table-pagination">
                                <a onClick={this.klikPrev} href="#" className={"link "+(this.state.routeParams.start < 1 ? "disabled" : "" )}>
                                    <i class="icon icon-prev color-gray"></i>
                                </a>
                                <a onClick={this.klikNext} href="#" className={"link "+((parseInt(this.state.routeParams.start)+20) > parseInt(this.props.rekap_peserta_didik_ringkasan_sp.total) ? "disabled" : "" )}>
                                    <i className="icon icon-next color-gray"></i>
                                </a>
                                <span className="data-table-pagination-label">{(this.state.routeParams.start+1)}-{(this.state.routeParams.start)+parseInt(this.state.routeParams.limit)} dari {this.formatAngka(this.props.rekap_peserta_didik_ringkasan_sp.total)} sekolah</span>
                            </div>
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
      getRekapPesertaDidikRingkasan: Actions.getRekapPesertaDidikRingkasan,
      getRekapPesertaDidikRingkasanSp: Actions.getRekapPesertaDidikRingkasanSp,
      setJudulKanan: Actions.setJudulKanan,
      setIsiKanan: Actions.setIsiKanan
    }, dispatch);
}

function mapStateToProps({ App, PesertaDidik, Gtk, RaporDapodik, RekapPesertaDidik }) {

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
        rekap_peserta_didik_ringkasan: RekapPesertaDidik.rekap_peserta_didik_ringkasan,
        rekap_peserta_didik_ringkasan_sp: RekapPesertaDidik.rekap_peserta_didik_ringkasan_sp
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(PesertaDidikRingkasanSp));