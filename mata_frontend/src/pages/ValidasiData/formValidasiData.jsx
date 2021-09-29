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
    ListInput,
    Progressbar,
    ListItemContent,
    Radio
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import moment from 'moment';

class formValidasiData extends Component {
    state = {
        error: null,
        loading: true,
        show: {
            provinsi: 'block',
            kabupaten: 'none'
        },
        pengguna: {
            rows: [{
                pengguna_id: '---'
            }],
            total: 0
        },
        data: {},
        set_password: false,
        set_peran_id: false,
        file_gambar_ktp: '',
        file_gambar_sk: '',
        gambar_ktp: '',
        gambar_sk: '',
        zoom: 17,
        rekap_sekolah:{
            total:0,
            rows: [{
                sekolah_id: '',
                nama: ''
            }]
        },
        routeParams: {
            status_validasi_id: 'N'
        },
        sekolah: {}
    }

    componentDidMount = () => {
        this.setState({
            data: {},
            routeParams:{
                sekolah_id: this.$f7route.params['sekolah_id']
            }
        },()=>{
            this.props.getRekapSekolah(this.state.routeParams).then((result)=>{
                this.setState({
                    rekap_sekolah: result.payload
                },()=>{
                    console.log(this.state.rekap_sekolah);
                });
            });

            this.props.getSekolah(this.state.routeParams).then((result)=>{
                console.log(this.props.sekolah);

                this.setState({
                    sekolah: this.props.sekolah.rows[0],
                    loading: false
                },()=>{
                    console.log(this.state.routeParams.status_validasi_id)
                })

            });
        });
    }

    gantiTab = (kode) => {
        
    }

    setValue = (kolom) => (e) => {
        if(!this.$f7route.params['pengguna_id']){
            
            this.setState({
                ...this.state,
                pengguna:{
                    ...this.state.pengguna,
                    rows: [{
                        ...this.state.pengguna.rows[0],
                        [kolom]: e.target.value
                    }]
                },
                data:{
                    ...this.state.data,
                    [kolom]: e.target.value
                }
            },()=>{
                console.log(this.state);
            });
        }
    }



