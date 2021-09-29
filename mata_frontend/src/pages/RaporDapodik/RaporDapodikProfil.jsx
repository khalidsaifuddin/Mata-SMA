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
    Tabs,
    Tab,
    Segmented,
    Icon,
    MenuItem,
    MenuDropdown
} from 'framework7-react';

import { Doughnut, Bar } from 'react-chartjs-2';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';
import { getRaporDapodikIdentitas } from '../../store/actions';
import SelectSemester from '../SelectSemester';

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

class RaporDapodikProfil extends Component {
    state = {
        error: null,
        loading: true,
        lebar_kolom: 20,
        lebar_kolom_usia: 15,
        routeParams: {
            sekolah_id: '',
            semester_id: localStorage.getItem('semester_id_aplikasi'),
            start: 0,
            start_pd: 0,
            start_ptk: 0,
            start_rombel: 0,
            start_sarpras: 0,
            limit: 10
        },
        pageCount: 0,
        offset: 0,
        activePage: 1,
    }

    formatAngka = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
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
            this.props.getRaporDapodikSekolah(this.state.routeParams).then((result)=>{
                this.setState({
                    loading: false
                });
            });

            this.props.getRaporDapodikPD(this.state.routeParams).then((result)=>{
                this.setState({
                    loading: false
                });
            });

            this.props.getRaporDapodikPTK(this.state.routeParams).then((result)=>{
                this.setState({
                    loading: false
                });
            });

            this.props.getRaporDapodikRombel(this.state.routeParams).then((result)=>{
                this.setState({
                    loading: false
                });
            });

