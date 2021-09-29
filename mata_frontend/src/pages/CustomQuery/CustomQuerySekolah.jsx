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
    MenuDropdownItem, AccordionContent, ListInput, BlockHeader,
    Popup
} from 'framework7-react';

// import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";

import { Doughnut, Bar } from 'react-chartjs-2';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

// import 'framework7-icons';

class CustomQuerySekolah extends Component {
    state = {
        error: null,
        loading: true,
        routeParams: {
            start: 0,
            limit: 20,
            kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi'),
            id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi')
        },
        custom_query: {
            rows: [{
                ' ':''
            }],
            total: 0
        },
        popupOpen: false,
        kategori: []
    }

    formatAngka = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    componentDidMount = () => {
        
        this.props.getKategoriCustomQuerySekolah(this.state.routeParams).then((result)=>{
            this.setState({
                kategori: result.payload
            })
        })
        
    }

    kategoriChange = (kolom_id, option) => {
        // alert(kolom_id)
        this.setState({
            kategori_terpilih: {
                ...this.state.kategori_terpilih,
                [kolom_id]: !this.state.kategori_terpilih[kolom_id] ? option : (this.state.kategori_terpilih[kolom_id] ? null : option)
            }
        },()=>{

            let kategori_terpilih_arr = [];

            // console.log(this.state.kategori_terpilih)
            for (const key in this.state.kategori_terpilih) {
                if (this.state.kategori_terpilih.hasOwnProperty(key)) {
                    let element = this.state.kategori_terpilih[key];

                    if(element){
                        element.parameter = 'CONTAINS'
                        element.parameter_value = (element.parameter_value ? '-' : element.parameter_value)

                        kategori_terpilih_arr.push(element)
                    }
                    
                }
            }

            // console.log(kategori_terpilih_arr)
            this.setState({
                kategori_terpilih_arr: kategori_terpilih_arr
            },()=>{
                console.log(this.state.kategori_terpilih_arr)
            })

        })

    }

    paramChange = (kolom_id) => (e) => {
        console.log(kolom_id)
        console.log(e.currentTarget.value)

        let kategori_terpilih_arr = [];

        this.state.kategori_terpilih_arr.map((option)=>{
            if(option.kolom_id === kolom_id){
                option.parameter = e.currentTarget.value
            }

            kategori_terpilih_arr.push(option)
        })

        this.setState({
            kategori_terpilih_arr: kategori_terpilih_arr
        },()=>{
            console.log(this.state.kategori_terpilih_arr)
        })
    }
    
    paramValueChange = (kolom_id) => (e) => {
        console.log(kolom_id)
        console.log(e.currentTarget.value)

        let kategori_terpilih_arr = [];

        this.state.kategori_terpilih_arr.map((option)=>{
            if(option.kolom_id === kolom_id){
                option.parameter_value = e.currentTarget.value
            }

            kategori_terpilih_arr.push(option)
        })

        this.setState({
            kategori_terpilih_arr: kategori_terpilih_arr
        },()=>{
            console.log(this.state.kategori_terpilih_arr)
        })
    }

    prosesCustomQuery = () => {
        this.$f7.dialog.preloader()
        // alert('tes')
        let header = [];
        let header_kolom = [];

        for (let index = 0; index < this.state.kategori_terpilih_arr.length; index++) {
            // const element = this.state.kategori_terpilih_arr[index];
            header.push(this.state.kategori_terpilih_arr[index].nama)
            header_kolom.push(this.state.kategori_terpilih_arr[index].kode_kolom_singkat)
        }

        // for (const key in this.state.kategori_terpilih_arr) {
        //     if (this.state.kategori_terpilih_arr.hasOwnProperty(key)) {
        //         const element = this.state.kategori_terpilih_arr[key];
                
        //         header.push(this.state.kategori_terpilih_arr[key])
        //     }
        // }

        console.log(header)

        this.setState({
            header_custom: header,
            header_custom_kolom: header_kolom
        },()=>{

            this.props.runCustomQuery({
                data:this.state.kategori_terpilih_arr, 
                ...this.state.routeParams, 
                start:0
            }).then((result)=>{
                this.setState({
                    custom_query: this.props.custom_query
                },()=>{
                    this.$f7.dialog.close()
                })
            })

        })

    }

