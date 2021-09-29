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

import { Doughnut, Bar } from 'react-chartjs-2';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import SelectSemester from '../SelectSemester';
import BentukSmartSelect from '../../components/BentukSmartSelect';

class RaporDapodikRingkasan extends Component {
    state = {
        error: null,
        loading: true,
        routeParams: {
            sekolah_id: '',
            semester_id: localStorage.getItem('semester_id_aplikasi'),
            mst_kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi'),
            id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi'),
            order_by: 'rapor_final'
        },
        nama_wilayah: localStorage.getItem('wilayah_aplikasi'),
        rapor_akhir: 0,
        rapor_sekolah: 0,
        rapor_pd: 0,
        rapor_ptk: 0,
        rapor_rombel: 0,
        rapor_sarpras: 0,
        rapor_dapodik_wilayah: {
            total: 0,
            rows: []
        },
    }

    backClick = () => {

        console.log(this.$f7route.url.split("/")[1]);

    }

    dataRaporWilayah = (kode_wilayah) => {
        
    }

    loadData = (kode_wilayah) => {

        this.props.setLoading(true);
        this.setState({
            ...this.state,
            routeParams: {
                kode_wilayah: kode_wilayah ? kode_wilayah: '090000',
                semester_id: localStorage.getItem('semester_id_aplikasi')
            }
        },()=>{
            this.props.getWilayah(this.state.routeParams).then((result)=>{

                this.setState({
                    ...this.state,
                    loading: true,
                    nama_wilayah: this.props.wilayah.rows[0].nama,
                    routeParams: {
                        mst_kode_wilayah: kode_wilayah ? kode_wilayah : '000000',
                        semester_id: localStorage.getItem('semester_id_aplikasi'),
                        bentuk_pendidikan_id: localStorage.getItem('jenjang_aplikasi'),
                        order_by: 'rapor_final'
                    }
                },()=>{
        
                    let rapor_akhir = 0;
                    let rapor_pd = 0;
                    let rapor_ptk = 0;
                    let rapor_sekolah = 0;
                    let rapor_rombel = 0;
                    let rapor_sarpras = 0;
                    let rapor_berkelanjutan = 0;
                    let rapor_mutakhir = 0;
                    let jumlah_total = 0;
            
                    this.props.getRaporDapodikWilayah(this.state.routeParams).then((result)=>{
                        // console.log(this.props.rapor_dapodik_wilayah);
                        for (let index = 0; index < this.props.rapor_dapodik_wilayah.total; index++) {
                            const element = this.props.rapor_dapodik_wilayah.rows[index];
            
                            // console.log(element);
                            rapor_akhir = rapor_akhir+parseFloat(element.rapor_akhir);
                            rapor_sekolah = rapor_sekolah+parseFloat(element.rapor_sekolah);
                            rapor_pd = rapor_pd+parseFloat(element.rapor_pd);
                            rapor_ptk = rapor_ptk+parseFloat(element.rapor_ptk);
                            rapor_rombel = rapor_rombel+parseFloat(element.rapor_rombel);
                            rapor_sarpras = rapor_sarpras+parseFloat(element.rapor_sarpras);
                            rapor_berkelanjutan = rapor_berkelanjutan+parseFloat(element.rapor_berkelanjutan);
                            rapor_mutakhir = rapor_mutakhir+parseFloat(element.rapor_mutakhir);
                            jumlah_total++;
                            
                        }
        
                        this.setState({
                            ...this.state,
                            loading: false,
                            rapor_akhir: (rapor_akhir/jumlah_total).toFixed(2),
                            rapor_sekolah: (rapor_sekolah/jumlah_total).toFixed(2),
                            rapor_pd: (rapor_pd/jumlah_total).toFixed(2),
                            rapor_ptk: (rapor_ptk/jumlah_total).toFixed(2),
                            rapor_rombel: (rapor_rombel/jumlah_total).toFixed(2),
                            rapor_sarpras: (rapor_sarpras/jumlah_total).toFixed(2),
                            rapor_berkelanjutan: (rapor_berkelanjutan/jumlah_total).toFixed(2),
                            rapor_mutakhir: (rapor_mutakhir/jumlah_total).toFixed(2),
                            rapor_dapodik_wilayah: this.props.rapor_dapodik_wilayah
                        });

                        this.props.setLoading(false);
                    });
        
                });

            });
        })


    }

