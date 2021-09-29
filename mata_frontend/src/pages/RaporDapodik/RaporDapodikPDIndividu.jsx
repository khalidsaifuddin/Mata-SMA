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

class RapodRapodikPDIndividu extends Component {
    state = {
        error: null,
        loading: true,
        routeParams:{
            start: 0,
            limit: 20
        },
        pageCount: 0,
        offset: 0,
        activePage: 1
    }

    handlePageClick = (pageNumber) => {
        
    }

    componentDidMount = () => {
        localStorage.setItem('current_url', this.$f7route.url);
        console.log(this.$f7route.params);

        if(this.$f7route.params['sekolah_id']){
            this.loadData(this.$f7route.params['sekolah_id']);
        }
    }

    loadData = (sekolah_id) => {
        this.props.setLoading(true);

        this.setState({
            ...this.state,
            routeParams: {
                ...this.state.routeParams,
                sekolah_id: sekolah_id ? sekolah_id: '30D7A3F4-8B18-E111-85A3-011F3A87E1E4',
                semester_id: localStorage.getItem('semester_id_aplikasi')
            }
        },()=>{
            this.props.getRaporDapodikPD(this.state.routeParams).then((result)=>{
                this.setState({
                    loading: false
                });
            });
        });

    }

    formatAngka = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    klikNext = () => {
        
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: (parseInt(this.state.routeParams.start) + parseInt(this.state.routeParams.limit))
            }
        },()=>{
            this.props.getRaporDapodikPD(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false
                });
            });
        });
    }

    klikPrev = () => {
        
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: (parseInt(this.state.routeParams.start) - parseInt(this.state.routeParams.limit))
            }
        },()=>{
            this.props.getRaporDapodikPD(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false
                });
            });
        });
    }

    render()
    {
        return (
            <Page name="RapodRapodikPDIndividu" hideBarsOnScroll>
                {this.state.routeParams.kode_wilayah === localStorage.getItem('kode_wilayah_aplikasi') &&
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>{this.props.wilayah.rows[0].nama}</NavTitle>
                    <NavTitleLarge>
                        Rapor {localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Dapodik' : 'Kualitas Data'} PD Individu
                    </NavTitleLarge>
                    {/* <NavRight >
                        <Link panelOpen="right" onClick={this.bukaPengaturan} iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu">&nbsp;Menu</Link>
                    </NavRight> */}
                </Navbar>
                }
                {this.state.routeParams.kode_wilayah !== localStorage.getItem('kode_wilayah_aplikasi') &&
                <Navbar sliding={false} backLink="Kembali">
                    <NavTitle sliding>{this.props.wilayah.rows[0].nama}</NavTitle>
                    <NavTitleLarge>
                        Rapor {localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Dapodik' : 'Kualitas Data'} PD Individu
                    </NavTitleLarge>
                    <NavRight >
                        <Link panelOpen="right" iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu">&nbsp;Menu</Link>
                    </NavRight>
                </Navbar>
                }
                {/* <BlockTitle>Rekap Sekolah</BlockTitle> */}
                <SelectSemester/>
                <BlockTitle style={{marginTop:'8px'}}>Peserta didik di {this.props.rapor_dapodik_pd.rows[0].nama_sekolah}</BlockTitle>
                <BlockTitle style={{marginTop:'0px', fontSize: '10px'}}>{this.props.rapor_dapodik_pd.rows[0].kecamatan}, {this.props.rapor_dapodik_pd.rows[0].kabupaten}, {this.props.rapor_dapodik_pd.rows[0].propinsi}</BlockTitle>
                <Block>
                    <Segmented raised>
                        <Button tabLink="#tab1" href={"/RaporDapodikPD/"+this.props.rapor_dapodik_pd.rows[0].sekolah_id}>Nilai Rapor</Button>
                        <Button tabLink="#tab2" tabLinkActive>Indikator Penghitungan</Button>
                    </Segmented>
                </Block>
                <Block strong style={{marginBottom:'0px', padding:'4px'}}>
                    <div className="data-table-footer" style={{display:'block'}}>
                        <div className="data-table-pagination">
                            <a onClick={this.klikPrev} href="#" className={"link "+(this.state.routeParams.start < 1 ? "disabled" : "" )}>
                                <i class="icon icon-prev color-gray"></i>
                            </a>
                            <a onClick={this.klikNext} href="#" className={"link "+((parseInt(this.state.routeParams.start)+20) > parseInt(this.props.rapor_dapodik_pd.total) ? "disabled" : "" )}>
                                <i className="icon icon-next color-gray"></i>
                            </a>
                            <span className="data-table-pagination-label">{(this.state.routeParams.start+1)}-{(this.state.routeParams.start)+parseInt(this.state.routeParams.limit)} dari {this.formatAngka(this.props.rapor_dapodik_pd.total)} peserta didik</span>
                        </div>
                    </div>
                </Block>
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
                                    <th className="label-cell" rowSpan="2" style={{minWidth:'200px', color:'#434343', fontSize:'15px'}}>Nama Peserta Didik</th>
                                    <th className="numeric-cell" rowSpan="2" style={{minWidth:'100px', color:'#434343', fontSize:'15px'}}>Nilai Rapor</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}} colSpan="13">Indikator Penghitungan</th>
                                </tr>
                                <tr>
                                    <th className="numeric-cell">Nama</th>
                                    <th className="numeric-cell">NISN</th>
                                    <th className="numeric-cell">Tanggal Lahir</th>
                                    <th className="numeric-cell">No Telp</th>
                                    <th className="numeric-cell">Email</th>
                                    <th className="numeric-cell">Nama Ibu Kandung</th>
                                    <th className="numeric-cell">Nama Ayah</th>
                                    <th className="numeric-cell">Pekerjaan Ayah</th>
                                    <th className="numeric-cell">Pekerjaan Ibu</th>
                                    <th className="numeric-cell">Tinggi Badan</th>
                                    <th className="numeric-cell">Berat Badan</th>
                                    <th className="numeric-cell">Lintang</th>
                                    <th className="numeric-cell">Bujur</th>
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
                                        </tr>
                                    )
                                })}
                            </>
                            :
                            <>
                            {this.props.rapor_dapodik_pd.rows.map((option)=>{
                                
                                let warnaAngka = '#039BE5';

                                if (parseFloat(option.nilai_rapor) < 90) {
                                    if(parseFloat(option.nilai_rapor) < 70){
                                        if(parseFloat(option.nilai_rapor) < 50){
                                            warnaAngka = '#bf360c';    
                                        }else{
                                            warnaAngka = '#fb8c00';    
                                        }
                                    }else{
                                        warnaAngka = '#039BE5';
                                    }
                                }else{
                                    warnaAngka = '#558B2F';
                                }

                                return(
                                    <tr key={option.kode_wilayah}>
                                        <td className="label-cell">
                                            <MenuItem style={{marginLeft: 'auto', marginTop: '4px', marginBottom: '4px'}} iconF7="menu" dropdown className="MenuDetail">
                                                <MenuDropdown left style={{zIndex:999999}}>
                                                    {/* <MenuDropdownItem href={"/PesertaDidik/Agama/"+option.id_level_wilayah+"/"+option.kode_wilayah} onClick={()=>this.dataRaporWilayah(option.kode_wilayah.trim())}>
                                                        <span>Rekap Wilayah {option.nama}</span>
                                                        <Icon className="margin-left" f7="bookmark" />
                                                    </MenuDropdownItem>
                                                    <MenuDropdownItem href={"/PesertaDidik/AgamaSp/"+(parseInt(option.id_level_wilayah))+"/"+option.kode_wilayah.trim()}>
                                                        <span>Rekap Sekolah {option.nama}</span>
                                                        <Icon className="margin-left" f7="bookmark" />
                                                    </MenuDropdownItem> */}
                                                </MenuDropdown>
                                            </MenuItem>
                                        </td>
                                        <td className="label-cell">
                                            <b>{option.nama}</b> ({option.nisn})<br/>
                                            <span style={{fontSize:'10px'}}>{option.nama_sekolah}</span><br/>
                                            <span className="hilangDiDesktop" style={{fontSize:'10px'}}>Kelas {option.tingkat_pendidikan_id} - {option.nama_rombel}</span>
                                        </td>
                                        <td className="numeric-cell" style={{fontSize:'18px', fontWeight:'bold', textAlign: 'right', color:warnaAngka}}>{parseFloat(option.nilai_rapor).toFixed(2)}</td>
                                        <td className="numeric-cell">
                                            {this.formatAngka(parseInt(option.nama_valid)) === "1" && <i className="f7-icons" style={{color:'green'}}>checkmark_circle_fill</i>}
                                            {this.formatAngka(parseInt(option.nama_valid)) === "0" && <i className="f7-icons">circle</i>}
                                        </td>
                                        <td className="numeric-cell">
                                            {this.formatAngka(parseInt(option.nisn_valid)) === "1" && <i className="f7-icons" style={{color:'green'}}>checkmark_circle_fill</i>}
                                            {this.formatAngka(parseInt(option.nisn_valid)) === "0" && <i className="f7-icons">circle</i>}
                                        </td>
                                        <td className="numeric-cell">
                                            {this.formatAngka(parseInt(option.tanggal_lahir_valid)) === "1" && <i className="f7-icons" style={{color:'green'}}>checkmark_circle_fill</i>}
                                            {this.formatAngka(parseInt(option.tanggal_lahir_valid)) === "0" && <i className="f7-icons">circle</i>}
                                        </td>
                                        <td className="numeric-cell">
                                            {this.formatAngka(parseInt(option.no_telp_valid)) === "1" && <i className="f7-icons" style={{color:'green'}}>checkmark_circle_fill</i>}
                                            {this.formatAngka(parseInt(option.no_telp_valid)) === "0" && <i className="f7-icons">circle</i>}
                                        </td>
                                        <td className="numeric-cell">
                                            {this.formatAngka(parseInt(option.email_valid)) === "1" && <i className="f7-icons" style={{color:'green'}}>checkmark_circle_fill</i>}
                                            {this.formatAngka(parseInt(option.email_valid)) === "0" && <i className="f7-icons">circle</i>}
                                        </td>
                                        <td className="numeric-cell">
                                            {this.formatAngka(parseInt(option.nama_ibu_kandung_valid)) === "1" && <i className="f7-icons" style={{color:'green'}}>checkmark_circle_fill</i>}
                                            {this.formatAngka(parseInt(option.nama_ibu_kandung_valid)) === "0" && <i className="f7-icons">circle</i>}
                                        </td>
                                        <td className="numeric-cell">
                                            {this.formatAngka(parseInt(option.nama_ayah_valid)) === "1" && <i className="f7-icons" style={{color:'green'}}>checkmark_circle_fill</i>}
                                            {this.formatAngka(parseInt(option.nama_ayah_valid)) === "0" && <i className="f7-icons">circle</i>}
                                        </td>
                                        <td className="numeric-cell">
                                            {this.formatAngka(parseInt(option.pekerjaan_ayah_valid)) === "1" && <i className="f7-icons" style={{color:'green'}}>checkmark_circle_fill</i>}
                                            {this.formatAngka(parseInt(option.pekerjaan_ayah_valid)) === "0" && <i className="f7-icons">circle</i>}
                                        </td>
                                        <td className="numeric-cell">
                                            {this.formatAngka(parseInt(option.pekerjaan_ibu_valid)) === "1" && <i className="f7-icons" style={{color:'green'}}>checkmark_circle_fill</i>}
                                            {this.formatAngka(parseInt(option.pekerjaan_ibu_valid)) === "0" && <i className="f7-icons">circle</i>}
                                        </td>
                                        <td className="numeric-cell">
                                            {this.formatAngka(parseInt(option.tinggi_badan_valid)) === "1" && <i className="f7-icons" style={{color:'green'}}>checkmark_circle_fill</i>}
                                            {this.formatAngka(parseInt(option.tinggi_badan_valid)) === "0" && <i className="f7-icons">circle</i>}
                                        </td>
                                        <td className="numeric-cell">
                                            {this.formatAngka(parseInt(option.berat_badan_valid)) === "1" && <i className="f7-icons" style={{color:'green'}}>checkmark_circle_fill</i>}
                                            {this.formatAngka(parseInt(option.berat_badan_valid)) === "0" && <i className="f7-icons">circle</i>}
                                        </td>
                                        <td className="numeric-cell">
                                            {this.formatAngka(parseInt(option.lintang_valid)) === "1" && <i className="f7-icons" style={{color:'green'}}>checkmark_circle_fill</i>}
                                            {this.formatAngka(parseInt(option.lintang_valid)) === "0" && <i className="f7-icons">circle</i>}
                                        </td>
                                        <td className="numeric-cell">
                                            {this.formatAngka(parseInt(option.bujur_valid)) === "1" && <i className="f7-icons" style={{color:'green'}}>checkmark_circle_fill</i>}
                                            {this.formatAngka(parseInt(option.bujur_valid)) === "0" && <i className="f7-icons">circle</i>}
                                        </td>
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
      getRekapPesertaDidikAgama: Actions.getRekapPesertaDidikAgama,
      setJudulKanan: Actions.setJudulKanan,
      setIsiKanan: Actions.setIsiKanan,
      getRaporDapodikPD: Actions.getRaporDapodikPD,
    }, dispatch);
}

function mapStateToProps({ App, PesertaDidik, Gtk, RaporDapodik, RekapSekolah, RekapPesertaDidik }) {

    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        sekolah: App.sekolah,
        rekap_sekolah: App.rekap_sekolah,
        sekolah_individu: App.sekolah_individu,
        wilayah: App.wilayah,
        dummy_rows: App.dummy_rows,
        rekap_peserta_didik_agama: RekapPesertaDidik.rekap_peserta_didik_agama,
        judul_panel_kanan: App.judul_panel_kanan,
        isi_panel_kanan: App.isi_panel_kanan,
        rapor_dapodik_pd: RaporDapodik.rapor_dapodik_pd,
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(RapodRapodikPDIndividu));