    klikNext = () => {
        this.$f7.dialog.preloader()
        // alert('tes');
        
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: (parseInt(this.state.routeParams.start) + parseInt(this.state.routeParams.limit))
            }
        },()=>{
            this.props.runCustomQuery({data:this.state.kategori_terpilih_arr, ...this.state.routeParams}).then((result)=>{
                this.setState({
                    custom_query: this.props.custom_query
                },()=>{
                    this.$f7.dialog.close()
                })
            })
        });
    }
    
    klikPrev = () => {
        this.$f7.dialog.preloader()
        // alert('tes');
        
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: (parseInt(this.state.routeParams.start) - parseInt(this.state.routeParams.limit))
            }
        },()=>{
            this.props.runCustomQuery({data:this.state.kategori_terpilih_arr, ...this.state.routeParams}).then((result)=>{
                this.setState({
                    custom_query: this.props.custom_query
                },()=>{
                    this.$f7.dialog.close()
                })
            })
        });
    }

    unduhexcel = () => {
        // alert('tes')
        
        window.open(localStorage.getItem('api_base')+"/api/CustomQuery/runCustomQueryExcel?data="+JSON.stringify(this.state.kategori_terpilih_arr)+"&start=0&limit=100000", '_system')
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render()
    {
        return (
            <Page name="CustomQuerySekolah" hideBarsOnScroll>
                <Navbar sliding={false} onBackClick={this.backClick}>
                    <NavLeft>
                        <Link iconIos="f7:chevron_left" iconAurora="f7:chevron_left" iconMd="material:chevron_left" href="/">Beranda</Link>
                    </NavLeft>
                    <NavTitle>Custom Query Sekolah</NavTitle>
                </Navbar>

                {/* popup */}
                <Popup tabletFullscreen opened={this.state.popupOpen} className="demo-popup-swipe-handler popupLebar" swipeToClose swipeHandler=".swipe-handler" onPopupClosed={()=>this.setState({popupOpen:false})}>
                    <Page>
                        <Navbar className="swipe-handler" title={"Kategori"}>
                            <NavRight>
                                <Link style={{color:'white'}} popupClose>Tutup</Link>
                            </NavRight>
                        </Navbar>
                        <Block strong style={{marginTop:'0px', padding:'0px', marginBottom:'0px'}}>

                            <Row>
                                <Col width="30">
                                    <List style={{marginTop:'0px'}}>
                                    {this.state.kategori.map((option)=>{
                                        
                                        if(
                                            option.COLUMN_NAME.search("_id") === -1 && 
                                            option.COLUMN_NAME.search("create") === -1 && 
                                            option.COLUMN_NAME.search("update") === -1
                                        ){
                                            return (
                                                <ListItem checkbox title={this.capitalizeFirstLetter(option.COLUMN_NAME.replaceAll("_"," "))} name="kategori-checkbox"></ListItem>
                                                // <div>{this.capitalizeFirstLetter(option.COLUMN_NAME.replace("_"," "))}</div>
                                                // <div>{this.capitalizeFirstLetter(option.COLUMN_NAME.replaceAll("_"," "))}</div>
                                            )
                                        }

                                    })}
                                    </List>
                                </Col>
                                <Col width="70">
                                    kategori terpilih
                                </Col>
                            </Row>
                            
                        </Block>
                    </Page>
                </Popup>
                {/* popup */}

                <Block strong style={{
                    marginTop:'0px',
                    marginBottom: '0px',
                    padding:'8px'
                }}>
                    <Button raised fill style={{display:'inline-flex'}} onClick={()=>this.setState({popupOpen:true})}>
                        <i className="f7-icons" style={{fontSize:'20px'}}>list_dash</i>&nbsp;
                        Kolom Query
                    </Button>
                    <Button raised fill style={{display:'inline-flex', marginLeft:'4px'}}>
                        <i className="f7-icons" style={{fontSize:'20px'}}>cloud_download</i>&nbsp;
                        Unduh Xls
                    </Button>
                </Block>
                <Block strong style={{
                    marginTop:'0px', 
                    paddingLeft:'0px', 
                    paddingRight:'0px', 
                    paddingTop:'0px', 
                    paddingBottom:'0px'
                }}>
                    <div className="data-table" style={{overflowY:'hidden'}}>
                        <div className="data-table-footer" style={{display:'block'}}>
                            <div className="data-table-pagination">
                                <a onClick={this.klikPrev} href="#" className={"link "+(this.state.routeParams.start < 1 ? "disabled" : "" )}>
                                    <i class="icon icon-prev color-gray"></i>
                                </a>
                                <a onClick={this.klikNext} href="#" className={"link "+((parseInt(this.state.routeParams.start)+20) > parseInt(this.state.custom_query.total) ? "disabled" : "" )}>
                                    <i className="icon icon-next color-gray"></i>
                                </a>
                                {this.state.custom_query.total > 0 &&
                                <span className="data-table-pagination-label">{(this.state.routeParams.start+1)}-{((this.state.routeParams.start)+parseInt(this.state.routeParams.limit)) < this.state.custom_query.total ? ((this.state.routeParams.start)+parseInt(this.state.routeParams.limit)) : this.state.custom_query.total} dari {this.formatAngka(this.state.custom_query.total)} sekolah</span>
                                }
                                {this.state.custom_query.total < 1 &&
                                <span className="data-table-pagination-label">Belum ada data</span>
                                }
                            </div>
                        </div>
                        <table>
                            <thead style={{background:'#eeeeee'}}>
                                
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
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
      getKategoriCustomQuerySekolah: Actions.getKategoriCustomQuerySekolah
    }, dispatch);
}

function mapStateToProps({ App, PesertaDidik, Gtk, RaporDapodik, CustomQuery }) {

    return {
        window_dimension: App.window_dimension,
        loading: App.loading
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(CustomQuerySekolah));