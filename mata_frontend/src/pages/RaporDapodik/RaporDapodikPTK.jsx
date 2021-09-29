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
    MenuDropdownItem
} from 'framework7-react';

// import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";

import { Doughnut, Bar } from 'react-chartjs-2';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';
import SelectSemester from '../SelectSemester';

class RaporDapodikPTK extends Component {
    state = {
        error: null,
        loading: true,
        routeParams:{
            start: 0,
            limit: 20
        },
        pageCount: 0,
        offset: 0,
        activePage: 1
    }

    handlePageClick = (pageNumber) => {
        
    }

    componentDidMount = () => {
        localStorage.setItem('current_url', this.$f7route.url);
        console.log(this.$f7route.params);

        if(this.$f7route.params['sekolah_id']){
            this.loadData(this.$f7route.params['sekolah_id']);
        }
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
            this.props.getRaporDapodikPTK(this.state.routeParams).then((result)=>{
                this.setState({
                    loading: false
                });
            });
        });

    }

    formatAngka = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    klikNext = () => {
        
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: (parseInt(this.state.routeParams.start) + parseInt(this.state.routeParams.limit))
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

    klikPrev = () => {
        
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: (parseInt(this.state.routeParams.start) - parseInt(this.state.routeParams.limit))
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

    render()
    {
        return (
            <Page name="RaporDapodikPTK" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Rapor {localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Dapodik' : 'Kualitas Data'} PTK</NavTitle>
                    <NavTitleLarge>
                        Rapor {localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Dapodik' : 'Kualitas Data'} PTK
                    </NavTitleLarge>
                </Navbar>
                <SelectSemester/>
                {this.state.loading ? 
                    <Row noGap>
                        <Col width="100" tabletWidth="100">
                            <BlockTitle style={{marginTop:'8px'}}>Rapor {localStorage.getItem('kode_aplikasi') === 'RAPORDAPODIK' ? 'Dapodik' : 'Kualitas Data'} per Sekolah</BlockTitle>
                            <Block strong style={{marginBottom:'0px'}} className="hilangDiMobile">
                                <Row>
                                    <Col width="100" tabletWidth="30">
                                        <b>Nama PTK</b>
                                    </Col>
                                    <Col width="100" tabletWidth="70">
                                        <Row>
                                            <Col width="20" tabletWidth="15" style={{fontWeight:'bold', textAlign: 'center'}}>
                                                NUPTK
                                            </Col>
                                            <Col width="20" tabletWidth="15" style={{fontWeight:'bold', textAlign: 'center'}}>
                                                Bidang Studi
                                            </Col>
                                            <Col width="15" tabletWidth="15" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                Nilai Rapor
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
                                            <b>option.nama peserta didik</b>
                                            <b>option</b>
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
                                                <Col width="20" tabletWidth="15" style={{fontSize:'18px', fontWeight:'bold', textAlign: 'left'}} className="hilangDiMobile skeleton-text skeleton-effect-blink">
                                                    <div className="hilangDiDesktop">Total</div>
                                                    00.00000000
                                                </Col>
                                                <Col width="20" tabletWidth="15" style={{fontSize:'18px', fontWeight:'bold', textAlign: 'left'}} className="hilangDiMobile skeleton-text skeleton-effect-blink">
                                                    <div className="hilangDiDesktop">Total</div>
                                                    00.00000000
                                                </Col>
                                                <Col width="15" tabletWidth="15" style={{fontSize:'18px', fontWeight:'bold', textAlign: 'right'}} className="hilangDiMobile skeleton-text skeleton-effect-blink">
                                                    <div className="hilangDiDesktop">Total</div>
                                                    00.00
                                                </Col>
                                                <Col width="10" tabletWidth="10" style={{textAlign: 'right', paddingLeft:'16px',}} className="hilangDiMobile skeleton-text skeleton-effect-blink">
                                                    
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
                        <BlockTitle style={{marginTop:'8px'}}>PTK di {this.props.rapor_dapodik_ptk.rows[0].nama_sekolah}</BlockTitle>
                        <BlockTitle style={{marginTop:'0px', fontSize: '10px'}}>{this.props.rapor_dapodik_ptk.rows[0].kecamatan}, {this.props.rapor_dapodik_ptk.rows[0].kabupaten}, {this.props.rapor_dapodik_ptk.rows[0].propinsi}</BlockTitle>
                        <Block strong style={{marginBottom:'0px', padding:'4px'}}>
                            <div className="data-table-footer" style={{display:'block'}}>
                                <div className="data-table-pagination">
                                    <a onClick={this.klikPrev} href="#" className={"link "+(this.state.routeParams.start < 1 ? "disabled" : "" )}>
                                        <i class="icon icon-prev color-gray"></i>
                                    </a>
                                    <a onClick={this.klikNext} href="#" className={"link "+((parseInt(this.state.routeParams.start)+20) > parseInt(this.props.rapor_dapodik_ptk.total) ? "disabled" : "" )}>
                                        <i className="icon icon-next color-gray"></i>
                                    </a>
                                    <span className="data-table-pagination-label">{(this.state.routeParams.start+1)}-{(this.state.routeParams.start)+parseInt(this.state.routeParams.limit)} dari {this.formatAngka(this.props.rapor_dapodik_ptk.total)} peserta didik</span>
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
                                            <Col width="20" tabletWidth="15" style={{fontWeight:'bold', textAlign: 'left'}}>
                                                NUPTK
                                            </Col>
                                            <Col width="20" tabletWidth="15" style={{fontWeight:'bold', textAlign: 'left'}}>
                                                Bidang Studi
                                            </Col>
                                            <Col width="15" tabletWidth="15" style={{fontWeight:'bold', textAlign: 'right'}}>
                                                Nilai Rapor
                                            </Col>
                                            <Col width="10" tabletWidth="10" style={{fontWeight:'bold', textAlign: 'right'}}>
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
                                            <Col width="20" tabletWidth="15" style={{textAlign: 'left'}} className="hilangDiMobile">
                                                <div className="hilangDiDesktop">Total</div>
                                                {option.nuptk}
                                            </Col>
                                            <Col width="20" tabletWidth="15" style={{textAlign: 'left'}} className="hilangDiMobile">
                                                <div className="hilangDiDesktop">Total</div>
                                                {option.bidang_studi}
                                            </Col>
                                            <Col width="15" tabletWidth="15" style={{fontSize:'18px', fontWeight:'bold', textAlign: 'right', color:warnaAngka}} className="hilangDiMobile">
                                                <div className="hilangDiDesktop">Total</div>
                                                {parseFloat(option.nilai_rapor).toFixed(2)}
                                            </Col>
                                            <Col width="10" tabletWidth="10" style={{textAlign: 'right', paddingLeft:'16px',}} className="hilangDiMobile">
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
      getRaporDapodikPTK: Actions.getRaporDapodikPTK,
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
        rapor_dapodik_ptk: RaporDapodik.rapor_dapodik_ptk,
        wilayah: App.wilayah,
        dummy_rows: App.dummy_rows
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(RaporDapodikPTK));