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

class Pengaturan extends Component {
    state = {
        error: null,
        loading: true,
    }

    componentDidMount = () => {
        this.setState({
            ...this.state,
            loading: false
        });


    }

    render()
    {
        return (
            <Page name="Pengaturan" hideBarsOnScroll>
                <Navbar sliding={false} onBackClick={this.backClick}>
                    <NavLeft>
                        <Link iconIos="f7:chevron_left" iconAurora="f7:chevron_left" iconMd="material:chevron_left" href="/">Beranda</Link>
                    </NavLeft>
                    <NavTitle sliding>Pengaturan</NavTitle>
                    <NavTitleLarge>
                        Pengaturan
                    </NavTitleLarge>
                </Navbar>
                <Row noGap>
                    <Col width="100" tabletWidth="100">
                        <List mediaList style={{marginBottom:'0px', marginTop:'0px'}}>
                            <ListItem
                                title="Manajemen Pengguna"
                                subtitle={"Pengaturan pengguna aplikasi "+localStorage.getItem('judul_aplikasi')}
                                link="/ManajemenPengguna"
                            >
                                <i slot="media" class="f7-icons" style={{fontSize:'35px'}}>person_3</i>
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
        dummy_rows: App.dummy_rows
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Pengaturan));