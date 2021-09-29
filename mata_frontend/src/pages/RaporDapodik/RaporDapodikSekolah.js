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

class RaporDapodikSekolah extends Component {
    state = {
        error: null,
        loading: true,
        routeParams:{
            start: 0,
            limit: 20
        },
        pageCount: 0,
        offset: 0,
        activePage: 1,
        rapor_dapodik_sekolah: {
            rows:[{
                sekolah_id: '-',
                nama: '-'
            }],
            total: 0
        }
    }

    handlePageClick = (pageNumber) => {
        // alert(pageNumber);
        // console.log(pageNumber);
        // console.log(a);
        // this.setState({activePage: pageNumber});
    }

    componentDidMount = () => {
        localStorage.setItem('current_url', this.$f7route.url);
        console.log(this.$f7route.params);

        if(this.$f7route.params['kode_wilayah']){
            // this.state.routeParams = {
            //     // ...this.state.routeParams,
            //     kode_wilayah: this.$f7route.params['kode_wilayah']
            // };

            this.loadData(this.$f7route.params['kode_wilayah']);
        }
    }

    loadData = (kode_wilayah) => {
        this.props.setLoading(true);

        this.setState({
            ...this.state,
            routeParams: {
                ...this.state.routeParams,
                kode_wilayah: kode_wilayah ? kode_wilayah: '090000',
                semester_id: localStorage.getItem('semester_id_aplikasi'),
                bentuk_pendidikan_id: localStorage.getItem('jenjang_aplikasi')
            }
        },()=>{
            this.props.getWilayah(this.state.routeParams).then((result)=>{

                // this.setState({
                //     routeParams: {
                //         ...this.state.routeParams,
                //         // kode_wilayah: kode_wilayah,
                //         // semester_id: localStorage.getItem('semester_id_aplikasi')
                //     }
                // },()=>{
                this.props.getRaporDapodikSekolah(this.state.routeParams).then((result)=>{
                    this.setState({
                        loading: false,
                        nama_wilayah: this.props.wilayah.rows[0].nama,
                        rapor_dapodik_sekolah: this.props.rapor_dapodik_sekolah
                    });
                });
                // });
            });
        });

        // alert(kode_wilayah);
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
            this.props.getRaporDapodikSekolah(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false,
                    rapor_dapodik_sekolah: this.props.rapor_dapodik_sekolah
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
            this.props.getRaporDapodikSekolah(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false,
                    rapor_dapodik_sekolah: this.props.rapor_dapodik_sekolah
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
            this.props.getRaporDapodikSekolah(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false,
                    rapor_dapodik_sekolah: this.props.rapor_dapodik_sekolah
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
            this.props.getRaporDapodikSekolah(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false,
                    rapor_dapodik_sekolah: this.props.rapor_dapodik_sekolah
                });
            });
        })
    }

    bukaPengaturan = () => {
        // alert('oke');
        this.props.setJudulKanan('Menu Rapor Per Sekolah');

        this.props.setIsiKanan((
            <>
            <List>
                <Searchbar
                    className="searchbar-demo"
                    // expandable
                    placeholder="Nama Sekolah / NPSN"
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
                <ListItem style={{cursor:'pointer'}} title="Unduh Excel" onClick={()=>window.open(localStorage.getItem('api_base')+"/api/RaporDapodik/getRaporDapodikSekolahExcel?semester_id="+localStorage.getItem('semester_id_aplikasi')+"&kode_wilayah="+(this.$f7route.params['kode_wilayah']?this.$f7route.params['kode_wilayah']:localStorage.getItem('kode_wilayah_aplikasi'))+"&bentuk_pendidikan_id="+(this.state.routeParams.bentuk_pendidikan_id ? this.state.routeParams.bentuk_pendidikan_id : '')+"&status_sekolah="+(this.state.routeParams.status_sekolah ? this.state.routeParams.status_sekolah : '')+"&keyword="+(this.state.routeParams.keyword ? this.state.routeParams.keyword : '')+"&limit=20000")}>
                    <img slot="media" src="static/icons/xls.png" width="25" />
                </ListItem>
            </List>
            </>
        ));
    }

    render()
    {
        return (
            <Page name="RaporDapodik" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Rapor {localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Dapodik' : 'Kualitas Data'}</NavTitle>
                    <NavTitleLarge>
                        Rapor {localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Dapodik' : 'Kualitas Data'}
                    </NavTitleLarge>
                    <Subnavbar>
                        <Segmented raised>
                            <Button tabLink="#tab1" href={"/RaporDapodikRingkasan/"+(this.$f7route.params['id_level_wilayah'] ? this.$f7route.params['id_level_wilayah'] : localStorage.getItem('id_level_wilayah_aplikasi'))+"/"+(this.$f7route.params['kode_wilayah'] ? this.$f7route.params['kode_wilayah'] : localStorage.getItem('kode_wilayah_aplikasi'))}>Per Wilayah</Button>
                            <Button tabLink="#tab2" tabLinkActive>Per Sekolah</Button>
                        </Segmented>
                    </Subnavbar>
                    <NavRight>
                        <Link panelOpen="right" onClick={this.bukaPengaturan} iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu">&nbsp;Menu</Link>
                    </NavRight>
                </Navbar>
                <SelectSemester/>
                {/* <BlockTitle>Sub Rapor Dapodik</BlockTitle> */}
                
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
                                <a onClick={this.klikNext} href="#" className={"link "+((parseInt(this.state.routeParams.start)+20) > parseInt(this.state.rapor_dapodik_sekolah.total) ? "disabled" : "" )}>
                                    <i className="icon icon-next color-gray"></i>
                                </a>
                                <span className="data-table-pagination-label">{(this.state.routeParams.start+1)}-{(this.state.routeParams.start)+parseInt(this.state.routeParams.limit)} dari {this.formatAngka(this.state.rapor_dapodik_sekolah.total)} sekolah</span>
                            </div>
                        </div>
                        <table>
                            <thead style={{background:'#eeeeee'}}>
                                <tr>
                                    <th className="label-cell" rowSpan="2" style={{minWidth:'30px'}}>&nbsp;</th>
                                    <th className="label-cell" rowSpan="2" style={{minWidth:'250px', color:'#434343', fontSize:'15px'}}>Nama Sekolah</th>
                                    <th className="numeric-cell" rowSpan="2" style={{textAlign:'right', color:'#434343', fontSize:'15px'}}>Rapor<br/>Ringkasan</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}} colSpan="6">Rapor Akurat</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}} colSpan="1">Rapor Berkelanjutan</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}} colSpan="5">Rapor Mutakhir</th>
                                </tr>
                                <tr>
                                    <th className="numeric-cell">Rata-rata</th>
                                    <th className="numeric-cell">Sekolah</th>
                                    <th className="numeric-cell">PD</th>
                                    <th className="numeric-cell">PTK</th>
                                    <th className="numeric-cell">Rombel</th>
                                    <th className="numeric-cell">Sarpras</th>
                                    <th className="numeric-cell">Sinkron<br/>4 Semester</th>
                                    <th className="numeric-cell">Rata-rata</th>
                                    <th className="numeric-cell">PD</th>
                                    <th className="numeric-cell">PTK</th>
                                    <th className="numeric-cell">Rombel</th>
                                    <th className="numeric-cell">Sarpras</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.loading ?
                            <>
                                {this.props.dummy_rows.rows.map((option)=>{
                                    return (
                                        <tr>
                                            <td className="label-cell skeleton-text skeleton-effect-blink">loremipsum</td>
                                            <td className="label-cell skeleton-text skeleton-effect-blink">lorenipsumlorenipsum</td>
                                            <td className="label-cell skeleton-text skeleton-effect-blink">lorenipsumlorenipsum</td>
                                            <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                            <th className="numeric-cell skeleton-text skeleton-effect-blink">SNP 1</th>
                                            <th className="numeric-cell skeleton-text skeleton-effect-blink">SNP 2</th>
                                            <th className="numeric-cell skeleton-text skeleton-effect-blink">SNP 3</th>
                                            <th className="numeric-cell skeleton-text skeleton-effect-blink">SNP 4</th>
                                            <th className="numeric-cell skeleton-text skeleton-effect-blink">SNP 5</th>
                                            <th className="numeric-cell skeleton-text skeleton-effect-blink">SNP 6</th>
                                            <th className="numeric-cell skeleton-text skeleton-effect-blink">SNP 7</th>
                                            <th className="numeric-cell skeleton-text skeleton-effect-blink">SNP 8</th>
                                            <th className="numeric-cell skeleton-text skeleton-effect-blink">SNP 8</th>
                                            <th className="numeric-cell skeleton-text skeleton-effect-blink">SNP 8</th>
                                            <th className="numeric-cell skeleton-text skeleton-effect-blink">SNP 8</th>
                                            <th className="numeric-cell skeleton-text skeleton-effect-blink">SNP 8</th>
                                            <th className="numeric-cell skeleton-text skeleton-effect-blink">SNP 8</th>
                                            <th className="numeric-cell skeleton-text skeleton-effect-blink">SNP 8</th>
                                            <th className="numeric-cell skeleton-text skeleton-effect-blink">SNP 8</th>
                                        </tr>
                                    )
                                })}
                            </>
                            :
                            <>
                            {this.state.rapor_dapodik_sekolah.rows.map((option)=>{
                                return(
                                    <tr key={option.kode_wilayah}>
                                        <td className="label-cell">
                                            <MenuItem style={{marginLeft: 'auto', marginTop: '4px', marginBottom: '4px'}} iconF7="menu" dropdown className="MenuDetail">
                                                <MenuDropdown left style={{zIndex:999999}}>
                                                    <MenuDropdownItem href={"/ProfilSekolah/"+option.sekolah_id+"/"}>
                                                        <span>Profil {option.nama}</span>
                                                        <Icon className="margin-left" f7="bookmark" />
                                                    </MenuDropdownItem>
                                                    <MenuDropdownItem href={"/RaporDapodikProfil/"+option.sekolah_id+"/"}>
                                                        <span>Rapor {option.nama}</span>
                                                        <Icon className="margin-left" f7="bookmark" />
                                                    </MenuDropdownItem>
                                                </MenuDropdown>
                                            </MenuItem>
                                        </td>
                                        <td className="label-cell">
                                            <a href={"/RaporDapodikProfil/"+option.sekolah_id+"/"}><b>{option.nama}</b> ({option.npsn})</a><br/>
                                            <i style={{fontSize:'10px'}}>{option.kecamatan}, {option.kabupaten}, {option.provinsi}</i>
                                        </td>
                                        <td className="numeric-cell"><b>{option.rapor_final ? this.formatAngka(parseFloat(option.rapor_final).toFixed(2)) : '-'}</b></td>
                                        <td className="numeric-cell"><b>{option.rapor_akhir ? this.formatAngka(parseFloat(option.rapor_akhir).toFixed(2)) : '-'}</b></td>
                                        <td className="numeric-cell">{option.rapor_sekolah ? this.formatAngka(parseFloat(option.rapor_sekolah).toFixed(2)) : '-'}</td>
                                        <td className="numeric-cell">{option.rapor_pd ? this.formatAngka(parseFloat(option.rapor_pd).toFixed(2)) : '-'}</td>
                                        <td className="numeric-cell">{option.rapor_ptk ? this.formatAngka(parseFloat(option.rapor_ptk).toFixed(2)) : '-'}</td>
                                        <td className="numeric-cell">{option.rapor_rombel ? this.formatAngka(parseFloat(option.rapor_rombel).toFixed(2)) : '-'}</td>
                                        <td className="numeric-cell">{option.rapor_sarpras ? this.formatAngka(parseFloat(option.rapor_sarpras).toFixed(2)) : '-'}</td>
                                        <td className="numeric-cell"><b>{option.rapor_berkelanjutan ? this.formatAngka(parseFloat(option.rapor_berkelanjutan).toFixed(2)) : '-'}</b></td>
                                        <td className="numeric-cell"><b>{option.rapor_mutakhir ? this.formatAngka(parseFloat(option.rapor_mutakhir).toFixed(2)) : '-'}</b></td>
                                        <td className="numeric-cell">{option.rapor_mutakhir_pd ? this.formatAngka(parseFloat(option.rapor_mutakhir_pd).toFixed(2)) : '-'}</td>
                                        <td className="numeric-cell">{option.rapor_mutakhir_ptk ? this.formatAngka(parseFloat(option.rapor_mutakhir_ptk).toFixed(2)) : '-'}</td>
                                        <td className="numeric-cell">{option.rapor_mutakhir_rombel ? this.formatAngka(parseFloat(option.rapor_mutakhir_rombel).toFixed(2)) : '-'}</td>
                                        <td className="numeric-cell">{option.rapor_mutakhir_sarpras ? this.formatAngka(parseFloat(option.rapor_mutakhir_sarpras).toFixed(2)) : '-'}</td>
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
                                <a onClick={this.klikNext} href="#" className={"link "+((parseInt(this.state.routeParams.start)+20) > parseInt(this.state.rapor_dapodik_sekolah.total) ? "disabled" : "" )}>
                                    <i className="icon icon-next color-gray"></i>
                                </a>
                                <span className="data-table-pagination-label">{(this.state.routeParams.start+1)}-{(this.state.routeParams.start)+parseInt(this.state.routeParams.limit)} dari {this.formatAngka(this.state.rapor_dapodik_sekolah.total)} sekolah</span>
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
      setJudulKanan: Actions.setJudulKanan,
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
        dummy_rows: App.dummy_rows
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(RaporDapodikSekolah));