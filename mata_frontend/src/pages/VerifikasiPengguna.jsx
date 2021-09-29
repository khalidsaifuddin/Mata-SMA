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
import * as Actions from '../store/actions';

// import 'framework7-icons';

class VerifikasiPengguna extends Component {
    state = {
        error: null,
        loading: true,
        displayPeranRead: 'block',
        displayPeranWrite: 'none',
        pengguna: {
            rows: [{
                pengguna_id: ''
            }],
            total: 0
        }
    }

    componentDidMount = () => {
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                pengguna_id: this.$f7route.params['pengguna_id']
            }
        },()=>{
            this.props.getPengguna(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false,
                    pengguna: this.props.pengguna
                });
            });
        });


    }

    verifikasiPengguna = () => {
        this.$f7.dialog.confirm('Apakah Anda ingin memverifikasi pengguna ini?', 'Konfirmasi', () => {
            this.setState({
                routeParams: {
                    ...this.state.routeParams,
                    pengguna_id: this.$f7route.params['pengguna_id'],
                    data: {
                        ...this.state.routeParams.data,
                        pengguna_id: this.$f7route.params['pengguna_id'],
                        verified: 1
                    }
                }
            },()=>{
                this.props.setPengguna(this.state.routeParams).then((result)=>{
                    if(result.payload.status === 'berhasil'){
                        this.$f7.dialog.alert('Berhasil memverifikasi pengguna!', 'Informasi');
                    }else{
                        this.$f7.dialog.alert('Gagal memverifikasi pengguna!', 'Informasi');
                    }

                    this.$f7router.navigate('/ManajemenPengguna');
                });
            });
        });
    }

    overridePeran = () => {
        // alert('oke');
        this.setState({
            displayPeranRead: 'none',
            displayPeranWrite: 'block'
        });
    }

    gantiPeran = (b) => {
        // console.log(b);
        this.setState({
            ...this.state,
            pengguna: {
                rows: [{
                    ...this.state.pengguna.rows[0],
                    peran_id: b.target.value
                }]
            },
            routeParams: {
                ...this.state.routeParams,
                pengguna_id: this.$f7route.params['pengguna_id'],
                data: {
                    ...this.state.routeParams.data,
                    peran_id: b.target.value
                }
            }
        },()=>{
            console.log(this.state);
        });
    }

    render()
    {
        return (
            <Page name="VerifikasiPengguna" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Verifikasi Pengguna</NavTitle>
                    <NavTitleLarge>
                        Verifikasi Pengguna
                    </NavTitleLarge>
                </Navbar>
                <Row noGap>
                    <Col width="100" tabletWidth="100">
                        <List mediaList style={{marginBottom:'0px', marginTop:'0px'}}>
                            <ListItem
                                title={this.state.pengguna.rows[0].nama}
                                subtitle={this.state.pengguna.rows[0].username}
                            >
                                <i slot="media" class="f7-icons" style={{fontSize:'35px'}}>person</i>
                            </ListItem> 
                        </List>
                    </Col>
                    <Col width="100" tabletWidth="100">
                        <List mediaList style={{marginBottom:'0px', marginTop:'0px'}}>
                            <ListItem
                                title="Peran"
                                subtitle={this.state.pengguna.rows[0].peran}
                                // after={<Button onClick={this.overridePeran}>Ubah</Button>}
                                after="Ubah"
                                style={{display:this.state.displayPeranRead}}
                                onClick={this.overridePeran}
                            >
                                <i slot="media" class="f7-icons" style={{fontSize:'35px'}}>briefcase</i>
                            </ListItem> 
                            <ListItem
                                title="Peran"
                                // subtitle={this.state.pengguna.rows[0].peran}
                                smartSelect
                                style={{display:this.state.displayPeranWrite}}
                            >
                                <i slot="media" class="f7-icons" style={{fontSize:'35px'}}>person</i>
                                <select onChange={this.gantiPeran} name="peran_id" defaultValue={"-"}>
                                    <option value={"-"} disabled>Pilih Peran</option>
                                    <option value={"1"}>Administrator</option>
                                    <option value={"54"}>Operator LPMP</option>
                                    <option value={"6"}>Operator Disdik Provinsi</option>
                                    <option value={"8"}>Operator Disdik Kabupaten/Kota</option>
                                </select>
                            </ListItem>
                            <ListItem
                                title="Wilayah"
                                subtitle={this.state.pengguna.rows[0].wilayah}
                            >
                                <i slot="media" class="f7-icons" style={{fontSize:'35px'}}>map</i>
                            </ListItem> 
                            <ListItem
                                title="KTP"
                                // subtitle={this.state.pengguna.rows[0].wilayah}
                            >
                                {this.state.pengguna.rows[0].gambar_ktp !== null &&
                                <img src={localStorage.getItem('api_base')+this.state.pengguna.rows[0].gambar_ktp} style={{width:'100%'}}/>
                                }
                                {this.state.pengguna.rows[0].gambar_ktp === null &&
                                <>
                                <img src={localStorage.getItem('api_base')+"/assets/berkas/no.png"} style={{width:'100%'}}/>
                                <p>Gambar tidak tersedia</p>
                                </>
                                }
                            </ListItem> 
                            <ListItem
                                title="SK Pengangkatan"
                                // subtitle={this.state.pengguna.rows[0].wilayah}
                            >
                                {this.state.pengguna.rows[0].gambar_sk !== null &&
                                <img src={localStorage.getItem('api_base')+this.state.pengguna.rows[0].gambar_sk} style={{width:'100%'}}/>
                                }
                                {this.state.pengguna.rows[0].gambar_sk === null &&
                                <>
                                <img src={localStorage.getItem('api_base')+"/assets/berkas/no.png"} style={{width:'100%'}}/>
                                <p>Gambar tidak tersedia</p>
                                </>
                                }
                            </ListItem> 
                            <ListItem>
                                <Button raised large style={{background:'green', color:'white'}} onClick={this.verifikasiPengguna}>Verifikasi Pengguna ini?</Button>
                            </ListItem>
                        </List>
                    </Col>
                </Row>
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
      getRaporDapodikSekolah: Actions.getRaporDapodikSekolah,
      getPengguna: Actions.getPengguna,
      setPengguna: Actions.setPengguna,
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
        rapor_dapodik_sekolah: RaporDapodik.rapor_dapodik_sekolah,
        wilayah: App.wilayah,
        dummy_rows: App.dummy_rows,
        pengguna: App.pengguna
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(VerifikasiPengguna));