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
    ListItemContent
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';
import Dropzone from 'react-dropzone';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import * as L1 from 'leaflet.markercluster';

class ProfilSekolah extends Component {
    state = {
        error: null,
        loading: false,
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
        // routeParams:{
        //     data: {}
        // },
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
        loop_kelas: [{
            kelas:1,
            jenjang: 5
        },{
            kelas:2,
            jenjang: 5
        },{
            kelas:3,
            jenjang: 5
        },{
            kelas:4,
            jenjang: 5
        },{
            kelas:5,
            jenjang: 5
        },{
            kelas:6,
            jenjang: 5
        },{
            kelas:7,
            jenjang: 6
        },{
            kelas:8,
            jenjang: 6
        },{
            kelas:9,
            jenjang: 6
        },{
            kelas:10,
            jenjang: 13
        },{
            kelas:11,
            jenjang: 13
        },{
            kelas:12,
            jenjang: 13
        },{
            kelas:13,
            jenjang: 15
        }]
    }

    componentDidMount = () => {
        this.setState({
            data: {},
            routeParams:{
                // data: {},
                // pengguna_id: this.$f7route.params['pengguna_id'] ? this.$f7route.params['pengguna_id'] : JSON.parse( localStorage.getItem('user') ).pengguna_id,
                // id_level_wilayah: 1,
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

                let map_besar = L.map('map_besar').setView([this.props.sekolah.rows[0].lintang, this.props.sekolah.rows[0].bujur], this.state.zoom);
                // let layerGroup = L.featureGroup().addTo(map_besar);
                
                // let tile =  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                //     maxZoom: 19,
                //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                // }).addTo(map_besar);

                let tile =  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                }).addTo(map_besar);

                let layerGroup = L.featureGroup().addTo(map_besar);
                let markerClusters = new L1.MarkerClusterGroup();

                var popup = '<span style=font-weight:bold;font-size:20px><a href="/ProfilSekolah/'+this.props.sekolah.rows[0].sekolah_id+'">'+this.props.sekolah.rows[0].nama+'</a></span>' +
                            '<br/><b>NPSN: </b>' + this.props.sekolah.rows[0].npsn +
                            '<br/><b>Bentuk Pendidikan: </b> ' + this.props.sekolah.rows[0].bentuk+
                            '<br/><b>Status: </b> ' + status +
                            '<br/><b>Alamat: </b> ' + this.props.sekolah.rows[0].alamat_jalan +
                            '<br/><b>Kecamatan: </b> ' + this.props.sekolah.rows[0].kecamatan +
                            '<br/><b>Kabupaten: </b> ' + this.props.sekolah.rows[0].kabupaten +
                            '<br/><b>Provinsi: </b> ' + this.props.sekolah.rows[0].provinsi +
                            '<br/><b>Lintang: </b> ' + this.props.sekolah.rows[0].lintang +
                            '<br/><b>Bujur: </b> ' + this.props.sekolah.rows[0].bujur +
                            '<br/><br/><a href="/RaporDapodikProfil/'+this.props.sekolah.rows[0].sekolah_id+'"><div class="button button-fill">Rapor Rapodik</div></a>'
                            ;

                let marker = new L.Marker([this.props.sekolah.rows[0].lintang, this.props.sekolah.rows[0].bujur], {draggable:false}).bindPopup( popup );
                // map_besar.addLayer(marker);
                
                markerClusters.addLayer( marker );

                layerGroup.addLayer(markerClusters);

                map_besar.fitBounds(e.target.getBounds());

            });

