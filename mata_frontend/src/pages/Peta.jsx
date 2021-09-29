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

class Peta extends Component {
    state = {
        error: null,
        loading: false,
        lng: 113.141552,
        lat: -8.109038,
        zoom: 10,
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
        // this.setState({
        //     ...this.state,
        //     loading: true
        // });

        // -2.951263, 104.726617

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
            // let layerGroup = L.featureGroup().addTo(map_besar);
            
            let tile =  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map_besar);
            
            // let tile =  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            //     attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            // }).addTo(map_besar);
            
            
            let layerGroup = L.featureGroup().addTo(map_besar);
            let markerClusters = new L1.MarkerClusterGroup();

            // if(this.state.keyword === null){

            this.props.getGeoJsonBasic(this.state.routeParams).then((result)=>{
                // console.log(JSON.parse(this.props.geojson_basic));
                // console.log(this.props.geojson_basic);
                
                // this.setState({
                //     loading: false
                // },()=>{});

                let geojson = L.geoJson({
                    "type":"FeatureCollection",
                    "features": this.props.geojson_basic
                }
                ,{
                    style: {
                        weight: 2,
                        opacity: 1,
                        color: '#4f4f4f',
                        dashArray: '3',
                        fillOpacity: 0.2,
                        // fillColor: 'black'
                        fillColor: "#cccccc"
                    }
                    ,onEachFeature: (feature, layer) => {
                        var popup = '<span style=font-weight:bold;font-size:12px>'+feature.properties.name+'</span>'
                                    ;

                        layer.bindPopup( popup );

                        layer.on({
                            click: (e) => {
                                // console.log(feature.properties);
                                // alert('oke');
                                
                                map_besar.fitBounds(e.target.getBounds());
                                
                                if(localStorage.getItem('id_level_wilayah_aplikasi') === '0'){

                                    this.setState({
                                        teks_tombol: "Sebaran Sekolah " + feature.properties.name,
                                        kode_wilayah_aktif: feature.properties.kode_wilayah,
                                        fab_sebaran_sekolah: (<Fab style={{width:'80%'}} className="FabSebaranSekolah" position="center-bottom" slot="fixed" text={"Sebaran Sekolah " + feature.properties.name} color="blue" onClick={()=>{
                                                                // alert('oke');
                                                                this.state.routeParams.propinsi = feature.properties.kode_wilayah;
                                                                this.state.routeParams.kode_wilayah = null;
                                                                this.state.routeParams.id_level_wilayah = null;
                                                                this.state.routeParams.limit = 1000000;
    
                                                                if(this.state.yang_sudah.hasOwnProperty(feature.properties.kode_wilayah)){
                                                                    console.log('sudah ada');
    
                                                                    this.setState({
                                                                        ...this.state,
                                                                        routeParams: {
                                                                            ...this.state.routeParams,
                                                                            limit: 20
                                                                        }
                                                                    },()=>{
                                                                        this.props.getSekolah(this.state.routeParams).then((result)=>{
                                                                            this.setState({
                                                                                ...this.state,
                                                                                daftar_sekolah: result.payload
                                                                            },()=>{
                                                                                this.props.setIsiKanan((
                                                                                    <div>
                                                                                        <List mediaList>
                                                                                            {this.state.daftar_sekolah.rows.map((option)=>{
                                                                                                return (
                                                                                                    <ListItem className="listSekolah" title={option.nama+ " (" +option.npsn+ ")"} subtitle={option.kecamatan+","+option.kabupaten+","+option.provinsi} style={{background:'white'}}>
                                                                                                        <ListItemContent>
                                                                                                            <Segmented raised tag="p" style={{margin:'0px'}}>
                                                                                                                <Button style={{height:'25px'}}color="blue" outline onClick={()=>{this.setState({sheetOpened:false},()=>{this.$f7router.navigate('/Transisi/Peta-'+option.npsn)})}} className="text-color-black"><i className="f7-icons" style={{fontSize:'17px'}}>map_pin</i></Button>
                                                                                                                <Button style={{height:'25px', fontSize:'10px'}} color="#3da9c4" outline onClick={()=>{this.setState({sheetOpened:false},()=>{this.$f7router.navigate('/ProfilSekolah/'+option.sekolah_id)})}} className="text-color-black">Profil</Button>
                                                                                                                <Button style={{height:'25px', fontSize:'10px'}} color="#058eb9" outline onClick={()=>{this.setState({sheetOpened:false},()=>{this.$f7router.navigate('/RaporDapodikProfil/'+option.sekolah_id)})}} className="text-color-black">Rapor</Button>
                                                                                                            </Segmented>
                                                                                                        </ListItemContent>
                                                                                                    </ListItem>
                                                                                                )
                                                                                            })}
                                                                                        </List>
                                                                                    </div>
                                                                                ));
                                                                            })
                                                                        });
                                                                    });
                                                                    // return true;
    
                                                                }else{
    
                                                                    this.setState({
                                                                        yang_sudah: {
                                                                            ...this.state.yang_sudah,
                                                                            [feature.properties.kode_wilayah] : 1
                                                                        }
                                                                    },()=>{
                                                                        console.log(this.state.yang_sudah);
                                                                    });
    
                                                                    this.props.getSekolah(this.state.routeParams).then((result)=>{
                                                                        this.setState({
                                                                            loading: false,
                                                                        },()=>{
        
                                                                            this.props.setJudulKanan('Sekolah ' + feature.properties.name);
                                                                            // sekolah_total = sekolah_total+parseInt(this.props.sekolah.total);
                                                                            // if(option.kode_wilayah.trim() !== '350000'){
        
                                                                            
                
                                                                            for (let iSekolah = 0; iSekolah < this.props.sekolah.rows.length; iSekolah++) {
                                                                                const element = this.props.sekolah.rows[iSekolah];
                                                            
                                                                                // console.log(element);
                                                                                
                                                            
                                                                                if((element.lintang && element.bujur) 
                                                                                    && element.lintang !== '.000000000000' 
                                                                                    && element.bujur !== '.000000000000'
                                                                                    && parseFloat(element.bujur) > 80
                                                                                ){
                                                                                    let status = 'Negeri';
                                                            
                                                                                    if(element.status_sekolah == 1){
                                                                                        status = 'Negeri';
                                                                                    }else{
                                                                                        status = 'Swasta';
                                                                                    }
                                                            
                                                                                    var popup = '<span style=font-weight:bold;font-size:20px><a href="/ProfilSekolah/'+element.sekolah_id+'">'+element.nama+'</a></span>' +
                                                                                                '<br/><b>NPSN: </b>' + element.npsn +
                                                                                                '<br/><b>Bentuk Pendidikan: </b> ' + element.bentuk+
                                                                                                '<br/><b>Status: </b> ' + status +
                                                                                                '<br/><b>Alamat: </b> ' + element.alamat_jalan +
                                                                                                '<br/><b>Kecamatan: </b> ' + element.kecamatan +
                                                                                                '<br/><b>Kabupaten: </b> ' + element.kabupaten +
                                                                                                '<br/><b>Provinsi: </b> ' + element.provinsi +
                                                                                                '<br/><b>Lintang: </b> ' + element.lintang +
                                                                                                '<br/><b>Bujur: </b> ' + element.bujur +
                                                                                                '<br/><br/><a href="/RaporDapodikProfil/'+element.sekolah_id+'"><div class="button button-fill">Rapor Rapodik</div></a>'
                                                                                                ;

                                                                                    var redMarker = L.ExtraMarkers.icon({
                                                                                        // icon: 'home',
                                                                                        markerColor: 'cyan',
                                                                                        shape: 'square',
                                                                                        prefix: 'f7-icons',
                                                                                        innerHTML: '<img style="width:70%; padding-top:5px" src="https://image.flaticon.com/icons/png/512/49/49944.png" />'
                                                                                    });
                                                            
                                                                                    let marker = new L.Marker([element.lintang, element.bujur], {draggable:false, icon: redMarker}).bindPopup( popup );
                                                                                    // map_besar.addLayer(marker);
                                                                                    
                                                                                    markerClusters.addLayer( marker );

                                                                                    // -8.109038, 113.141552
                                                                                }
                                                                                
                                                                            }
        
                                                                            
        
        
                                                                            // }
                                        
                                                                            if(this.props.sekolah.total > 0){
                                                        
                                                                                layerGroup.addLayer(markerClusters);
                                                                
                                                                                map_besar.fitBounds(e.target.getBounds());
                                                                            
                                                                            }
        
                                                                            this.setState({
                                                                                ...this.state,
                                                                                routeParams: {
                                                                                    ...this.state.routeParams,
                                                                                    limit: 20
                                                                                }
                                                                            },()=>{
                                                                                this.props.getSekolah(this.state.routeParams).then((result)=>{
                                                                                    this.setState({
                                                                                        ...this.state,
                                                                                        daftar_sekolah: result.payload
                                                                                    },()=>{
                                                                                        this.props.setIsiKanan((
                                                                                            <div style={{background:'white'}}>
                                                                                                <List mediaList>
                                                                                                    {this.state.daftar_sekolah.rows.map((option)=>{
                                                                                                        return (
                                                                                                            <ListItem className="listSekolah" title={option.nama+ " (" +option.npsn+ ")"} subtitle={option.kecamatan+","+option.kabupaten+","+option.provinsi} style={{background:'white'}}>
                                                                                                                <ListItemContent>
                                                                                                                    <Segmented raised tag="p" style={{margin:'0px'}}>
                                                                                                                        <Button style={{height:'25px'}}color="blue" outline onClick={()=>{this.setState({sheetOpened:false},()=>{this.$f7router.navigate('/Transisi/Peta-'+option.npsn)})}} className="text-color-black"><i className="f7-icons" style={{fontSize:'17px'}}>map_pin</i></Button>
                                                                                                                        <Button style={{height:'25px', fontSize:'10px'}} color="#3da9c4" outline onClick={()=>{this.setState({sheetOpened:false},()=>{this.$f7router.navigate('/ProfilSekolah/'+option.sekolah_id)})}} className="text-color-black">Profil</Button>
                                                                                                                        <Button style={{height:'25px', fontSize:'10px'}} color="#058eb9" outline onClick={()=>{this.setState({sheetOpened:false},()=>{this.$f7router.navigate('/RaporDapodikProfil/'+option.sekolah_id)})}} className="text-color-black">Rapor</Button>
                                                                                                                    </Segmented>
                                                                                                                </ListItemContent>
                                                                                                            </ListItem>
                                                                                                        )
                                                                                                    })}
                                                                                                </List>
                                                                                            </div>
                                                                                        ));
                                                                                    })
                                                                                });
                                                                            });
    
                                                                        });
                                                        
                                                                    });
    
                                                                }
    
                                                            }}>
                                                                <Icon ios="f7:map_pin" aurora="f7:map_pin" md="material:map_pin"></Icon>
                                                            </Fab>)
                                    });
                                }else{

                                }

                            }
                        });
                    }
                    // ,onClick: ()=>{
                    //     alert('oke');
                    // }
                });

                layerGroup.addLayer(geojson);

                if(this.state.routeParams.keyword === null){
                    map_besar.fitBounds(geojson.getBounds());
                }

                // this.setState({
                //     loading:false
                // });

                // map_besar.fitBounds(layerGroup.getBounds(),{

                // });
            });
                
