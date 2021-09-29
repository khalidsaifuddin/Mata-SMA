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

class hasilValidasi extends Component {
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
        sekolah: {},
        validasi_pusat: {},
        validasi_dinas: {},
        validasi_lpmp: {}
    }

    componentDidMount = () => {
        this.setState({
            data: {},
            routeParams:{
                sekolah_id: this.$f7route.params['sekolah_id']
            }
        },()=>{
            this.props.getValidasiDataRecord(this.state.routeParams).then((result)=>{
                for (let index = 0; index < this.props.validasi_data_record.rows.length; index++) {
                    const element = this.props.validasi_data_record.rows[index];

                    if(element.level_validasi_id === 'pusat'){
                        this.setState({
                            validasi_pusat: element
                        })
                    }else if(element.level_validasi_id === 'lpmp'){
                        this.setState({
                            validasi_lpmp: element
                        })
                    }else if(element.level_validasi_id === 'dinas'){
                        this.setState({
                            validasi_dinas: element
                        })
                    }
                    
                }

                console.log(this.state);
            })

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

    render()
    {
        // console.log(this.state.pengguna.rows[0].peran_id);
        return (
            <Page name="hasilValidasi" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Hasil Validasi</NavTitle>
                    <NavTitleLarge>
                        Hasil Validasi
                    </NavTitleLarge>
                </Navbar>
                <Card>
                    <CardContent>
                        <h3 style={{marginLeft:'0PX'}}>{this.state.sekolah.nama} ({this.state.sekolah.npsn})</h3>
                        <div style={{marginLeft: '0PX',marginTop: '-10px', fontSize: '12px'}}>{this.state.sekolah.alamat_jalan}, {this.state.sekolah.kecamatan}, {this.state.sekolah.kabupaten}, {this.state.sekolah.provinsi}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Segmented tabbar raised>
                            <Button tabLink="#tab-1" tabLinkActive>Dinas</Button>
                            <Button tabLink="#tab-2" >LPMP</Button>
                            <Button tabLink="#tab-3" >Pusat</Button>
                        </Segmented>
                        <Tabs animated>
                            <Tab id="tab-1" tabActive>
                                {/* <BlockTitle>Dinas</BlockTitle>
                                {JSON.stringify(this.state.validasi_dinas)} */}
                                {typeof(this.state.validasi_dinas.status_validasi_id) === 'undefined' &&
                                <Card>
                                    <CardContent>
                                        <div style={{fontWeight:'bold', fontSize:'20px'}}>
                                            Belum divalidasi oleh dinas
                                        </div>
                                    </CardContent>
                                </Card>
                                }
                                {parseInt(this.state.validasi_dinas.status_validasi_id) === 2 &&
                                <Card>
                                    <CardContent>
                                        <div style={{fontWeight:'bold', fontSize:'20px'}}>
                                            Catatan Perbaikan
                                        </div>
                                        <div>
                                            {this.state.validasi_dinas.keterangan}
                                        </div>
                                    </CardContent>
                                </Card>
                                }
                                {parseInt(this.state.validasi_dinas.status_validasi_id) === 1 &&
                                <Card>
                                    <CardContent>
                                        <div style={{fontWeight:'bold', fontSize:'30px'}}>
                                            PAKTA INTEGRITAS
                                        </div>
                                        <div>
                                            Tanggal <b>{moment(this.state.validasi_dinas.create_date).format('D') + ' ' + this.bulan[(moment(this.state.validasi_dinas.create_date).format('M')-1)] + ' ' + moment(this.state.validasi_dinas.create_date).format('YYYY')}</b>
                                        </div>
                                        <br/>
                                        <div>
                                            Dengan ini Saya <b>{this.state.validasi_dinas.nama_pengguna}</b> sebagai <b>{this.state.validasi_dinas.peran}</b> <b>{this.state.validasi_dinas.wilayah}</b> menyatakan bahwa data dimiliki oleh <b>{this.state.validasi_dinas.nama_sekolah} ({this.state.validasi_dinas.npsn})</b>, alamat {this.state.validasi_dinas.alamat_jalan}, {this.state.sekolah.kecamatan}, {this.state.sekolah.kabupaten}, {this.state.sekolah.provinsi} di Data Pokok Pendidikan (Dapodik) periode semester <b>{localStorage.getItem('semester_id_aplikasi').substring(0,4)}/{(parseInt(localStorage.getItem('semester_id_aplikasi').substring(0,4))+1)} {(parseInt(localStorage.getItem('semester_id_aplikasi').substring(4,5)) === 1 ? 'Ganjil' : 'Genap')}</b> telah diperiksa kebenaran dan kewajaran datanya, serta telah sesuai dengan fakta yang ada di lapangan.
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
                            </Tab>
                            <Tab id="tab-2">
                                {/* <BlockTitle>LPMP</BlockTitle> */}
                                {/* {JSON.stringify(this.state.validasi_lpmp)} */}
                                {typeof(this.state.validasi_lpmp.status_validasi_id) === 'undefined' &&
                                <Card>
                                    <CardContent>
                                        <div style={{fontWeight:'bold', fontSize:'20px'}}>
                                            Belum divalidasi oleh LPMP
                                        </div>
                                    </CardContent>
                                </Card>
                                }
                                {parseInt(this.state.validasi_lpmp.status_validasi_id) === 2 &&
                                <Card>
                                    <CardContent>
                                        <div style={{fontWeight:'bold', fontSize:'20px'}}>
                                            Catatan Perbaikan
                                        </div>
                                        <div>
                                            {this.state.validasi_lpmp.keterangan}
                                        </div>
                                    </CardContent>
                                </Card>
                                }
                                {parseInt(this.state.validasi_lpmp.status_validasi_id) === 1 &&
                                <Card>
                                    <CardContent>
                                        <div style={{fontWeight:'bold', fontSize:'30px'}}>
                                            PAKTA INTEGRITAS
                                        </div>
                                        <div>
                                            Tanggal <b>{moment(this.state.validasi_lpmp.create_date).format('D') + ' ' + this.bulan[(moment(this.state.validasi_lpmp.create_date).format('M')-1)] + ' ' + moment(this.state.validasi_lpmp.create_date).format('YYYY')}</b>
                                        </div>
                                        <br/>
                                        <div>
                                            Dengan ini Saya <b>{this.state.validasi_lpmp.nama_pengguna}</b> sebagai <b>{this.state.validasi_lpmp.peran}</b> <b>{this.state.validasi_lpmp.wilayah}</b> menyatakan bahwa data dimiliki oleh <b>{this.state.validasi_lpmp.nama_sekolah} ({this.state.validasi_lpmp.npsn})</b>, alamat {this.state.validasi_lpmp.alamat_jalan}, {this.state.sekolah.kecamatan}, {this.state.sekolah.kabupaten}, {this.state.sekolah.provinsi} di Data Pokok Pendidikan (Dapodik) periode semester <b>{localStorage.getItem('semester_id_aplikasi').substring(0,4)}/{(parseInt(localStorage.getItem('semester_id_aplikasi').substring(0,4))+1)} {(parseInt(localStorage.getItem('semester_id_aplikasi').substring(4,5)) === 1 ? 'Ganjil' : 'Genap')}</b> telah diperiksa kebenaran dan kewajaran datanya, serta telah sesuai dengan fakta yang ada di lapangan.
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
                            </Tab>
                            <Tab id="tab-3">
                                {/* <BlockTitle>Pusat</BlockTitle>
                                {JSON.stringify(this.state.validasi_pusat)} */}
                                {typeof(this.state.validasi_pusat.status_validasi_id) === 'undefined' &&
                                <Card>
                                    <CardContent>
                                        <div style={{fontWeight:'bold', fontSize:'20px'}}>
                                            Belum divalidasi oleh Pusat
                                        </div>
                                    </CardContent>
                                </Card>
                                }
                                {parseInt(this.state.validasi_pusat.status_validasi_id) === 2 &&
                                <Card>
                                    <CardContent>
                                        <div style={{fontWeight:'bold', fontSize:'20px'}}>
                                            Catatan Perbaikan
                                        </div>
                                        <div>
                                            {this.state.validasi_pusat.keterangan}
                                        </div>
                                    </CardContent>
                                </Card>
                                }
                                {parseInt(this.state.validasi_pusat.status_validasi_id) === 1 &&
                                <Card>
                                    <CardContent>
                                        <div style={{fontWeight:'bold', fontSize:'30px'}}>
                                            PAKTA INTEGRITAS
                                        </div>
                                        <div>
                                            Tanggal <b>{moment(this.state.validasi_pusat.create_date).format('D') + ' ' + this.bulan[(moment(this.state.validasi_pusat.create_date).format('M')-1)] + ' ' + moment(this.state.validasi_pusat.create_date).format('YYYY')}</b>
                                        </div>
                                        <br/>
                                        <div>
                                            Dengan ini Saya <b>{this.state.validasi_pusat.nama_pengguna}</b> sebagai <b>{this.state.validasi_pusat.peran}</b> <b>{this.state.validasi_pusat.wilayah}</b> menyatakan bahwa data dimiliki oleh <b>{this.state.validasi_pusat.nama_sekolah} ({this.state.validasi_pusat.npsn})</b>, alamat {this.state.validasi_pusat.alamat_jalan}, {this.state.sekolah.kecamatan}, {this.state.sekolah.kabupaten}, {this.state.sekolah.provinsi} di Data Pokok Pendidikan (Dapodik) periode semester <b>{localStorage.getItem('semester_id_aplikasi').substring(0,4)}/{(parseInt(localStorage.getItem('semester_id_aplikasi').substring(0,4))+1)} {(parseInt(localStorage.getItem('semester_id_aplikasi').substring(4,5)) === 1 ? 'Ganjil' : 'Genap')}</b> telah diperiksa kebenaran dan kewajaran datanya, serta telah sesuai dengan fakta yang ada di lapangan.
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
                            </Tab>
                        </Tabs>
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
      simpanValidasiData: Actions.simpanValidasiData,
      getValidasiDataRecord: Actions.getValidasiDataRecord
    }, dispatch);
}

function mapStateToProps({ App, PesertaDidik, Gtk, RaporDapodik, ValidasiData}) {

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
        validasi_data_record: ValidasiData.validasi_data_record
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(hasilValidasi));