            this.props.getRaporDapodikSarpras(this.state.routeParams).then((result)=>{
                this.setState({
                    loading: false
                });
            });
        });

    }

    klikNextDapodikSarpras = () => {
        
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: null,
                start_sarpras: (parseInt(this.state.routeParams.start_sarpras) + parseInt(this.state.routeParams.limit))
            }
        },()=>{
            this.props.getRaporDapodikSarpras(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false
                });
            });
        });
    }

    klikPrevDapodikSarpras = () => {
        
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: null,
                start_sarpras: (parseInt(this.state.routeParams.start_sarpras) - parseInt(this.state.routeParams.limit))
            }
        },()=>{
            this.props.getRaporDapodikSarpras(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false
                });
            });
        });
    }

    klikNextDapodikRombel = () => {
        
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: null,
                start_rombel: (parseInt(this.state.routeParams.start_rombel) + parseInt(this.state.routeParams.limit))
            }
        },()=>{
            this.props.getRaporDapodikRombel(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false
                });
            });
        });
    }

    klikPrevDapodikRombel = () => {
        
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: null,
                start_rombel: (parseInt(this.state.routeParams.start_rombel) - parseInt(this.state.routeParams.limit))
            }
        },()=>{
            this.props.getRaporDapodikRombel(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false
                });
            });
        });
    }

    klikNextDapodikPD = () => {
        
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: null,
                start_pd: (parseInt(this.state.routeParams.start_pd) + parseInt(this.state.routeParams.limit))
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

    klikPrevDapodikPD = () => {
        
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: null,
                start_pd: (parseInt(this.state.routeParams.start_pd) - parseInt(this.state.routeParams.limit))
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

    klikNextDapodikPTK = () => {
        
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: null,
                start_ptk: (parseInt(this.state.routeParams.start_ptk) + parseInt(this.state.routeParams.limit))
            }
        },()=>{
            this.props.getRaporDapodikPTK(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false
                });
            });
        });
    }

    klikPrevDapodikPTK = () => {
        
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: null,
                start_ptk: (parseInt(this.state.routeParams.start_ptk) - parseInt(this.state.routeParams.limit))
            }
        },()=>{
            this.props.getRaporDapodikPTK(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false
                });
            });
        });
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
                sekolah_id: this.$f7route.params['sekolah_id'],
                induk_rapor_dapodik_id: '01010000'
            }
        },()=>{
            this.props.getRekapSekolah(this.state.routeParams).then((result)=>{
                    
            });

            this.props.getSekolahIndividu(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false
                });
            });

            this.props.getRaporDapodikIdentitas(this.state.routeParams).then((result)=>{
                this.props.getRefRaporDapodik(this.state.routeParams);
            });

            this.loadData(this.$f7route.params['sekolah_id']);

            
        })
    }

    render()
    {
        return (
            <Page name="RaporDapodikProfil" hideBarsOnScroll>
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
                {this.$f7route.params['param_tambahan'] == 'validasi' &&
                <Card>
                    <CardContent>
                        <Button raised fill large className="color-theme-teal" onClick={()=>this.$f7router.navigate('/formValidasiData/'+this.$f7route.params['sekolah_id']+'/'+localStorage.getItem('semester_id_aplikasi'))}>
                            Validasi Data
                        </Button>
                    </CardContent>
                </Card>
                }
                <SelectSemester/>
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
                                        <br/>Akreditasi: <b>{this.props.rekap_sekolah && this.props.rekap_sekolah.rows && this.props.rekap_sekolah.rows.length > 0 && this.props.rekap_sekolah.rows[0].akreditasi_id_str}</b>
                                        <br/>Kurikulum: <b>{this.props.rekap_sekolah && this.props.rekap_sekolah.rows && this.props.rekap_sekolah.rows.length > 0 && this.props.rekap_sekolah.rows[0].kurikulum}</b>
                                    </Col>
                                </Row>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="100" tabletWidth="40">
                        <Card style={{marginBottom:'0px', minHeight:'150px'}}>
                            <CardContent>
                                    Kepala Sekolah: <b>{this.props.rekap_sekolah && this.props.rekap_sekolah.rows && this.props.rekap_sekolah.rows.length > 0 && this.props.rekap_sekolah.rows[0].nama_kepsek}</b>
                                    <br/>No HP Kepsek: <b>******</b>
                                    {/* <br/>No HP Kepsek: <b>{this.props.rekap_sekolah && this.props.rekap_sekolah.rows && this.props.rekap_sekolah.rows.length > 0 && this.props.rekap_sekolah.rows[0].hp_kepsek}</b> */}
                                    <br/>
                                    <br/>Operator: <b>{this.props.rekap_sekolah && this.props.rekap_sekolah.rows && this.props.rekap_sekolah.rows.length > 0 && this.props.rekap_sekolah.rows[0].nama_operator}</b>
                                    <br/>No HP Operator: <b>******</b>
                                    {/* <br/>No HP Operator: <b>{this.props.rekap_sekolah && this.props.rekap_sekolah.rows && this.props.rekap_sekolah.rows.length > 0 && this.props.rekap_sekolah.rows[0].hp_operator}</b> */}
                            </CardContent>
                        </Card>
                    </Col>
                    {/* <Col width="100" tabletWidth="100">
                    </Col> */}
                </Row>

                </>
                }
                <BlockTitle>Rapor Dapodik</BlockTitle>
                <Block strong style={{marginBottom:'0px', padding:'0px'}}>
                    <Row noGap style={{margin:'8px'}}>
                        <Col width="100" tabletWidth="25">
                            <Card>
                                <CardHeader>
                                    Rapor Rata-rata
                                </CardHeader>
                                <CardContent>
                                    <h1 style={{fontSize:'50px', marginTop:'0px', marginBottom:'0px'}}>
                                        {this.props.rapor_dapodik_sekolah.rows[0].rapor_akhir ? parseFloat(this.props.rapor_dapodik_sekolah.rows[0].rapor_akhir).toFixed(2) : 0}
                                    </h1>
                                </CardContent>
                            </Card>
                        </Col>
                        <Col width="100" tabletWidth="75">
                            <Row noGap style={{justifyContent:'baseline'}}>
                                <Col width="50" tabletWidth="20">
                                    <Card>
                                        <CardHeader>
                                            Identitas
                                        </CardHeader>
                                        <CardContent>
                                            <h1 style={{fontSize:'25px', marginTop:'0px', marginBottom:'0px'}}>
                                                {this.props.rapor_dapodik_sekolah.rows[0].rapor_sekolah ? parseFloat(this.props.rapor_dapodik_sekolah.rows[0].rapor_sekolah).toFixed(2) : 0}
                                            </h1>
                                        </CardContent>
                                    </Card>
                                </Col>
                                <Col width="50" tabletWidth="20">
                                    <Card>
                                        <CardHeader>
                                            PD
                                        </CardHeader>
                                        <CardContent>
                                            <h1 style={{fontSize:'25px', marginTop:'0px', marginBottom:'0px'}}>
                                                {this.props.rapor_dapodik_sekolah.rows[0].rapor_pd ? parseFloat(this.props.rapor_dapodik_sekolah.rows[0].rapor_pd).toFixed(2) : 0}
                                            </h1>
                                        </CardContent>
                                    </Card>
                                </Col>
                                <Col width="50" tabletWidth="20">
                                    <Card>
                                        <CardHeader>
                                            PTK
                                        </CardHeader>
                                        <CardContent>
                                            <h1 style={{fontSize:'25px', marginTop:'0px', marginBottom:'0px'}}>
                                                {this.props.rapor_dapodik_sekolah.rows[0].rapor_ptk ? parseFloat(this.props.rapor_dapodik_sekolah.rows[0].rapor_ptk).toFixed(2) : 0}
                                            </h1>
                                        </CardContent>
                                    </Card>
                                </Col>
                                <Col width="50" tabletWidth="20">
                                    <Card>
                                        <CardHeader>
                                            Rombel
                                        </CardHeader>
                                        <CardContent>
                                            <h1 style={{fontSize:'25px', marginTop:'0px', marginBottom:'0px'}}>
                                                {this.props.rapor_dapodik_sekolah.rows[0].rapor_rombel ? parseFloat(this.props.rapor_dapodik_sekolah.rows[0].rapor_rombel).toFixed(2) : 0}
                                            </h1>
                                        </CardContent>
                                    </Card>
                                </Col>
                                <Col width="50" tabletWidth="20">
                                    <Card>
                                        <CardHeader>
                                            Sarpras
                                        </CardHeader>
                                        <CardContent>
                                            <h1 style={{fontSize:'25px', marginTop:'0px', marginBottom:'0px'}}>
                                                {this.props.rapor_dapodik_sekolah.rows[0].rapor_sarpras ? parseFloat(this.props.rapor_dapodik_sekolah.rows[0].rapor_sarpras).toFixed(2) : 0}
                                            </h1>
                                        </CardContent>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Block>
                {parseInt(localStorage.getItem('sudah_login')) !== 0 && parseInt(JSON.parse(localStorage.getItem('user')).verified) === 1 &&
                <Block strong style={{marginTop:'0px', marginBottom:'0px'}}>
                    <Segmented tabbar raised>
                        <Button tabLink="#tab-1" tabLinkActive>Identitas</Button>
                        <Button tabLink="#tab-2" ><span className="hilangDiDesktop">PD</span><span className="hilangDiMobile">Peserta Didik</span></Button>
                        {/* <Button tabLink="#tab-2" >PD</Button> */}
                        <Button tabLink="#tab-3" >PTK</Button>
                        <Button tabLink="#tab-4" >Rombel</Button>
                        <Button tabLink="#tab-5" >Sarpras</Button>
                    </Segmented>
                {/* <div tabbar bottom>
                    <Link tabLink="#tab-1" tabLinkActive>Tab 1</Link>
                    <Link tabLink="#tab-2">Tab 2</Link>
                    <Link tabLink="#tab-3">Tab 3</Link>
                </div> */}
                    <Tabs animated>
                        <Tab id="tab-1" className="page-content" tabActive style={{paddingTop:'0px'}}>
                            <div className="data-table" style={{overflowY:'hidden', marginTop:'8px'}}>
                                <table>
                                    <thead style={{background:'#eeeeee'}}>
                                        <tr>
                                            <th className="label-cell"style={{minWidth:'40px'}}>&nbsp;</th>
                                            <th className="label-cell"style={{minWidth:'200px', color:'#434343', fontSize:'15px'}}>Indikator</th>
                                            <th className="label-cell"style={{color:'#434343', fontSize:'15px'}}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.props.ref_rapor_dapodik.rows.map((option)=>{
                                        return(
                                            <tr key={option.rapor_dapodik_id}>
                                                <td className="label-cell">
                                                    ...
                                                </td>
                                                <td className="label-cell">
                                                    {option.nama}
                                                </td>
                                                <td className="label-cell">
                                                    {parseInt(this.props.rapor_dapodik_identitas.rows[0][option.rapor_dapodik_id]) === 1 && <Icon style={{fontSize:'20px', marginTop: '-5px', color:'green'}} f7="checkmark_circle_fill" />}
                                                    {parseInt(this.props.rapor_dapodik_identitas.rows[0][option.rapor_dapodik_id]) === 0 && <Icon style={{fontSize:'20px', marginTop: '-5px'}} f7="circle" />}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </Tab>
                        <Tab id="tab-2" className="page-content" style={{paddingTop:'0px'}}>
                            <Block strong style={{marginBottom:'0px', padding:'4px', marginTop: '8px'}}>
                                <div className="data-table-footer" style={{display:'block'}}>
                                    <div className="data-table-pagination">
                                        <a onClick={this.klikPrevDapodikPD} href="#" className={"link "+(this.state.routeParams.start_pd < 1 ? "disabled" : "" )}>
                                            <i class="icon icon-prev color-gray"></i>
                                        </a>
                                        <a onClick={this.klikNextDapodikPD} href="#" className={"link "+((parseInt(this.state.routeParams.start_pd)+this.state.routeParams.limit) > parseInt(this.props.rapor_dapodik_pd.total) ? "disabled" : "" )}>
                                            <i className="icon icon-next color-gray"></i>
                                        </a>
                                        <span className="data-table-pagination-label">{(this.state.routeParams.start_pd+1)}-{(this.state.routeParams.start_pd)+(parseInt(this.props.rapor_dapodik_pd.total) <= parseInt(this.state.routeParams.limit) ? parseInt(this.props.rapor_dapodik_pd.total) : parseInt(this.state.routeParams.limit))} dari {this.formatAngka(this.props.rapor_dapodik_pd.total)} peserta didik</span>
                                    </div>
                                </div>
                            </Block>
                            <Block strong style={{marginBottom:'0px', marginTop:'0px'}} className="hilangDiMobile">
                                <Row>
                                        <Col width="100" tabletWidth="30">
                                            <b>Nama Peserta Didik</b>
                                        </Col>
                                        <Col width="100" tabletWidth="70">
                                            <Row>
                                                <Col width="25" tabletWidth="25" style={{fontWeight:'bold', textAlign: 'center'}}>
                                                    Tingkat Kelas
                                                </Col>
                                                <Col width="25" tabletWidth="25" style={{fontWeight:'bold', textAlign: 'center'}}>
                                                    Nama Rombel
                                                </Col>
                                                <Col width="30" tabletWidth="30" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                    Nilai Rapor
                                                </Col>
                                                <Col width="20" tabletWidth="20" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                            </Block>
                            <Block strong style={{marginTop:'0px'}}>
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

                                return (
                                    <Row key={option.peserta_didik_id} style={{borderBottom:'1px solid #ccc', marginTop:'2px', border:'1px solid #ccc', padding:'8px', borderRadius: '4px'}}>
                                        <Col width="60" tabletWidth="30">
                                            <b>{option.nama}</b> ({option.nisn})<br/>
                                            <span style={{fontSize:'10px'}}>{option.nama_sekolah}</span><br/>
                                            <span className="hilangDiDesktop" style={{fontSize:'10px'}}>Kelas {option.tingkat_pendidikan_id} - {option.nama_rombel}</span>
                                        </Col>
                                        <Col width="20" tabletWidth="30" style={{textAlign:'right'}} className="hilangDiDesktop">
                                            <b style={{fontSize:'20px', color:warnaAngka}}>{parseFloat(option.nilai_rapor).toFixed(2)}</b>
                                        </Col>
                                        <Col width="20" tabletWidth="10" style={{textAlign: 'right', paddingLeft: '16px'}} className="hilangDiDesktop">
                                            <MenuItem style={{marginLeft: 'auto', marginTop: '-5px', marginBottom: '4px'}} iconF7="menu" dropdown className="MenuDetail">
                                                <MenuDropdown right style={{zIndex:999999}}>
                                                    
                                                </MenuDropdown>
                                            </MenuItem>
                                        </Col>
                                        <Col width="100" className="hilangDiDesktop" style={{borderBottom: '1px solid #ccc', paddingBottom: '8px'}}>
                                        </Col>
                                        <Col width="100" tabletWidth="70">
                                            <Row>
                                                <Col width="25" tabletWidth="25" style={{textAlign: 'center'}} className="hilangDiMobile">
                                                    <div className="hilangDiDesktop">Total</div>
                                                    Kelas {option.tingkat_pendidikan_id}
                                                </Col>
                                                <Col width="25" tabletWidth="25" style={{textAlign: 'center'}} className="hilangDiMobile">
                                                    <div className="hilangDiDesktop">Total</div>
                                                    {option.nama_rombel}
                                                </Col>
                                                <Col width="30" tabletWidth="30" style={{fontSize:'18px', fontWeight:'bold', textAlign: 'right', color:warnaAngka}} className="hilangDiMobile">
                                                    <div className="hilangDiDesktop">Total</div>
                                                    {parseFloat(option.nilai_rapor).toFixed(2)}
                                                </Col>
                                                <Col width="20" tabletWidth="20" style={{textAlign: 'right', paddingLeft:'16px',}} className="hilangDiMobile">
                                                    <MenuItem style={{marginLeft: 'auto', marginTop: '-5px', marginBottom: '0px'}} iconF7="menu" dropdown className="MenuDetail">
                                                        <MenuDropdown right style={{zIndex:999999}}>
                                                        </MenuDropdown>
                                                    </MenuItem>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>  
                                )
                            })}
                            </Block>
                        </Tab>
                        <Tab id="tab-3" className="page-content" style={{paddingTop:'0px'}}>
                            <Block strong style={{marginBottom:'0px', padding:'4px'}}>
                                <div className="data-table-footer" style={{display:'block'}}>
                                    <div className="data-table-pagination">
                                        <a onClick={this.klikPrevDapodikPTK} href="#" className={"link "+(this.state.routeParams.start_ptk < 1 ? "disabled" : "" )}>
                                            <i class="icon icon-prev color-gray"></i>
                                        </a>
                                        <a onClick={this.klikNextDapodikPTK} href="#" className={"link "+((parseInt(this.state.routeParams.start_ptk)+this.state.routeParams.limit) > parseInt(this.props.rapor_dapodik_ptk.total) ? "disabled" : "" )}>
                                            <i className="icon icon-next color-gray"></i>
                                        </a>
                                        <span className="data-table-pagination-label">{(this.state.routeParams.start_ptk+1)}-{(this.state.routeParams.start_ptk)+(parseInt(this.props.rapor_dapodik_ptk.total) <= parseInt(this.state.routeParams.limit) ? parseInt(this.props.rapor_dapodik_ptk.total) : parseInt(this.state.routeParams.limit))} dari {this.formatAngka(this.props.rapor_dapodik_ptk.total)} PTK</span>
                                    </div>
                                </div>
                            </Block>
                            <Block strong style={{marginBottom:'0px', marginTop:'0px'}} className="hilangDiMobile">
                                <Row>
                                        <Col width="100" tabletWidth="30">
                                            <b>Nama PTK</b>
                                        </Col>
                                        <Col width="100" tabletWidth="70">
                                            <Row>
                                                <Col width="20" tabletWidth="30" style={{fontWeight:'bold', textAlign: 'left'}}>
                                                    NUPTK
                                                </Col>
                                                <Col width="20" tabletWidth="25" style={{fontWeight:'bold', textAlign: 'left'}}>
                                                    Bidang Studi
                                                </Col>
                                                <Col width="15" tabletWidth="25" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                    Nilai Rapor
                                                </Col>
                                                <Col width="10" tabletWidth="20" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                            </Block>
                            <Block strong style={{marginTop:'0px'}}>
                            {this.props.rapor_dapodik_ptk.rows.map((option)=>{

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

                                return (
                                    <Row key={option.sekolah_id} style={{borderBottom:'1px solid #ccc', marginTop:'2px', border:'1px solid #ccc', padding:'8px', borderRadius: '4px'}}>
                                        <Col width="60" tabletWidth="30">
                                            <b>{option.nama}</b><br/>
                                            <span style={{fontSize:'10px'}}>NIP: {option.nip}</span><br/>
                                            <span className="hilangDiDesktop" style={{fontSize:'10px'}}>NUPTK: {option.nuptk}</span>
                                            <span className="hilangDiDesktop" style={{fontSize:'10px'}}>Bidang Studi: {option.bidang_studi}</span>
                                        </Col>
                                        <Col width="20" tabletWidth="30" style={{textAlign:'right'}} className="hilangDiDesktop">
                                            <b style={{fontSize:'20px', color:warnaAngka}}>{parseFloat(option.nilai_rapor).toFixed(2)}</b>
                                        </Col>
                                        <Col width="20" tabletWidth="10" style={{textAlign: 'right', paddingLeft: '16px'}} className="hilangDiDesktop">
                                            <MenuItem style={{marginLeft: 'auto', marginTop: '-5px', marginBottom: '4px'}} iconF7="menu" dropdown className="MenuDetail">
                                                <MenuDropdown right style={{zIndex:999999}}>
                                                    
                                                </MenuDropdown>
                                            </MenuItem>
                                        </Col>
                                        <Col width="100" className="hilangDiDesktop" style={{borderBottom: '1px solid #ccc', paddingBottom: '8px'}}>
                                        </Col>
                                        <Col width="100" tabletWidth="70">
                                            <Row>
                                                <Col width="20" tabletWidth="30" style={{textAlign: 'left'}} className="hilangDiMobile">
                                                    <div className="hilangDiDesktop">NUPTK</div>
                                                    {option.nuptk}
                                                </Col>
                                                <Col width="20" tabletWidth="25" style={{textAlign: 'left'}} className="hilangDiMobile">
                                                    <div className="hilangDiDesktop">Bidang Studi</div>
                                                    {option.bidang_studi}
                                                </Col>
                                                <Col width="15" tabletWidth="25" style={{fontSize:'18px', fontWeight:'bold', textAlign: 'right', color:warnaAngka}} className="hilangDiMobile">
                                                    <div className="hilangDiDesktop">Nilai Rapor</div>
                                                    {parseFloat(option.nilai_rapor).toFixed(2)}
                                                </Col>
                                                <Col width="10" tabletWidth="20" style={{textAlign: 'right', paddingLeft:'16px',}} className="hilangDiMobile">
                                                    <MenuItem style={{marginLeft: 'auto', marginTop: '-5px', marginBottom: '0px'}} iconF7="menu" dropdown className="MenuDetail">
                                                        <MenuDropdown right style={{zIndex:999999}}>
                                                        </MenuDropdown>
                                                    </MenuItem>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>  
                                )
                            })}
                            </Block>
                        </Tab>
                        <Tab id="tab-4" className="page-content" style={{paddingTop:'0px'}}>
                            {/* rombel */}
                            <Block strong style={{marginBottom:'0px', padding:'4px'}}>
                                <div className="data-table-footer" style={{display:'block'}}>
                                    <div className="data-table-pagination">
                                        <a onClick={this.klikPrevDapodikRombel} href="#" className={"link "+(this.state.routeParams.start_rombel < 1 ? "disabled" : "" )}>
                                            <i class="icon icon-prev color-gray"></i>
                                        </a>
                                        <a onClick={this.klikNextDapodikRombel} href="#" className={"link "+((parseInt(this.state.routeParams.start_rombel)+this.state.routeParams.limit) > parseInt(this.props.rapor_dapodik_ptk.total) ? "disabled" : "" )}>
                                            <i className="icon icon-next color-gray"></i>
                                        </a>
                                        <span className="data-table-pagination-label">{(this.state.routeParams.start_rombel+1)}-{(this.state.routeParams.start_rombel)+(parseInt(this.props.rapor_dapodik_rombel.total) <= parseInt(this.state.routeParams.limit) ? parseInt(this.props.rapor_dapodik_rombel.total) : parseInt(this.state.routeParams.limit))} dari {this.formatAngka(this.props.rapor_dapodik_rombel.total)} Rombel</span>
                                    </div>
                                </div>
                            </Block>
                            <Block strong style={{marginBottom:'0px', marginTop:'0px'}} className="hilangDiMobile">
                                <Row>
                                        <Col width="100" tabletWidth="30">
                                            <b>Nama Rombel</b>
                                        </Col>
                                        <Col width="100" tabletWidth="70">
                                            <Row>
                                                <Col width="20" tabletWidth="30" style={{fontWeight:'bold', textAlign: 'left'}}>
                                                    Tingkat
                                                </Col>
                                                <Col width="20" tabletWidth="25" style={{fontWeight:'bold', textAlign: 'left'}}>
                                                    Wali Kelas
                                                </Col>
                                                <Col width="15" tabletWidth="25" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                    Nilai Rapor
                                                </Col>
                                                <Col width="10" tabletWidth="20" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                            </Block>
                            <Block strong style={{marginTop:'0px'}}>
                            {this.props.rapor_dapodik_rombel.rows.map((option)=>{

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

                                return (
                                    <Row key={option.sekolah_id} style={{borderBottom:'1px solid #ccc', marginTop:'2px', border:'1px solid #ccc', padding:'8px', borderRadius: '4px'}}>
                                        <Col width="60" tabletWidth="30">
                                            <b>{option.nama}</b><br/>
                                            <span style={{fontSize:'10px'}}>Tingkat: Kelas {option.tingkat_pendidikan_id}</span><br/>
                                            <span className="hilangDiDesktop" style={{fontSize:'10px'}}>Wali Kelas: {option.wali_kelas}</span>
                                        </Col>
                                        <Col width="20" tabletWidth="30" style={{textAlign:'right'}} className="hilangDiDesktop">
                                            <b style={{fontSize:'20px', color:warnaAngka}}>{parseFloat(option.nilai_rapor).toFixed(2)}</b>
                                        </Col>
                                        <Col width="20" tabletWidth="10" style={{textAlign: 'right', paddingLeft: '16px'}} className="hilangDiDesktop">
                                            <MenuItem style={{marginLeft: 'auto', marginTop: '-5px', marginBottom: '4px'}} iconF7="menu" dropdown className="MenuDetail">
                                                <MenuDropdown right style={{zIndex:999999}}>
                                                    
                                                </MenuDropdown>
                                            </MenuItem>
                                        </Col>
                                        <Col width="100" className="hilangDiDesktop" style={{borderBottom: '1px solid #ccc', paddingBottom: '8px'}}>
                                        </Col>
                                        <Col width="100" tabletWidth="70">
                                            <Row>
                                                <Col width="20" tabletWidth="30" style={{textAlign: 'left'}} className="hilangDiMobile">
                                                    <div className="hilangDiDesktop">Tingkat</div>
                                                    Kelas {option.tingkat_pendidikan_id}
                                                </Col>
                                                <Col width="20" tabletWidth="25" style={{textAlign: 'left'}} className="hilangDiMobile">
                                                    <div className="hilangDiDesktop">Wali Kelas</div>
                                                    {option.wali_kelas}
                                                </Col>
                                                <Col width="15" tabletWidth="25" style={{fontSize:'18px', fontWeight:'bold', textAlign: 'right', color:warnaAngka}} className="hilangDiMobile">
                                                    <div className="hilangDiDesktop">Nilai Rapor</div>
                                                    {parseFloat(option.nilai_rapor).toFixed(2)}
                                                </Col>
                                                <Col width="10" tabletWidth="20" style={{textAlign: 'right', paddingLeft:'16px',}} className="hilangDiMobile">
                                                    <MenuItem style={{marginLeft: 'auto', marginTop: '-5px', marginBottom: '0px'}} iconF7="menu" dropdown className="MenuDetail">
                                                        <MenuDropdown right style={{zIndex:999999}}>
                                                        </MenuDropdown>
                                                    </MenuItem>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>  
                                )
                            })}
                            </Block>
                        </Tab>
                        <Tab id="tab-5" className="page-content" style={{paddingTop:'0px'}}>
                            {/* sarpras */}
                            <Block strong style={{marginBottom:'0px', padding:'4px'}}>
                                <div className="data-table-footer" style={{display:'block'}}>
                                    <div className="data-table-pagination">
                                        <a onClick={this.klikPrevDapodikSarpras} href="#" className={"link "+(this.state.routeParams.start_sarpras < 1 ? "disabled" : "" )}>
                                            <i class="icon icon-prev color-gray"></i>
                                        </a>
                                        <a onClick={this.klikNextDapodikSarpras} href="#" className={"link "+((parseInt(this.state.routeParams.start_sarpras)+this.state.routeParams.limit) > parseInt(this.props.rapor_dapodik_ptk.total) ? "disabled" : "" )}>
                                            <i className="icon icon-next color-gray"></i>
                                        </a>
                                        <span className="data-table-pagination-label">{(this.state.routeParams.start_sarpras+1)}-{(this.state.routeParams.start_sarpras)+(parseInt(this.props.rapor_dapodik_sarpras.total) <= parseInt(this.state.routeParams.limit) ? parseInt(this.props.rapor_dapodik_sarpras.total) : parseInt(this.state.routeParams.limit))} dari {this.formatAngka(this.props.rapor_dapodik_sarpras.total)} Sarpras</span>
                                    </div>
                                </div>
                            </Block>
                            <Block strong style={{marginBottom:'0px', marginTop:'0px'}} className="hilangDiMobile">
                                <Row>
                                        <Col width="100" tabletWidth="30">
                                            <b>Nama Sarpras</b>
                                        </Col>
                                        <Col width="100" tabletWidth="70">
                                            <Row>
                                                <Col width="20" tabletWidth="30" style={{fontWeight:'bold', textAlign: 'left'}}>
                                                    Jenis
                                                </Col>
                                                <Col width="20" tabletWidth="25" style={{fontWeight:'bold', textAlign: 'left'}}>
                                                    Panjang/Lebar
                                                </Col>
                                                <Col width="15" tabletWidth="25" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                    Nilai Rapor
                                                </Col>
                                                <Col width="10" tabletWidth="20" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                            </Block>
                            <Block strong style={{marginTop:'0px'}}>
                            {this.props.rapor_dapodik_sarpras.rows.map((option)=>{

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

                                return (
                                    <Row key={option.sekolah_id} style={{borderBottom:'1px solid #ccc', marginTop:'2px', border:'1px solid #ccc', padding:'8px', borderRadius: '4px'}}>
                                        <Col width="60" tabletWidth="30">
                                            <b>{option.nama}</b><br/>
                                            <span style={{fontSize:'10px'}}>Jenis {option.jenis_prasarana}</span><br/>
                                            <span className="hilangDiDesktop" style={{fontSize:'10px'}}>Panjang/Lebar: {option.panjang_lebar}</span>
                                        </Col>
                                        <Col width="20" tabletWidth="30" style={{textAlign:'right'}} className="hilangDiDesktop">
                                            <b style={{fontSize:'20px', color:warnaAngka}}>{parseFloat(option.nilai_rapor).toFixed(2)}</b>
                                        </Col>
                                        <Col width="20" tabletWidth="10" style={{textAlign: 'right', paddingLeft: '16px'}} className="hilangDiDesktop">
                                            <MenuItem style={{marginLeft: 'auto', marginTop: '-5px', marginBottom: '4px'}} iconF7="menu" dropdown className="MenuDetail">
                                                <MenuDropdown right style={{zIndex:999999}}>
                                                    
                                                </MenuDropdown>
                                            </MenuItem>
                                        </Col>
                                        <Col width="100" className="hilangDiDesktop" style={{borderBottom: '1px solid #ccc', paddingBottom: '8px'}}>
                                        </Col>
                                        <Col width="100" tabletWidth="70">
                                            <Row>
                                                <Col width="20" tabletWidth="30" style={{textAlign: 'left'}} className="hilangDiMobile">
                                                    <div className="hilangDiDesktop">Jenis</div>
                                                    {option.jenis_prasarana}
                                                </Col>
                                                <Col width="20" tabletWidth="25" style={{textAlign: 'left'}} className="hilangDiMobile">
                                                    <div className="hilangDiDesktop">Panjang/Lebar</div>
                                                    {option.panjang_lebar}
                                                </Col>
                                                <Col width="15" tabletWidth="25" style={{fontSize:'18px', fontWeight:'bold', textAlign: 'right', color:warnaAngka}} className="hilangDiMobile">
                                                    <div className="hilangDiDesktop">Nilai Rapor</div>
                                                    {parseFloat(option.nilai_rapor).toFixed(2)}
                                                </Col>
                                                <Col width="10" tabletWidth="20" style={{textAlign: 'right', paddingLeft:'16px',}} className="hilangDiMobile">
                                                    <MenuItem style={{marginLeft: 'auto', marginTop: '-5px', marginBottom: '0px'}} iconF7="menu" dropdown className="MenuDetail">
                                                        <MenuDropdown right style={{zIndex:999999}}>
                                                        </MenuDropdown>
                                                    </MenuItem>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>  
                                )
                            })}
                            </Block>
                        </Tab>
                    </Tabs>
                </Block>
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
      getRefRaporDapodik: Actions.getRefRaporDapodik,
      getRaporDapodikSekolah: Actions.getRaporDapodikSekolah,
      getRaporDapodikIdentitas: Actions.getRaporDapodikIdentitas,
      getRaporDapodikPD: Actions.getRaporDapodikPD,
      getRaporDapodikPTK: Actions.getRaporDapodikPTK,
      getRaporDapodikRombel: Actions.getRaporDapodikRombel,
      getRaporDapodikSarpras: Actions.getRaporDapodikSarpras,
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
        ref_rapor_dapodik: RaporDapodik.ref_rapor_dapodik,
        rapor_dapodik_sekolah: RaporDapodik.rapor_dapodik_sekolah,
        rapor_dapodik_identitas: RaporDapodik.rapor_dapodik_identitas,
        rapor_dapodik_pd: RaporDapodik.rapor_dapodik_pd,
        rapor_dapodik_ptk: RaporDapodik.rapor_dapodik_ptk,
        rapor_dapodik_rombel: RaporDapodik.rapor_dapodik_rombel,
        rapor_dapodik_sarpras: RaporDapodik.rapor_dapodik_sarpras,
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(RaporDapodikProfil));
  