            // }
            

            // let arrBentuk = [5,6,13,15];

            if(localStorage.getItem('id_level_wilayah_aplikasi') !== '0'){

                this.props.setJudulKanan('Sekolah ' + localStorage.getItem('wilayah_aplikasi'));

                this.props.getSekolah(this.state.routeParams).then((result)=>{
                    this.setState({
                        loading: false,
                    },()=>{
    
                        for (let iSekolah = 0; iSekolah < this.props.sekolah.rows.length; iSekolah++) {
                            const element = this.props.sekolah.rows[iSekolah];
        
                            
                            if((element.lintang && element.bujur) 
                                && element.lintang !== '.000000000000' 
                                && element.bujur !== '.000000000000'
                                && parseFloat(element.bujur) > 80
                            ){
                                let status = 'Negeri';
        
                                if(element.status_sekolah == 1){
                                    status = 'Negeri';
                                }else{
                                    status = 'Swasta';
                                }
        
                                var popup = '<span style=font-weight:bold;font-size:20px><a href="/ProfilSekolah/'+element.sekolah_id+'">'+element.nama+'</a></span>' +
                                            '<br/><b>NPSN: </b>' + element.npsn +
                                            '<br/><b>Bentuk Pendidikan: </b> ' + element.bentuk+
                                            '<br/><b>Status: </b> ' + status +
                                            '<br/><b>Alamat: </b> ' + element.alamat_jalan +
                                            '<br/><b>Kecamatan: </b> ' + element.kecamatan +
                                            '<br/><b>Kabupaten: </b> ' + element.kabupaten +
                                            '<br/><b>Provinsi: </b> ' + element.provinsi +
                                            '<br/><b>Lintang: </b> ' + element.lintang +
                                            '<br/><b>Bujur: </b> ' + element.bujur +
                                            '<br/><a href="/RaporDapodikProfil/'+element.sekolah_id+'"><div class="button button-outline">Rapor</div></a>'
                                            ;

                                var redMarker = L.ExtraMarkers.icon({
                                    // icon: 'home',
                                    markerColor: 'cyan',
                                    shape: 'square',
                                    prefix: 'f7-icons',
                                    innerHTML: '<img style="width:70%; padding-top:5px" src="https://image.flaticon.com/icons/png/512/49/49944.png" />'
                                });
        
                                let marker = new L.Marker([element.lintang, element.bujur], {icon:redMarker, draggable:false}).bindPopup( popup );
                                
                                
                                markerClusters.addLayer( marker );

                                // -2.951263, 104.726617
                                if(parseInt(this.props.sekolah.total) === 1){

                                    L.Routing.control({
                                        waypoints: [
                                            L.latLng(-2.951263, 104.726617),
                                            L.latLng(element.lintang, element.bujur)
                                        ],
                                        fitSelectedRoutes: 'smart',
                                        routeWhileDragging: false,
                                        lineOptions: {
                                            styles: [{color: 'blue', opacity: 1, weight: 4}],
                                            addWaypoints: false
                                        }
                                    })
                                    .on('routesfound', function(e) {
                                        var routes = e.routes;
                                        console.log(routes);
                                        console.log(routes.summary.totalDistance);
                                        console.log(routes.summary.totalTime);
                                    })
                                    .addTo(map_besar)
                                    ;

                                }
                            }
                            
                        }
        
                        if(this.props.sekolah.total > 0){
    
                            layerGroup.addLayer(markerClusters);
            
                            map_besar.fitBounds(layerGroup.getBounds());
                        
                        }
    
                        this.setState({
                            ...this.state,
                            routeParams: {
                                ...this.state.routeParams,
                                limit: 20
                            }
                        },()=>{
                            this.props.getSekolah(this.state.routeParams).then((result)=>{
                                this.setState({
                                    ...this.state,
                                    daftar_sekolah: result.payload
                                },()=>{
                                    this.props.setIsiKanan((
                                        <div>
                                            <div className="data-table-footer" style={{display:'block'}}>
                                                <div className="data-table-pagination">
                                                    <a onClick={this.klikPrev} href="#" className={"link "+(this.state.routeParams.start < 1 ? "disabled" : "" )}>
                                                        <i class="icon icon-prev color-gray"></i>
                                                    </a>
                                                    <a onClick={this.klikNext} href="#" className={"link "+((parseInt(this.state.routeParams.start)+20) > parseInt(this.state.daftar_sekolah.total) ? "disabled" : "" )}>
                                                        <i className="icon icon-next color-gray"></i>
                                                    </a>
                                                    <span className="data-table-pagination-label">{(this.state.routeParams.start+1)}-{(this.state.routeParams.start)+parseInt(this.state.routeParams.limit)} dari {this.formatAngka(this.state.daftar_sekolah.total)} sekolah</span>
                                                </div>
                                            </div>
                                            <List mediaList>
                                                {this.state.daftar_sekolah.rows.map((option)=>{
                                                    return (
                                                        <ListItem className="listSekolah" title={option.nama+ " (" +option.npsn+ ")"} subtitle={option.kecamatan+","+option.kabupaten+","+option.provinsi} style={{background:'white'}}>
                                                            <ListItemContent>
                                                                <Segmented raised tag="p" style={{margin:'0px'}}>
                                                                    <Button style={{height:'25px'}}color="blue" outline onClick={()=>{this.setState({sheetOpened:false},()=>{this.$f7router.navigate('/Transisi/Peta-'+option.npsn)})}} className="text-color-black"><i className="f7-icons" style={{fontSize:'17px'}}>map_pin</i></Button>
                                                                    <Button style={{height:'25px', fontSize:'10px'}} color="#3da9c4" outline onClick={()=>{this.setState({sheetOpened:false},()=>{this.$f7router.navigate('/ProfilSekolah/'+option.sekolah_id)})}} className="text-color-black">Profil</Button>
                                                                    <Button style={{height:'25px', fontSize:'10px'}} color="#058eb9" outline onClick={()=>{this.setState({sheetOpened:false},()=>{this.$f7router.navigate('/RaporDapodikProfil/'+option.sekolah_id)})}} className="text-color-black">Rapor</Button>
                                                                </Segmented>
                                                            </ListItemContent>
                                                        </ListItem>
                                                    )
                                                })}
                                            </List>
                                        </div>
                                    ));
                                })
                            });
                        });

                    });
    
                });

                
            }

