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

class RekapData extends Component {
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
            <Page name="RaporDapodik" hideBarsOnScroll>
                <Navbar sliding={false} onBackClick={this.backClick}>
                    <NavLeft>
                        <Link iconIos="f7:chevron_left" iconAurora="f7:chevron_left" iconMd="material:chevron_left" href="/">Beranda</Link>
                    </NavLeft>
                    <NavTitle sliding>Rekap Data</NavTitle>
                    <NavTitleLarge>
                        Rekap Data
                    </NavTitleLarge>
                </Navbar>

                {this.state.loading ?
                <>
                    <Block strong>
                        <div className="skeleton-text skeleton-effect-blink">
                            isi loading
                        </div>
                    </Block>
                </>
                :
                <>
                    {/* <Block strong style={{paddingTop:'8px', marginTop:'-20px', marginLeft:'0px'}}> */}
                        <Row noGap>
                            <Col width="100" tabletWidth="100">
                                <List mediaList style={{marginBottom:'0px', marginTop:'0px'}}>
                                    <ListItem
                                        // link="#"
                                        title="Sekolah"
                                        // after="$15"
                                        subtitle="Rekapitulasi Data Sekolah"
                                        // text="Ringkasan, Waktu Penyelenggaraan, Akreditasi, Kurikulum, dll"
                                    >
                                        <i slot="media" class="f7-icons" style={{fontSize:'35px'}}>house</i>
                                        {/* <img slot="media" src="https://cdn.framework7.io/placeholder/people-160x160-1.jpg" width="80" /> */}
                                    </ListItem> 
                                    <li>
                                        <ul>
                                        <ListItem link="/Sekolah/Ringkasan" title="Ringkasan">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem>
                                        <ListItem link="/Sekolah/WaktuPenyelenggaraan" title="Waktu Penyelenggaraan">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem>
                                        <ListItem link="/Sekolah/Kurikulum" title="Kurikulum">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem>
                                        <ListItem link="/Sekolah/Akreditasi" title="Akreditasi">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem>
                                        {/* <ListItem link="#" title="Akses Internet">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem> */}
                                        {/* <ListItem link="#" title="Sumber Listrik">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem> */}
                                        </ul>
                                    </li>
                                    <ListItem
                                        // link="#"
                                        title="GTK"
                                        // after="$22"
                                        subtitle="Rekapitulasi Data Guru dan Tendik"
                                        // text="Ringkasan, Pangkat Golongan, Kualifikasi, dll"
                                    >
                                        <i slot="media" class="f7-icons" style={{fontSize:'35px'}}>briefcase</i>
                                        {/* <img slot="media" src="https://cdn.framework7.io/placeholder/people-160x160-2.jpg" width="80" /> */}
                                    </ListItem>
                                    <li>
                                        <ul>
                                        <ListItem link="/GTK/Ringkasan" title="Ringkasan">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem>
                                        <ListItem link="/GTK/Agama" title="Agama">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem>
                                        {/* <ListItem link="#" title="Status Kepegawaian">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem> */}
                                        {/* <ListItem link="#" title="Kualifikasi">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem> */}
                                        {/* <ListItem link="#" title="Pangkat Golongan">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem> */}
                                        {/* <ListItem link="#" title="Tunjangan">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem> */}
                                        </ul>
                                    </li>
                                    <ListItem
                                        // link="#"
                                        title="Peserta Didik"
                                        // after="$16"
                                        subtitle="Rekapitulasi Data Peserta Didik"
                                        // text="Ringkasan, Usia, Agama, dll"
                                    >
                                        <i slot="media" class="f7-icons" style={{fontSize:'35px'}}>person_2_square_stack</i>
                                        {/* <img slot="media" src="https://cdn.framework7.io/placeholder/people-160x160-3.jpg" width="80" /> */}
                                    </ListItem>
                                    <li>
                                        <ul>
                                        <ListItem link="/PesertaDidik/Ringkasan" title="Ringkasan">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem>
                                        <ListItem link="/PesertaDidik/NISN" title="NISN">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem>
                                        <ListItem link="/PesertaDidik/Tingkat" title="Tingkat">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem>
                                        <ListItem link="/PesertaDidik/Agama" title="Agama">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem>
                                        {/* <ListItem link="#" title="Usia">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem> */}
                                        {/* <ListItem link="#" title="Angka Putus Sekolah">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem> */}
                                        {/* <ListItem link="#" title="Kelulusan">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem> */}
                                        {/* <ListItem link="#" title="Angka Mengulang">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem> */}
                                        {/* <ListItem link="#" title="Angka Kemiskinan">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem> */}
                                        </ul>
                                    </li>
                                </List>
                            </Col>
                            <Col width="100" tabletWidth="100">
                                <List mediaList style={{marginBottom:'0px', marginTop:'0px'}}>
                                    <ListItem
                                        // link="#"
                                        title="Rombongan Belajar"
                                        // after="$16"
                                        subtitle="Rekapitulasi Data Rombongan Belajar"
                                        // text="Ringkasan, Tingkat Pendidikan, Kurikulum, Jenis Rombel, dll"
                                    >
                                        <i slot="media" class="f7-icons" style={{fontSize:'35px'}}>square_list</i>
                                        {/* <img slot="media" src="https://cdn.framework7.io/placeholder/people-160x160-3.jpg" width="80" /> */}
                                    </ListItem>
                                    <li>
                                        <ul>
                                        {/* <ListItem link="#" title="PD Per Tingkat">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem> */}
                                        {/* <ListItem link="#" title="Jumlah Rombel">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem> */}
                                        </ul>
                                    </li>
                                    <ListItem
                                        // link="#"
                                        title="Sarpras"
                                        // after="$16"
                                        subtitle="Rekapitulasi Data Sarana dan Prasarana"
                                        // text="Ringkasan, Jumlah, RKB, dll"
                                    >
                                        <i slot="media" class="f7-icons" style={{fontSize:'35px'}}>building_2_fill</i>
                                        {/* <img slot="media" src="https://cdn.framework7.io/placeholder/people-160x160-3.jpg" width="80" /> */}
                                    </ListItem>
                                    <li>
                                        <ul>
                                        <ListItem link="/Sarpras/Ringkasan/umum" title="Ringkasan Umum">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem>
                                        <ListItem link="/Sarpras/Ringkasan/lab" title="Ringkasan Laboratorium">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem>
                                        <ListItem link="/Sarpras/Ringkasan/lab_komputer" title="Ringkasan Lab Komputer">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem>
                                        <ListItem link="/Sarpras/TingkatKerusakan/rangkuman" title="Tingkat Kerusakan (Umum)">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem>
                                        <ListItem link="/Sarpras/TingkatKerusakan/lab" title="Tingkat Kerusakan (Laboratorium)">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem>
                                        {/* <ListItem link="#" title="RKB">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem> */}
                                        {/* <ListItem link="#" title="Kebutuhan Rehab">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem> */}
                                        {/* <ListItem link="#" title="Kebutuhan Perpustakaan">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem> */}
                                        {/* <ListItem link="#" title="Kebutuhan Lab">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem> */}
                                        {/* <ListItem link="#" title="Sarana">
                                            <i slot="media" class="f7-icons">chart_bar_square</i>
                                        </ListItem> */}
                                        </ul>
                                    </li>
                                </List>
                            </Col>
                        </Row>
                    {/* </Block> */}
                </>
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

export default (connect(mapStateToProps, mapDispatchToProps)(RekapData));