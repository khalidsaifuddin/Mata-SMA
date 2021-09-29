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

class RaporDapodikBerkelanjutan extends Component {
    state = {
        error: null,
        loading: true,
        routeParams: {
            sekolah_id: '',
            semester_id: localStorage.getItem('semester_id_aplikasi'),
            mst_kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi'),
            id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi'),
            order_by: 'rapor_berkelanjutan'
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
        // this.props.setLoading(true);

        console.log(this.$f7route.url.split("/")[1]);

        // switch (this.$f7route.url.split("/")[1]) {
        //     case 'RaporDapodikBerkelanjutan':
        //         this.loadData('000000');
        //         this.$f7router.navigate('/RaporDapodik');
        //         return true;
        //         break;
        //     case 'RaporDapodikBerkelanjutan':
        //         console.log(this.$f7route.url);
        //         this.loadData(this.$f7route.url.split("/")[2].substring(0,2)+'0000');
        //         this.$f7router.navigate('/RaporDapodikBerkelanjutan/'+this.$f7route.url.split("/")[2].substring(0,2)+'0000');
        //         return true;
        //         break;
        //     default:
        //         break;
        // }

        // let properti = 'beranda';
        // // alert('tes');
        // // console.log(this.props.f7router.url.replace("/","").replace("/",""));
        // // console.log(this.props.tabBar);
        // for (var property in this.props.tabBar) {
        //     // console.log(this.state.tabBar[property]);
        //     this.props.tabBar[property] = false;
        // }
        // if(this.props.f7router.url.replace("/","").replace("/","") !== ""){
        //     console.log(this.props.f7router.url.replace("/","").replace("/",""));
        //     properti = this.props.f7router.url.replace("/","").replace("/","");
        // }
        // this.props.tabBar[properti] = true;

        // this.props.setTabActive(this.props.tabBar);

        // console.log(this.props.f7router);

        // this.props.f7router.refreshPage();

        // console.log(this.state.wilayah);
    }

    dataRaporWilayah = (kode_wilayah) => {
        // this.props.setLoading(true);
        // console.log(kode_wilayah);
        // this.state.routeParams = {
        //     kode_wilayah: kode_wilayah
        // };

        // this.props.getWilayah(this.state.routeParams).then((result)=>{
        //     this.setState({
        //         ...this.state,
        //         nama_wilayah: this.props.wilayah.rows[0].nama
        //     },()=>{
        //         this.loadData(kode_wilayah);
        //     });

        // });
    }

    loadData = (kode_wilayah) => {

        // if(this.$f7route.params['kode_wilayah'].trim()){
        //     this.state.routeParams = {
        //         semester_id: localStorage.getItem('semester_id_aplikasi'),
        //         mst_kode_wilayah: this.$f7route.params['kode_wilayah']
        //     };
        // }
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
                        order_by: 'rapor_berkelanjutan'
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
            
                    // if(localStorage.getItem('rapor_dapodik_wilayah') !== null && localStorage.getItem('rapor_dapodik_wilayah') !== ''){
                    // // if(localStorage.getItem('rapor_dapodik_wilayah:'+this.state.routeParams.mst_kode_wilayah) !== null && localStorage.getItem('rapor_dapodik_wilayah:'+this.state.routeParams.mst_kode_wilayah) !== ''){
                    //     // this.props.getRaporDapodikWilayah(this.state.routeParams);
                    //     // console.log(JSON.parse(localStorage.getItem('rapor_dapodik_wilayah')));
                    //     // this.props.setRaporDapodikWilayah();
            
                    //     for (let index = 0; index < JSON.parse(localStorage.getItem('rapor_dapodik_wilayah')).total; index++) {
                    //         const element = JSON.parse(localStorage.getItem('rapor_dapodik_wilayah')).rows[index];
            
                    //         // console.log(element);
                    //         rapor_akhir = rapor_akhir+parseFloat(element.rapor_akhir);
                    //         rapor_sekolah = rapor_sekolah+parseFloat(element.rapor_sekolah);
                    //         rapor_pd = rapor_pd+parseFloat(element.rapor_pd);
                    //         rapor_ptk = rapor_ptk+parseFloat(element.rapor_ptk);
                    //         rapor_rombel = rapor_rombel+parseFloat(element.rapor_rombel);
                    //         rapor_sarpras = rapor_sarpras+parseFloat(element.rapor_sarpras);
                    //         jumlah_total++;
                            
                    //     }
            
                    //     this.setState({
                    //         ...this.state,
                    //         rapor_akhir: (rapor_akhir/jumlah_total).toFixed(2),
                    //         rapor_sekolah: (rapor_sekolah/jumlah_total).toFixed(2),
                    //         rapor_pd: (rapor_pd/jumlah_total).toFixed(2),
                    //         rapor_ptk: (rapor_ptk/jumlah_total).toFixed(2),
                    //         rapor_rombel: (rapor_rombel/jumlah_total).toFixed(2),
                    //         rapor_sarpras: (rapor_sarpras/jumlah_total).toFixed(2),
                    //         rapor_dapodik_wilayah: JSON.parse(localStorage.getItem('rapor_dapodik_wilayah'))
                    //     }, ()=>{
            
                    //         this.props.getRaporDapodikWilayah(this.state.routeParams).then((result)=>{
                    //             // console.log(this.props.rapor_dapodik_wilayah);
                    //             for (let index = 0; index < this.props.rapor_dapodik_wilayah.total; index++) {
                    //                 const element = this.props.rapor_dapodik_wilayah.rows[index];
                    
                    //                 // console.log(element);
                    //                 rapor_akhir = rapor_akhir+parseFloat(element.rapor_akhir);
                    //                 rapor_sekolah = rapor_sekolah+parseFloat(element.rapor_sekolah);
                    //                 rapor_pd = rapor_pd+parseFloat(element.rapor_pd);
                    //                 rapor_ptk = rapor_ptk+parseFloat(element.rapor_ptk);
                    //                 rapor_rombel = rapor_rombel+parseFloat(element.rapor_rombel);
                    //                 rapor_sarpras = rapor_sarpras+parseFloat(element.rapor_sarpras);
                    //                 jumlah_total++;
                                    
                    //             }
                
                    //             this.setState({
                    //                 ...this.state,
                    //                 loading: false,
                    //                 rapor_akhir: (rapor_akhir/jumlah_total).toFixed(2),
                    //                 rapor_sekolah: (rapor_sekolah/jumlah_total).toFixed(2),
                    //                 rapor_pd: (rapor_pd/jumlah_total).toFixed(2),
                    //                 rapor_ptk: (rapor_ptk/jumlah_total).toFixed(2),
                    //                 rapor_rombel: (rapor_rombel/jumlah_total).toFixed(2),
                    //                 rapor_sarpras: (rapor_sarpras/jumlah_total).toFixed(2),
                    //                 rapor_dapodik_wilayah: this.props.rapor_dapodik_wilayah
                    //             });

                    //             this.props.setLoading(false);
                    //         });
                    //     });
            
                    //     // console.log((rapor_akhir));
                    //     // console.log((rapor_akhir/jumlah_total));
            
            
                    // }else{
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
                    // }
        
                });

            });
        })


    }

    componentDidMount = () => {
        // window.open('http://google.com');   
        // console.log('nggak ke sini seharusnya');
        console.log(this.$f7route.url);
        localStorage.setItem('current_url', this.$f7route.url);

        if(this.$f7route.params['kode_wilayah']){
            this.state.routeParams = {
                // ...this.state.routeParams,
                kode_wilayah: this.$f7route.params['kode_wilayah']
            };

            this.loadData(this.$f7route.params['kode_wilayah']);

            // this.props.getWilayah(this.state.routeParams).then((result)=>{
            //     // console.log(this.props.wilayah.rows[0].nama);
            //     this.setState({
            //         ...this.state,
            //         nama_wilayah: this.props.wilayah.rows[0].nama
            //     },()=>{
            //         this.loadData(this.$f7route.params['kode_wilayah']);
            //     });

            // });
            // console.log(this.state.routeParams);
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
                // console.log(this.props.rapor_dapodik_wilayah);
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
    }

    cariKeyword = (event)  => {
        this.setState({
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                keyword: event.target[0].value
            }
        },()=>{
            // alert(this.state.routeParams.keyword);
            // this.loadData(this.$f7route.params['kode_wilayah']);
            this.props.getRaporDapodikWilayah(this.state.routeParams).then((result)=>{
                // console.log(this.props.rapor_dapodik_wilayah);
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
                },()=>{
                    console.log(this.state.rapor_berkelanjutan);
                });

                this.props.setLoading(false);
            });
        })
    }

    bukaPengaturan = () => {
        // alert('oke');
        this.props.setJudulKanan('Menu Rapor');

        this.props.setIsiKanan((
            <>
            <List>
                {/* <ListItem> */}
                    <Searchbar
                        className="searchbar-demo"
                        // expandable
                        placeholder="Nama Wilayah"
                        searchContainer=".search-list"
                        searchIn=".item-title"
                        onSubmit={this.cariKeyword}
                    ></Searchbar>
                {/* </ListItem> */}
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
                        <Button tabLink="#tab0" href={"/RaporDapodikBerkelanjutan/"+(this.$f7route.params['id_level_wilayah'] ? this.$f7route.params['id_level_wilayah'] : localStorage.getItem('id_level_wilayah_aplikasi'))+"/"+(this.$f7route.params['kode_wilayah'] ? this.$f7route.params['kode_wilayah'] : localStorage.getItem('kode_wilayah_aplikasi'))}>Ringkasan</Button>
                        <Button tabLink="#tab1" href={"/RaporDapodikWilayah"+"/"+(this.$f7route.params['kode_wilayah'] ? this.$f7route.params['kode_wilayah'] : localStorage.getItem('kode_wilayah_aplikasi'))}>Akurat</Button>
                        <Button tabLink="#tab2" tabLinkActive>Berkelanjutan</Button>
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
                        <Col width="100" tabletWidth="100">
                            <i style={{fontSize:'10px', color:'white'}}>* Nilai Rapor berdasarkan skala 1-100</i>
                        </Col>
                        {/* <br/>
                        <span style={{fontSize:'10px', color:'white', fontStyle: 'italic'}}>
                            Per {this.state.tanggal_rekap_terakhir}
                        </span> */}
                    </CardContent>
                </Card>
                
                {/* <BlockTitle>Sub Rapor Dapodik</BlockTitle> */}
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
                        {/* <Col width="100" tabletWidth="50">        
                            <Card className="demo-card-header-pic" style={{minHeight: '150px'}}>
                                <CardContent>
                                    <Row>
                                        <Col width="50" tabletWidth="50">
                                            <Row>
                                                <Col width="60" className="skeleton-text skeleton-effect-blink">
                                                    Sekolah:
                                                </Col>
                                                <Col width="40" className="skeleton-text skeleton-effect-blink">
                                                    <b>00.00</b>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col width="50" tabletWidth="50">
                                            <Row>
                                                <Col width="60" className="skeleton-text skeleton-effect-blink">
                                                    Peserta Didik:
                                                </Col>
                                                <Col width="40" className="skeleton-text skeleton-effect-blink">
                                                    <b>00.00</b>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col width="50" tabletWidth="50">
                                            <Row>
                                                <Col width="60" className="skeleton-text skeleton-effect-blink">
                                                    PTK:
                                                </Col>
                                                <Col width="40" className="skeleton-text skeleton-effect-blink">
                                                    <b>00.00</b>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col width="50" tabletWidth="50">
                                            <Row>
                                                <Col width="60" className="skeleton-text skeleton-effect-blink">
                                                    Rombel:
                                                </Col>
                                                <Col width="40" className="skeleton-text skeleton-effect-blink">
                                                    <b>00.00</b>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col width="50" tabletWidth="50">
                                            <Row>
                                                <Col width="60" className="skeleton-text skeleton-effect-blink">
                                                    Sarpras:
                                                </Col>
                                                <Col width="40" className="skeleton-text skeleton-effect-blink">
                                                    <b>00.00</b>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col width="100" tabletWidth="100" className="skeleton-text skeleton-effect-blink">
                                            <Button raised>Indikator Penghitungan Rapor Dapodik</Button>
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
                                            <Col width="90" tabletWidth="90" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                Rapor Berkelanjutan
                                            </Col>
                                            {/* <Col width="15" tabletWidth="15" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                Identitas
                                            </Col>
                                            <Col width="15" tabletWidth="15" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                PD
                                            </Col>
                                            <Col width="15" tabletWidth="15" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                PTK
                                            </Col>
                                            <Col width="15" tabletWidth="15" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                Rombel
                                            </Col>
                                            <Col width="15" tabletWidth="15" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                Sarpras
                                            </Col> */}
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
                                        {/* <Button style={{marginTop:'-5px'}}>
                                            <Icon ios="f7:more"></Icon>
                                        </Button> */}
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
                                            {/* <Col width="15" tabletWidth="15" style={{textAlign: 'right'}} className="skeleton-text skeleton-effect-blink">
                                                <div className="hilangDiDesktop">Identitas</div>
                                                00.00
                                            </Col>
                                            <Col width="15" tabletWidth="15" style={{textAlign: 'right'}} className="skeleton-text skeleton-effect-blink">
                                                <div className="hilangDiDesktop">PD</div>
                                                00.00
                                            </Col>
                                            <Col width="15" tabletWidth="15" style={{textAlign: 'right'}} className="skeleton-text skeleton-effect-blink">
                                                <div className="hilangDiDesktop">PTK</div>
                                                00.00
                                            </Col>
                                            <Col width="15" tabletWidth="15" style={{textAlign: 'right'}} className="skeleton-text skeleton-effect-blink">
                                                <div className="hilangDiDesktop">Rombel</div>
                                                00.00
                                            </Col>
                                            <Col width="15" tabletWidth="15" style={{textAlign: 'right'}} className="skeleton-text skeleton-effect-blink">
                                                <div className="hilangDiDesktop">Sarpras</div>
                                                00.00
                                            </Col> */}
                                            <Col width="10" tabletWidth="10" style={{textAlign: 'right', paddingLeft:'16px',}} className="hilangDiMobile skeleton-text skeleton-effect-blink">
                                                {/* <Button style={{marginTop:'-5px'}}>
                                                    <Icon ios="f7:more"></Icon>
                                                </Button> */}
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
                    <Col width="100" tabletWidth="100">        
                        <Card className="demo-card-header-pic" style={{minHeight: '150px'}}>
                            <CardHeader
                                className="no-border"
                                style={{textAlign: 'center', display: 'block'}}
                            >
                                {(localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Rapor Dapodik' : 'Rapor Kualitas Data')} (Berkelanjutan) {this.props.wilayah.rows[0].nama}
                            </CardHeader>
                            <CardContent
                                style={{textAlign: 'center'}}
                            >
                                <span style={{fontSize:'50px', fontWeight: 'bold'}}>
                                    {this.state.rapor_berkelanjutan}
                                </span>
                            </CardContent>
                        </Card>
                    </Col>
                    {/* <Col width="100" tabletWidth="50">        
                        <Card className="demo-card-header-pic" style={{minHeight: '150px'}}>
                            <CardContent>
                                <Row>
                                    <Col width="50" tabletWidth="50">
                                        <Row>
                                            <Col width="60">
                                                Sekolah:
                                            </Col>
                                            <Col width="40">
                                                <b>{this.state.rapor_sekolah}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col width="50" tabletWidth="50">
                                        <Row>
                                            <Col width="60">
                                                Peserta Didik:
                                            </Col>
                                            <Col width="40">
                                                <b>{this.state.rapor_pd}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col width="50" tabletWidth="50">
                                        <Row>
                                            <Col width="60">
                                                PTK:
                                            </Col>
                                            <Col width="40">
                                                <b>{this.state.rapor_ptk}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col width="50" tabletWidth="50">
                                        <Row>
                                            <Col width="60">
                                                Rombel:
                                            </Col>
                                            <Col width="40">
                                                <b>{this.state.rapor_rombel}</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col width="50" tabletWidth="50">
                                        <Row>
                                            <Col width="60">
                                                Sarpras:
                                            </Col>
                                            <Col width="40">
                                                <b>{this.state.rapor_sarpras}</b>
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
                                            <Col width="90" tabletWidth="90" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                Rapor Berkelanjutan
                                            </Col>
                                            {/* <Col width="15" tabletWidth="15" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                Identitas
                                            </Col>
                                            <Col width="15" tabletWidth="15" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                PD
                                            </Col>
                                            <Col width="15" tabletWidth="15" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                PTK
                                            </Col>
                                            <Col width="15" tabletWidth="15" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                Rombel
                                            </Col>
                                            <Col width="15" tabletWidth="15" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                Sarpras
                                            </Col> */}
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
                                        <a href={"/"+(parseInt(option.id_level_wilayah) === 1 ? "RaporDapodikBerkelanjutan" : "RaporDapodikBerkelanjutan")+"/" + option.kode_wilayah.trim()} onClick={()=>this.dataRaporWilayah(option.kode_wilayah.trim())}><b>{option.nama}</b></a>
                                        <br/><span style={{fontSize:'8px', color:'#111111', fontStyle:'italic'}}>Per {option.tanggal_rekap_terakhir}</span>
                                    </Col>
                                    <Col width="20" tabletWidth="30" style={{textAlign:'right'}} className="hilangDiDesktop">
                                        <b style={{fontSize:'20px', color:warnaAngka}}>{parseFloat(option.rapor_akhir).toFixed(2)}</b>
                                    </Col>
                                    <Col width="20" tabletWidth="10" style={{textAlign: 'right', paddingLeft: '16px'}} className="hilangDiDesktop">
                                        {/* <Button style={{marginTop:'-5px'}}>
                                            <Icon ios="f7:more"></Icon>
                                        </Button> */}
                                        <MenuItem style={{marginLeft: 'auto', marginTop: '-5px', marginBottom: '4px'}} iconF7="menu" dropdown className="MenuDetail">
                                            <MenuDropdown right style={{zIndex:999999}}>
                                                <MenuDropdownItem href={"/"+(parseInt(option.id_level_wilayah) === 1 ? "RaporDapodikBerkelanjutan" : "RaporDapodikBerkelanjutan")+"/" + option.kode_wilayah.trim()} onClick={()=>this.dataRaporWilayah(option.kode_wilayah.trim())}>
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
                                            <Col width="90" tabletWidth="90" style={{fontSize:'18px', fontWeight:'bold', textAlign: 'right', color:warnaAngka}} className="hilangDiMobile">
                                                <div className="hilangDiDesktop">Rapor Berkelanjutan</div>
                                                {parseFloat(option.rapor_berkelanjutan).toFixed(2)}
                                            </Col>
                                            {/* <Col width="15" tabletWidth="15" style={{textAlign: 'right'}}>
                                                <div className="hilangDiDesktop">Identitas</div>
                                                {parseFloat(option.rapor_sekolah).toFixed(2)}
                                            </Col>
                                            <Col width="15" tabletWidth="15" style={{textAlign: 'right'}}>
                                                <div className="hilangDiDesktop">PD</div>
                                                {parseFloat(option.rapor_pd).toFixed(2)}
                                            </Col>
                                            <Col width="15" tabletWidth="15" style={{textAlign: 'right'}}>
                                                <div className="hilangDiDesktop">PTK</div>
                                                {parseFloat(option.rapor_ptk).toFixed(2)}
                                            </Col>
                                            <Col width="15" tabletWidth="15" style={{textAlign: 'right'}}>
                                                <div className="hilangDiDesktop">Rombel</div>
                                                {parseFloat(option.rapor_rombel).toFixed(2)}
                                            </Col>
                                            <Col width="15" tabletWidth="15" style={{textAlign: 'right'}}>
                                                <div className="hilangDiDesktop">Sarpras</div>
                                                {parseFloat(option.rapor_sarpras).toFixed(2)}
                                            </Col> */}
                                            <Col width="10" tabletWidth="10" style={{textAlign: 'right', paddingLeft:'16px',}} className="hilangDiMobile">
                                                {/* <Button style={{marginTop:'-5px'}}>
                                                    <Icon ios="f7:more"></Icon>
                                                </Button> */}
                                                <MenuItem style={{marginLeft: 'auto', marginTop: '-5px', marginBottom: '0px'}} iconF7="menu" dropdown className="MenuDetail">
                                                    <MenuDropdown right style={{zIndex:999999}}>
                                                        <MenuDropdownItem href={"/"+(parseInt(option.id_level_wilayah) === 1 ? "RaporDapodikBerkelanjutan" : "RaporDapodikBerkelanjutan")+"/"+parseInt(option.id_level_wilayah)+"/" + option.kode_wilayah.trim()} onClick={()=>this.dataRaporWilayah(option.kode_wilayah.trim())}>
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
                                        </Row>
                                    </Col>
                                </Row>
                                
                                // <ListItem
                                //     title={option.nama}
                                //     after={parseFloat(option.rapor_akhir).toFixed(2)}
                                //     // subtitle={"Sekolah: " + parseFloat(option.rapor_sekolah).toFixed(2) + "% | Peserta Didik: " + parseFloat(option.rapor_pd).toFixed(2) + "% | PTK: " + parseFloat(option.rapor_ptk).toFixed(2) + "% | Rombel: " + parseFloat(option.rapor_rombel).toFixed(2) + "% | Sarpras: " + parseFloat(option.rapor_sarpras).toFixed(2) + "%"}
                                // >
                                //     {/* <span style={{fontSize:'15px'}}>{option.nama}</span>
                                //     <span style={{fontSize:'15px'}}>{parseFloat(option.rapor_akhir).toFixed(2)}%</span>
                                //     <span style={{fontSize:'15px'}}>{parseFloat(option.rapor_pd).toFixed(2)}%</span> */}
                                // </ListItem>    
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

export default (connect(mapStateToProps, mapDispatchToProps)(RaporDapodikBerkelanjutan));
  