                // this.props.getCountSekolah(this.state.routeParams).then((result)=>{
                //     this.state.routeParams.limit = 20;
                //     this.state.routeParams.propinsi = null;

                //     // console.log(this.state.routeParams.keyword);
                //     if(this.state.routeParams.keyword !== null){

                //         this.props.getSekolah(this.state.routeParams).then((result)=>{
                //             this.setState({
                //                 daftar_sekolah: result.payload
                //             },()=>{
                //                 // console.log(this.state.daftar_sekolah);
                //                 for (let iSekolah = 0; iSekolah < this.props.sekolah.rows.length; iSekolah++) {
                //                     const element = this.props.sekolah.rows[iSekolah];
                
                //                     if((element.lintang && element.bujur) 
                //                         && element.lintang !== '.000000000000' 
                //                         && element.bujur !== '.000000000000'
                //                         && parseFloat(element.bujur) > 80
                //                     ){
                //                         let status = 'Negeri';
                
                //                         if(element.status_sekolah == 1){
                //                             status = 'Negeri';
                //                         }else{
                //                             status = 'Swasta';
                //                         }
                
                //                         var popup = '<span style=font-weight:bold;font-size:20px><a href="/ProfilSekolah/'+element.sekolah_id+'">'+element.nama+'</a></span>' +
                //                                     '<br/><b>NPSN: </b>' + element.npsn +
                //                                     '<br/><b>Bentuk Pendidikan: </b> ' + element.bentuk+
                //                                     '<br/><b>Status: </b> ' + status +
                //                                     '<br/><b>Alamat: </b> ' + element.alamat_jalan +
                //                                     '<br/><b>Kecamatan: </b> ' + element.kecamatan +
                //                                     '<br/><b>Kabupaten: </b> ' + element.kabupaten +
                //                                     '<br/><b>Provinsi: </b> ' + element.provinsi +
                //                                     '<br/><b>Lintang: </b> ' + element.lintang +
                //                                     '<br/><b>Bujur: </b> ' + element.bujur +
                //                                     '<br/><a href="/RaporDapodikProfil/'+element.sekolah_id+'"><div class="button button-outline">Rapor</div></a>'
                //                                     ;
                