    bulan = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember'
    ]

    klikVerval = (status_validasi_id) => {
        this.setState({
            ...this.state,
            routeParams: {
                ...this.state.routeParams,
                status_validasi_id: status_validasi_id
            }
        });
    }

    setStateValue = (key) => (e) => {
        let value = e.currentTarget.value;

        this.setState({
            routeParams: {
                ...this.state.routeParams,
                [key]: value
            }
        })
    }
    
    simpanVerval = () => {
        this.$f7.dialog.preloader();
        this.setState({
            routeParamsSimpanVerval: {
                ...this.state.routeParams,
                peran_id: JSON.parse(localStorage.getItem('user')).peran_id,
                pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
                semester_id: localStorage.getItem('semester_id_aplikasi')
            }
        },()=>{
            this.props.simpanValidasiData(this.state.routeParamsSimpanVerval).then((result)=>{
                this.$f7.dialog.close();
                if(result.payload.sukses){
                    //bnerhasiol;
                    this.$f7.dialog.alert('Validasi Berhasil!', 'Berhasil');
                    this.$f7router.navigate(("/ValidasiData/"+(JSON.parse(localStorage.getItem('user')).kode_wilayah ? (JSON.parse(localStorage.getItem('user')).kode_wilayah.substring(0,2) === '00' ? '0' : (JSON.parse(localStorage.getItem('user')).kode_wilayah.substring(2,4) === '00' ? '1' : (JSON.parse(localStorage.getItem('user')).kode_wilayah.substring(4,6) === '00' ? '3' : '0') ) ) : localStorage.getItem('id_level_wilayah_aplikasi'))+"/"+(JSON.parse(localStorage.getItem('user')).kode_wilayah ? JSON.parse(localStorage.getItem('user')).kode_wilayah : localStorage.getItem('kode_wilayah_aplikasi'))))
                    // this.$f7router.navigate('/validasiData/'+localStorage.getItem('id_level_wilayah_aplikasi')+'/'+localStorage.getItem('kode_wilayah_aplikasi'))
                }else{
                    //agagal
                    this.$f7.dialog.alert('Terjadi kesalahan pada sistem atau jaringan Anda. Mohon coba kembali dalam beberapa saat!', 'Peringatan');
                }
            })
        })
    }

    render()
    {
        // console.log(this.state.pengguna.rows[0].peran_id);
        return (
            <Page name="formValidasiData" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Validasi Data Sekolah</NavTitle>
                    <NavTitleLarge>
                        Validasi Data Sekolah
                    </NavTitleLarge>
                </Navbar>
                
                <Card>
                    <CardContent>
                        <List className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>
                            <h3 style={{marginLeft:'16px'}}>{this.state.sekolah.nama} ({this.state.sekolah.npsn})</h3>
                            <div style={{marginLeft: '16px',marginTop: '-20px', fontSize: '12px'}}>{this.state.sekolah.alamat_jalan}, {this.state.sekolah.kecamatan}, {this.state.sekolah.kabupaten}, {this.state.sekolah.provinsi}</div>
                            <ListItem title="Valid">
                                <Radio 
                                    name={"status_validasi_id"} 
                                    value={1} 
                                    slot="media"
                                    onChange={()=>this.klikVerval(1)}
                                    disabled={this.state.loading}
                                    // onChange={()=>this.klikPilihSekolah(option.sekolah_id, option.nama, option.npsn, (option.alamat_jalan + ", " + option.kecamatan + ", " + option.kabupaten + ", " + option.provinsi), option.bentuk_pendidikan_id, option.status_sekolah, option.jarak)}
                                />
                            </ListItem>
                            <ListItem title="Perlu Perbaikan Data">
                                <Radio 
                                    name={"status_validasi_id"} 
                                    value={2} 
                                    slot="media"
                                    onChange={()=>this.klikVerval(2)}
                                    disabled={this.state.loading}
                                    // onChange={()=>this.klikPilihSekolah(option.sekolah_id, option.nama, option.npsn, (option.alamat_jalan + ", " + option.kecamatan + ", " + option.kabupaten + ", " + option.provinsi), option.bentuk_pendidikan_id, option.status_sekolah, option.jarak)}
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
                {parseInt(this.state.routeParams.status_validasi_id) === 1 &&
                <Card>
                    <CardContent>
                        <div style={{fontWeight:'bold', fontSize:'30px'}}>
                            PAKTA INTEGRITAS
                        </div>
                        <div>
                            Tanggal <b>{moment().format('D') + ' ' + this.bulan[(moment().format('M')-1)] + ' ' + moment().format('YYYY')}</b>
                        </div>
                        <br/>
                        <div>
                            Dengan ini Saya <b>{JSON.parse(localStorage.getItem('user')).nama}</b> sebagai <b>{JSON.parse(localStorage.getItem('user')).peran}</b> <b>{JSON.parse(localStorage.getItem('user')).wilayah}</b> menyatakan bahwa data dimiliki oleh <b>{this.state.sekolah.nama} ({this.state.sekolah.npsn})</b>, alamat {this.state.sekolah.alamat_jalan}, {this.state.sekolah.kecamatan}, {this.state.sekolah.kabupaten}, {this.state.sekolah.provinsi} di Data Pokok Pendidikan (Dapodik) periode semester <b>{localStorage.getItem('semester_id_aplikasi').substring(0,4)}/{(parseInt(localStorage.getItem('semester_id_aplikasi').substring(0,4))+1)} {(parseInt(localStorage.getItem('semester_id_aplikasi').substring(4,5)) === 1 ? 'Ganjil' : 'Genap')}</b> telah diperiksa kebenaran dan kewajaran datanya, serta telah sesuai dengan fakta yang ada di lapangan.
                        </div>
                        <br/>
                        <div>
                            Saya sepenuhnya siap bertanggung jawab apabila di kemudian hari ditemukan ketidaksesuaian antara data yang diisi pada Data Pokok Pendidikan dengan fakta yang ada di lapangan, dan Saya siap menerima sanksi moral, sanksi administrasi, dan sanksi hukum sesuai dengan peraturan dan perundang-undangan yang berlaku.
                        </div>
                        <br/>
                        <div>
                            Penanggungjawab
                        </div>
                        <div style={{fontWeight:'bold'}}>
                            {JSON.parse(localStorage.getItem('user')).nama}
                        </div>
                    </CardContent>
                </Card>
                }
                {parseInt(this.state.routeParams.status_validasi_id) === 2 &&
                <Card>
                    <CardContent>
                        <div style={{fontWeight:'bold', fontSize:'20px'}}>
                            Catatan Perbaikan Data
                        </div>
                        <br/>
                        <List noHairlinesMd>
                            <ListInput
                                outline
                                // label="Name"
                                floatingLabel
                                type="textarea"
                                resizable
                                placeholder="Catatan perbaikan data ..."
                                clearButton
                                onChange={this.setStateValue('keterangan')}
                            >
                                {/* <Icon icon="demo-list-icon" slot="media" /> */}
                            </ListInput>
                            {/* <ListInput
                                // label="Catatan"
                                type="textarea"
                                resizable
                                placeholder="Catatan perbaikan data ..."
                                clearButton
                                onChange={this.setStateValue('keterangan')}
                            >
                            </ListInput> */}
                        </List>
                    </CardContent>
                </Card>
                }
                <Card>
                    <CardContent>
                        <Button disabled={(this.state.loading ? true : (typeof(this.state.routeParams.status_validasi_id) === 'undefined' ? true : false))} raised fill large onClick={this.simpanVerval}>
                            Simpan
                        </Button>
                    </CardContent>
                </Card>
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
      getWilayah: Actions.getWilayah,
      getProvinsi: Actions.getProvinsi,
      getKabupaten: Actions.getKabupaten,
      getKecamatan: Actions.getKecamatan,
      simpanValidasiData: Actions.simpanValidasiData
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
        pengguna: App.pengguna,
        wilayah: App.wilayah,
        provinsi: App.provinsi,
        kabupaten: App.kabupaten,
        kecamatan: App.kecamatan,
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(formValidasiData));