    componentDidMount = () => {
        
        console.log(this.$f7route.url);
        localStorage.setItem('current_url', this.$f7route.url);

        if(this.$f7route.params['kode_wilayah']){
            this.state.routeParams = {
                // ...this.state.routeParams,
                kode_wilayah: this.$f7route.params['kode_wilayah']
            };

            this.loadData(this.$f7route.params['kode_wilayah']);

        }else{

            this.setState({
                nama_wilayah: 'Indonesia'
            },()=>{

                this.loadData('000000');
            });
        }

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
            this.props.getRaporDapodikWilayah(this.state.routeParams).then((result)=>{
                
                let rapor_akhir = 0;
                let rapor_pd = 0;
                let rapor_ptk = 0;
                let rapor_sekolah = 0;
                let rapor_rombel = 0;
                let rapor_sarpras = 0;
                let rapor_berkelanjutan = 0;
                let rapor_mutakhir = 0;
                let jumlah_total = 0;
                
                for (let index = 0; index < this.props.rapor_dapodik_wilayah.total; index++) {
                    const element = this.props.rapor_dapodik_wilayah.rows[index];
    
                    rapor_akhir = rapor_akhir+parseFloat(element.rapor_akhir);
                    rapor_sekolah = rapor_sekolah+parseFloat(element.rapor_sekolah);
                    rapor_pd = rapor_pd+parseFloat(element.rapor_pd);
                    rapor_ptk = rapor_ptk+parseFloat(element.rapor_ptk);
                    rapor_rombel = rapor_rombel+parseFloat(element.rapor_rombel);
                    rapor_sarpras = rapor_sarpras+parseFloat(element.rapor_sarpras);
                    rapor_berkelanjutan = rapor_berkelanjutan+parseFloat(element.rapor_berkelanjutan);
                    rapor_mutakhir = rapor_mutakhir+parseFloat(element.rapor_mutakhir);
                    jumlah_total++;
                    
                }

                this.setState({
                    ...this.state,
                    loading: false,
                    rapor_akhir: (rapor_akhir/jumlah_total).toFixed(2),
                    rapor_sekolah: (rapor_sekolah/jumlah_total).toFixed(2),
                    rapor_pd: (rapor_pd/jumlah_total).toFixed(2),
                    rapor_ptk: (rapor_ptk/jumlah_total).toFixed(2),
                    rapor_rombel: (rapor_rombel/jumlah_total).toFixed(2),
                    rapor_sarpras: (rapor_sarpras/jumlah_total).toFixed(2),
                    rapor_berkelanjutan: (rapor_berkelanjutan/jumlah_total).toFixed(2),
                    rapor_mutakhir: (rapor_mutakhir/jumlah_total).toFixed(2),
                    rapor_dapodik_wilayah: this.props.rapor_dapodik_wilayah
                });

                this.props.setLoading(false);
            });
        });
    }

    cariKeyword = (event)  => {
        this.setState({
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                keyword: event.target[0].value
            }
        },()=>{
            
            this.props.getRaporDapodikWilayah(this.state.routeParams).then((result)=>{
                
                let rapor_akhir = 0;
                let rapor_pd = 0;
                let rapor_ptk = 0;
                let rapor_sekolah = 0;
                let rapor_rombel = 0;
                let rapor_sarpras = 0;
                let rapor_berkelanjutan = 0;
                let rapor_mutakhir = 0;
                let jumlah_total = 0;
                
                for (let index = 0; index < this.props.rapor_dapodik_wilayah.total; index++) {
                    const element = this.props.rapor_dapodik_wilayah.rows[index];
    
                    rapor_akhir = rapor_akhir+parseFloat(element.rapor_akhir);
                    rapor_sekolah = rapor_sekolah+parseFloat(element.rapor_sekolah);
                    rapor_pd = rapor_pd+parseFloat(element.rapor_pd);
                    rapor_ptk = rapor_ptk+parseFloat(element.rapor_ptk);
                    rapor_rombel = rapor_rombel+parseFloat(element.rapor_rombel);
                    rapor_sarpras = rapor_sarpras+parseFloat(element.rapor_sarpras);
                    rapor_berkelanjutan = rapor_berkelanjutan+parseFloat(element.rapor_berkelanjutan);
                    rapor_mutakhir = rapor_mutakhir+parseFloat(element.rapor_mutakhir);
                    jumlah_total++;
                    
                }

                this.setState({
                    ...this.state,
                    loading: false,
                    rapor_akhir: (rapor_akhir/jumlah_total).toFixed(2),
                    rapor_sekolah: (rapor_sekolah/jumlah_total).toFixed(2),
                    rapor_pd: (rapor_pd/jumlah_total).toFixed(2),
                    rapor_ptk: (rapor_ptk/jumlah_total).toFixed(2),
                    rapor_rombel: (rapor_rombel/jumlah_total).toFixed(2),
                    rapor_sarpras: (rapor_sarpras/jumlah_total).toFixed(2),
                    rapor_berkelanjutan: (rapor_berkelanjutan/jumlah_total).toFixed(2),
                    rapor_mutakhir: (rapor_mutakhir/jumlah_total).toFixed(2),
                    rapor_dapodik_wilayah: this.props.rapor_dapodik_wilayah
                },()=>{
                    console.log(this.state.rapor_berkelanjutan);
                });

                this.props.setLoading(false);
            });
        })
    }

    bukaPengaturan = () => {
        
        this.props.setJudulKanan('Menu Rapor');

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
                <ListItem style={{cursor:'pointer'}} title="Unduh Excel" onClick={()=>window.open(localStorage.getItem('api_base')+"/api/RaporDapodik/getRaporDapodikExcel?semester_id="+localStorage.getItem('semester_id_aplikasi')+"&mst_kode_wilayah="+(this.$f7route.params['kode_wilayah']?this.$f7route.params['kode_wilayah']:localStorage.getItem('kode_wilayah_aplikasi'))+"&bentuk_pendidikan_id="+(this.state.routeParams.bentuk_pendidikan_id ? this.state.routeParams.bentuk_pendidikan_id : '')+"&status_sekolah="+(this.state.routeParams.status_sekolah ? this.state.routeParams.status_sekolah : '')+"&keyword="+(this.state.routeParams.keyword ? this.state.routeParams.keyword : '')+"&limit=1000000")}>
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
                    <NavTitle sliding>{(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')}</NavTitle>
                    <NavTitleLarge>
                    {(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')}
                    </NavTitleLarge>
                    <Subnavbar>
                        <Segmented raised>
                            <Button tabLink="#tab1" tabLinkActive>Per Wilayah</Button>
                            <Button tabLink="#tab2" href={"/RaporDapodikSekolah/"+(this.$f7route.params['id_level_wilayah'] ? this.$f7route.params['id_level_wilayah'] : localStorage.getItem('id_level_wilayah_aplikasi'))+"/"+(this.$f7route.params['kode_wilayah'] ? this.$f7route.params['kode_wilayah'] : localStorage.getItem('kode_wilayah_aplikasi'))}>Per Sekolah</Button>
                        </Segmented>
                    </Subnavbar>
                    <NavRight>
                        <Link panelOpen="right" onClick={this.bukaPengaturan} iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu">&nbsp;Menu</Link>
                    </NavRight>
                </Navbar>
                <SelectSemester/>
                <Card className="demo-card-header-pic">
                    <Segmented raised>
                        <Button tabLink="#tab0" tabLinkActive>Ringkasan </Button>
                        <Button tabLink="#tab1" href={"/RaporDapodikWilayah"+"/"+(this.$f7route.params['kode_wilayah'] ? this.$f7route.params['kode_wilayah'] : localStorage.getItem('kode_wilayah_aplikasi'))}>Akurat</Button>
                        <Button tabLink="#tab2" href={"/RaporDapodikBerkelanjutan/"+(this.$f7route.params['id_level_wilayah'] ? this.$f7route.params['id_level_wilayah'] : localStorage.getItem('id_level_wilayah_aplikasi'))+"/"+(this.$f7route.params['kode_wilayah'] ? this.$f7route.params['kode_wilayah'] : localStorage.getItem('kode_wilayah_aplikasi'))}>Berkelanjutan</Button>
                        <Button tabLink="#tab3" href={"/RaporDapodikMutakhir/"+(this.$f7route.params['id_level_wilayah'] ? this.$f7route.params['id_level_wilayah'] : localStorage.getItem('id_level_wilayah_aplikasi'))+"/"+(this.$f7route.params['kode_wilayah'] ? this.$f7route.params['kode_wilayah'] : localStorage.getItem('kode_wilayah_aplikasi'))}>Mutakhir</Button>
                    </Segmented>
                </Card>
                <Card className="demo-card-header-pic" style={{minHeight: '150px', backgroundImage: (localStorage.getItem('tema_warna_aplikasi') === 'biru-1' ? 'linear-gradient(to top, #4481eb 0%, #04befe 100%)' : 'linear-gradient(to top, #f83600 0%, #FAAE1F 100%)')}}>
                    <CardHeader
                        className="no-border"
                        style={{textAlign: 'center', display: 'block', color:'white'}}
                    >
                        {(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')} {this.props.wilayah.rows[0].nama}
                    </CardHeader>
                    <CardContent
                        style={{textAlign: 'center'}}
                    >
                        <span style={{fontSize:'70px', fontWeight: 'bold', color:'white'}}>
                            {((parseFloat(this.state.rapor_akhir)+parseFloat(this.state.rapor_berkelanjutan)+parseFloat(this.state.rapor_mutakhir))/3).toFixed(2)}
                        </span>
                        <Row noGap style={{color:'white'}}>
                            <Col width="100" tabletWidth="33" style={{textAlign:'center'}}>
                                <Row>
                                    <Col width="100">
                                        Akurat
                                    </Col>
                                    <Col width="100">
                                        <b style={{fontSize:'30px'}}>{this.state.rapor_akhir}</b>
                                    </Col>
                                </Row>
                            </Col>
                            <Col width="100" tabletWidth="33" style={{textAlign:'center'}}>
                                <Row>
                                    <Col width="100">
                                        Berkelanjutan
                                    </Col>
                                    <Col width="100">
                                        <b style={{fontSize:'30px'}}>{this.state.rapor_berkelanjutan}</b>
                                    </Col>
                                </Row>
                            </Col>
                            <Col width="100" tabletWidth="33" style={{textAlign:'center'}}>
                                <Row>
                                    <Col width="100">
                                        Mutakhir
                                    </Col>
                                    <Col width="100">
                                        <b style={{fontSize:'30px'}}>{this.state.rapor_mutakhir}</b>
                                    </Col>
                                </Row>
                            </Col>
                            <Col width="100" tabletWidth="100">
                                <Button style={{marginTop:'10px', color:'white'}} href="/RaporDapodik/Indikator">
                                    <i className="f7-icons" style={{fontSize:'17px'}}>question_circle</i> Indikator Penghitungan {(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')}
                                </Button>
                            </Col>
                            <Col width="100" tabletWidth="100">
                                <i style={{fontSize:'10px'}}>* Nilai Rapor berdasarkan skala 1-100</i>
                            </Col>
                        </Row>
                    </CardContent>
                </Card>
                
                {this.state.loading ? 
                    <Row noGap>
                        <Col width="100" tabletWidth="100">        
                            <Card className="demo-card-header-pic" style={{minHeight: '150px'}}>
                                <CardHeader
                                    // className="no-border"
                                    style={{textAlign: 'center', display: 'block'}}
                                    className="skeleton-text skeleton-effect-blink"
                                >
                                    {(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')} this.state.nama_wilayah
                                </CardHeader>
                                <CardContent
                                    style={{textAlign: 'center'}}
                                    className="skeleton-text skeleton-effect-blink"
                                >
                                    <span style={{fontSize:'50px', fontWeight: 'bold'}}>
                                        00.00
                                    </span>
                                </CardContent>
                            </Card>
                        </Col>
                        
                        <Col width="100" tabletWidth="100">
                            <BlockTitle style={{marginTop:'8px'}}>{(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')} per Wilayah</BlockTitle>
                            <Block strong style={{marginBottom:'0px'}} className="hilangDiMobile">
                                <Row>
                                    <Col width="100" tabletWidth="30">
                                        <b>Wilayah</b>
                                    </Col>
                                    <Col width="100" tabletWidth="70">
                                        <Row>
                                            <Col width="20" tabletWidth="20" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                Ringkasan
                                            </Col>
                                            <Col width="20" tabletWidth="20" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                Akurat
                                            </Col>
                                            <Col width="20" tabletWidth="20" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                Berkelanjutan
                                            </Col>
                                            <Col width="20" tabletWidth="20" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                Mutakhir
                                            </Col>
                                            
                                            <Col width="10" tabletWidth="10" style={{fontWeight:'bold', textAlign: 'right'}}>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Block>
                            <Block strong style={{marginTop:'0px'}}>
                            {this.props.dummy_rows.rows.map((result)=>{
                                return (
                                <Row style={{borderBottom:'1px solid #ccc', marginTop:'2px', border:'1px solid #ccc', padding:'8px', borderRadius: '4px'}}>
                                    <Col width="60" tabletWidth="30" className="skeleton-text skeleton-effect-blink">
                                        <b>option.nama</b>
                                    </Col>
                                    <Col width="20" tabletWidth="30" style={{textAlign:'right'}} className="hilangDiDesktop">
                                        <b style={{fontSize:'20px'}} className="skeleton-text skeleton-effect-blink">00.00</b>
                                    </Col>
                                    <Col width="20" tabletWidth="10" style={{textAlign: 'right', paddingLeft: '16px'}} className="hilangDiDesktop">
                                        
                                        <MenuItem style={{marginLeft: 'auto', marginTop: '-5px', marginBottom: '4px'}} iconF7="menu" dropdown className="MenuDetail skeleton-text skeleton-effect-blink">
                                            <MenuDropdown right style={{zIndex:999999}}>
                                                <MenuDropdownItem className="skeleton-text skeleton-effect-blink">
                                                    <span>Rapor Wilayah option.nama</span>
                                                    <Icon className="margin-left" f7="bookmark" />
                                                </MenuDropdownItem>
                                                <MenuDropdownItem href="#" className="skeleton-text skeleton-effect-blink">
                                                    <span>Rapor Sekolah option.nama</span>
                                                    <Icon className="margin-left" f7="archievebox" />
                                                </MenuDropdownItem>
                                            </MenuDropdown>
                                        </MenuItem>
                                    </Col>
                                    <Col width="100" className="hilangDiDesktop" style={{borderBottom: '1px solid #ccc', paddingBottom: '8px'}}>
                                    </Col>
                                    <Col width="100" tabletWidth="70">
                                        <Row>
                                            <Col width="90" tabletWidth="90" style={{fontSize:'18px', fontWeight:'bold', textAlign: 'right'}} className="hilangDiMobile skeleton-text skeleton-effect-blink">
                                                <div className="hilangDiDesktop">Berkelanjutan</div>
                                                00.00
                                            </Col>
                                            
                                            <Col width="10" tabletWidth="10" style={{textAlign: 'right', paddingLeft:'16px',}} className="hilangDiMobile skeleton-text skeleton-effect-blink">
                                                
                                                <MenuItem style={{marginLeft: 'auto', marginTop: '-5px', marginBottom: '0px'}} iconF7="menu" dropdown className="MenuDetail">
                                                    <MenuDropdown right style={{zIndex:999999}}>
                                                        <MenuDropdownItem>
                                                            <span>Rapor Wilayah option.nama</span>
                                                            <Icon className="margin-left" f7="bookmark" />
                                                        </MenuDropdownItem>
                                                        <MenuDropdownItem href="#">
                                                            <span>Rapor Sekolah option.nama</span>
                                                            <Icon className="margin-left" f7="archievebox" />
                                                        </MenuDropdownItem>
                                                    </MenuDropdown>
                                                </MenuItem>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                )
                            })}
                            </Block>
                        </Col>
                    </Row>
                : 
                <Row noGap>
                    
                    {/* <Col width="100" tabletWidth="50">        
                        <Card className="demo-card-header-pic" style={{minHeight: '150px'}}>
                            <CardHeader
                                className="no-border"
                                style={{textAlign: 'center', display: 'block'}}
                            >
                                {(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')} (Mutakhir) {this.props.wilayah.rows[0].nama}
                            </CardHeader>
                            <CardContent
                                style={{textAlign: 'center'}}
                            >
                                <span style={{fontSize:'50px', fontWeight: 'bold'}}>
                                    {this.state.rapor_final}
                                </span>
                            </CardContent>
                        </Card>
                    </Col> */}
                    {/* <Col width="100" tabletWidth="100">        
                        <Card className="demo-card-header-pic" style={{minHeight: '150px'}}>
                            <CardContent>
                                <Row>
                                    <Col width="100" tabletWidth="33" style={{textAlign:'center'}}>
                                        <Row>
                                            <Col width="100">
                                                Akurat
                                            </Col>
                                            <Col width="100">
                                                <b style={{fontSize:'30px'}}>{this.state.rapor_akhir}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col width="100" tabletWidth="33" style={{textAlign:'center'}}>
                                        <Row>
                                            <Col width="100">
                                                Berkelanjutan
                                            </Col>
                                            <Col width="100">
                                                <b style={{fontSize:'30px'}}>{this.state.rapor_berkelanjutan}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col width="100" tabletWidth="33" style={{textAlign:'center'}}>
                                        <Row>
                                            <Col width="100">
                                                Mutakhir
                                            </Col>
                                            <Col width="100">
                                                <b style={{fontSize:'30px'}}>{this.state.rapor_mutakhir}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col width="100" tabletWidth="100">
                                        <Button style={{marginTop:'10px'}} href="/RaporDapodik/Indikator">
                                            <i className="f7-icons" style={{fontSize:'17px'}}>question_circle</i> Indikator Penghitungan {(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')}
                                        </Button>
                                    </Col>
                                </Row>
                            </CardContent>
                        </Card>
                    </Col> */}
                    
                    <Col width="100" tabletWidth="100">
                        <BlockTitle style={{marginTop:'8px'}}>{(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')} per Wilayah</BlockTitle>
                        <Block strong style={{marginBottom:'0px'}} className="hilangDiMobile">
                            <Row>
                                    <Col width="100" tabletWidth="30">
                                        <b>Wilayah</b>
                                    </Col>
                                    <Col width="100" tabletWidth="70">
                                        <Row>
                                            <Col width="20" tabletWidth="20" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                Ringkasan
                                            </Col>
                                            <Col width="20" tabletWidth="20" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                Akurat
                                            </Col>
                                            <Col width="20" tabletWidth="20" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                Berkelanjutan
                                            </Col>
                                            <Col width="20" tabletWidth="20" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                Mutakhir
                                            </Col>
                                            
                                            <Col width="10" tabletWidth="10" style={{fontWeight:'bold', textAlign: 'right'}}>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                        </Block>
                        <Block strong style={{marginTop:'0px'}}>
                        {this.props.rapor_dapodik_wilayah.rows.map((option)=>{

                            let warnaAngka = '#039BE5';

                            if (parseFloat(option.rapor_berkelanjutan) < 90) {
                                if(parseFloat(option.rapor_berkelanjutan) < 70){
                                    if(parseFloat(option.rapor_berkelanjutan) < 50){
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
                                <Row key={option.kode_wilayah} style={{borderBottom:'1px solid #ccc', marginTop:'2px', border:'1px solid #ccc', padding:'8px', borderRadius: '4px'}}>
                                    <Col width="60" tabletWidth="30">
                                        {/* <a href={"/"+(parseInt(option.id_level_wilayah) === 1 ? "RaporDapodikRingkasan" : "RaporDapodikRingkasan")+"/" + option.kode_wilayah.trim()} onClick={()=>this.dataRaporWilayah(option.kode_wilayah.trim())}><b>{option.nama}</b></a> */}
                                        <b>{option.nama}</b>
                                        <br/><span style={{fontSize:'8px', color:'#111111', fontStyle:'italic'}}>Per {option.tanggal_rekap_terakhir}</span>
                                    </Col>
                                    <Col width="20" tabletWidth="30" style={{textAlign:'right'}} className="hilangDiDesktop">
                                        <b style={{fontSize:'20px', color:warnaAngka}}>{parseFloat(option.rapor_akhir).toFixed(2)}</b>
                                    </Col>
                                    <Col width="20" tabletWidth="10" style={{textAlign: 'right', paddingLeft: '16px'}} className="hilangDiDesktop">
                                        
                                        <MenuItem style={{marginLeft: 'auto', marginTop: '-5px', marginBottom: '4px'}} iconF7="menu" dropdown className="MenuDetail">
                                            <MenuDropdown right style={{zIndex:999999}}>
                                                <MenuDropdownItem href={"/"+(parseInt(option.id_level_wilayah) === 1 ? "RaporDapodikRingkasan" : "RaporDapodikRingkasan")+"/" + option.kode_wilayah.trim()} onClick={()=>this.dataRaporWilayah(option.kode_wilayah.trim())}>
                                                    <span>Rapor Wilayah {option.nama}</span>
                                                    <Icon className="margin-left" f7="bookmark" />
                                                </MenuDropdownItem>
                                                <MenuDropdownItem href={"/RaporDapodikSekolah/"+(parseInt(option.id_level_wilayah))+"/"+option.kode_wilayah.trim()}>
                                                    <span>Rapor Sekolah {option.nama}</span>
                                                    <Icon className="margin-left" f7="building_2_fill" />
                                                </MenuDropdownItem>
                                            </MenuDropdown>
                                        </MenuItem>
                                    </Col>
                                    <Col width="100" className="hilangDiDesktop" style={{borderBottom: '1px solid #ccc', paddingBottom: '8px'}}>
                                    </Col>
                                    <Col width="100" tabletWidth="70">
                                        <Row>
                                            <Col width="20" tabletWidth="20" style={{fontSize:'18px', fontWeight:'bold', textAlign: 'right', color:warnaAngka}} className="hilangDiMobile">
                                                <div className="hilangDiDesktop">Ringkasan</div>
                                                {parseFloat(option.rapor_final).toFixed(2)}
                                            </Col>
                                            <Col width="20" tabletWidth="20" style={{fontSize:'18px', fontWeight:'bold', textAlign: 'right', color:warnaAngka}} className="hilangDiMobile">
                                                <div className="hilangDiDesktop">Akurat</div>
                                                {parseFloat(option.rapor_akhir).toFixed(2)}
                                            </Col>
                                            <Col width="20" tabletWidth="20" style={{fontSize:'18px', fontWeight:'bold', textAlign: 'right', color:warnaAngka}} className="hilangDiMobile">
                                                <div className="hilangDiDesktop">Berkelanjutan</div>
                                                {parseFloat(option.rapor_berkelanjutan).toFixed(2)}
                                            </Col>
                                            <Col width="20" tabletWidth="20" style={{fontSize:'18px', fontWeight:'bold', textAlign: 'right', color:warnaAngka}} className="hilangDiMobile">
                                                <div className="hilangDiDesktop">Mutakhir</div>
                                                {parseFloat(option.rapor_mutakhir).toFixed(2)}
                                            </Col>
                                            
                                            <Col width="10" tabletWidth="10" style={{textAlign: 'right', paddingLeft:'16px',}} className="hilangDiMobile">
                                                
                                                <MenuItem style={{marginLeft: 'auto', marginTop: '-5px', marginBottom: '0px'}} iconF7="menu" dropdown className="MenuDetail">
                                                    <MenuDropdown right style={{zIndex:999999}}>
                                                        {parseInt(option.id_level_wilayah) !== 3 &&
                                                        <MenuDropdownItem href={"/"+(parseInt(option.id_level_wilayah) === 1 ? "RaporDapodikRingkasan" : "RaporDapodikRingkasan")+"/"+parseInt(option.id_level_wilayah)+"/" + option.kode_wilayah.trim()} onClick={()=>this.dataRaporWilayah(option.kode_wilayah.trim())}>
                                                            <span>Rapor Wilayah {option.nama}</span>
                                                            <Icon className="margin-left" f7="bookmark" />
                                                        </MenuDropdownItem>
                                                        }
                                                        <MenuDropdownItem href={"/RaporDapodikSekolah/"+(parseInt(option.id_level_wilayah))+"/"+option.kode_wilayah.trim()}>
                                                            <span>Rapor Sekolah {option.nama}</span>
                                                            <Icon className="margin-left" f7="building_2_fill" />
                                                        </MenuDropdownItem>
                                                    </MenuDropdown>
                                                </MenuItem>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                   
                            )
                        })}
                        </Block>
                    </Col>
                </Row>
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
      getRaporDapodikWilayah: Actions.getRaporDapodikWilayah,
      setRaporDapodikWilayah: Actions.setRaporDapodikWilayah,
      getWilayah: Actions.getWilayah,
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
        wilayah: App.wilayah,
        dummy_rows: App.dummy_rows
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(RaporDapodikRingkasan));
  