                //                         let marker = new L.Marker([element.lintang, element.bujur], {draggable:false}).bindPopup( popup );
                                        
                                        
                //                         markerClusters.addLayer( marker );
                //                     }
                                    
                //                 }
                
                //                 if(this.props.sekolah.total > 0){
            
                //                     layerGroup.addLayer(markerClusters);
                    
                //                     map_besar.fitBounds(layerGroup.getBounds());
                                
                //                 }
                //             });
                //         });

                //     }

                // });


                // this.props.getWilayah({mst_kode_wilayah:'000000',id_level_wilayah:'0'}).then((result)=>{

                //     let sekolah_total = 0;
                    
                //     this.props.wilayah.rows.map((option)=>{
    
                //         this.state.routeParams.propinsi = option.kode_wilayah;
                //         this.state.routeParams.kode_wilayah = null;
                //         this.state.routeParams.id_level_wilayah = null;
    
    
                //         // for (let indexBentuk = 0; indexBentuk < arrBentuk.length; indexBentuk++) {
                //         // const element = arrBentuk[indexBentuk];
            
                //         // this.state.routeParams.provinsi = element;
                            
                //         this.props.getSekolah(this.state.routeParams).then((result)=>{
                //             this.setState({
                //                 loading: false,
                //                 // map_besar: (<div id="map_besar" style={{width:'100%', height:'100%', position:'fixed'}}></div>)
                //             },()=>{

