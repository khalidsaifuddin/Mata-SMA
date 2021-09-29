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

class RaporSNP extends Component {
    state = {
        error: null,
        loading: true,
        routeParams: {
            sekolah_id: '',
            semester_id: localStorage.getItem('semester_id_aplikasi'),
            mst_kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi'),
            id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi')
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

    formatAngka = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    dataRaporWilayah = (kode_wilayah) => {
        
    }

    loadData = (kode_wilayah, id_level_wilayah) => {

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
                        kode_wilayah: kode_wilayah ? kode_wilayah : '000000',
                        id_level_wilayah: id_level_wilayah ? id_level_wilayah: '0',
                        semester_id: localStorage.getItem('semester_id_aplikasi'),
                        bentuk_pendidikan_id: localStorage.getItem('jenjang_aplikasi')
                    }
                },()=>{
                    
                    this.props.getRaporSNP(this.state.routeParams).then((result)=>{

                        let rapor_snp = 0;
                        let standar_1 = 0;
                        let standar_2 = 0;
                        let standar_3 = 0;
                        let standar_4 = 0;
                        let standar_5 = 0;
                        let standar_6 = 0;
                        let standar_7 = 0;
                        let standar_8 = 0;

                        this.props.rapor_snp.rows.map((option)=>{
                            // console.log(parseFloat(option.rapor_snp).toFixed(2));
                            rapor_snp = rapor_snp+parseFloat(option.rapor_snp);
                            standar_1 = standar_1+parseFloat(option.standar_1);
                            standar_2 = standar_2+parseFloat(option.standar_2);
                            standar_3 = standar_3+parseFloat(option.standar_3);
                            standar_4 = standar_4+parseFloat(option.standar_4);
                            standar_5 = standar_5+parseFloat(option.standar_5);
                            standar_6 = standar_6+parseFloat(option.standar_6);
                            standar_7 = standar_7+parseFloat(option.standar_7);
                            standar_8 = standar_8+parseFloat(option.standar_8);
                        });

                        // console.log(rapor_snp);

                        this.setState({
                            loading:false,
                            rapor_snp: (rapor_snp/this.props.rapor_snp.total).toFixed(2),
                            standar_1: (standar_1/this.props.rapor_snp.total).toFixed(2),
                            standar_2: (standar_2/this.props.rapor_snp.total).toFixed(2),
                            standar_3: (standar_3/this.props.rapor_snp.total).toFixed(2),
                            standar_4: (standar_4/this.props.rapor_snp.total).toFixed(2),
                            standar_5: (standar_5/this.props.rapor_snp.total).toFixed(2),
                            standar_6: (standar_6/this.props.rapor_snp.total).toFixed(2),
                            standar_7: (standar_7/this.props.rapor_snp.total).toFixed(2),
                            standar_8: (standar_8/this.props.rapor_snp.total).toFixed(2)
                        },()=>{
                            console.log(this.state);
                        });

                        console.log(this.props.rapor_snp);
                    })
        
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

            this.loadData(this.$f7route.params['kode_wilayah'], this.$f7route.params['id_level_wilayah']);

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
            <Page name="RaporSNP" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Rapor SNP</NavTitle>
                    <NavTitleLarge>
                        Rapor SNP
                    </NavTitleLarge>
                    <Subnavbar>
                        <Segmented raised>
                            <Button tabLink="#tab1" tabLinkActive>Per Wilayah</Button>
                            <Button tabLink="#tab2" href={"/RaporSNPSekolah/"+(this.$f7route.params['id_level_wilayah'] ? this.$f7route.params['id_level_wilayah'] : localStorage.getItem('id_level_wilayah_aplikasi'))+"/"+(this.$f7route.params['kode_wilayah'] ? this.$f7route.params['kode_wilayah'] : localStorage.getItem('kode_wilayah_aplikasi'))}>Per Sekolah</Button>
                        </Segmented>
                    </Subnavbar>
                    <NavRight>
                        <Link panelOpen="right" onClick={this.bukaPengaturan} iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu">&nbsp;Menu</Link>
                    </NavRight>
                </Navbar>
                
                <SelectSemester/>
                <Row noGap>
                    <Col width="100" tabletWidth="50">
                        <Card className="demo-card-header-pic" style={{minHeight: '220px', backgroundImage: (localStorage.getItem('tema_warna_aplikasi') === 'biru-1' ? 'linear-gradient(to top, #4481eb 0%, #04befe 100%)' : 'linear-gradient(to top, #f83600 0%, #FAAE1F 100%)')}}>
                            <CardHeader
                                className="no-border"
                                style={{textAlign: 'center', display: 'block', color:'white'}}
                            >
                                Rapor SNP {this.props.wilayah.rows[0].nama}
                            </CardHeader>
                            <CardContent
                                style={{textAlign: 'center'}}
                            >
                                <span style={{fontSize:'70px', fontWeight: 'bold', color:'white'}}>
                                    {this.state.rapor_snp}
                                </span>
                                <br/>
                                <i style={{color:'white', fontSize:'10px'}}>* Nilai rapor SNP menggunakan skala 1-7</i>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="100" tabletWidth="50">
                        <Card className="demo-card-header-pic" style={{minHeight: '220px', backgroundImage: (localStorage.getItem('tema_warna_aplikasi') === 'biru-1' ? 'linear-gradient(to top, #4481eb 0%, #04befe 100%)' : 'linear-gradient(to top, #f83600 0%, #FAAE1F 100%)')}}>
                            <CardHeader
                                className="no-border"
                                style={{textAlign: 'center', display: 'block', color:'white'}}
                            >
                                Rapor SNP {this.props.wilayah.rows[0].nama}
                            </CardHeader>
                            <CardContent>
                                <Row>
                                    <Col width="50" style={{padding:'8px'}}>
                                        
                                        <Row style={{borderBottom:'1px solid #ccc', marginBottom:'8px'}}>
                                            <Col tabletWidth="50" width="50" style={{color:'white', textAlign: 'left'}}>
                                                Lulusan    
                                            </Col>
                                            <Col tabletWidth="50" width="50" style={{color:'white', textAlign: 'right'}}>
                                                {this.state.standar_1}
                                            </Col>
                                        </Row>
                                        <Row style={{borderBottom:'1px solid #ccc', marginBottom:'8px'}}>
                                            <Col tabletWidth="50" width="50" style={{color:'white', textAlign: 'left'}}>
                                                Isi    
                                            </Col>
                                            <Col tabletWidth="50" width="50" style={{color:'white', textAlign: 'right'}}>
                                                {this.state.standar_2}
                                            </Col>
                                        </Row>
                                        <Row style={{borderBottom:'1px solid #ccc', marginBottom:'8px'}}>
                                            <Col tabletWidth="50" width="50" style={{color:'white', textAlign: 'left'}}>
                                                Proses    
                                            </Col>
                                            <Col tabletWidth="50" width="50" style={{color:'white', textAlign: 'right'}}>
                                                {this.state.standar_3}
                                            </Col>
                                        </Row>
                                        <Row style={{borderBottom:'1px solid #ccc', marginBottom:'8px'}}>
                                            <Col tabletWidth="50" width="50" style={{color:'white', textAlign: 'left'}}>
                                                Penilaian    
                                            </Col>
                                            <Col tabletWidth="50" width="50" style={{color:'white', textAlign: 'right'}}>
                                                {this.state.standar_4}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col width="50" style={{padding:'8px'}}>

                                        <Row style={{borderBottom:'1px solid #ccc', marginBottom:'8px'}}>
                                            <Col tabletWidth="50" width="50" style={{color:'white', textAlign: 'left'}}>
                                                PTK    
                                            </Col>
                                            <Col tabletWidth="50" width="50" style={{color:'white', textAlign: 'right'}}>
                                                {this.state.standar_5}
                                            </Col>
                                        </Row>
                                        <Row style={{borderBottom:'1px solid #ccc', marginBottom:'8px'}}>
                                            <Col tabletWidth="50" width="50" style={{color:'white', textAlign: 'left'}}>
                                                Sarpras
                                            </Col>
                                            <Col tabletWidth="50" width="50" style={{color:'white', textAlign: 'right'}}>
                                                {this.state.standar_6}
                                            </Col>
                                        </Row>
                                        <Row style={{borderBottom:'1px solid #ccc', marginBottom:'8px'}}>
                                            <Col tabletWidth="50" width="50" style={{color:'white', textAlign: 'left'}}>
                                                Pengelolaan    
                                            </Col>
                                            <Col tabletWidth="50" width="50" style={{color:'white', textAlign: 'right'}}>
                                                {this.state.standar_7}
                                            </Col>
                                        </Row>
                                        <Row style={{borderBottom:'1px solid #ccc', marginBottom:'8px'}}>
                                            <Col tabletWidth="50" width="50" style={{color:'white', textAlign: 'left'}}>
                                                Pembiayaan
                                            </Col>
                                            <Col tabletWidth="50" width="50" style={{color:'white', textAlign: 'right'}}>
                                                {this.state.standar_8}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
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
                                    <th className="label-cell" rowSpan="2" style={{textAlign:'center', color:'#434343', fontSize:'15px'}}>Rapor SNP</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}} colSpan="8">Rapor Per Standar</th>
                                </tr>
                                <tr>
                                    <th className="numeric-cell">Kompetensi<br/>Lulusan</th>
                                    <th className="numeric-cell">Isi</th>
                                    <th className="numeric-cell">Proses</th>
                                    <th className="numeric-cell">Penilaian<br/>Pendidikan</th>
                                    <th className="numeric-cell">PTK</th>
                                    <th className="numeric-cell">Sarpras</th>
                                    <th className="numeric-cell">Pengelolaan</th>
                                    <th className="numeric-cell">Pembiayaan</th>
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
                                            <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                            <th className="numeric-cell skeleton-text skeleton-effect-blink">SNP 1</th>
                                            <th className="numeric-cell skeleton-text skeleton-effect-blink">SNP 2</th>
                                            <th className="numeric-cell skeleton-text skeleton-effect-blink">SNP 3</th>
                                            <th className="numeric-cell skeleton-text skeleton-effect-blink">SNP 4</th>
                                            <th className="numeric-cell skeleton-text skeleton-effect-blink">SNP 5</th>
                                            <th className="numeric-cell skeleton-text skeleton-effect-blink">SNP 6</th>
                                            <th className="numeric-cell skeleton-text skeleton-effect-blink">SNP 7</th>
                                            <th className="numeric-cell skeleton-text skeleton-effect-blink">SNP 8</th>
                                        </tr>
                                    )
                                })}
                            </>
                            :
                            <>
                            {this.props.rapor_snp.rows.map((option)=>{
                                return(
                                    <tr key={option.kode_wilayah}>
                                        <td className="label-cell">
                                            <MenuItem style={{marginLeft: 'auto', marginTop: '4px', marginBottom: '4px'}} iconF7="menu" dropdown className="MenuDetail">
                                                <MenuDropdown left style={{zIndex:999999}}>
                                                    <MenuDropdownItem href={"/RaporSNP/"+option.id_level_wilayah+"/"+option.kode_wilayah}>
                                                        <span>Rapor SNP Wilayah {option.nama}</span>
                                                        <Icon className="margin-left" f7="bookmark" />
                                                    </MenuDropdownItem>
                                                    {/* <MenuDropdownItem href={"/Sekolah/RingkasanSp/"+(parseInt(option.id_level_wilayah))+"/"+option.kode_wilayah.trim()}>
                                                        <span>Rekap Sekolah {option.nama}</span>
                                                        <Icon className="margin-left" f7="bookmark" />
                                                    </MenuDropdownItem> */}
                                                </MenuDropdown>
                                            </MenuItem>
                                        </td>
                                        <td className="label-cell">
                                            {option.nama}<br/>
                                            {parseInt(option.id_level_wilayah) === 1 && <span></span>}
                                            {parseInt(option.id_level_wilayah) === 2 && <span style={{fontSize:'11px', color:'#434343'}}>{option.induk_propinsi}</span>}
                                            {parseInt(option.id_level_wilayah) === 3 && <span style={{fontSize:'11px', color:'#434343'}}>{option.induk_kabupaten}</span>}
                                        </td>
                                        <td className="numeric-cell">{this.formatAngka(parseFloat(option.rapor_snp).toFixed(2))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseFloat(option.standar_1).toFixed(2))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseFloat(option.standar_2).toFixed(2))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseFloat(option.standar_3).toFixed(2))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseFloat(option.standar_4).toFixed(2))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseFloat(option.standar_5).toFixed(2))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseFloat(option.standar_6).toFixed(2))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseFloat(option.standar_7).toFixed(2))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseFloat(option.standar_8).toFixed(2))}</td>
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
      getRaporDapodikWilayah: Actions.getRaporDapodikWilayah,
      setRaporDapodikWilayah: Actions.setRaporDapodikWilayah,
      getWilayah: Actions.getWilayah,
      setJudulKanan: Actions.setJudulKanan,
      setIsiKanan: Actions.setIsiKanan,
      getRaporSNP: Actions.getRaporSNP
    }, dispatch);
}

function mapStateToProps({ App, PesertaDidik, Gtk, RaporDapodik, RaporSNP }) {

    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        sekolah: App.sekolah,
        rekap_sekolah: App.rekap_sekolah,
        sekolah_individu: App.sekolah_individu,
        rapor_dapodik_wilayah: RaporDapodik.rapor_dapodik_wilayah,
        wilayah: App.wilayah,
        dummy_rows: App.dummy_rows,
        rapor_snp: RaporSNP.rapor_snp
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(RaporSNP));
  