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
    Progressbar
} from 'framework7-react';

// import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";

import { Doughnut, Bar } from 'react-chartjs-2';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import * as L1 from 'leaflet.markercluster';
import Routing from 'leaflet-routing-machine';
import ExtraMarkers from 'leaflet-extra-markers';

// import 'framework7-icons';

class PetaSekolahSebaran extends Component {
    state = {
        error: null,
        loading: false,
        lng: 117.299763,
        lat: -0.583079,
        zoom: 5,
        map_besar: (<div></div>),
        sheetOpened: true,
        sekolah_total: 0,
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
            let markerClusters_sebaran = new L1.MarkerClusterGroup();

            this.props.getRekapSekolahRingkasanSp({
                bentuk_pendidikan_id: 13,
                semester_id: localStorage.getItem('semester_id_aplikasi'),
                id_level_wilayah:1,
                status_sekolah: 99,
                tahun_ajaran_id: localStorage.getItem('semester_id_aplikasi').substring(0,4),
                limit: 10000,
                sekolah_id: this.$f7route.params['sekolah_id']
            }).then((result)=>{
                var popup = '<span style=font-weight:bold;font-size:20px><a href="/ProfilSekolah/'+this.props.rekap_sekolah_ringkasan_sp.rows[0].sekolah_id+'">'+this.props.rekap_sekolah_ringkasan_sp.rows[0].nama+'</a></span>' +
                    '<br/><b>NPSN: </b>' + this.props.rekap_sekolah_ringkasan_sp.rows[0].npsn +
                    '<br/><b>Bentuk Pendidikan: </b> ' + this.props.rekap_sekolah_ringkasan_sp.rows[0].bentuk+
                    '<br/><b>Status: </b> ' + status +
                    '<br/><b>Alamat: </b> ' + this.props.rekap_sekolah_ringkasan_sp.rows[0].alamat_jalan +
                    '<br/><b>Kecamatan: </b> ' + this.props.rekap_sekolah_ringkasan_sp.rows[0].kecamatan +
                    '<br/><b>Kabupaten: </b> ' + this.props.rekap_sekolah_ringkasan_sp.rows[0].kabupaten +
                    '<br/><b>Provinsi: </b> ' + this.props.rekap_sekolah_ringkasan_sp.rows[0].provinsi +
                    '<br/><b>Lintang: </b> ' + this.props.rekap_sekolah_ringkasan_sp.rows[0].lintang +
                    '<br/><b>Bujur: </b> ' + this.props.rekap_sekolah_ringkasan_sp.rows[0].bujur +
                    '<br/><br/><a href="/SebaranSekolahSekitar/'+this.props.rekap_sekolah_ringkasan_sp.rows[0].sekolah_id.replace("{","").replace("}","")+'/"><div class="button button-fill">Sebaran Sekolah Sekitar</div></a>'

                var redMarker = L.ExtraMarkers.icon({
                    // icon: 'home',
                    markerColor: 'cyan',
                    shape: 'square',
                    prefix: 'f7-icons',
                    innerHTML: '<img style="width:70%; padding-top:5px" src="https://image.flaticon.com/icons/png/512/49/49944.png" />'
                });

                let marker = new L.Marker([this.props.rekap_sekolah_ringkasan_sp.rows[0].lintang, this.props.rekap_sekolah_ringkasan_sp.rows[0].bujur], {draggable:false, icon: redMarker}).bindPopup( popup );
                
                markerClusters.addLayer( marker );

                layerGroup.addLayer(markerClusters);
    
                // map_besar.fitBounds(e.target.getBounds());

                map_besar.setView([this.props.rekap_sekolah_ringkasan_sp.rows[0].lintang, this.props.rekap_sekolah_ringkasan_sp.rows[0].bujur], 12);

                this.props.getSekolahSekitar({sekolah_id:this.$f7route.params['sekolah_id']}).then((result)=>{
                    // console.log(this.props.sekolah_sekitar)
                    
                    for (let index = 0; index < this.props.sekolah_sekitar.rows.length; index++) {
                        const element = this.props.sekolah_sekitar.rows[index]

                        var popup = '<span style=font-weight:bold;font-size:20px><a href="/ProfilSekolah/'+element.sekolah_id+'">'+element.nama+'</a></span>'
                            +'<br/><b>Jarak: </b>' + parseFloat(element.jarak).toFixed(2) + ' KM'
                            // '<br/><b>NPSN: </b>' + element.npsn +
                            // '<br/><b>Bentuk Pendidikan: </b> ' + element.bentuk+
                            // '<br/><b>Status: </b> ' + status +
                            // '<br/><b>Alamat: </b> ' + element.alamat_jalan +
                            // '<br/><b>Kecamatan: </b> ' + element.kecamatan +
                            // '<br/><b>Kabupaten: </b> ' + element.kabupaten +
                            // '<br/><b>Provinsi: </b> ' + element.provinsi +
                            // '<br/><b>Lintang: </b> ' + element.lintang +
                            // '<br/><b>Bujur: </b> ' + element.bujur

                        var redMarker = L.ExtraMarkers.icon({
                            // icon: 'home',
                            markerColor: 'yellow',
                            shape: 'circle',
                            prefix: 'f7-icons',
                            innerHTML: '<img style="width:70%; padding-top:5px" src="https://image.flaticon.com/icons/png/512/49/49944.png" />'
                        });
        
                        let marker = new L.Marker([element.lintang_2, element.bujur_2], {draggable:false, icon: redMarker}).bindPopup( popup ).addTo(map_besar);
                        
                        // markerClusters_sebaran.addLayer( marker );
        
                        // layerGroup.addLayer(markerClusters_sebaran);


                        let pointA = new L.LatLng(element.lintang_1, element.bujur_1);
                        let pointB = new L.LatLng(element.lintang_2, element.bujur_2);
                        let pointList = [pointA, pointB];

                        let firstpolyline = new L.Polyline(pointList, {
                            color: 'red',
                            weight: 3,
                            opacity: 0.5,
                            smoothFactor: 1
                        });
                        firstpolyline.addTo(map_besar);
                        
                        // map_besar.fitBounds(e.target.getBounds());
                    }
                })


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

    bukaPengaturan = () => {
        
    }

    render()
    {
        const position = [this.state.lat, this.state.lng];

        return (
            <Page name="Peta" hideBarsOnScroll>
                {/* <Row noGap> */}
                <div id="map_besar" style={{width:'100%', height:'calc( 100% - 10px )', position:'fixed'}}></div>
                {/* </Row> */}
                <Card className="legendaPeta" style={{minHeight:'calc( 100% - 100px )', maxHeight:'calc( 100% - 100px )', overflow:'auto'}}>
                    <CardContent style={{maxWidth:'250px', minWidth:'250px'}}>
                        <div style={{fontWeight:'bold', marginBottom:'16px'}}>Sekolah Sekitar ({this.props.sekolah_sekitar.rows.length})</div>
                        <div>
                            {this.props.sekolah_sekitar.rows.map((option)=>{
                                return (
                                    <Card style={{marginLeft:'0px', marginRight:'0px'}}>
                                        <CardContent style={{padding:'8px'}}>
                                            <h4 style={{marginBottom:'0px'}}>{option.nama}</h4>
                                            <div>Jarak: {parseFloat(option.jarak).toFixed(2)} KM</div>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
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
      getRekapSekolahRingkasanSp: Actions.getRekapSekolahRingkasanSp,
      getWilayah: Actions.getWilayah,
      getSekolah: Actions.getSekolah,
      getSekolahSekitar: Actions.getSekolahSekitar
    }, dispatch);
}

function mapStateToProps({ App, RekapSekolah }) {

    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        rekap_sekolah_ringkasan_sp: RekapSekolah.rekap_sekolah_ringkasan_sp,
        sekolah_sekitar: RekapSekolah.sekolah_sekitar
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(PetaSekolahSebaran));