                //                 sekolah_total = sekolah_total+parseInt(this.props.sekolah.total);
            
                //                 // let map_besar = L.map('map_besar').setView([this.state.lat, this.state.lng], this.state.zoom);
                //                 // // let layerGroup = L.featureGroup().addTo(map_besar);
                                
                //                 // let tile =  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                //                 //                 maxZoom: 19,
                //                 //                 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                //                 //             }).addTo(map_besar);
                                
                
                //                 // let layerGroup = L.featureGroup().addTo(map_besar);
                //                 // let markerClusters = new L1.MarkerClusterGroup();
                //                 if(option.kode_wilayah.trim() !== '350000'){

                //                     for (let iSekolah = 0; iSekolah < this.props.sekolah.rows.length; iSekolah++) {
                //                         const element = this.props.sekolah.rows[iSekolah];
                    
                //                         // console.log(element);
                    
                //                         if((element.lintang && element.bujur) 
                //                             && element.lintang !== '.000000000000' 
                //                             && element.bujur !== '.000000000000'
                //                             && parseFloat(element.bujur) > 80
                //                         ){
                //                             let status = 'Negeri';
                    
                //                             if(element.status_sekolah == 1){
                //                                 status = 'Negeri';
                //                             }else{
                //                                 status = 'Swasta';
                //                             }
                    
