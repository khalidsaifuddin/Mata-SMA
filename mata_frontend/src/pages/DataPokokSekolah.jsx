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
    Subnavbar,
    Icon
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

class DataPokokSekolah extends Component {
    state = {
        error: null,
        show_rincian: 'none',
        loading: true,
        routeParams: {
            keyword: '',
            // kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi'),
            id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi'),
            bentuk_pendidikan_id: (localStorage.getItem('kode_aplikasi') === 'SPM' ? '5-6' : localStorage.getItem('jenjang_aplikasi')),
            status_sekolah: '99',
            [(localStorage.getItem('id_level_wilayah_aplikasi')==='0'?'wilayah':(localStorage.getItem('id_level_wilayah_aplikasi')==='1'?'propinsi':(localStorage.getItem('id_level_wilayah_aplikasi')==='2'?'kabupaten':'kecamatan')))]: localStorage.getItem('kode_wilayah_aplikasi'),
            kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi')
        },
        show: {
            provinsi: 'none',
            kecamatan: 'none',
            kabupaten: 'none'
        },
        sekolah: {
            rows: [{
                sekolah_id: '-',
                nama: '-'
            }],
            total: 0
        },
        riwayat_kata_kunci: []
    }

    componentDidMount = () => {
        // this.props.setLoading(true);
        console.log(this.$f7route.url);
        localStorage.setItem('current_url', this.$f7route.url);

        this.setState({
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                mst_kode_wilayah: this.state.routeParams.kode_wilayah
            }
        },()=>{
            this.props.getSekolah(this.state.routeParams).then((result)=>{
                this.setState({
                    loading: false,
                    sekolah: this.props.sekolah
                },()=>{
                    let arrRiwayat = localStorage.getItem('riwayat_kata_kunci').split(", ");
                    let objRiwayat = [];

                    for (let indexRiwayat = (arrRiwayat.length-2); indexRiwayat >= 0; indexRiwayat--) {
                        const element = arrRiwayat[indexRiwayat];

                        objRiwayat[indexRiwayat] = {
                            kata_kunci: element
                        };
                        
                    }

                    this.setState({
                        riwayat_kata_kunci: objRiwayat
                    },()=>{
                        console.log(this.state.riwayat_kata_kunci);
                    });

                });
            });

            // console.log(this.state.routeParams.id_level_wilayah);

            switch (parseInt(this.state.routeParams.id_level_wilayah)) {
                case 1:
                    this.props.getKabupaten(this.state.routeParams).then((result)=>{
                        this.setState({
                            loading: false,
                            show: {
                                ...this.state.show,
                                kabupaten: 'block',
                                kecamatan: 'block'
                            }
                        });
                    });
                    break;
                case 2:
                    this.props.getKecamatan(this.state.routeParams).then((result)=>{
                        this.setState({
                            loading: false,
                            show: {
                                ...this.state.show,
                                kecamatan: 'block'
                            }
                        });
                    });
                case 0:
                    this.props.getProvinsi(this.state.routeParams).then((result)=>{
                        this.setState({
                            loading: false,
                            show: {
                                ...this.state.show,
                                kecamatan: 'block',
                                kabupaten: 'block',
                                provinsi: 'block'
                            }
                        });
                    });
                    break;
                default:
                    // this.props.getProvinsi(this.state.routeParams).then((result)=>{
                    //     this.setState({
                    //         loading: false,
                    //         show: {
                    //             ...this.state.show,
                    //             kecamatan: 'block',
                    //             kabupaten: 'block',
                    //             provinsi: 'block'
                    //         }
                    //     });
                    // });
                    break;
            }
        })

