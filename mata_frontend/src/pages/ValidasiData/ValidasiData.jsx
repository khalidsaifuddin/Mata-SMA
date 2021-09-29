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
    Popover
} from 'framework7-react';

import { Doughnut, Bar } from 'react-chartjs-2';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import SelectSemester from '../SelectSemester';
import BentukSmartSelect from '../../components/BentukSmartSelect';

import moment from 'moment';

class ValidasiData extends Component {
    state = {
        error: null,
        loading: true,
        routeParams: {
            sekolah_id: '',
            semester_id: localStorage.getItem('semester_id_aplikasi'),
            // mst_kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi'),
            // id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi'),
            kode_wilayah: this.$f7route.params['kode_wilayah'] ? this.$f7route.params['kode_wilayah'] : localStorage.getItem('kode_wilayah_aplikasi'),
            id_level_wilayah: this.$f7route.params['id_level_wilayah'] ? this.$f7route.params['id_level_wilayah']: localStorage.getItem('id_level_wilayah_aplikasi'),
            order_by: 'rapor_akhir',
            start: 0,
            limit: 20
        },
        nama_wilayah: localStorage.getItem('wilayah_aplikasi'),
        rapor_akhir: 0,
        rapor_sekolah: 0,
        rapor_pd: 0,
        rapor_ptk: 0,
        rapor_rombel: 0,
        rapor_sarpras: 0,
        validasi_data: {
            total: 0,
            rows: []
        },
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

    formatAngka = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    backClick = () => {
        console.log(this.$f7route.url.split("/")[1]);
    }

    loadData = (kode_wilayah) => {

        this.$f7.dialog.preloader();

        this.props.setLoading(true);
        this.setState({
            ...this.state,
            routeParams: {
                ...this.state.routeParams,
                kode_wilayah: kode_wilayah ? kode_wilayah.trim(): '090000',
                semester_id: localStorage.getItem('semester_id_aplikasi')
            }
        },()=>{
            this.props.getWilayah(this.state.routeParams).then((result)=>{

                this.setState({
                    ...this.state,
                    loading: true,
                    nama_wilayah: this.props.wilayah.rows[0].nama,
                    routeParams: {
                        ...this.state.routeParams,
                        mst_kode_wilayah: kode_wilayah ? kode_wilayah : '000000',
                        id_level_wilayah: this.$f7route.params['id_level_wilayah'] ? this.$f7route.params['id_level_wilayah']: '0',
                        semester_id: localStorage.getItem('semester_id_aplikasi'),
                        bentuk_pendidikan_id: localStorage.getItem('jenjang_aplikasi'),
                        order_by: 'rapor_akhir',
                        start: 0,
                        limit: 20
                    }
                },()=>{
                    
                    this.props.getValidasiData(this.state.routeParams).then((result)=>{
                        if(result.payload.total > 0){
                            //ada datanya
                            this.setState({
                                validasi_data: this.props.validasi_data
                            })

                            this.$f7.dialog.close();
                        }
                    })
                    
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

        }else{

            this.setState({
                nama_wilayah: 'Indonesia'
            },()=>{

                this.loadData('000000');
            });
        }

    }

    setParamValue = (b) => {
        this.$f7.dialog.preloader();

        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                [b.target.getAttribute('name')]: b.target.value
            }
        },()=>{
            this.props.getValidasiData(this.state.routeParams).then((result)=>{
                if(result.payload.total > 0){
                    //ada datanya
                    this.setState({
                        validasi_data: this.props.validasi_data
                    })

                    this.$f7.dialog.close();
                }
            })
        });
    }

    cariKeyword = (event)  => {
        this.$f7.dialog.preloader();

        this.setState({
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                keyword: event.target[0].value
            }
        },()=>{
            this.props.getValidasiData(this.state.routeParams).then((result)=>{
                if(result.payload.total > 0){
                    //ada datanya
                    this.setState({
                        validasi_data: this.props.validasi_data
                    })

                    this.$f7.dialog.close();
                }
            })
        })
    }

    bukaPengaturan = () => {
        // alert('oke');
        this.props.setJudulKanan('Menu Validasi Data');

        this.props.setIsiKanan((
            <>
            <List>
                {/* <ListItem> */}
                    <Searchbar
                        className="searchbar-demo"
                        // expandable
                        placeholder="Nama Sekolah"
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

    klikNext = () => {
        // alert('tes');
        this.$f7.dialog.preloader();
        
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: (parseInt(this.state.routeParams.start) + parseInt(this.state.routeParams.limit))
            }
        },()=>{
            this.props.getValidasiData(this.state.routeParams).then((result)=>{
                if(result.payload.total > 0){
                    //ada datanya
                    this.setState({
                        validasi_data: this.props.validasi_data
                    })

                    this.$f7.dialog.close();
                }
            })
        });
    }

    klikPrev = () => {
        // alert('tes');
        this.$f7.dialog.preloader();
        
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: (parseInt(this.state.routeParams.start) - parseInt(this.state.routeParams.limit))
            }
        },()=>{
            this.props.getValidasiData(this.state.routeParams).then((result)=>{
                if(result.payload.total > 0){
                    //ada datanya
                    this.setState({
                        validasi_data: this.props.validasi_data
                    })

                    this.$f7.dialog.close();
                }
            })
        });
    }

    render()
    {
        return (
            <Page name="ValidasiData" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Validasi Data</NavTitle>
                    <NavTitleLarge>
                    Validasi Data
                    </NavTitleLarge>
                    <NavRight>
                        <Link panelOpen="right" onClick={this.bukaPengaturan} iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu">&nbsp;Menu</Link>
                    </NavRight>
                </Navbar>
                <div className="data-table" style={{overflowY:'hidden'}}>
                    <div className="data-table-footer" style={{display:'block'}}>
                        <div className="data-table-pagination">
                            <a onClick={this.klikPrev} href="#" className={"link "+(this.state.routeParams.start < 1 ? "disabled" : "" )}>
                                <i class="icon icon-prev color-gray"></i>
                            </a>
                            <a onClick={this.klikNext} href="#" className={"link "+((parseInt(this.state.routeParams.start)+20) > parseInt(this.state.validasi_data.total) ? "disabled" : "" )}>
                                <i className="icon icon-next color-gray"></i>
                            </a>
                            <span className="data-table-pagination-label">{(this.state.routeParams.start+1)}-{(this.state.routeParams.start)+parseInt(this.state.routeParams.limit)} dari {this.formatAngka(this.state.validasi_data.total)} sekolah</span>
                        </div>
                    </div>
                </div>
                {/* isinya */}
                <Block strong style={{marginTop:'0px', marginBottom:'0px', paddingLeft:'0px', paddingRight:'0px'}}>
                    <Card style={{boxShadow:'none', textAlign:'center', marginTop:'-5px', marginBottom:'-5px'}}>
                        <CardContent style={{paddingTop:'0px', paddingBottom:'0px'}}>
                            <Row>
                                <Col width="40">
                                    <b>Nama Sekolah</b>
                                </Col>
                                <Col width="50" tabletWidth="55">
                                    <b>Validasi Data</b>
                                    <Row style={{marginTop:'8px'}}>
                                        <Col width="30">
                                            Dinas
                                        </Col>
                                        <Col width="30">
                                            LPMP
                                        </Col>
                                        <Col width="30">
                                            Pusat
                                        </Col>
                                    </Row>
                                </Col>
                                <Col width="10" tabletWidth="5">
                                    &nbsp;
                                </Col>
                            </Row>
                        </CardContent>
                    </Card>
                    {this.state.validasi_data.rows.map((option)=>{
                        return (
                            <Card>
                                <CardContent style={{padding:'8px'}}>
                                    <Row>
                                        <Col width="40">
                                            <b>{option.nama}</b>
                                            <div style={{fontSize:'10px'}}>{option.npsn} | {option.kecamatan} | {option.kabupaten} | {option.propinsi}</div>
                                        </Col>
                                        <Col width="50" tabletWidth="55">
                                            <Row style={{marginTop:'0px'}}>
                                                <Col width="30" style={{textAlign:'center'}}>
                                                    {!option.validasi_dinas 
                                                        ? 
                                                        <>
                                                            <i className="icons f7-icons" style={{color:'#cccccc'}}>circle</i>
                                                            <div style={{fontSize:'10px', color:'#434343'}}>Belum Divalidasi</div>
                                                        </> 
                                                        :
                                                        (
                                                            parseInt(option.validasi_dinas) === 1 
                                                            ? 
                                                            <>
                                                            <i className="icons f7-icons" style={{color:'teal'}}>checkmark_shield_fill</i>
                                                            <div style={{fontSize:'10px', color:'teal'}}>Valid</div>
                                                            <div style={{fontSize:'9px'}}>{moment(option.tanggal_validasi_dinas).format('D') + ' ' + this.bulan[(moment(option.tanggal_validasi_dinas).format('M')-1)] + ' ' + moment(option.tanggal_validasi_dinas).format('YYYY')}</div>
                                                            </>
                                                            :
                                                            (
                                                                parseInt(option.validasi_dinas) === 0 ? 
                                                                <>
                                                                    <i className="icons f7-icons" style={{color:'#cccccc'}}>circle</i>
                                                                    <div style={{fontSize:'10px', color:'#434343'}}>Belum Divalidasi</div>
                                                                </> :
                                                                <>
                                                                <i className="icons f7-icons" style={{color:'red'}}>pencil_circle</i>
                                                                <div style={{fontSize:'10px', color:'red'}}>Perlu Perbaikan</div>
                                                                <div style={{fontSize:'9px'}}>{moment(option.tanggal_validasi_dinas).format('D') + ' ' + this.bulan[(moment(option.tanggal_validasi_dinas).format('M')-1)] + ' ' + moment(option.tanggal_validasi_dinas).format('YYYY')}</div>
                                                                </>

                                                            )
                                                        ) 
                                                    }
                                                </Col>
                                                <Col width="30" style={{textAlign:'center'}}>
                                                    {!option.validasi_lpmp 
                                                        ? 
                                                        <>
                                                            <i className="icons f7-icons" style={{color:'#cccccc'}}>circle</i>
                                                            <div style={{fontSize:'10px', color:'#434343'}}>Belum Divalidasi</div>
                                                        </> 
                                                        : 
                                                        (
                                                            parseInt(option.validasi_lpmp) === 1 
                                                            ? 
                                                            <>
                                                            <i className="icons f7-icons" style={{color:'teal'}}>checkmark_shield_fill</i>
                                                            <div style={{fontSize:'10px', color:'teal'}}>Valid</div>
                                                            <div style={{fontSize:'9px'}}>{moment(option.tanggal_validasi_lpmp).format('D') + ' ' + this.bulan[(moment(option.tanggal_validasi_lpmp).format('M')-1)] + ' ' + moment(option.tanggal_validasi_lpmp).format('YYYY')}</div>
                                                            </>
                                                            :
                                                            (
                                                                parseInt(option.validasi_lpmp) === 0 ? 
                                                                <>
                                                                    <i className="icons f7-icons" style={{color:'#cccccc'}}>circle</i>
                                                                    <div style={{fontSize:'10px', color:'#434343'}}>Belum Divalidasi</div>
                                                                </> :
                                                                <>
                                                                <i className="icons f7-icons" style={{color:'red'}}>pencil_circle</i>
                                                                <div style={{fontSize:'10px', color:'red'}}>Perlu Perbaikan</div>
                                                                <div style={{fontSize:'9px'}}>{moment(option.tanggal_validasi_lpmp).format('D') + ' ' + this.bulan[(moment(option.tanggal_validasi_lpmp).format('M')-1)] + ' ' + moment(option.tanggal_validasi_lpmp).format('YYYY')}</div>
                                                                </>
    
                                                            )
                                                        ) 
                                                    }
                                                </Col>
                                                <Col width="30" style={{textAlign:'center'}}>
                                                    {!option.validasi_pusat 
                                                        ? 
                                                        <>
                                                            <i className="icons f7-icons" style={{color:'#cccccc'}}>circle</i>
                                                            <div style={{fontSize:'10px', color:'#434343'}}>Belum Divalidasi</div>
                                                        </>
                                                        : 
                                                        // (
                                                        // parseInt(option.validasi_dinas) === 1 
                                                        // ? 
                                                        // <>
                                                        //     <i className="icons f7-icons" style={{color:'teal'}}>checkmark_shield_fill</i>
                                                        //     <div style={{fontSize:'10px', color:'teal'}}>Valid</div>
                                                        //     <div style={{fontSize:'9px'}}>{moment(option.tanggal_validasi_dinas).format('D') + ' ' + this.bulan[(moment(option.tanggal_validasi_dinas).format('M')-1)] + ' ' + moment(option.tanggal_validasi_dinas).format('YYYY')}</div>
                                                        // </>
                                                        // :
                                                        // <>
                                                        //     <i className="icons f7-icons" style={{color:'red'}}>pencil_circle</i>
                                                        //     <div style={{fontSize:'10px', color:'red'}}>Perlu Perbaikan</div>
                                                        //     <div style={{fontSize:'9px'}}>{moment(option.tanggal_validasi_dinas).format('D') + ' ' + this.bulan[(moment(option.tanggal_validasi_dinas).format('M')-1)] + ' ' + moment(option.tanggal_validasi_dinas).format('YYYY')}</div>
                                                        // </>
                                                        // ) 
                                                        (
                                                            parseInt(option.validasi_pusat) === 1 
                                                            ? 
                                                            <>
                                                            <i className="icons f7-icons" style={{color:'teal'}}>checkmark_shield_fill</i>
                                                            <div style={{fontSize:'10px', color:'teal'}}>Valid</div>
                                                            <div style={{fontSize:'9px'}}>{moment(option.tanggal_validasi_pusat).format('D') + ' ' + this.bulan[(moment(option.tanggal_validasi_pusat).format('M')-1)] + ' ' + moment(option.tanggal_validasi_pusat).format('YYYY')}</div>
                                                            </>
                                                            :
                                                            (
                                                                parseInt(option.validasi_pusat) === 0 ? 
                                                                <>
                                                                    <i className="icons f7-icons" style={{color:'#cccccc'}}>circle</i>
                                                                    <div style={{fontSize:'10px', color:'#434343'}}>Belum Divalidasi</div>
                                                                </> :
                                                                <>
                                                                <i className="icons f7-icons" style={{color:'red'}}>pencil_circle</i>
                                                                <div style={{fontSize:'10px', color:'red'}}>Perlu Perbaikan</div>
                                                                <div style={{fontSize:'9px'}}>{moment(option.tanggal_validasi_pusat).format('D') + ' ' + this.bulan[(moment(option.tanggal_validasi_pusat).format('M')-1)] + ' ' + moment(option.tanggal_validasi_pusat).format('YYYY')}</div>
                                                                </>
    
                                                            )
                                                        )
                                                    }
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col width="10" tabletWidth="5" style={{textAlign:'right'}}>
                                            <Link popoverOpen={".popover-menu-validasi-"+option.sekolah_id}>
                                                <i className="icon f7-icons" style={{fontSize:'20px'}}>ellipsis_vertical</i>&nbsp;
                                            </Link>
                                            <Popover className={"popover-menu-validasi-"+option.sekolah_id}>
                                                <List>
                                                    {/* <ListItem link={'/formValidasiData/'+option.sekolah_id+"/"+localStorage.getItem('semester_id_aplikasi')} popoverClose title={parseInt(JSON.parse(localStorage.getItem('user')).peran_id) === 1 ? (parseInt(option.validasi_pusat) === 1 ? 'tidak boleh' : 'boleh') : '--'} /> */}
                                                    <ListItem link={'/hasiLValidasi/'+option.sekolah_id+"/"+localStorage.getItem('semester_id_aplikasi')} popoverClose title="Tampil Hasil Validasi" />
                                                    
                                                    {/* {parseInt(JSON.parse(localStorage.getItem('user')).peran_id) === 1 && parseInt(option.validasi_pusat) === 1 &&
                                                    <ListItem link={'/hasiLValidasi/'+option.sekolah_id+"/"+localStorage.getItem('semester_id_aplikasi')} popoverClose title="Tampil Hasil Validasi" />
                                                    } */}
                                                    {parseInt(JSON.parse(localStorage.getItem('user')).peran_id) === 1 && parseInt(option.validasi_pusat) !== 1 && parseInt(option.validasi_pusat) !== 2 &&
                                                    <ListItem link={'/formValidasiData/'+option.sekolah_id+"/"+localStorage.getItem('semester_id_aplikasi')} popoverClose title="Validasi Data Pusat" />
                                                    }
                                                    {parseInt(JSON.parse(localStorage.getItem('user')).peran_id) === 1 && parseInt(option.validasi_pusat) === 2 &&
                                                    <ListItem link={'/formValidasiData/'+option.sekolah_id+"/"+localStorage.getItem('semester_id_aplikasi')} popoverClose title="Revisi Validasi Data Pusat" />
                                                    }

                                                    {/* {parseInt(JSON.parse(localStorage.getItem('user')).peran_id) === 54 && parseInt(option.validasi_lpmp) === 1 &&
                                                    <ListItem link={'/hasiLValidasi/'+option.sekolah_id+"/"+localStorage.getItem('semester_id_aplikasi')} popoverClose title="Tampil Hasil Validasi" />
                                                    } */}
                                                    {parseInt(JSON.parse(localStorage.getItem('user')).peran_id) === 54 && parseInt(option.validasi_lpmp) !== 1 && parseInt(option.validasi_lpmp) !== 2 &&
                                                    <ListItem link={'/formValidasiData/'+option.sekolah_id+"/"+localStorage.getItem('semester_id_aplikasi')} popoverClose title="Validasi Data LPMP" />
                                                    }
                                                    {parseInt(JSON.parse(localStorage.getItem('user')).peran_id) === 54 && parseInt(option.validasi_lpmp) === 2 &&
                                                    <ListItem link={'/formValidasiData/'+option.sekolah_id+"/"+localStorage.getItem('semester_id_aplikasi')} popoverClose title="Revisi Validasi Data LPMP" />
                                                    }
                                                    
                                                    {/* {parseInt(JSON.parse(localStorage.getItem('user')).peran_id) === 8 && parseInt(option.validasi_dinas) === 1 &&
                                                    <ListItem link={'/hasiLValidasi/'+option.sekolah_id+"/"+localStorage.getItem('semester_id_aplikasi')} popoverClose title="Tampil Hasil Validasi" />
                                                    } */}
                                                    {parseInt(JSON.parse(localStorage.getItem('user')).peran_id) === 8 && parseInt(option.validasi_dinas) !== 1 && parseInt(option.validasi_dinas) !== 2 &&
                                                    <ListItem link={'/formValidasiData/'+option.sekolah_id+"/"+localStorage.getItem('semester_id_aplikasi')} popoverClose title="Validasi Data Dinas" />
                                                    }
                                                    {parseInt(JSON.parse(localStorage.getItem('user')).peran_id) === 8 && parseInt(option.validasi_dinas) === 2 &&
                                                    <ListItem link={'/formValidasiData/'+option.sekolah_id+"/"+localStorage.getItem('semester_id_aplikasi')} popoverClose title="Revisi Validasi Data Dinas" />
                                                    }

                                                    {/* {parseInt(JSON.parse(localStorage.getItem('user')).peran_id) === 6 && parseInt(option.validasi_dinas) === 1 &&
                                                    <ListItem link={'/hasiLValidasi/'+option.sekolah_id+"/"+localStorage.getItem('semester_id_aplikasi')} popoverClose title="Tampil Hasil Validasi" />
                                                    } */}
                                                    {parseInt(JSON.parse(localStorage.getItem('user')).peran_id) === 6 && parseInt(option.validasi_dinas) !== 1 && parseInt(option.validasi_dinas) !== 2 &&
                                                    <ListItem link={'/formValidasiData/'+option.sekolah_id+"/"+localStorage.getItem('semester_id_aplikasi')} popoverClose title="Validasi Data Dinas" />
                                                    }
                                                    {parseInt(JSON.parse(localStorage.getItem('user')).peran_id) === 6 && parseInt(option.validasi_dinas) === 2 &&
                                                    <ListItem link={'/formValidasiData/'+option.sekolah_id+"/"+localStorage.getItem('semester_id_aplikasi')} popoverClose title="Revisi Validasi Data Dinas" />
                                                    }

                                                    <ListItem link={'/profilSekolah/'+option.sekolah_id+'/validasi'} popoverClose title="Profil Sekolah" />
                                                    <ListItem link={'/RaporDapodikProfil/'+option.sekolah_id+'/validasi'} popoverClose title="Kualitas Data Sekolah" />
                                                </List>
                                            </Popover>
                                        </Col>
                                    </Row>
                                </CardContent>
                            </Card>
                        )
                    })}
                </Block>
                {/* end of isinya */}
                <div className="data-table" style={{overflowY:'hidden'}}>
                    <div className="data-table-footer" style={{display:'block'}}>
                        <div className="data-table-pagination">
                            <a onClick={this.klikPrev} href="#" className={"link "+(this.state.routeParams.start < 1 ? "disabled" : "" )}>
                                <i class="icon icon-prev color-gray"></i>
                            </a>
                            <a onClick={this.klikNext} href="#" className={"link "+((parseInt(this.state.routeParams.start)+20) > parseInt(this.state.validasi_data.total) ? "disabled" : "" )}>
                                <i className="icon icon-next color-gray"></i>
                            </a>
                            <span className="data-table-pagination-label">{(this.state.routeParams.start+1)}-{(this.state.routeParams.start)+parseInt(this.state.routeParams.limit)} dari {this.formatAngka(this.state.validasi_data.total)} sekolah</span>
                        </div>
                    </div>
                </div>
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
      getValidasiData: Actions.getValidasiData
    }, dispatch);
}

function mapStateToProps({ App, PesertaDidik, Gtk, RaporDapodik, ValidasiData }) {

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
        validasi_data: ValidasiData.validasi_data

    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(ValidasiData));
  