                //                             var popup = '<span style=font-weight:bold;font-size:20px><a href="/ProfilSekolah/'+element.sekolah_id+'">'+element.nama+'</a></span>' +
                //                                         '<br/><b>NPSN: </b>' + element.npsn +
                //                                         '<br/><b>Bentuk Pendidikan: </b> ' + element.bentuk+
                //                                         '<br/><b>Status: </b> ' + status +
                //                                         '<br/><b>Alamat: </b> ' + element.alamat_jalan +
                //                                         '<br/><b>Kecamatan: </b> ' + element.kecamatan +
                //                                         '<br/><b>Kabupaten: </b> ' + element.kabupaten +
                //                                         '<br/><b>Provinsi: </b> ' + element.provinsi +
                //                                         '<br/><b>Lintang: </b> ' + element.lintang +
                //                                         '<br/><b>Bujur: </b> ' + element.bujur +
                //                                         '<br/><br/><a href="/RaporDapodikProfil/'+element.sekolah_id+'"><div class="button button-fill">Rapor Rapodik</div></a>'
                //                                         ;
                    
                //                             let marker = new L.Marker([element.lintang, element.bujur], {draggable:false}).bindPopup( popup );
                //                             // map_besar.addLayer(marker);
                                            
                //                             markerClusters.addLayer( marker );
                //                         }
                                        
                //                     }

                //                 }
                
                
                //                 if(this.props.sekolah.total > 0){
            
                //                     layerGroup.addLayer(markerClusters);
                    
                //                     map_besar.fitBounds(layerGroup.getBounds());
                                
                //                 }
            
                //             });
            
                //         });
                //         // }


    
                //     });

                //     // this.setState({
                //     //     sekolah_total: sekolah_total
                //     // });
                // });

            // }else{

            //     this.props.getCountSekolah(this.state.routeParams).then((result)=>{
            //         this.state.routeParams.limit = 20;
            //         this.props.getSekolah(this.state.routeParams).then((result)=>{
            //             this.setState({
            //                 daftar_sekolah: result.payload
            //             });
            //         });
            //     });

            //     this.props.getSekolah(this.state.routeParams).then((result)=>{
            //         this.setState({
            //             loading: false,
            //         },()=>{
    
            //             for (let iSekolah = 0; iSekolah < this.props.sekolah.rows.length; iSekolah++) {
            //                 const element = this.props.sekolah.rows[iSekolah];
        
                            
            //                 if((element.lintang && element.bujur) 
            //                     && element.lintang !== '.000000000000' 
            //                     && element.bujur !== '.000000000000'
            //                     && parseFloat(element.bujur) > 80
            //                 ){
            //                     let status = 'Negeri';
        
            //                     if(element.status_sekolah == 1){
            //                         status = 'Negeri';
            //                     }else{
            //                         status = 'Swasta';
            //                     }
        
            //                     var popup = '<span style=font-weight:bold;font-size:20px><a href="/ProfilSekolah/'+element.sekolah_id+'">'+element.nama+'</a></span>' +
            //                                 '<br/><b>NPSN: </b>' + element.npsn +
            //                                 '<br/><b>Bentuk Pendidikan: </b> ' + element.bentuk+
            //                                 '<br/><b>Status: </b> ' + status +
            //                                 '<br/><b>Alamat: </b> ' + element.alamat_jalan +
            //                                 '<br/><b>Kecamatan: </b> ' + element.kecamatan +
            //                                 '<br/><b>Kabupaten: </b> ' + element.kabupaten +
            //                                 '<br/><b>Provinsi: </b> ' + element.provinsi +
            //                                 '<br/><b>Lintang: </b> ' + element.lintang +
            //                                 '<br/><b>Bujur: </b> ' + element.bujur +
            //                                 '<br/><a href="/RaporDapodikProfil/'+element.sekolah_id+'"><div class="button button-outline">Rapor</div></a>'
            //                                 ;
        
            //                     let marker = new L.Marker([element.lintang, element.bujur], {draggable:false}).bindPopup( popup );
                                
                                
            //                     markerClusters.addLayer( marker );
            //                 }
                            
            //             }
        
            //             if(this.props.sekolah.total > 0){
    
            //                 layerGroup.addLayer(markerClusters);
            
            //                 map_besar.fitBounds(layerGroup.getBounds());
                        
            //             }
    
            //         });
    
            //     });
            
