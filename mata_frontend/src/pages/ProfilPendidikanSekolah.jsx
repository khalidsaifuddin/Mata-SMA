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
    CardFooter
} from 'framework7-react';

import { Doughnut, Bar } from 'react-chartjs-2';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

const data = {
    labels  : [
        'Laki-laki',
        'Perempuan'
    ],
    datasets: [
        {
            data                : [300, 50],
            backgroundColor     : [
                '#FF6384',
                '#36A2EB'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB'
            ]
        }
    ]
};

const dataBar = {
    labels  : ['D3', 'D4', 'S1', 'S2', 'S3'],
    datasets: [
        {
            label               : 'Laki-laki',
            backgroundColor     : 'rgba(255,99,132,0.2)',
            borderColor         : 'rgba(255,99,132,1)',
            borderWidth         : 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor    : 'rgba(255,99,132,1)',
            data                : [65, 59, 80, 81, 56]
        }
        ,{
            label               : 'Perempuan',
            backgroundColor     : 'rgba(0,99,132,0.2)',
            borderColor         : 'rgba(0,99,132,1)',
            borderWidth         : 1,
            hoverBackgroundColor: 'rgba(0,99,132,0.4)',
            hoverBorderColor    : 'rgba(0,99,132,1)',
            data                : [65, 59, 80, 81, 56]
        }
    ]
};

const dataBar2 = {
    labels  : ['PNS', 'CPNS', 'Guru Honor', 'GTY/PTY', 'GTT Provinsi', 'GTT Kab/Kota', 'Guru Bantu Pusat', 'Lainnya'],
    datasets: [
        {
            label               : 'Laki-laki',
            backgroundColor     : 'rgba(255,99,132,0.2)',
            borderColor         : 'rgba(255,99,132,1)',
            borderWidth         : 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor    : 'rgba(255,99,132,1)',
            data                : [65, 59, 80, 81, 56, 70, 120]
        }
        ,{
            label               : 'Perempuan',
            backgroundColor     : 'rgba(0,99,132,0.2)',
            borderColor         : 'rgba(0,99,132,1)',
            borderWidth         : 1,
            hoverBackgroundColor: 'rgba(0,99,132,0.4)',
            hoverBorderColor    : 'rgba(0,99,132,1)',
            data                : [65, 59, 80, 81, 56, 70, 120]
        }
    ]
};

class ProfilPendidikanSekolah extends Component {
    state = {
        error: null,
        loading: true,
        lebar_kolom: 20,
        lebar_kolom_usia: 15,
        routeParams: {
            sekolah_id: '',
            semester_id: 20182
        }
    }

    backClick = () => {

        let properti = 'beranda';
        // alert('tes');
        // console.log(this.props.f7router.url.replace("/","").replace("/",""));
        // console.log(this.props.tabBar);
        for (var property in this.props.tabBar) {
            // console.log(this.state.tabBar[property]);
            this.props.tabBar[property] = false;
        }
        if(this.props.f7router.url.replace("/","").replace("/","") !== ""){
            properti = this.props.f7router.url.replace("/","").replace("/","");
        }
        this.props.tabBar[properti] = true;

        this.props.setTabActive(this.props.tabBar);
        console.log(this.props.tabBar.beranda);
    }

