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
    ListInput
} from 'framework7-react';

// import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";

import { Doughnut, Bar } from 'react-chartjs-2';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';
import SelectSemester from '../SelectSemester';

class tambahIndexPendidikan extends Component {
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
            kode_wilayah: this.$f7route.params['kode_wilayah'] ? this.$f7route.params['kode_wilayah'] : localStorage.getItem('kode_wilayah_aplikasi'),
            tahun: this.$f7route.params['tahun'] ? this.$f7route.params['tahun'] : null
            // tahun: '2020'
        }
    }

    componentDidMount = () => {
        
        this.setState({
            routeParams: {
                kode_wilayah: this.state.routeParams.kode_wilayah
            }
        },()=>{

            if(this.$f7route.params['kode_wilayah'] && this.$f7route.params['tahun']){
                
                this.props.getIndexPendidikan(this.state.index_pendidikan).then((result)=>{
                    this.setState({
                        index_pendidikan: result.payload.rows[0]
                    })
                })
            }

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

    setParamValue = (tipe) => (b) => {
        this.setState({
            ...this.state,
            loading: true,
            index_pendidikan: {
                ...this.state.index_pendidikan,
                [tipe]: b.target.value
            }
        },()=>{
            
            console.log(this.state.index_pendidikan)

        });
    }

    bukaPengaturan = () => {
        
        this.props.setJudulKanan('Menu Tambah Indikator Pendidikan');

    }

    simpanIndex = () => {
        this.$f7.dialog.preloader();
        this.props.simpanIndexPendidikan(this.state.index_pendidikan).then((result)=>{
            if(result.payload.sukses){
                //berhasil
                this.$f7.dialog.close();
                this.$f7router.navigate('/formIndexPendidikan');
            }else{
                //gagal
                this.$f7.dialog.close();
                this.$f7.dialog.alert('Terdapat kesalahan pada sistem atau jaringan Anda. Mohon dicoba kembali dalam beberapa saat!', 'Peringatan')
            }
        })
    }

    render()
    {
        return (
            <Page name="tambahIndexPendidikan" hideBarsOnScroll>
                {this.state.routeParams.kode_wilayah === localStorage.getItem('kode_wilayah_aplikasi') &&
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>{this.props.wilayah.rows[0].nama}</NavTitle>
                    <NavTitleLarge sliding>
                        {this.$f7route.params['tahun'] ? 'Edit' : 'Tambah'} Index Pendidikan
                    </NavTitleLarge>
                    <NavRight sliding>
                        <Link panelOpen="right" onClick={this.bukaPengaturan} iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu">&nbsp;Menu</Link>
                    </NavRight>
                </Navbar>
                }
                <BlockTitle>
                    {this.$f7route.params['tipe'] === 'ipm' && <>Index Pembangunan Manusia</>}
                    {this.$f7route.params['tipe'] === 'hls' && <>Harapan Lama Sekolah</>}
                    {this.$f7route.params['tipe'] === 'rls' && <>Rata-rata Lama Sekolah</>}
                    {this.$f7route.params['tipe'] === 'amh' && <>Angka Melek Huruf</>}
                    {this.$f7route.params['tipe'] === 'apk' && <>Angka Partisipasi Kasar</>}
                    {this.$f7route.params['tipe'] === 'apm' && <>Angka Partisipasi Murni</>}
                </BlockTitle>
                <List inlineLabels noHairlinesMd style={{width:'100%',marginBottom:'0px',marginTop:'0px'}}>
                    <ListInput
                        label="Tahun"
                        type="text"
                        placeholder="Tahun"
                        clearButton
                        defaultValue={this.state.index_pendidikan.tahun}
                        onChange={this.setParamValue('tahun')}
                        // value={this.state.pengguna.rows[0].peran}
                        // onChange={this.setValue('peran')}
                    >
                    </ListInput>
                    <ListInput
                        label="Nilai"
                        type="number"
                        placeholder="Nilai"
                        clearButton
                        defaultValue={
                            this.$f7route.params['tipe'] === 'ipm' ? this.state.index_pendidikan.nilai_ipm : 
                            (this.$f7route.params['tipe'] === 'hls' ? this.state.index_pendidikan.nilai_hls : 
                            (this.$f7route.params['tipe'] === 'rls' ? this.state.index_pendidikan.nilai_rls : 
                            (this.$f7route.params['tipe'] === 'amh' ? this.state.index_pendidikan.nilai_amh : 
                            (this.$f7route.params['tipe'] === 'apk' ? this.state.index_pendidikan.nilai_apk : 
                            (this.$f7route.params['tipe'] === 'apm' ? this.state.index_pendidikan.nilai_apm : 
                            null
                            )))))}
                        onChange={this.setParamValue('nilai_'+this.$f7route.params['tipe'])}
                        // value={this.state.pengguna.rows[0].wilayah}      
                        // onChange={this.setValue('peran')}
                    >
                    </ListInput>
                </List>
                <Button raised fill style={{marginTop:'16px', marginLeft:'16px', display:'inline-flex'}} onClick={this.simpanIndex}>
                    <i className="icons f7-icons" style={{fontSize:'20px'}}>floppy_disk</i>&nbsp;Simpan
                </Button>
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
      getIndexPendidikan: Actions.getIndexPendidikan,
      simpanIndexPendidikan: Actions.simpanIndexPendidikan
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

export default (connect(mapStateToProps, mapDispatchToProps)(tambahIndexPendidikan));