            // }

        })

        // let map_besar = L.map('map_besar').setView([this.state.lat, this.state.lng], this.state.zoom);
        // // let layerGroup = L.featureGroup().addTo(map_besar);
        
        // let tile =  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //                 maxZoom: 19,
        //                 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        //             }).addTo(map_besar);
        
        // var markerClusters = L1.markerClusterGroup();

    }

    cariSekolah = (event) => {

        this.setState({
            sheetOpened: false
        },()=>{
            this.$f7router.navigate('/Transisi/Peta-'+event.target[0].value);
        });
        
        
        // alert('tes');
        // console.log(event.target[0].value);
        
        // this.setState({
        //     loading: true,
        //     routeParams: {
        //         ...this.state.routeParams,
        //         keyword: event.target[0].value,
        //         id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi'),
        //         kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi')
        //     }
        // },()=>{
        //     this.props.getSekolah(this.state.routeParams).then((result)=>{
        //         this.setState({
        //             loading: false,
        //             sekolah: this.props.sekolah
        //         },()=>{

        //             // console.log(event);

        //             // map_besar.remove();
        //             // console.log(L.featureGroup());

        //             // let map_besar = L.map('map_besar').setView([this.state.lat, this.state.lng], this.state.zoom);
        //             // // let layerGroup = L.featureGroup().addTo(map_besar);
                    
        //             // // console.log(map_besar);
        //             // // console.log(layerGroup);
                    
        //             // // let tile =  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //             // //                 maxZoom: 19,
        //             // //                 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        //             // //             }).addTo(map_besar);
                    
        //             // // let layerGroup = L.featureGroup().addTo(map_besar);
        //             // let markerClusters = new L1.MarkerClusterGroup();
    
        //             // for (let iSekolah = 0; iSekolah < this.props.sekolah.rows.length; iSekolah++) {
        //             //     const element = this.props.sekolah.rows[iSekolah];
    
        //             //     console.log(element);
    
        //             //     if(element.lintang && element.bujur){
        //             //         let status = 'Negeri';
    
        //             //         if(element.status_sekolah == 1){
        //             //             status = 'Negeri';
        //             //         }else{
        //             //             status = 'Swasta';
        //             //         }
    
        //             //         var popup = '<span style=font-weight:bold;font-size:20px><a href="/ProfilSekolah/'+element.sekolah_id+'">'+element.nama+'</a></span>' +
        //             //                     '<br/><b>NPSN: </b>' + element.npsn +
        //             //                     '<br/><b>Bentuk Pendidikan: </b> ' + element.bentuk+
        //             //                     '<br/><b>Status: </b> ' + status +
        //             //                     '<br/><b>Alamat: </b> ' + element.alamat_jalan +
        //             //                     '<br/><b>Kecamatan: </b> ' + element.kecamatan +
        //             //                     '<br/><b>Kabupaten: </b> ' + element.kabupaten ;
    
        //             //         let marker = new L.Marker([element.lintang, element.bujur], {draggable:false}).bindPopup( popup );
        //             //         // map_besar.addLayer(marker);
                            
        //             //         markerClusters.addLayer( marker );
        //             //     }
                        
        //             // }
    
        //             // // map_besar.addLayer(markerClusters);
    
        //             // // map_besar.fitBounds(markerClusters.getBounds());
        //         });
        //     });
        // })
    }

    tampilSekolah = () => {
        console.log(this.state.kode_wilayah_aktif);
        // console.log(map_besar)
    }

    klikNext = () => {
        // alert('tes');
        
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
        // alert('tes');
        
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
        // this.props.setJudulKanan('Daftar Sekolah');
    }

    render()
    {
        const position = [this.state.lat, this.state.lng];

        return (
            <Page name="Peta" hideBarsOnScroll>
                <Navbar sliding={false} onBackClick={this.backClick}>
                    <NavLeft>
                        <Link onClick={()=>{this.setState({sheetOpened:false})}} iconIos="f7:chevron_left" iconAurora="f7:chevron_left" iconMd="material:chevron_left" href="/">Beranda</Link>
                    </NavLeft>
                    <NavTitle>Peta</NavTitle>
                    <Subnavbar inner={false}>
                        <Searchbar
                            className="searchbar-demo"
                            // expandable
                            placeholder="Cari sekolah dengan nama atau NPSN"
                            searchContainer=".search-list"
                            searchIn=".item-title"
                            onSubmit={this.cariSekolah}
                        ></Searchbar>
                    </Subnavbar>
                    <NavRight >
                        <Link panelOpen="right" onClick={this.bukaPengaturan} iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu">&nbsp;Sekolah</Link>
                    </NavRight>
                    {/* <NavTitle sliding>Peta</NavTitle> */}
                    {/* <NavTitleLarge>
                        Peta
                    </NavTitleLarge> */}
                </Navbar>
                {this.state.loading &&
                <Progressbar style={{height:'5px'}} infinite></Progressbar>
                }
                <Row noGap>
                    {/* {this.state.map_besar} */}
                    <div id="map_besar" style={{width:'100%', height:'90%', position:'fixed'}}></div>
                    {/* <Map id="map_besar" center={position} zoom={this.state.zoom} style={{width:'100%', height:'100%', position:'fixed'}}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                        </Marker>
                    </Map> */}
                </Row>
                {this.state.fab_sebaran_sekolah}
                {/* <Sheet
                    opened={this.state.sheetOpened}
                    className="demo-sheet-swipe-to-step"
                    style={{height: 'auto', '--f7-sheet-bg-color': '#fff'}}
                    swipeToStep
                    swipeToClose
                    // backdrop
                >
                    
                    <div className="sheet-modal-swipe-step">
                        <div className="display-flex padding justify-content-space-between align-items-center">
                        <div style={{fontSize: '18px'}}><b>Jumlah Sekolah:</b></div>
                        <div style={{fontSize: '22px'}}><b>{this.props.count_sekolah.total > 0 ? this.formatAngka(this.props.count_sekolah.total) : '0'}</b></div>
                        </div>
                        <div className="padding-horizontal padding-bottom">
                        
                        <div className="text-align-center">
                            <i className="f7-icons" style={{fontSize:'40px',color:'434343'}}>chevron_compact_up</i><br/>
                            Geser ke atas untuk melihat daftar sekolah
                            </div>
                        </div>
                    </div>
                    
                    <div style={{height:'500px', overflow:'auto'}}>
                        
                        <div className="data-table-footer" style={{display:'block'}}>
                            <div className="data-table-pagination">
                                <a onClick={this.klikPrev} href="#" className={"link "+(this.state.routeParams.start < 1 ? "disabled" : "" )}>
                                    <i class="icon icon-prev color-gray"></i>
                                </a>
                                <a onClick={this.klikNext} href="#" className={"link "+((parseInt(this.state.routeParams.start)+20) > parseInt(this.props.count_sekolah.total) ? "disabled" : "" )}>
                                    <i className="icon icon-next color-gray"></i>
                                </a>
                                <span className="data-table-pagination-label">{(this.state.routeParams.start+1)}-{(this.state.routeParams.start)+parseInt(this.state.routeParams.limit)} dari {this.formatAngka(this.props.count_sekolah.total)} sekolah</span>
                            </div>
                        </div>
                        <List mediaList>
                            {this.state.daftar_sekolah.rows.map((option)=>{
                                return (
                                    <ListItem title={option.nama+ " (" +option.npsn+ ")"} subtitle={option.kecamatan+","+option.kabupaten+","+option.provinsi}>
                                    <ListItemContent>
                                        <Segmented raised tag="p" style={{margin:'0px'}}>
                                            <Button color="blue" outline onClick={()=>{this.setState({sheetOpened:false},()=>{this.$f7router.navigate('/Transisi/Peta-'+option.npsn)})}} className="text-color-black"><i className="f7-icons" style={{fontSize:'17px'}}>map_pin</i></Button>
                                            <Button color="#3da9c4" outline onClick={()=>{this.setState({sheetOpened:false},()=>{this.$f7router.navigate('/ProfilSekolah/'+option.sekolah_id)})}} className="text-color-black">Profil</Button>
                                            <Button color="#058eb9" outline onClick={()=>{this.setState({sheetOpened:false},()=>{this.$f7router.navigate('/RaporDapodikProfil/'+option.sekolah_id)})}} className="text-color-black">Rapor</Button>
                                        </Segmented>
                                    </ListItemContent>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </div>
                </Sheet> */}
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
      getCountSekolah: Actions.getCountSekolah,
      getRekapSekolah: Actions.getRekapSekolah,
      getSekolahIndividu: Actions.getSekolahIndividu,
      getRaporDapodikWilayah: Actions.getRaporDapodikWilayah,
      setRaporDapodikWilayah: Actions.setRaporDapodikWilayah,
      getWilayah: Actions.getWilayah,
      getRaporDapodikSekolah: Actions.getRaporDapodikSekolah,
      getGeoJsonBasic: Actions.getGeoJsonBasic,
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
        count_sekolah: App.count_sekolah,
        rekap_sekolah: App.rekap_sekolah,
        sekolah_individu: App.sekolah_individu,
        rapor_dapodik_wilayah: RaporDapodik.rapor_dapodik_wilayah,
        rapor_dapodik_sekolah: RaporDapodik.rapor_dapodik_sekolah,
        wilayah: App.wilayah,
        dummy_rows: App.dummy_rows,
        geojson_basic: App.geojson_basic
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Peta));