        // console.log(this.props.sekolah);
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
        // console.log(this.props.tabBar.beranda);
    }

    cariSekolah = (event) => {
        // alert('tes');
        localStorage.setItem('riwayat_kata_kunci', event.target[0].value + ', ' + localStorage.getItem('riwayat_kata_kunci'));
        // console.log(event.target[0].value);
        let arrRiwayat = localStorage.getItem('riwayat_kata_kunci').split(", ");
        let objRiwayat = [];

        for (let indexRiwayat = (arrRiwayat.length-2); indexRiwayat >= 0; indexRiwayat--) {
            const element = arrRiwayat[indexRiwayat];

            objRiwayat[indexRiwayat] = {
                kata_kunci: element
            };
            
        }

        this.setState({
            riwayat_kata_kunci: objRiwayat
        },()=>{
            console.log(this.state.riwayat_kata_kunci);
        });

        this.setState({
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                keyword: event.target[0].value,
                id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi'),
                kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi')
                // bentuk_pendidikan_id: localStorage.getItem('jenjang_aplikasi'),
                // status_sekolah: '99',
                // [(localStorage.getItem('id_level_wilayah_aplikasi')==='0'?'wilayah':(localStorage.getItem('id_level_wilayah_aplikasi')==='1'?'propinsi':(localStorage.getItem('id_level_wilayah_aplikasi')==='2'?'kabupaten':'kecamatan')))]: localStorage.getItem('kode_wilayah_aplikasi'),
            }
        },()=>{
            this.props.getSekolah(this.state.routeParams).then((result)=>{
                this.setState({
                    loading: false,
                    sekolah: this.props.sekolah
                });
            });
        })
    }

    refresh = (event, done) => {
        this.props.getSekolah(this.state.routeParams).then((result)=>{
            this.setState({
                loading: false,
                sekolah: this.props.sekolah
            });

            done();
        });
    }

    handleClickPagination = () => {
        alert('tes');
    }

    setParamValue = (b) => {
        // console.log(b.target.getAttribute('name'));
        // if(b.target.getAttribute('name') === 'propinsi'){
        //     this.setState({
        //         ...this.state,
        //         routeParams: {
        //             ...this.state.routeParams
        //         }
        //     })
        //     // this.props.getKabupaten(this.state.routeParams).then((result)=>{
        //     //     this.setState({
        //     //         loading: false
        //     //     });
        //     // });
        // }

        this.setState({
            ...this.state,
            routeParams: {
                ...this.state.routeParams,
                params_wilayah: b.target.getAttribute('name'),
                [b.target.getAttribute('name')]: b.target.value
            }
        },()=>{
            // if(this.state.routeParams.params_wilayah === 'propinsi'){
            //     this.props.getKabupaten(this.state.routeParams).then((result)=>{
            //         this.setState({
            //             loading: false
            //         });
            //     });
            // }

            // console.log(this.state);
            this.setState({
                loading: true
            },()=>{

                let arrParamKabupaten = {
                    id_level_wilayah: (this.state.routeParams.params_wilayah === 'propinsi' ? 2 : 3),
                    mst_kode_wilayah: (this.state.routeParams.params_wilayah === 'propinsi' ? this.state.routeParams.propinsi : this.state.routeParams.kabupaten)
                }

                if(this.state.routeParams.params_wilayah === 'propinsi'){

                    this.props.getKabupaten(arrParamKabupaten).then((result)=>{
                        this.setState({
                            loading: false
                        });
                    });
                    
                }else{
                    
                    this.props.getKecamatan(arrParamKabupaten).then((result)=>{
                        this.setState({
                            loading: false
                        });
                    });
                }

                this.props.getSekolah(this.state.routeParams).then((result)=>{
                    this.setState({
                        loading: false,
                        sekolah: this.props.sekolah
                    });
                });
            });
        })

    }

    repeatKataKunci = (kata_kunci) => {
        // alert(kata_kunci);
        this.setState({
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                keyword: kata_kunci,
                id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi'),
                kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi')
            }
        },()=>{
            this.props.getSekolah(this.state.routeParams).then((result)=>{
                this.setState({
                    loading: false,
                    sekolah: this.props.sekolah
                });
            });
        })
    }

    ketikCari = (e) => {
        // console.log(e.currentTarget.value);
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                keyword: e.currentTarget.value
            }
        })
    }

    clickClear = () => {
        alert('tes');
    }

    render()
    {
        return (
            <Page name="DataPokokSekolah" hideBarsOnScroll ptr onPtrRefresh={this.refresh}>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Cari Sekolah</NavTitle>
                    <Subnavbar inner={false}>
                        <Searchbar
                            className="searchbar-demo"
                            // expandable
                            placeholder="Cari sekolah dengan nama atau NPSN"
                            searchContainer=".search-list"
                            searchIn=".item-title"
                            onSubmit={this.cariSekolah}
                            customSearch={true}
                            onChange={this.ketikCari}
                            value={this.state.routeParams.keyword}
                            // clickClear={this.clickClear}
                        ></Searchbar>
                    </Subnavbar>
                </Navbar>
                <Block strong style={{marginTop:'0px', display:'block', padding:'8px', marginBottom:'0px'}}>
                    {/* <BlockTitle style={{marginTop:'8px'}}>Pencarian Tingkat Lanjut</BlockTitle> */}
                    <Button onClick={()=>this.setState({...this.state,show_rincian: (this.state.show_rincian==='block' ? 'none' : 'block')})}>Pencarian Rinci</Button>
                </Block>
                <Block strong style={{marginTop:'0px', display:this.state.show_rincian, padding:'8px'}}>
                    <Row>
                        <Col width="100" tabletWidth="50">
                            <List style={{marginTop:'0px', marginBottom:'0px'}}>
                                <ListItem
                                    title="Status"
                                    smartSelect
                                    smartSelectParams={{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Cari Status'}}
                                    >
                                    <select onChange={this.setParamValue} name="status_sekolah" defaultValue="semua">
                                        <option value="99">Semua</option>
                                        <option value="1">Negeri</option>
                                        <option value="2">Swasta</option>
                                    </select>
                                </ListItem>
                                <ListItem
                                    title="Bentuk"
                                    smartSelect
                                    smartSelectParams={{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Cari Bentuk'}}
                                    >
                                    <select onChange={this.setParamValue} name="bentuk_pendidikan_id" defaultValue={localStorage.getItem('jenjang_aplikasi')}>
                                    {localStorage.getItem('jenjang_aplikasi').includes('-') && <option value="99">Semua</option>}
                                        {localStorage.getItem('jenjang_aplikasi').includes('5') && <option value="5">SD</option>}
                                        {localStorage.getItem('jenjang_aplikasi').includes('6') && <option value="6">SMP</option>}
                                        {localStorage.getItem('jenjang_aplikasi').includes('13') && <option value="13">SMA</option>}
                                        {localStorage.getItem('jenjang_aplikasi').includes('15') && <option value="15">SMK</option>}
                                        {localStorage.getItem('jenjang_aplikasi').includes('29') && <option value="29">SLB</option>}
                                    </select>
                                </ListItem>
                            </List>
                        </Col>
                        <Col width="100" tabletWidth="50">
                            <List style={{marginTop:'0px', marginBottom:'0px'}}>
                                {localStorage.getItem('id_level_wilayah_aplikasi') < 1 &&
                                <ListItem
                                    title="Provinsi"
                                    smartSelect
                                    style={{display:this.state.show.provinsi}}
                                    smartSelectParams={{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Cari Provinsi'}}
                                    >
                                    <select onChange={this.setParamValue} name="propinsi" defaultValue="semua">
                                        <option value="99">Semua</option>
                                        {this.props.provinsi.rows.map((option)=>{
                                            return(
                                                <option value={option.kode_wilayah}>{option.nama}</option>
                                            )
                                        })}
                                    </select>
                                </ListItem>
                                }
                                {localStorage.getItem('id_level_wilayah_aplikasi') < 2 &&
                                <ListItem
                                    title="Kabupaten"
                                    smartSelect
                                    style={{display:this.state.show.kabupaten}}
                                    smartSelectParams={{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Cari Kabupaten'}}
                                    >
                                    <select onChange={this.setParamValue} name="kabupaten" defaultValue="semua">
                                        <option value="99">Semua</option>
                                        {this.props.kabupaten.rows.map((option)=>{
                                            return(
                                                <option value={option.kode_wilayah}>{option.nama}</option>
                                            )
                                        })}
                                    </select>
                                </ListItem>
                                }
                                <ListItem
                                    title="Kecamatan"
                                    smartSelect
                                    style={{display:this.state.show.kecamatan}}
                                    smartSelectParams={{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Cari Kecamatan'}}
                                    >
                                    <select onChange={this.setParamValue} name="kecamatan" defaultValue="semua">
                                        <option value="99">Semua</option>
                                        {this.props.kecamatan.rows.map((option)=>{
                                            return(
                                                <option value={option.kode_wilayah}>{option.nama}</option>
                                            )
                                        })}
                                    </select>
                                </ListItem>
                            </List>
                        </Col>
                    </Row>
                </Block>
                {/* Hasil pencariannya */}
                <BlockTitle style={{marginTop:'8px'}}>Daftar Sekolah</BlockTitle>
                <Block strong>
                    Riwayat Pencarian:<br/>
                    {this.state.riwayat_kata_kunci.map((option)=>{

                        if(this.state.riwayat_kata_kunci.indexOf(option) <= 10){
                            return (
                                <><a onClick={()=>this.repeatKataKunci(option.kata_kunci)}><b><i>{option.kata_kunci}</i></b></a>, </>
                            )
                        }

                    })}
                    <br/>
                    {/* <b><i>{localStorage.getItem('riwayat_kata_kunci').substring(2,localStorage.getItem('riwayat_kata_kunci').length)}</i></b><br/> */}
                    <a onClick={()=>{localStorage.setItem('riwayat_kata_kunci','');this.setState({riwayat_kata_kunci:[]});}}>Bersihkan riwayat pencarian</a>
                </Block>
                <Block strong style={{marginBottom:'0px'}}>
                    Menampilkan {this.state.sekolah.total} hasil pencarian
                </Block>
                {this.state.loading     
                ? <><Card 
                    // className="demo-card-header-pic" 
                    // className="skeleton-text skeleton-effect-blink"
                    key="skeleton-card"
                >
                    <CardContent>
                        <h2 style={{marginTop: '0px', marginBottom: '0px'}} className="skeleton-text skeleton-effect-blink">nama sekolahnya panjang (npsn)</h2>
                        <Row noGap>
                            <Col className="skeleton-text skeleton-effect-blink">
                                kecamatan: kecamatan
                                <br/>kabupaten: kabupaten
                                <br/>provinsi: provinsi
                            </Col>
                            <Col className="skeleton-text skeleton-effect-blink">
                                Bentuk: bentuk
                                <br/>Status: status
                            </Col>
                        </Row>
                    </CardContent>
                    <CardFooter style={{display:'inline-flex'}} className="skeleton-text skeleton-effect-blink">
                        <Link style={{marginRight:'8px'}}>Infografis</Link>
                        <Link style={{marginRight:'8px'}}>Rapor Dapodik</Link>
                        <Link style={{marginRight:'8px'}}>Profil Sekolah</Link>
                    </CardFooter>
                </Card> 
                <Card 
                    // className="demo-card-header-pic" 
                    // className="skeleton-text skeleton-effect-blink"
                    key="skeleton-card-2"
                >
                    <CardContent>
                        <h2 style={{marginTop: '0px', marginBottom: '0px'}} className="skeleton-text skeleton-effect-blink">nama sekolahnya panjang (npsn)</h2>
                        <Row noGap>
                            <Col className="skeleton-text skeleton-effect-blink">
                                kecamatan: kecamatan
                                <br/>kabupaten: kabupaten
                                <br/>provinsi: provinsi
                            </Col>
                            <Col className="skeleton-text skeleton-effect-blink">
                                Bentuk: bentuk
                                <br/>Status: status
                            </Col>
                        </Row>
                    </CardContent>
                    <CardFooter style={{display:'inline-flex'}} className="skeleton-text skeleton-effect-blink">
                        <Link style={{marginRight:'8px'}}>Infografis</Link>
                        <Link style={{marginRight:'8px'}}>Rapor Dapodik</Link>
                        <Link style={{marginRight:'8px'}}>Profil Sekolah</Link>
                    </CardFooter>
                </Card>
                </>
                : this.state.sekolah.rows.map((option)=>{
                    return (
                        <Card className="demo-card-header-pic" key={option.sekolah_id}>
                            <CardContent>
                                <Row>
                                    <Col width="30" tabletWidth="20" style={{background:"url(https://img.freepik.com/free-vector/school-building_23-2147521232.jpg?size=338&ext=jpg)", backgroundSize:'cover', backgroundPosition:'center', textAlign:'center', overflow:'hidden'}}>
                                        <img src={"http://foto.data.kemdikbud.go.id/getImage/" + option.npsn + "/1.jpg"} style={{maxHeight:'150px', minHeight:'150px', minWidth:'100%', border:'0px solid #ccc', marginBottom:'-5px'}}></img> 
                                    </Col>
                                    <Col width="70" tabletWidth="80">
                                        <Row noGap>
                                            <Col width="100">
                                                <a href={"/ProfilSekolah/"+option.sekolah_id}>
                                                    <h3 style={{marginTop: '0px', marginBottom: '0px'}}>
                                                        {/* <span dangerouslySetInnerHTML= {{__html:option.nama.replace(new RegExp(this.state.routeParams.keyword, "ig"), "<span style='background-color: #FFFF00'>"+this.state.routeParams.keyword+"</span>")}} /> */}
                                                        {this.state.routeParams.keyword ? <span dangerouslySetInnerHTML= {{__html:option.nama.replace(new RegExp(this.state.routeParams.keyword, "ig"), "<span style='background-color: #FFFF00'>"+this.state.routeParams.keyword.toUpperCase()+"</span>")}} /> : option.nama} 
                                                        {/* ({option.npsn}) */}
                                                        &nbsp;
                                                        ({this.state.routeParams.keyword ? <span dangerouslySetInnerHTML= {{__html:option.npsn.replace(new RegExp(this.state.routeParams.keyword, "ig"), "<span style='background-color: #FFFF00'>"+this.state.routeParams.keyword.toUpperCase()+"</span>")}} /> : option.npsn})
                                                    </h3>
                                                </a>
                                            </Col>
                                            <Col width="100" tabletWidth="50">
                                                Kecamatan: <b>{option.kecamatan}</b>
                                                <br/>Kabupaten: <b>{option.kabupaten}</b>
                                                <br/>Provinsi: <b>{option.provinsi}</b>
                                                <span className="hilangDiDesktop">
                                                    Bentuk: <b>{option.bentuk}</b>
                                                    <br/>Status: <b>{option.status}</b>
                                                </span>
                                            </Col>
                                            <Col width="50" className="hilangDiMobile" tabletWidth="50">
                                                Bentuk: <b>{option.bentuk}</b>
                                                <br/>Status: <b>{option.status}</b>
                                            </Col>
                                            <Col width="100" style={{marginTop:'10px', border:'1px solid #eceff1', padding:'8px'}}>
                                                <Row noGap>
                                                    <Col width="100" tabletWidth="50">
                                                        Rapor Mutu: <Icon style={{color:'#ff8f00', fontSize:'17px', marginTop: '-5px'}} f7="star_fill" /> {parseFloat(option.rapor_mutu).toFixed(2)}
                                                    </Col>
                                                    <Col width="100" tabletWidth="50">
                                                        Rapor Dapodik: <Icon style={{color:'#ff8f00', fontSize:'17px', marginTop: '-5px'}} f7="star_fill" /> {parseFloat(option.rapor_dapodik).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardContent>
                            <CardFooter className="no-border" style={{display:'-webkit-inline-box', width:'100%'}}>
                                {localStorage.getItem('kode_aplikasi') !== 'SPM' &&
                                <>
                                <Button style={{marginRight:'8px'}} fill href={"/ProfilPendidikanSekolah/" + option.sekolah_id + "/"}><Icon style={{fontSize:'17px', marginTop: '-5px'}} f7="chart_bar_alt_fill" /> Infografis</Button> 
                                <Button style={{marginRight:'8px'}} fill href={"/RaporDapodikProfil/" + option.sekolah_id + "/"}><Icon style={{fontSize:'17px', marginTop: '-5px'}} f7="today" /> Rapor</Button> 
                                <Button style={{marginRight:'8px'}} fill href={"/ProfilSekolah/" + option.sekolah_id + "/"}><Icon style={{fontSize:'17px', marginTop: '-5px'}} f7="square_list" /> Profil</Button> 
                                <Button style={{marginRight:'8px'}} fill href={"/Transisi/Peta-" + option.npsn}><Icon style={{fontSize:'17px', marginTop: '-5px'}} f7="map_pin" /> Lokasi</Button> 
                                {/* this.$f7router.navigate('/Transisi/Peta-'+option.npsn) */}
                                </>
                                }
                                {/* {localStorage.getItem('kode_aplikasi') === 'SPM' &&
                                <Button style={{marginRight:'8px'}} fill onClick={()=>{window.open(localStorage.getItem('api_base')+"/api/SPM/InstrumenRootExcel?sekolah_id="+option.sekolah_id+"&jenjang="+(parseInt(option.bentuk_pendidikan_id)===5 ? 'sd' : (parseInt(option.bentuk_pendidikan_id)===9 ? 'sd' : (parseInt(option.bentuk_pendidikan_id)===53 ? 'sd' : 'smp'))), "_blank")}}><Icon style={{fontSize:'17px', marginTop: '-5px'}} f7="arrow_down_doc_fill" /> Unduh Rapor SPM</Button> 
                                } */}
                            </CardFooter>
                        </Card>
                    )
                })}
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
      getWilayah: Actions.getWilayah,
      getProvinsi: Actions.getProvinsi,
      getKabupaten: Actions.getKabupaten,
      getKecamatan: Actions.getKecamatan,
    }, dispatch);
}

function mapStateToProps({ App }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        sekolah: App.sekolah,
        wilayah: App.wilayah,
        provinsi: App.provinsi,
        kabupaten: App.kabupaten,
        kecamatan: App.kecamatan,
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(DataPokokSekolah));
  