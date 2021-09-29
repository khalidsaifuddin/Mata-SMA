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
    Sheet,
    Segmented,
    ListItemContent,
    Fab,
    Progressbar,
    Popup
} from 'framework7-react';

// import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";

import { Doughnut, Bar } from 'react-chartjs-2';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';
import { Map, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import * as L1 from 'leaflet.markercluster';
import Routing from 'leaflet-routing-machine';
import ExtraMarkers from 'leaflet-extra-markers';

// import 'framework7-icons';

class PetaSekolah extends Component {
    state = {
        error: null,
        loading: false,
        lng: 117.299763,
        lat: -0.583079,
        zoom: 5,
        map_besar: (<div></div>),
        sheetOpened: true,
        sekolah_total: 0,
        popupCari: false,
        daftar_sekolah: {
            rows: [{
                sekolah_id: '-',
                nama: '-'
            }],
            total: 0
        },
        routeParams:{
            start:0,
            limit:20
        },
        teks_tombol: "Sebaran Sekolah ",
        kode_wilayah_aktif: '000000',
        fab_sebaran_sekolah: (<></>),
        yang_sudah: {},
        sekolah_ketemu: []
        // display_progress: 'block'
    }

    // -8.109038, 113.141552

    getColor = (d) => {
        return  d > 200000  ? '#8f0026' :
                d > 150000  ? '#800026' :
                d > 100000  ? '#006CDD' :
                d > 75000   ? '#00db36' :
                d > 50000   ? '#FC4E2A' :
                d > 30000   ? '#FD8D3C' :
                d > 20000   ? '#f4ee30' :
                d > 10000   ? '#f4c030' :
                              '#f24242';
    }


    formatAngka = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    style = (feature) => {
        return {
            weight: 2,
            opacity: 1,
            color: '#4f4f4f',
            dashArray: '3',
            fillOpacity: 0.2,
            fillColor: this.getColor(feature.properties.pd)
        };
    }

    highlightFeature = (e) => {
        let layer = e.target;

        layer.setStyle({
            weight: 2,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.3
        });

        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }
    }

    componentDidMount = () => {
        this.setState({
            routeParams:{
                kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi'),
                id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi'),
                limit: 100000,
                start: 0,
                rapor: 'no',
                bentuk_pendidikan_id: localStorage.getItem('jenjang_aplikasi'),
                keyword: this.$f7route.params['keyword'] ? this.$f7route.params['keyword'] : null
            }
        },()=>{
            
            let map_besar = L.map('map_besar').setView([this.state.lat, this.state.lng], this.state.zoom);
            
            let tile =  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map_besar);
            
            
            let layerGroup = L.featureGroup().addTo(map_besar);
            let markerClusters = new L1.MarkerClusterGroup();

            this.props.getWilayah({id_level_wilayah:1}).then((result)=>{
              console.log(result)

              for (let index = 0; index < result.payload.rows.length; index++) {
                const element = result.payload.rows[index];

                this.props.getRekapSekolahRingkasanSp({
                  kode_wilayah: element.kode_wilayah, 
                  bentuk_pendidikan_id: 13,
                  semester_id: localStorage.getItem('semester_id_aplikasi'),
                  id_level_wilayah:1,
                  status_sekolah: 99,
                  tahun_ajaran_id: localStorage.getItem('semester_id_aplikasi').substring(0,4),
                  limit: 10000
                }).then((result)=>{
                  for (let index = 0; index < this.props.rekap_sekolah_ringkasan_sp.rows.length; index++) {
                    const elementSekolah = this.props.rekap_sekolah_ringkasan_sp.rows[index];

                    var popup = '<span style=font-weight:bold;font-size:20px><a href="/ProfilSekolah/'+elementSekolah.sekolah_id+'">'+elementSekolah.nama+'</a></span>' +
                      '<br/><b>NPSN: </b>' + elementSekolah.npsn +
                      '<br/><b>Bentuk Pendidikan: </b> ' + elementSekolah.bentuk+
                      '<br/><b>Status: </b> ' + status +
                      '<br/><b>Alamat: </b> ' + elementSekolah.alamat_jalan +
                      '<br/><b>Kecamatan: </b> ' + elementSekolah.kecamatan +
                      '<br/><b>Kabupaten: </b> ' + elementSekolah.kabupaten +
                      '<br/><b>Provinsi: </b> ' + elementSekolah.provinsi +
                      '<br/><b>Lintang: </b> ' + elementSekolah.lintang +
                      '<br/><b>Bujur: </b> ' + elementSekolah.bujur +
                      '<br/><br/><a href="/Transisi/SebaranSekolahSekitar|'+elementSekolah.sekolah_id.replace("{","").replace("}","")+'/"><div class="button button-fill">Sebaran Sekolah Sekitar</div></a>'

                    var redMarker = L.ExtraMarkers.icon({
                      // icon: 'home',
                      markerColor: 'cyan',
                      shape: 'square',
                      prefix: 'f7-icons',
                      innerHTML: '<img style="width:70%; padding-top:5px" src="https://image.flaticon.com/icons/png/512/49/49944.png" />'
                    });

                    let marker = new L.Marker([elementSekolah.lintang, elementSekolah.bujur], {draggable:false, icon: redMarker}).bindPopup( popup );
                    
                    markerClusters.addLayer( marker );
                    
                  }

                  if(this.props.rekap_sekolah_ringkasan_sp.total > 0){
                                                        
                    layerGroup.addLayer(markerClusters);
    
                    map_besar.fitBounds(e.target.getBounds());
                
                  }
                })
                // .then((resultSekolah)=>{

                //   console.log(this)

                // })
                
              }
            })
        })

    }

    cariSekolah = (event) => {

        this.setState({
            sheetOpened: false
        },()=>{
            this.$f7router.navigate('/Transisi/Peta-'+event.target[0].value);
        });
    }

    tampilSekolah = () => {
        console.log(this.state.kode_wilayah_aktif);
    }

    klikNext = () => {
        
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: (parseInt(this.state.routeParams.start) + parseInt(this.state.routeParams.limit)),
                propinsi: null
            }
        },()=>{
            this.state.routeParams.limit = 20;
            this.props.getSekolah(this.state.routeParams).then((result)=>{
                this.setState({
                    daftar_sekolah: result.payload
                });
            });
        });
    }
    
    klikPrev = () => {
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: (parseInt(this.state.routeParams.start) - parseInt(this.state.routeParams.limit))
            }
        },()=>{
            this.state.routeParams.limit = 20;
            this.props.getSekolah(this.state.routeParams).then((result)=>{
                this.setState({
                    daftar_sekolah: result.payload
                });
            });
        });
    }

    bukaCariSekolah = () => {
        this.setState({
            popupCari: true
        })
    }

    ketikCari = (e) => {
        this.setState({
            routeParams: {
                ...this.state.routeParams,
                keyword: e.currentTarget.value
            }
        },()=>{
            console.log(this.state.routeParams)
        })
    }

    cariSekolah = () => {
        this.props.getRekapSekolahRingkasanSp({keyword:this.state.routeParams.keyword}).then((result)=>{
            this.setState({
                sekolah_ketemu: this.props.rekap_sekolah_ringkasan_sp.rows
            })
        })
    }

    render()
    {
        const position = [this.state.lat, this.state.lng];

        return (
            <Page name="Peta" hideBarsOnScroll>
                <Navbar>
                    <NavTitle>Sebaran Sekolah</NavTitle>
                    <NavRight>
                        <Button fill raised onClick={this.bukaCariSekolah}>Cari Sekolah</Button>
                    </NavRight>
                </Navbar>
                <Popup tabletFullscreen opened={this.state.popupCari} className="demo-popup-swipe-handler popupLebar" swipeToClose swipeHandler=".swipe-handler" onPopupClosed={()=>this.setState({popupCari:false})}>
                    <Page>
                        <Navbar className="swipe-handler" title={"Cari Sekolah"}>
                            <NavRight>
                                <Link style={{color:'white'}} popupClose>Tutup</Link>
                            </NavRight>
                        </Navbar>
                        <Block strong style={{marginTop:'0px'}}>
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
                            ></Searchbar>
                            <div>
                                {this.state.sekolah_ketemu.map((option)=>{
                                    return (
                                        <Card>
                                            <CardContent>
                                                <Row>
                                                    <Col width="80">
                                                        {option.nama}<br/>
                                                        {option.npsn}
                                                    </Col>
                                                    <Col width="20">
                                                        <Button raised fill onClick={()=>this.setState({popupCari:false},()=>{this.$f7router.navigate("/Transisi/SebaranSekolahSekitar|"+option.sekolah_id.replace("{","").replace("}",""))})}>
                                                            Lihat Posisi sekolah
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </div>
                        </Block>
                    </Page>
                </Popup>
                <Row noGap>
                    <div id="map_besar" style={{width:'100%', height:'calc( 100% - 10px )', position:'fixed'}}></div>
                </Row>
            </Page>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      updateWindowDimension: Actions.updateWindowDimension,
      setLoading: Actions.setLoading,
      getRekapSekolahRingkasanSp: Actions.getRekapSekolahRingkasanSp,
      getWilayah: Actions.getWilayah,
      getSekolah: Actions.getSekolah
    }, dispatch);
}

function mapStateToProps({ App, RekapSekolah }) {

    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        rekap_sekolah_ringkasan_sp: RekapSekolah.rekap_sekolah_ringkasan_sp
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(PetaSekolah));