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
    View
} from 'framework7-react';

// import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";

import { Doughnut, Bar } from 'react-chartjs-2';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';
import SelectSemester from '../SelectSemester';

// import 'framework7-icons';

class SarprasTingkatKerusakan extends Component {
    state = {
        error: null,
        loading: true,
        routeParams: {
            kode_wilayah: this.$f7route.params['kode_wilayah'] ? this.$f7route.params['kode_wilayah'] : localStorage.getItem('kode_wilayah_aplikasi'),
            id_level_wilayah: this.$f7route.params['id_level_wilayah'] ? this.$f7route.params['id_level_wilayah']: localStorage.getItem('id_level_wilayah_aplikasi'),
            semester_id:localStorage.getItem('semester_id_aplikasi'),
            tahun_ajaran_id: localStorage.getItem('semester_id_aplikasi').substring(0,4),
            bentuk_pendidikan_id: localStorage.getItem('jenjang_aplikasi'),
            status_sekolah: '99'
        }
    }

    componentDidMount = () => {
        
        this.setState({
            jenis: this.$f7route.params['jenis'] ? this.$f7route.params['jenis'] : 'rangkuman',
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
                        tahun_ajaran_id: localStorage.getItem('semester_id_aplikasi').substring(0,4),
                        bentuk_pendidikan_id: localStorage.getItem('jenjang_aplikasi'),
                        status_sekolah: '99',
                        jenis_sarpras_jumlah: this.$f7route.params['jenis'] ? this.$f7route.params['jenis'] : 'rangkuman'
                    }
                },()=>{
                    this.props.getRekapSarprasTingkatKerusakan(this.state.routeParams).then((result)=>{
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
                                    localStorage.getItem('api_base')+"/api/Sarpras/getRekapSarprasTingkatKerusakanExcel"
                                    +"?semester_id="+localStorage.getItem('semester_id_aplikasi')
                                    +"&tahun_ajaran_id="+localStorage.getItem('semester_id_aplikasi').substring(0,4)
                                    +"&id_level_wilayah="+(this.state.routeParams.id_level_wilayah)
                                    +"&kode_wilayah="+(this.state.routeParams.kode_wilayah)
                                    +"&bentuk_pendidikan_id="+(this.state.routeParams.bentuk_pendidikan_id ? this.state.routeParams.bentuk_pendidikan_id : '')
                                    +"&status_sekolah="+(this.state.routeParams.status_sekolah ? this.state.routeParams.status_sekolah : '')
                                    +"&keyword="+(this.state.routeParams.keyword ? this.state.routeParams.keyword : '')
                                    +"&jenis_sarpras_jumlah="+(this.$f7route.params['jenis'] ? this.$f7route.params['jenis'] : 'umum')
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

    cariKeyword = (event)  => {
        this.setState({
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                keyword: event.target[0].value
            }
        },()=>{
            this.props.getRekapSarprasTingkatKerusakan(this.state.routeParams).then((result)=>{
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
            // console.log(this.state.routeParams);
            this.props.getRekapSarprasTingkatKerusakan(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false
                });
            });
        });
    }

    bukaPengaturan = () => {
        // alert('oke');
        this.props.setJudulKanan('Menu Kerusakan Sarpras');

        // this.props.setIsiKanan((
        //     <List>
        //         {/* <ListItem> */}
        //             <Searchbar
        //                 className="searchbar-demo"
        //                 // expandable
        //                 placeholder="Nama Wilayah"
        //                 searchContainer=".search-list"
        //                 searchIn=".item-title"
        //                 onSubmit={this.cariKeyword}
        //             ></Searchbar>
        //         {/* </ListItem> */}
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
        // ));
    }

    render()
    {
        return (
            <Page name="SarprasTingkatKerusakan" hideBarsOnScroll>
                {this.state.routeParams.kode_wilayah === localStorage.getItem('kode_wilayah_aplikasi') &&
                <Navbar sliding={false} onBackClick={this.backClick}>
                    <NavLeft>
                        <Link iconIos="f7:chevron_left" iconAurora="f7:chevron_left" iconMd="material:chevron_left" href="/RekapData/">Rekap Data</Link>
                    </NavLeft>
                    <NavTitle sliding>{this.props.wilayah.rows[0].nama}</NavTitle>
                    <NavTitleLarge>
                        Kerusakan Sarpras {this.state.jenis ==='rangkuman' ? 'Umum' : (this.state.jenis ==='lab' ? 'Laboratorium' : (this.state.jenis === 'lab_komputer' ? 'Lab Komputer' : 'Umum'))}
                    </NavTitleLarge>
                    <Subnavbar>
                        <Segmented raised>
                            <Button tabLink="#tab1" tabLinkActive>Per Wilayah</Button>
                            <Button tabLink="#tab2" href={"/Sarpras/TingkatKerusakanSp/"+localStorage.getItem('id_level_wilayah_aplikasi')+"/"+localStorage.getItem('kode_wilayah_aplikasi')+"/"+this.state.jenis}>Per Sekolah</Button>
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
                        <Link iconIos="f7:chevron_left" iconAurora="f7:chevron_left" iconMd="material:chevron_left" href={(parseInt(this.state.routeParams.id_level_wilayah) === 1 ? "/Sarpras/TingkatKerusakan/"+this.state.jenis : "/Sarpras/TingkatKerusakan/1/"+this.state.routeParams.kode_wilayah.substring(0,2) + "0000" +"/"+this.state.jenis )}>Kembali</Link>
                    </NavLeft>
                    <NavTitle sliding>{this.props.wilayah.rows[0].nama}</NavTitle>
                    <NavTitleLarge>
                        Kerusakan Sarpras {this.state.jenis ==='rangkuman' ? 'Umum' : (this.state.jenis ==='lab' ? 'Laboratorium' : (this.state.jenis === 'lab_komputer' ? 'Lab Komputer' : 'Umum'))}
                    </NavTitleLarge>
                    <Subnavbar>
                        <Segmented raised>
                            <Button tabLink="#tab1" tabLinkActive>Per Wilayah</Button>
                            <Button tabLink="#tab2" href={(parseInt(this.state.routeParams.id_level_wilayah) === 1 ? "/Sarpras/TingkatKerusakanSp/1/"+this.state.routeParams.kode_wilayah+"/"+this.state.jenis : "/Sarpras/TingkatKerusakan/2/"+this.state.routeParams.kode_wilayah+"/"+this.state.jenis)}>Per Sekolah</Button>
                        </Segmented>
                    </Subnavbar>
                    <NavRight >
                        <Link panelOpen="right" iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu">&nbsp;Menu</Link>
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
                        <table>
                            <thead style={{background:'#eeeeee'}}>
                                <tr>
                                    <th className="label-cell" rowSpan="2" style={{minWidth:'40px'}}>&nbsp;</th>
                                    <th className="label-cell" rowSpan="2" style={{minWidth:'200px', color:'#434343', fontSize:'15px'}}>Wilayah</th>
                                    {this.state.jenis === 'rangkuman' &&
                                    <>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}} colSpan={4}>Ruang Kelas</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}} colSpan={4}>Perpustakaan</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}} colSpan={4}>Ruang Guru</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}} colSpan={4}>Ruang Kepsek</th>
                                    </>
                                    }
                                    {this.state.jenis === 'lab' &&
                                    <>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}} colSpan={4}>Lab Fisika</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}} colSpan={4}>Lab Kimia</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}} colSpan={4}>Lab Biologi</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}} colSpan={4}>Labor (Bengkel)</th>
                                    </>
                                    }
                                </tr>
                                <tr>
                                    <th className="numeric-cell">Baik</th>
                                    <th className="numeric-cell">Rusak Ringan</th>
                                    <th className="numeric-cell">Rusak Sedang</th>
                                    <th className="numeric-cell">Rusak Berat</th>
                                    
                                    <th className="numeric-cell">Baik</th>
                                    <th className="numeric-cell">Rusak Ringan</th>
                                    <th className="numeric-cell">Rusak Sedang</th>
                                    <th className="numeric-cell">Rusak Berat</th>

                                    <th className="numeric-cell">Baik</th>
                                    <th className="numeric-cell">Rusak Ringan</th>
                                    <th className="numeric-cell">Rusak Sedang</th>
                                    <th className="numeric-cell">Rusak Berat</th>

                                    <th className="numeric-cell">Baik</th>
                                    <th className="numeric-cell">Rusak Ringan</th>
                                    <th className="numeric-cell">Rusak Sedang</th>
                                    <th className="numeric-cell">Rusak Berat</th>
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
                                            <>
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
                                            </>
                                        </tr>
                                    )
                                })}
                            </>
                            :
                            <>
                            {this.props.rekap_sarpras_tingkat_kerusakan.rows.map((option)=>{
                                return(
                                    <tr key={option.kode_wilayah}>
                                        <td className="label-cell">
                                            <MenuItem style={{marginLeft: 'auto', marginTop: '4px', marginBottom: '4px'}} iconF7="menu" dropdown className="MenuDetail">
                                                <MenuDropdown left style={{zIndex:999999}}>
                                                    <MenuDropdownItem href={"/Sarpras/TingkatKerusakan/"+option.id_level_wilayah+"/"+option.kode_wilayah+"/"+this.state.jenis}>
                                                        <span>Rekap Wilayah {option.nama}</span>
                                                        <Icon className="margin-left" f7="bookmark" />
                                                    </MenuDropdownItem>
                                                    <MenuDropdownItem href={"/Sarpras/TingkatKerusakanSp/"+(parseInt(option.id_level_wilayah))+"/"+option.kode_wilayah.trim()+"/"+this.state.jenis}>
                                                        <span>Rekap Sekolah {option.nama}</span>
                                                        <Icon className="margin-left" f7="bookmark" />
                                                    </MenuDropdownItem>
                                                </MenuDropdown>
                                            </MenuItem>
                                        </td>
                                        <td className="label-cell">
                                            {option.nama}<br/>
                                            {parseInt(option.id_level_wilayah) === 1 && <span></span>}
                                            {parseInt(option.id_level_wilayah) === 2 && <span style={{fontSize:'11px', color:'#434343'}}>{option.induk_propinsi}</span>}
                                            {parseInt(option.id_level_wilayah) === 3 && <span style={{fontSize:'11px', color:'#434343'}}>{option.induk_kabupaten}</span>}
                                        </td>
                                        {this.state.jenis === 'lab' &&
                                        <>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.lab_fisika_baik))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.lab_fisika_rusak_ringan))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.lab_fisika_rusak_sedang))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.lab_fisika_rusak_berat))}</td>

                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.lab_kimia_baik))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.lab_kimia_rusak_ringan))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.lab_kimia_rusak_sedang))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.lab_kimia_rusak_berat))}</td>

                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.lab_biologi_baik))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.lab_biologi_rusak_ringan))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.lab_biologi_rusak_sedang))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.lab_biologi_rusak_berat))}</td>

                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.bengkel_baik))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.bengkel_rusak_ringan))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.bengkel_rusak_sedang))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.bengkel_rusak_berat))}</td>
                                        </>
                                        }
                                        {this.state.jenis === 'rangkuman' &&
                                        <>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.r_kelas_baik))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.r_kelas_rusak_ringan))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.r_kelas_rusak_sedang))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.r_kelas_rusak_berat))}</td>

                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.perpustakaan_baik))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.perpustakaan_rusak_ringan))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.perpustakaan_rusak_sedang))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.perpustakaan_rusak_berat))}</td>

                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.r_guru_baik))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.r_guru_rusak_ringan))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.r_guru_rusak_sedang))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.r_guru_rusak_berat))}</td>

                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.r_kepsek_baik))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.r_kepsek_rusak_ringan))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.r_kepsek_rusak_sedang))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.r_kepsek_rusak_berat))}</td>
                                        </>
                                        }
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
      getWilayah: Actions.getWilayah,
      getRekapSarprasTingkatKerusakan: Actions.getRekapSarprasTingkatKerusakan,
      setJudulKanan: Actions.setJudulKanan,
      setIsiKanan: Actions.setIsiKanan
    }, dispatch);
}

function mapStateToProps({ App, Sarpras, Gtk, RaporDapodik, RekapSekolah, RekapSarpras }) {

    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        sekolah: App.sekolah,
        rekap_sekolah: App.rekap_sekolah,
        sekolah_individu: App.sekolah_individu,
        wilayah: App.wilayah,
        dummy_rows: App.dummy_rows,
        rekap_sarpras_tingkat_kerusakan: RekapSarpras.rekap_sarpras_tingkat_kerusakan,
        judul_panel_kanan: App.judul_panel_kanan,
        isi_panel_kanan: App.isi_panel_kanan
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(SarprasTingkatKerusakan));