    componentDidMount = () => {
        console.log(this.$f7route.params['sekolah_id']);
        console.log(this.props.peserta_didik_jenis_kelamin);

        console.log(this.$f7route.url);
        localStorage.setItem('current_url', this.$f7route.url);

        this.setState({
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                sekolah_id: this.$f7route.params['sekolah_id']
            }
        },()=>{
            this.props.getRekapSekolah(this.state.routeParams).then((result)=>{
                    
            });

            this.props.getSekolahIndividu(this.state.routeParams).then((result)=>{
                // this.setState({
                //     loading: false
                // });

                this.setState({
                    ...this.state,
                    routeParams: {
                        ...this.state.routeParams,
                        tipe: 'chart',
                        jenjang: (this.props.sekolah_individu.rows[0].bentuk_pendidikan_id == 13 || this.props.sekolah_individu.rows[0].bentuk_pendidikan_id == 15 || this.props.sekolah_individu.rows[0].bentuk_pendidikan_id == 55 ? 'SMA' : (this.props.sekolah_individu.rows[0].bentuk_pendidikan_id == 6 ? 'SMP' : 'SD'))
                    }
                },()=>{
                    this.props.getPesertaDidikJenisKelaminChart(this.state.routeParams).then((result)=>{
                        this.setState({
                            loading: false
                        });
                    });
                    
                    this.props.getPesertaDidikTingkatKelasChart(this.state.routeParams).then((result)=>{
                        this.setState({
                            loading: false
                        });
                    });
                    
                    this.props.getPesertaDidikUsiaChart(this.state.routeParams).then((result)=>{
                        this.setState({
                            loading: false
                        });
                    });

                    
                    this.props.getGtkJenisKelaminChart(this.state.routeParams).then((result)=>{
                        this.setState({
                            loading: false
                        });

                        console.log(this.props.gtk_jenis_kelamin_chart);
                    });
                    
                    this.props.getGtkKualifikasiChart(this.state.routeParams).then((result)=>{
                        this.setState({
                            loading: false
                        });
                    });
                    
                    this.props.getGtkNUPTKChart(this.state.routeParams).then((result)=>{
                        this.setState({
                            loading: false
                        });
                    });
                });

                this.setState({
                    ...this.state,
                    lebar_kolom: (this.props.sekolah_individu.rows[0].bentuk_pendidikan_id == 13 || this.props.sekolah_individu.rows[0].bentuk_pendidikan_id == 15 || this.props.sekolah_individu.rows[0].bentuk_pendidikan_id == 55 ? 20 : (this.props.sekolah_individu.rows[0].bentuk_pendidikan_id == 6 ? 20 : 10)),
                    lebar_kolom_usia: (this.props.sekolah_individu.rows[0].bentuk_pendidikan_id == 13 || this.props.sekolah_individu.rows[0].bentuk_pendidikan_id == 15 || this.props.sekolah_individu.rows[0].bentuk_pendidikan_id == 55 ? 15 : (this.props.sekolah_individu.rows[0].bentuk_pendidikan_id == 6 ? 15 : 10)),
                    routeParams: {
                        ...this.state.routeParams,
                        tipe: 'tabel',
                        jenjang: (this.props.sekolah_individu.rows[0].bentuk_pendidikan_id == 13 || this.props.sekolah_individu.rows[0].bentuk_pendidikan_id == 15 || this.props.sekolah_individu.rows[0].bentuk_pendidikan_id == 55 ? 'SMA' : (this.props.sekolah_individu.rows[0].bentuk_pendidikan_id == 6 ? 'SMP' : 'SD'))
                    }
                },()=>{
                    this.props.getPesertaDidikJenisKelaminTabel(this.state.routeParams).then((result)=>{
                        this.setState({
                            loading: false
                        });
                    });
                    
                    this.props.getPesertaDidikTingkatKelasTabel(this.state.routeParams).then((result)=>{
                        this.setState({
                            loading: false
                        });
                    });
                    
                    this.props.getPesertaDidikUsiaTabel(this.state.routeParams).then((result)=>{
                        this.setState({
                            loading: false
                        });
                    });

                    
                    this.props.getGtkJenisKelaminTabel(this.state.routeParams).then((result)=>{
                        this.setState({
                            loading: false
                        });
                    });
                    
                    this.props.getGtkKualifikasiTabel(this.state.routeParams).then((result)=>{
                        this.setState({
                            loading: false
                        });
                    });
                    
                    this.props.getGtkNUPTKTabel(this.state.routeParams).then((result)=>{
                        this.setState({
                            loading: false
                        });
                    });
                });

            });

            
        })
    }

    render()
    {
        return (
            <Page name="ProfilPendidikanSekolah" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>{this.props.sekolah_individu.rows[0].nama}</NavTitle>
                    {this.state.loading 
                    ? <NavTitleLarge className="skeleton-text skeleton-effect-blink">
                        ------------------------------
                    </NavTitleLarge>
                    : <NavTitleLarge>
                        {this.props.sekolah_individu.rows[0].nama}
                    </NavTitleLarge>
                    }
                </Navbar>
                
                {this.state.loading 
                ? <>
                <Card key="skeleton-card">
                    <CardContent>
                        <h2 style={{marginTop: '0px', marginBottom: '0px'}} className="skeleton-text skeleton-effect-blink">
                            nama sekolahnya panjang (npsn)
                        </h2>
                        <Row>
                            <Col width="100" tabletWidth="70" className="skeleton-text skeleton-effect-blink">
                                Kecamatan: <b>-------------------</b>
                                <br/>Kabupaten: <b>-------------------</b>
                                <br/>Provinsi: <b>-------------------</b>
                                <br/>Alamat: <b>-------------------</b>
                                <br/>Kode Pos: <b>-------------------</b>
                            </Col>
                            <Col width="100" tabletWidth="30" className="skeleton-text skeleton-effect-blink">
                                Bentuk: <b>----------------</b>
                                <br/>Status: <b>----------------</b>
                                <br/>Akreditasi: <b>----------------</b>
                                <br/>Kurikulum: <b>----------------</b>
                            </Col>
                        </Row>
                    </CardContent>
                </Card>
                <BlockTitle>Peserta Didik</BlockTitle>
                <Row noGap className="skeleton-text skeleton-effect-blink">
                    <Col width="100" tabletWidth="50">
                        <Card style={{marginBottom:'0px'}}>
                            <CardHeader>
                                Guru Berdasarkan Jenis Kelamin
                            </CardHeader>
                            <CardContent>
                                {/* <Doughnut data={data}/> */}
                                
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="100" tabletWidth="50">
                        <Card style={{marginBottom:'0px'}}>
                            <CardHeader>
                                Guru Berdasarkan Kualifikasi
                            </CardHeader>
                            <CardContent>
                                {/* <Bar
                                    data={dataBar}
                                    width={100}
                                    height={50}
                                    options={{}}
                                    className="skeleton-text skeleton-effect-blink"
                                /> */}
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
                </>
                : <>
                <Row noGap>
                    <Col width="100" tabletWidth="60">
                        <Card style={{marginBottom:'0px', minHeight:'150px'}}>
                            <CardContent>
                                <h4 style={{marginTop: '0px', marginBottom: '0px'}}>
                                    {this.props.sekolah_individu.rows[0].nama} ({this.props.sekolah_individu.rows[0].npsn})
                                </h4>
                                <Row>
                                    <Col width="100" tabletWidth="70">
                                        Kecamatan: <b>{this.props.sekolah_individu.rows[0].kecamatan}</b>
                                        <br/>Kabupaten: <b>{this.props.sekolah_individu.rows[0].kabupaten}</b>
                                        <br/>Provinsi: <b>{this.props.sekolah_individu.rows[0].provinsi}</b>
                                        <br/>Alamat: <b>{this.props.sekolah_individu.rows[0].alamat_jalan}</b>
                                        <br/>Kode Pos: <b>{this.props.sekolah_individu.rows[0].kode_pos}</b>
                                    </Col>
                                    <Col width="100" tabletWidth="30">
                                        Bentuk: <b>{this.props.sekolah_individu.rows[0].bentuk}</b>
                                        <br/>Status: <b>{this.props.sekolah_individu.rows[0].status}</b>
                                        <br/>Akreditasi: <b>{this.props.rekap_sekolah.rows[0].akreditasi_id_str}</b>
                                        <br/>Kurikulum: <b>{this.props.rekap_sekolah.rows[0].kurikulum}</b>
                                    </Col>
                                </Row>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="100" tabletWidth="40">
                        <Card style={{marginBottom:'0px', minHeight:'150px'}}>
                            <CardContent>
                                    Kepala Sekolah: <b>{this.props.rekap_sekolah.rows[0].nama_kepsek}</b>
                                    <br/>No HP Kepsek: <b>******</b>
                                    {/* <br/>No HP Kepsek: <b>{this.props.rekap_sekolah.rows[0].hp_kepsek}</b> */}
                                    <br/>
                                    <br/>Operator: <b>{this.props.rekap_sekolah.rows[0].nama_operator}</b>
                                    <br/>No HP Operator: <b>******</b>
                                    {/* <br/>No HP Operator: <b>{this.props.rekap_sekolah.rows[0].hp_operator}</b> */}
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
                
                <BlockTitle>Peserta Didik</BlockTitle>
                <Row noGap>
                    <Col width="100" tabletWidth="50">
                        <Card style={{marginBottom:'0px', minHeight: '410px'}}>
                            <CardHeader>
                                Peserta Didik Berdasarkan Jenis Kelamin
                            </CardHeader>
                            <CardContent>
                                <Doughnut data={this.props.peserta_didik_jenis_kelamin_chart}/>
                                <br/>
                                <Row>
                                    {this.props.peserta_didik_jenis_kelamin_tabel.map((option)=>{
                                        return (
                                            <>
                                                <Col width="50">
                                                    {option.keterangan}
                                                </Col>
                                                <Col width="50" style={{textAlign:'center'}}>
                                                    {option.jumlah}
                                                </Col>
                                                <Col width="100" style={{borderBottom: '1px solid #ccc', marginTop: '2px', marginBottom: '8px'}}>
                                                </Col>
                                            </>
                                        )
                                    })}
                                </Row>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="100" tabletWidth="50">
                        <Card style={{marginBottom:'0px'    }}>
                            <CardHeader>
                                Peserta Didik Berdasarkan Tingkat Kelas
                            </CardHeader>
                            <CardContent>
                                <Bar
                                    data={this.props.peserta_didik_tingkat_kelas_chart}
                                    width={100}
                                    height={50}
                                    options={{}}
                                />
                                <br/>
                                <Row>
                                    <Col width="40">
                                        <b>Keterangan</b>
                                    </Col>
                                    {typeof(this.props.peserta_didik_tingkat_kelas_tabel[0]) !== 'undefined' && 
                                        <>
                                            {this.props.peserta_didik_tingkat_kelas_tabel[0].kelas.map((optionKelas)=>{
                                                return (
                                                    <>
                                                        <Col width={this.state.lebar_kolom} style={{textAlign: 'center'}}>
                                                            <b>{optionKelas.keterangan}</b>
                                                        </Col>
                                                    </>
                                                )
                                            })}
                                        </>
                                    }
                                    <Col width="100" style={{borderBottom: '1px solid #ccc', marginTop: '2px', marginBottom: '8px'}}>
                                    </Col>
                                    {this.props.peserta_didik_tingkat_kelas_tabel.map((option)=>{

                                        return(
                                            <>
                                            <Col width="40">
                                                {option.keterangan}
                                            </Col>
                                            {option.kelas.map((optionKelas)=>{
                                                return (
                                                    <>
                                                        <Col width={this.state.lebar_kolom} style={{textAlign: 'center'}}>
                                                            {optionKelas.jumlah > 0 ? optionKelas.jumlah : <span>0</span>}
                                                        </Col>
                                                    </>
                                                )
                                            })}
                                            {/* <Col width="50" style={{textAlign: 'center'}}>
                                                0
                                            </Col>
                                            <Col width="50" style={{textAlign: 'center'}}>
                                                0
                                            </Col> */}
                                            <Col width="100" style={{borderBottom: '1px solid #ccc', marginTop: '2px', marginBottom: '8px'}}>
                                            </Col>
                                            </>
                                        )
                                    })}
                                </Row>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="100" tabletWidth="100">
                        <Card style={{marginBottom:'0px'}}>
                            <CardHeader>
                                Peserta Didik Berdasarkan Usia
                            </CardHeader>
                            <CardContent>
                                <Bar
                                    data={this.props.peserta_didik_usia_chart}
                                    width={100}
                                    height={40}
                                    options={{}}
                                />
                                <br/>
                                <Row>
                                    <Col width="20">
                                        <b>Keterangan</b>
                                    </Col>
                                    {typeof(this.props.peserta_didik_usia_tabel[0]) !== 'undefined' && 
                                        <>
                                            {this.props.peserta_didik_usia_tabel[0].usia.map((optionKelas)=>{
                                                return (
                                                    <>
                                                        <Col width={this.state.lebar_kolom_usia} style={{textAlign: 'center'}}>
                                                            <b>{optionKelas.keterangan}</b>
                                                        </Col>
                                                    </>
                                                )
                                            })}
                                        </>
                                    }
                                    <Col width="100" style={{borderBottom: '1px solid #ccc', marginTop: '2px', marginBottom: '8px'}}>
                                    </Col>
                                    {this.props.peserta_didik_usia_tabel.map((option)=>{

                                        return(
                                            <>
                                            <Col width="20">
                                                {option.keterangan}
                                            </Col>
                                            {option.usia.map((optionKelas)=>{
                                                return (
                                                    <>
                                                        <Col width={this.state.lebar_kolom_usia} style={{textAlign: 'center'}}>
                                                            {optionKelas.jumlah > 0 ? optionKelas.jumlah : <span>0</span>}
                                                        </Col>
                                                    </>
                                                )
                                            })}
                                            {/* <Col width="50" style={{textAlign: 'center'}}>
                                                0
                                            </Col>
                                            <Col width="50" style={{textAlign: 'center'}}>
                                                0
                                            </Col> */}
                                            <Col width="100" style={{borderBottom: '1px solid #ccc', marginTop: '2px', marginBottom: '8px'}}>
                                            </Col>
                                            </>
                                        )
                                    })}
                                </Row>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>

                <BlockTitle>Guru</BlockTitle>
                <Row noGap>
                    <Col width="100" tabletWidth="50">
                        <Card style={{marginBottom:'0px', minHeight: '410px'}}>
                            <CardHeader>
                                Guru Berdasarkan Jenis Kelamin
                            </CardHeader>
                            <CardContent>
                                <Doughnut data={this.props.gtk_jenis_kelamin_chart}/>
                                <br/>
                                <Row>
                                    {this.props.gtk_jenis_kelamin_tabel.map((option)=>{
                                        return (
                                            <>
                                                <Col width="50">
                                                    {option.keterangan}
                                                </Col>
                                                <Col width="50" style={{textAlign:'center'}}>
                                                    {option.jumlah}
                                                </Col>
                                                <Col width="100" style={{borderBottom: '1px solid #ccc', marginTop: '2px', marginBottom: '8px'}}>
                                                </Col>
                                            </>
                                        )
                                    })}
                                </Row>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="100" tabletWidth="50">
                        <Card style={{marginBottom:'0px', minHeight:'410px'}}>
                            <CardHeader>
                                Guru Berdasarkan NUPTK
                            </CardHeader>
                            <CardContent>
                                <Bar
                                    data={this.props.gtk_nuptk_chart}
                                    width={100}
                                    height={50}
                                    options={{}}
                                />
                                <br/>
                                <Row>
                                    <Col width="40">
                                        <b>Keterangan</b>
                                    </Col>
                                    {typeof(this.props.gtk_nuptk_tabel[0]) !== 'undefined' && 
                                        <>
                                            {this.props.gtk_nuptk_tabel[0].nuptk.map((optionKelas)=>{
                                                return (
                                                    <>
                                                        <Col width="30" style={{textAlign: 'center'}}>
                                                            <b>{optionKelas.keterangan}</b>
                                                        </Col>
                                                    </>
                                                )
                                            })}
                                        </>
                                    }
                                    <Col width="100" style={{borderBottom: '1px solid #ccc', marginTop: '2px', marginBottom: '8px'}}>
                                    </Col>
                                    {this.props.gtk_nuptk_tabel.map((option)=>{

                                        return(
                                            <>
                                            <Col width="40">
                                                {option.keterangan}
                                            </Col>
                                            {option.nuptk.map((optionKelas)=>{
                                                return (
                                                    <>
                                                        <Col width="30" style={{textAlign: 'center'}}>
                                                            {optionKelas.jumlah > 0 ? optionKelas.jumlah : <span>0</span>}
                                                        </Col>
                                                    </>
                                                )
                                            })}
                                            {/* <Col width="50" style={{textAlign: 'center'}}>
                                                0
                                            </Col>
                                            <Col width="50" style={{textAlign: 'center'}}>
                                                0
                                            </Col> */}
                                            <Col width="100" style={{borderBottom: '1px solid #ccc', marginTop: '2px', marginBottom: '8px'}}>
                                            </Col>
                                            </>
                                        )
                                    })}
                                </Row>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="100" tabletWidth="100">
                        <Card style={{marginBottom:'0px'}}>
                            <CardHeader>
                                Guru Berdasarkan Pendidikan Terakhir
                            </CardHeader>
                            <CardContent>
                                <Bar
                                    data={this.props.gtk_kualifikasi_chart}
                                    width={100}
                                    height={40}
                                    options={{}}
                                />
                                <br/>
                                <Row>
                                    <Col width="20">
                                        <b>Keterangan</b>
                                    </Col>
                                    {typeof(this.props.gtk_kualifikasi_tabel[0]) !== 'undefined' && 
                                        <>
                                            {this.props.gtk_kualifikasi_tabel[0].kualifikasi.map((optionKelas)=>{
                                                return (
                                                    <>
                                                        <Col width={this.state.lebar_kolom_usia} style={{textAlign: 'center'}}>
                                                            <b>{optionKelas.keterangan}</b>
                                                        </Col>
                                                    </>
                                                )
                                            })}
                                        </>
                                    }
                                    <Col width="100" style={{borderBottom: '1px solid #ccc', marginTop: '2px', marginBottom: '8px'}}>
                                    </Col>
                                    {this.props.gtk_kualifikasi_tabel.map((option)=>{

                                        return(
                                            <>
                                            <Col width="20">
                                                {option.keterangan}
                                            </Col>
                                            {option.kualifikasi.map((optionKelas)=>{
                                                return (
                                                    <>
                                                        <Col width={this.state.lebar_kolom_usia} style={{textAlign: 'center'}}>
                                                            {optionKelas.jumlah > 0 ? optionKelas.jumlah : <span>0</span>}
                                                        </Col>
                                                    </>
                                                )
                                            })}
                                            {/* <Col width="50" style={{textAlign: 'center'}}>
                                                0
                                            </Col>
                                            <Col width="50" style={{textAlign: 'center'}}>
                                                0
                                            </Col> */}
                                            <Col width="100" style={{borderBottom: '1px solid #ccc', marginTop: '2px', marginBottom: '8px'}}>
                                            </Col>
                                            </>
                                        )
                                    })}
                                </Row>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
                </>
                }
                
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

      getPesertaDidikJenisKelaminChart: Actions.getPesertaDidikJenisKelaminChart,
      getPesertaDidikJenisKelaminTabel: Actions.getPesertaDidikJenisKelaminTabel,
      getPesertaDidikTingkatKelasChart: Actions.getPesertaDidikTingkatKelasChart,
      getPesertaDidikTingkatKelasTabel: Actions.getPesertaDidikTingkatKelasTabel,
      getPesertaDidikUsiaChart: Actions.getPesertaDidikUsiaChart,
      getPesertaDidikUsiaTabel: Actions.getPesertaDidikUsiaTabel,

      getGtkJenisKelaminChart: Actions.getGtkJenisKelaminChart,
      getGtkJenisKelaminTabel: Actions.getGtkJenisKelaminTabel,
      getGtkKualifikasiChart: Actions.getGtkKualifikasiChart,
      getGtkKualifikasiTabel: Actions.getGtkKualifikasiTabel,
      getGtkNUPTKChart: Actions.getGtkNUPTKChart,
      getGtkNUPTKTabel: Actions.getGtkNUPTKTabel,
    }, dispatch);
}