            // this.props.getProvinsi(this.state.routeParams).then((result)=>{
            //     // this.setState({
            //     //     loading: false,
            //     //     show: {
            //     //         ...this.state.show,
            //     //         kecamatan: 'block',
            //     //         kabupaten: 'block',
            //     //         provinsi: 'block'
            //     //     }
            //     // });
            // });
        });
    }

    gantiTab = (kode) => {
        
    }

    setValue = (kolom) => (e) => {
        // console.log(e.target.value);
        // console.log(kolom);
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


    render()
    {
        // console.log(this.state.pengguna.rows[0].peran_id);
        return (
            <Page name="ProfilSekolah" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Profil Sekolah</NavTitle>
                    <NavTitleLarge>
                        Profil Sekolah
                    </NavTitleLarge>
                </Navbar>
                {this.$f7route.params['param_tambahan'] == 'validasi' &&
                <>
                <Card>
                    <CardContent>
                        <Button raised fill large className="color-theme-teal" onClick={()=>this.$f7router.navigate('/formValidasiData/'+this.$f7route.params['sekolah_id']+'/'+localStorage.getItem('semester_id_aplikasi'))}>
                            Validasi Data
                        </Button>
                    </CardContent>
                </Card>
                </>
                }
                {this.state.loading &&
                <Progressbar style={{height:'10px'}} infinite color="multi"></Progressbar>
                }
                <Segmented raised style={{marginLeft:'8px', marginRight:'8px', marginTop: '8px', marginBottom: '8px'}}>
                    <Button tabLink="#tab-1" tabLinkActive>Profil</Button>
                    <Button tabLink="#tab-2">Peserta Didik</Button>
                    <Button tabLink="#tab-3">GTK</Button>
                    {/* <Button tabLink="#tab-2">Sekolah.data.kemdikbud.go.id</Button> */}
                </Segmented>
                <Tabs animated style={{height:'initial'}}>
                    <Tab id="tab-1" className="page-content" tabActive style={{padding:'0px', overflow:'hidden'}}>
                        <>
                        <Card style={{height:'initial', minHeight:'600px'}}>
                            <Row>
                                <Col width="100" tabletWidth="100">
                                    <Row>
                                        <Col width="100" tabletWidth="40">
                                            <Card style={{minHeight:'200px'}}>
                                                <CardHeader>
                                                    Identitas Sekolah
                                                </CardHeader>
                                                <CardContent>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Nama
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].nama}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            NPSN
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].npsn}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Bentuk
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].bentuk}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Status
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].status}</b>
                                                        </Col>
                                                    </Row>
                                                </CardContent>
                                            </Card>
                                            <Card style={{minHeight:'150px'}}>
                                                <CardHeader>
                                                    Kepala Sekolah
                                                </CardHeader>
                                                <CardContent>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Nama
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{parseInt(localStorage.getItem('sudah_login')) === 1 ? this.state.rekap_sekolah.rows[0].nama_kepsek : '******'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            JK
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{parseInt(localStorage.getItem('sudah_login')) === 1 ? this.state.rekap_sekolah.rows[0].jenis_kelamin_kepsek : '******'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            No Telepon
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{parseInt(localStorage.getItem('sudah_login')) === 1 ? this.state.rekap_sekolah.rows[0].hp_kepsek : '******'}</b>
                                                        </Col>
                                                    </Row>
                                                    {/* <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Email
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>*****</b>
                                                        </Col>
                                                    </Row> */}
                                                </CardContent>
                                            </Card>
                                            <Card>
                                                <CardHeader>
                                                    Operator Sekolah
                                                </CardHeader>
                                                <CardContent>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Nama
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{parseInt(localStorage.getItem('sudah_login')) === 1 ? this.state.rekap_sekolah.rows[0].nama_operator : '******'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Nomor Telepon
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{parseInt(localStorage.getItem('sudah_login')) === 1 ? this.state.rekap_sekolah.rows[0].hp_operator : '******'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Email
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{parseInt(localStorage.getItem('sudah_login')) === 1 ? this.state.rekap_sekolah.rows[0].email_operator : '******'}</b>
                                                        </Col>
                                                    </Row>
                                                </CardContent>
                                            </Card>
                                        </Col>
                                        <Col width="100" tabletWidth="60">
                                            <Card style={{maxHeight:'680px', overflow:'hidden'}}>
                                                {/* <img style={{width:'100%', maxHeight:'600px'}} src="http://www.jurnalasia.com/wp-content/uploads/2016/10/GEDUNG-SEKOLAH.jpg"></img> */}
                                                <img src={"http://foto.data.kemdikbud.go.id/getImage/" + this.props.sekolah.rows[0].npsn + "/1.jpg"} style={{maxHeight:'520px', minHeight:'520px'}}></img>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col width="100" tabletWidth="100">
                                    <Row>
                                        <Col width="100" tabletWidth="50">
                                            <Card>
                                                <CardHeader>
                                                    Kontak Sekolah
                                                </CardHeader>
                                                <CardContent>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Nomor Telepon
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].nomor_telepon ? this.props.sekolah.rows[0].nomor_telepon : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Email
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].email ? this.props.sekolah.rows[0].email : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Website
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].website ? this.props.sekolah.rows[0].website : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                </CardContent>
                                            </Card>
                                            {/* <Card>
                                                <CardHeader>
                                                    Lokasi Sekolah
                                                </CardHeader>
                                                <CardContent>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Alamat
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].alamat_jalan ? this.props.sekolah.rows[0].alamat_jalan : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Desa/Kelurahan
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].desa_kelurahan ? this.props.sekolah.rows[0].desa_kelurahan : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Kecamatan
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].kecamatan ? this.props.sekolah.rows[0].kecamatan : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Kabupaten/Kota
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].kabupaten ? this.props.sekolah.rows[0].kabupaten : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Provinsi
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].provinsi ? this.props.sekolah.rows[0].provinsi : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Kode Pos
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].kode_pos ? this.props.sekolah.rows[0].kode_pos : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                </CardContent>
                                            </Card> */}
                                            <Card>
                                                <CardHeader>
                                                    Data Pelengkap
                                                </CardHeader>
                                                <CardContent>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Luas Tanah (Milik)
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].luas_tanah_milik ? this.props.sekolah.rows[0].luas_tanah_milik : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            SK Pendirian Sekolah
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].sk_pendirian_sekolah ? this.props.sekolah.rows[0].sk_pendirian_sekolah : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Tanggal SK Pendirian
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].tanggal_sk_pendirian ? this.props.sekolah.rows[0].tanggal_sk_pendirian : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            SK Izin Operasional
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].sk_izin_operasional ? this.props.sekolah.rows[0].sk_izin_operasional : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Tanggal SK Izin Operasional
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].tanggal_sk_izin_operasional ? this.props.sekolah.rows[0].tanggal_sk_izin_operasional : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Akreditasi
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.state.rekap_sekolah.rows[0].akreditasi_id_str ? this.state.rekap_sekolah.rows[0].akreditasi_id_str : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Kurikulum
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.state.rekap_sekolah.rows[0].kurikulum ? this.state.rekap_sekolah.rows[0].kurikulum : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Waktu KBM
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.state.rekap_sekolah.rows[0].waktu_penyelenggaraan_id_str ? this.state.rekap_sekolah.rows[0].waktu_penyelenggaraan_id_str : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Akses Internet
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.state.rekap_sekolah.rows[0].akses_internet_id_str ? this.state.rekap_sekolah.rows[0].akses_internet_id_str : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Sumber Listrik
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.state.rekap_sekolah.rows[0].sumber_listrik_id_str ? this.state.rekap_sekolah.rows[0].sumber_listrik_id_str : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            MBS
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{parseInt(this.state.rekap_sekolah.rows[0].mbs) === 1 ? 'Ya' : 'Tidak'}</b>
                                                        </Col>
                                                    </Row>
                                                </CardContent>
                                            </Card>
                                        </Col>
                                        <Col width="100" tabletWidth="50">
                                            {/* <Card>
                                                <CardHeader>
                                                    Operator Sekolah
                                                </CardHeader>
                                                <CardContent>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Nama
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>-</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Nomor Telepon
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>-</b>
                                                        </Col>
                                                    </Row>
                                                </CardContent>
                                            </Card> */}
                                            {/* <Card>
                                                <CardHeader>
                                                    Data Pelengkap
                                                </CardHeader>
                                                <CardContent>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Luas Tanah (Milik)
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].luas_tanah_milik ? this.props.sekolah.rows[0].luas_tanah_milik : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            SK Pendirian Sekolah
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].sk_pendirian_sekolah ? this.props.sekolah.rows[0].sk_pendirian_sekolah : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Tanggal SK Pendirian
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].tanggal_sk_pendirian ? this.props.sekolah.rows[0].tanggal_sk_pendirian : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            SK Izin Operasional
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].sk_izin_operasional ? this.props.sekolah.rows[0].sk_izin_operasional : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Tanggal SK Izin Operasional
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].tanggal_sk_izin_operasional ? this.props.sekolah.rows[0].tanggal_sk_izin_operasional : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                </CardContent>
                                            </Card> */}
                                            <Card>
                                                <CardHeader>
                                                    Lokasi Sekolah
                                                </CardHeader>
                                                <CardContent>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Alamat
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].alamat_jalan ? this.props.sekolah.rows[0].alamat_jalan : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Desa/Kelurahan
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].desa_kelurahan ? this.props.sekolah.rows[0].desa_kelurahan : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Kecamatan
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].kecamatan ? this.props.sekolah.rows[0].kecamatan : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Kabupaten/Kota
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].kabupaten ? this.props.sekolah.rows[0].kabupaten : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Provinsi
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].provinsi ? this.props.sekolah.rows[0].provinsi : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginBottom:'8px'}}>
                                                        <Col width="30">
                                                            Kode Pos
                                                        </Col>
                                                        <Col width="70">
                                                            : <b>{this.props.sekolah.rows[0].kode_pos ? this.props.sekolah.rows[0].kode_pos : '-'}</b>
                                                        </Col>
                                                    </Row>
                                                </CardContent>
                                            </Card>
                                            <Card style={{height:'400px'}}>
                                                <div id="map_besar" style={{width:'100%', height:'400px'}}></div>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                        </>
                    </Tab>
                    <Tab id="tab-2" className="page-content" style={{padding:'0px', overflow:'hidden'}}>
                        <>
                            {/* <Card>
                                <CardContent>
                                    Sumber:<br/>
                                    <Link href="#">{"http://sekolah.data.kemdikbud.go.id/index.php/chome/profil/"+this.$f7route.params['sekolah_id']}</Link>
                                </CardContent>
                            </Card> */}
                            {/* <Card style={{height:'initial', minHeight:'600px'}}> */}
                                {/* <CardContent> */}
                                    {/* <iframe style={{width:'100%', minHeight:'600px', border:'none'}} src={"http://sekolah.data.kemdikbud.go.id/index.php/chome/profil/"+this.$f7route.params['sekolah_id']}> */}
                                    {/* </iframe> */}
                                {/* </CardContent> */}
                            {/* </Card> */}
                            <Card>
                                <CardContent>
                                    <h2>Peserta Didik {this.state.rekap_sekolah.rows[0].nama}</h2>
                                    <Row>
                                        <Col width="100">
                                            <div className="data-table" style={{overflowY:'hidden'}}>
                                            <table>
                                                <thead style={{background:'#eeeeee'}}>
                                                    <tr>
                                                        <th className="label-cell"style={{textAlign:'center'}}>Tingkat</th>
                                                        {/* <th className="label-cell" colSpan="3" style={{textAlign:'center'}}>Jenis Kelamin</th> */}
                                                        <th className="label-cell" style={{textAlign:'center'}}>L</th>
                                                        <th className="label-cell" style={{textAlign:'center'}}>P</th>
                                                        <th className="label-cell" style={{textAlign:'center'}}>Total</th>
                                                    </tr>
                                                    {/* <tr>
                                                        <th className="label-cell" style={{textAlign:'center'}}>L</th>
                                                        <th className="label-cell" style={{textAlign:'center'}}>P</th>
                                                        <th className="label-cell" style={{textAlign:'center'}}>Total</th>
                                                    </tr> */}
                                                </thead>
                                                <tbody>
                                                    {this.state.loop_kelas.map((option)=>{

                                                        switch (parseInt(this.state.rekap_sekolah.rows[0].bentuk_pendidikan_id)) {
                                                            case 5:
                                                                if(option.jenjang === 5){

                                                                    return(
                                                                        <tr style={{textAlign:'center'}}>
                                                                            <td className="label-cell">
                                                                                Kelas {option.kelas}
                                                                            </td>
                                                                            <td className="label-cell">
                                                                                {this.state.rekap_sekolah.rows[0]['pd_kelas_'+option.kelas+'_perempuan']}
                                                                            </td>
                                                                            <td className="label-cell">
                                                                                {this.state.rekap_sekolah.rows[0]['pd_kelas_'+option.kelas+'_perempuan']}
                                                                            </td>
                                                                            <td className="label-cell">
                                                                                {/* {this.state.rekap_sekolah.rows[0]['pd_kelas_'+option.kelas]} */}
                                                                                {parseInt(this.state.rekap_sekolah.rows[0]['pd_kelas_'+option.kelas+'_laki']) + parseInt(this.state.rekap_sekolah.rows[0]['pd_kelas_'+option.kelas+'_perempuan'])}
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }else{
                                                                    return true;
                                                                }

                                                                break;
                                                            case 6:
                                                                if(option.jenjang === 6){

                                                                    return(
                                                                        <tr style={{textAlign:'center'}}>
                                                                            <td className="label-cell">
                                                                                Kelas {option.kelas}
                                                                            </td>
                                                                            <td className="label-cell">
                                                                                {this.state.rekap_sekolah.rows[0]['pd_kelas_'+option.kelas+'_laki']}
                                                                            </td>
                                                                            <td className="label-cell">
                                                                                {this.state.rekap_sekolah.rows[0]['pd_kelas_'+option.kelas+'_perempuan']}
                                                                            </td>
                                                                            <td className="label-cell">
                                                                                {/* {this.state.rekap_sekolah.rows[0]['pd_kelas_'+option.kelas]} */}
                                                                                {parseInt(this.state.rekap_sekolah.rows[0]['pd_kelas_'+option.kelas+'_laki']) + parseInt(this.state.rekap_sekolah.rows[0]['pd_kelas_'+option.kelas+'_perempuan'])}
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }else{
                                                                    return true;
                                                                }
                                                                
                                                                break;
                                                            case 13:
                                                                if(option.jenjang === 13){

                                                                    return(
                                                                        <tr style={{textAlign:'center'}}>
                                                                            <td className="label-cell" style={{textAlign:'center'}}>
                                                                                Kelas {option.kelas}
                                                                            </td>
                                                                            <td className="label-cell" style={{textAlign:'center'}}>
                                                                                {this.state.rekap_sekolah.rows[0]['pd_kelas_'+option.kelas+'_laki']}
                                                                            </td>
                                                                            <td className="label-cell" style={{textAlign:'center'}}>
                                                                                {this.state.rekap_sekolah.rows[0]['pd_kelas_'+option.kelas+'_perempuan']}
                                                                            </td>
                                                                            <td className="label-cell" style={{textAlign:'center'}}>
                                                                                {/* {this.state.rekap_sekolah.rows[0]['pd_kelas_'+option.kelas]} */}
                                                                                {parseInt(this.state.rekap_sekolah.rows[0]['pd_kelas_'+option.kelas+'_laki']) + parseInt(this.state.rekap_sekolah.rows[0]['pd_kelas_'+option.kelas+'_perempuan'])}
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }else{
                                                                    return true;
                                                                }
                                                                
                                                                break;
                                                            case 15:
                                                                if(option.jenjang === 13 || option.jenjang === 13){

                                                                    return(
                                                                        <tr style={{textAlign:'center'}}>
                                                                            <td className="label-cell">
                                                                                Kelas {option.kelas}
                                                                            </td>
                                                                            <td className="label-cell">
                                                                                {this.state.rekap_sekolah.rows[0]['pd_kelas_'+option.kelas+'_laki']}
                                                                            </td>
                                                                            <td className="label-cell">
                                                                                {this.state.rekap_sekolah.rows[0]['pd_kelas_'+option.kelas+'_perempuan']}
                                                                            </td>
                                                                            <td className="label-cell">
                                                                                {/* {this.state.rekap_sekolah.rows[0]['pd_kelas_'+option.kelas]} */}
                                                                                {parseInt(this.state.rekap_sekolah.rows[0]['pd_kelas_'+option.kelas+'_laki']) + parseInt(this.state.rekap_sekolah.rows[0]['pd_kelas_'+option.kelas+'_perempuan'])}
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }else{
                                                                    return true;
                                                                }
                                                                
                                                                break;
                                                        
                                                            default:
                                                                break;
                                                        }

                                                    })}
                                                    <tr style={{textAlign:'center', fontWeight:'bold'}}>
                                                        <td className="label-cell">
                                                            Total
                                                        </td>
                                                        <td className="label-cell">
                                                            {this.state.rekap_sekolah.rows[0]['pd_laki']}
                                                        </td>
                                                        <td className="label-cell">
                                                            {this.state.rekap_sekolah.rows[0]['pd_perempuan']}
                                                        </td>
                                                        <td className="label-cell">
                                                            {/* {this.state.rekap_sekolah.rows[0]['pd']} */}
                                                            {this.state.rekap_sekolah.rows[0]['pd_laki'] ? parseInt(this.state.rekap_sekolah.rows[0]['pd_laki']) + parseInt(this.state.rekap_sekolah.rows[0]['pd_perempuan']) : '0'}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            </div>
                                        </Col>
                                        {/* <Col width="50">
                                            <div className="data-table" style={{overflowY:'hidden'}}>
                                            <table>
                                                <tbody>
                                                    <tr style={{textAlign:'center', fontWeight:'bold'}}>
                                                        <td className="label-cell">
                                                            Total
                                                        </td>
                                                        <td className="label-cell">
                                                            {this.state.rekap_sekolah.rows[0]['pd_laki']}
                                                        </td>
                                                        <td className="label-cell">
                                                            {this.state.rekap_sekolah.rows[0]['pd_perempuan']}
                                                        </td>
                                                        <td className="label-cell">
                                                            {this.state.rekap_sekolah.rows[0]['pd']}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            </div>
                                        </Col> */}
                                    </Row>
                                </CardContent>
                            </Card>
                        </>
                    </Tab>
                    <Tab id="tab-3" className="page-content" style={{padding:'0px', overflow:'hidden'}}>
                        <>
                            <Card>
                                <CardContent>
                                    <h2>GTK {this.state.rekap_sekolah.rows[0].nama}</h2>
                                    <Row>
                                        <Col width="100">
                                            <div className="data-table" style={{overflowY:'hidden'}}>
                                            <table>
                                                <thead style={{background:'#eeeeee'}}>
                                                    <tr>
                                                        <th className="label-cell"style={{textAlign:'center'}}>Jenis</th>
                                                        {/* <th className="label-cell" colSpan="3" style={{textAlign:'center'}}>Jenis Kelamin</th> */}
                                                        <th className="label-cell" style={{textAlign:'center'}}>L</th>
                                                        <th className="label-cell" style={{textAlign:'center'}}>P</th>
                                                        <th className="label-cell" style={{textAlign:'center'}}>Total</th>
                                                    </tr>
                                                    {/* <tr>
                                                        <th className="label-cell" style={{textAlign:'center'}}>L</th>
                                                        <th className="label-cell" style={{textAlign:'center'}}>P</th>
                                                        <th className="label-cell" style={{textAlign:'center'}}>Total</th>
                                                    </tr> */}
                                                </thead>
                                                <tbody>
                                                    <tr style={{textAlign:'center', fontWeight:'bold'}}>
                                                        <td className="label-cell">
                                                            Guru
                                                        </td>
                                                        <td className="label-cell">
                                                            {this.state.rekap_sekolah.rows[0]['guru_laki']}
                                                        </td>
                                                        <td className="label-cell">
                                                            {this.state.rekap_sekolah.rows[0]['guru_perempuan']}
                                                        </td>
                                                        <td className="label-cell">
                                                            {this.state.rekap_sekolah.rows[0]['guru']}
                                                        </td>
                                                    </tr>
                                                    <tr style={{textAlign:'center', fontWeight:'bold'}}>
                                                        <td className="label-cell">
                                                            Tendik
                                                        </td>
                                                        <td className="label-cell">
                                                            {this.state.rekap_sekolah.rows[0]['pegawai_laki']}
                                                        </td>
                                                        <td className="label-cell">
                                                            {this.state.rekap_sekolah.rows[0]['pegawai_perempuan']}
                                                        </td>
                                                        <td className="label-cell">
                                                            {this.state.rekap_sekolah.rows[0]['pegawai']}
                                                        </td>
                                                    </tr>
                                                    <tr style={{textAlign:'center', fontWeight:'bold'}}>
                                                        <td className="label-cell">
                                                            Total
                                                        </td>
                                                        <td className="label-cell">
                                                            {(parseInt(this.state.rekap_sekolah.rows[0]['guru_laki'])+parseInt(this.state.rekap_sekolah.rows[0]['guru_perempuan']))}
                                                        </td>
                                                        <td className="label-cell">
                                                            {(parseInt(this.state.rekap_sekolah.rows[0]['pegawai_laki'])+parseInt(this.state.rekap_sekolah.rows[0]['pegawai_perempuan']))}
                                                        </td>
                                                        <td className="label-cell">
                                                            {(parseInt(this.state.rekap_sekolah.rows[0]['guru'])+parseInt(this.state.rekap_sekolah.rows[0]['pegawai']))}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardContent>
                            </Card>
                        </>
                    </Tab>
                </Tabs>
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

export default (connect(mapStateToProps, mapDispatchToProps)(ProfilSekolah));