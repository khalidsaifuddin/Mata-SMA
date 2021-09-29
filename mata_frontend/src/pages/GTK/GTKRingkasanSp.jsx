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

class GTKRingkasanSp extends Component {
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
                    this.props.getRekapGTKRingkasanSp(this.state.routeParams).then((result)=>{
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
                                    localStorage.getItem('api_base')+"/api/GTK/getRekapGTKRingkasanSpExcel"
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
            this.props.getRekapGTKRingkasanSp(this.state.routeParams).then((result)=>{
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
            this.props.getRekapGTKRingkasanSp(this.state.routeParams).then((result)=>{
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
            this.props.getRekapGTKRingkasanSp(this.state.routeParams).then((result)=>{
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
            this.props.getRekapGTKRingkasanSp(this.state.routeParams).then((result)=>{
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
        //                 localStorage.getItem('api_base')+"/api/GTK/getRekapGTKRingkasanExcel"
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
            <Page name="GTKRingkasanSp" hideBarsOnScroll>
                {this.state.routeParams.kode_wilayah === localStorage.getItem('kode_wilayah_aplikasi') &&
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>{this.props.wilayah.rows[0].nama}</NavTitle>
                    <NavTitleLarge>
                        Ringkasan GTK Per Sekolah
                    </NavTitleLarge>
                    <Subnavbar>
                        <Segmented raised>
                            <Button tabLink="#tab1" href={"/GTK/Ringkasan"}>Per Wilayah</Button>
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
                        <Link iconIos="f7:chevron_left" iconAurora="f7:chevron_left" iconMd="material:chevron_left" href={(parseInt(this.state.routeParams.id_level_wilayah) === 1 ? "/GTK/Ringkasan" : "/GTK/Ringkasan/1/"+this.state.routeParams.kode_wilayah.substring(0,2) + "0000" )}>Kembali</Link>
                    </NavLeft>
                    <NavTitle sliding>{this.props.wilayah.rows[0].nama}</NavTitle>
                    <NavTitleLarge>
                        Ringkasan GTK
                    </NavTitleLarge>
                    <Subnavbar>
                        <Segmented raised>
                            <Button tabLink="#tab1" href={(parseInt(this.state.routeParams.id_level_wilayah) === 1 ? "/GTK/Ringkasan/1/"+this.state.routeParams.kode_wilayah : "/GTK/Ringkasan/2/"+this.state.routeParams.kode_wilayah)}>Per Wilayah</Button>
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
                                <a onClick={this.klikNext} href="#" className={"link "+((parseInt(this.state.routeParams.start)+20) > parseInt(this.props.rekap_gtk_ringkasan_sp.total) ? "disabled" : "" )}>
                                    <i className="icon icon-next color-gray"></i>
                                </a>
                                <span className="data-table-pagination-label">{(this.state.routeParams.start+1)}-{(this.state.routeParams.start)+parseInt(this.state.routeParams.limit)} dari {this.formatAngka(this.props.rekap_gtk_ringkasan_sp.total)} sekolah</span>
                            </div>
                        </div>
                        <table>
                            <thead style={{background:'#eeeeee'}}>
                                <tr>
                                    <th className="label-cell" rowspan="2" style={{minWidth:'40px'}}>&nbsp;</th>
                                    <th className="label-cell" rowspan="2" style={{minWidth:'250px', color:'#434343', fontSize:'15px'}}>Nama Sekolah</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}} colSpan="3">Guru</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}} colSpan="3">Tendik</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}} colSpan="3">Total GTK</th>
                                </tr>
                                <tr>
                                    <th className="numeric-cell">L</th>
                                    <th className="numeric-cell">P</th>
                                    <th className="numeric-cell">Total</th>
                                    <th className="numeric-cell">L</th>
                                    <th className="numeric-cell">P</th>
                                    <th className="numeric-cell">Total</th>
                                    <th className="numeric-cell">L</th>
                                    <th className="numeric-cell">P</th>
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
                            {this.props.rekap_gtk_ringkasan_sp.rows.map((option)=>{
                                return(
                                    <tr>
                                        <td className="label-cell">
                                            <MenuItem style={{marginLeft: 'auto', marginTop: '4px', marginBottom: '4px'}} iconF7="menu" dropdown className="MenuDetail">
                                                <MenuDropdown left style={{zIndex:999999}}>
                                                    {/* <MenuDropdownItem href={"/GTK/Ringkasan/"+option.id_level_wilayah+"/"+option.kode_wilayah} onClick={()=>this.dataRaporWilayah(option.kode_wilayah.trim())}>
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
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.guru_laki))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.guru_perempuan))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt((parseInt(option.guru_laki)+parseInt(option.guru_perempuan))))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.tendik_laki))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.tendik_perempuan))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt((parseInt(option.tendik_laki)+parseInt(option.tendik_perempuan))))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.gtk_laki))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.gtk_perempuan))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt((parseInt(option.gtk_laki)+parseInt(option.gtk_perempuan))))}</td>
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
                                <a onClick={this.klikNext} href="#" className={"link "+((parseInt(this.state.routeParams.start)+20) > parseInt(this.props.rekap_gtk_ringkasan_sp.total) ? "disabled" : "" )}>
                                    <i className="icon icon-next color-gray"></i>
                                </a>
                                <span className="data-table-pagination-label">{(this.state.routeParams.start+1)}-{(this.state.routeParams.start)+parseInt(this.state.routeParams.limit)} dari {this.formatAngka(this.props.rekap_gtk_ringkasan_sp.total)} sekolah</span>
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
      getRekapGTKRingkasan: Actions.getRekapGTKRingkasan,
      getRekapGTKRingkasanSp: Actions.getRekapGTKRingkasanSp,
      setJudulKanan: Actions.setJudulKanan,
      setIsiKanan: Actions.setIsiKanan
    }, dispatch);
}

function mapStateToProps({ App, GTK, Gtk, RaporDapodik, RekapGTK }) {

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
        rekap_gtk_ringkasan: RekapGTK.rekap_gtk_ringkasan,
        rekap_gtk_ringkasan_sp: RekapGTK.rekap_gtk_ringkasan_sp
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(GTKRingkasanSp));