function mapStateToProps({ App, PesertaDidik, Gtk }) {

    // console.log(Gtk);
    // console.log(PesertaDidik);

    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        sekolah: App.sekolah,
        rekap_sekolah: App.rekap_sekolah,
        sekolah_individu: App.sekolah_individu,

        peserta_didik_jenis_kelamin_chart: PesertaDidik.peserta_didik_jenis_kelamin_chart,
        peserta_didik_jenis_kelamin_tabel: PesertaDidik.peserta_didik_jenis_kelamin_tabel,
        peserta_didik_tingkat_kelas_chart: PesertaDidik.peserta_didik_tingkat_kelas_chart,
        peserta_didik_tingkat_kelas_tabel: PesertaDidik.peserta_didik_tingkat_kelas_tabel,
        peserta_didik_usia_chart: PesertaDidik.peserta_didik_usia_chart,
        peserta_didik_usia_tabel: PesertaDidik.peserta_didik_usia_tabel,

        gtk_jenis_kelamin_chart: Gtk.gtk_jenis_kelamin_chart,
        gtk_jenis_kelamin_tabel: Gtk.gtk_jenis_kelamin_tabel,
        gtk_kualifikasi_chart: Gtk.gtk_kualifikasi_chart,
        gtk_kualifikasi_tabel: Gtk.gtk_kualifikasi_tabel,
        gtk_nuptk_chart: Gtk.gtk_nuptk_chart,
        gtk_nuptk_tabel: Gtk.gtk_nuptk_tabel,
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(ProfilPendidikanSekolah));
  