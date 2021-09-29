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
    Panel,
    View
} from 'framework7-react';

// import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";

import { Line } from 'react-chartjs-2';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';
import SelectSemester from '../SelectSemester';

class chartIndexPendidikan extends Component {
    state = {
        error: null,
        loading: true,
        routeParams: {
            kode_wilayah: this.$f7route.params['kode_wilayah'] ? this.$f7route.params['kode_wilayah'] : localStorage.getItem('kode_wilayah_aplikasi'),
            id_level_wilayah: this.$f7route.params['id_level_wilayah'] ? this.$f7route.params['id_level_wilayah']: localStorage.getItem('id_level_wilayah_aplikasi'),
            semester_id:localStorage.getItem('semester_id_aplikasi'),
            tahun_ajaran_id:localStorage.getItem('semester_id_aplikasi').substring(0,4),
            bentuk_pendidikan_id: localStorage.getItem('jenjang_aplikasi'),
            status_sekolah: '99'
        },
        data: {
            labels: ['2020', '2019', '2018', '2017', '2016', '2015'],
            datasets: [
                {
                label: 'IPM',
                data: [12, 19, 3, 5, 2, 3],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
                },
                {
                label: 'HLS',
                data: [4, 5, 2, 7, 10, 3],
                fill: false,
                backgroundColor: 'rgb(0, 99, 0)',
                borderColor: 'rgba(0, 99, 0, 0.2)',
                },
                {
                label: 'RLS',
                data: [5, 7, 3, 8, 2, 3],
                fill: false,
                backgroundColor: 'rgb(255, 99, 0)',
                borderColor: 'rgba(255, 99, 0, 0.2)',
                },
                {
                label: 'AMH',
                data: [5, 7, 3, 8, 2, 3],
                fill: false,
                backgroundColor: 'rgb(0, 120, 0)',
                borderColor: 'rgba(0, 120, 0, 0.2)',
                },
                {
                label: 'APK',
                data: [5, 7, 3, 8, 2, 3],
                fill: false,
                backgroundColor: 'rgb(0, 120, 0)',
                borderColor: 'rgba(0, 120, 0, 0.2)',
                },
                {
                label: 'APM',
                data: [5, 7, 3, 8, 2, 3],
                fill: false,
                backgroundColor: 'rgb(0, 120, 0)',
                borderColor: 'rgba(0, 120, 0, 0.2)',
                },
            ]
        }
    }

    componentDidMount = () => {
        
        this.setState({
            routeParams: {
                kode_wilayah: this.state.routeParams.kode_wilayah
            }
        },()=>{
            this.props.getIndexPendidikan(this.state.routeParams).then((result)=>{
                let labels = [];
                let datasets_ipm = [];
                let datasets_hls = [];
                let datasets_rls = [];
                let datasets_amh = [];
                let datasets_apk = [];
                let datasets_apm = [];

                for (let index = 0; index < result.payload.rows.length; index++) {
                    const element = result.payload.rows[index];
                    
                    labels.push(element.tahun)
                    datasets_ipm.push(element.nilai_ipm ? element.nilai_ipm : 0)
                    datasets_hls.push(element.nilai_hls ? element.nilai_hls : 0)
                    datasets_rls.push(element.nilai_rls ? element.nilai_rls : 0)
                    datasets_amh.push(element.nilai_amh ? element.nilai_amh : 0)
                    datasets_apk.push(element.nilai_apk ? element.nilai_apk : 0)
                    datasets_apm.push(element.nilai_apm ? element.nilai_apm : 0)

                    // datasets.push({
                    //     label: 'IPM',
                    //     data: [12, 19, 3, 5, 2, 3],
                    //     fill: false,
                    //     backgroundColor: 'rgb(255, 99, 132)',
                    //     borderColor: 'rgba(255, 99, 132, 0.2)',
                    // })
                }

                this.setState({
                    data: {
                        ...this.state.data,
                        labels: labels,
                        datasets: [{
                            label: 'IPM',
                            data: datasets_ipm,
                            fill: false,
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgba(255, 99, 132, 0.2)',
                        },
                        {
                            label: 'HLS',
                            data: datasets_hls,
                            fill: false,
                            backgroundColor: 'rgb(0, 99, 0)',
                            borderColor: 'rgba(0, 99, 0, 0.2)',
                        },
                        {
                            label: 'RLS',
                            data: datasets_rls,
                            fill: false,
                            backgroundColor: 'rgb(255, 99, 0)',
                            borderColor: 'rgba(255, 99, 0, 0.2)',
                        },
                        {
                            label: 'AMH',
                            data: datasets_amh,
                            fill: false,
                            backgroundColor: 'rgb(0, 0, 0)',
                            borderColor: 'rgba(0, 0, 0, 0.2)',
                        },
                        {
                            label: 'APK',
                            data: datasets_apk,
                            fill: false,
                            backgroundColor: 'rgb(128, 0, 0)',
                            borderColor: 'rgba(128, 0, 0, 0.2)',
                        },
                        {
                            label: 'APM',
                            data: datasets_apm,
                            fill: false,
                            backgroundColor: 'rgb(255, 0, 0)',
                            borderColor: 'rgba(255, 0, 0, 0.2)',
                        }
                        ]
                    },
                    
                })
            })
        });


    }

    formatAngka = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    bukaPengaturan = () => {
        
        this.props.setJudulKanan('Menu Indikator Pendidikan');

    }

    getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    render()
    {
        // const data = {
        //     labels: ['2020', '2019', '2018', '2017', '2016', '2015'],
        //     datasets: [
        //         {
        //         label: 'IPM',
        //         data: [12, 19, 3, 5, 2, 3],
        //         fill: false,
        //         backgroundColor: 'rgb(255, 99, 132)',
        //         borderColor: 'rgba(255, 99, 132, 0.2)',
        //         },
        //         {
        //         label: 'HLS',
        //         data: [4, 5, 2, 7, 10, 3],
        //         fill: false,
        //         backgroundColor: 'rgb(0, 99, 0)',
        //         borderColor: 'rgba(0, 99, 0, 0.2)',
        //         },
        //         {
        //         label: 'RLs',
        //         data: [5, 7, 3, 8, 2, 3],
        //         fill: false,
        //         backgroundColor: 'rgb(255, 99, 0)',
        //         borderColor: 'rgba(255, 99, 0, 0.2)',
        //         },
        //     ]
        // }
        
        const options = {
            scales: {
                yAxes: [
                {
                    ticks: {
                    beginAtZero: true,
                    },
                },
                ],
            },
        }
        
        return (
            <Page name="chartIndexPendidikan" hideBarsOnScroll>
                {this.state.routeParams.kode_wilayah === localStorage.getItem('kode_wilayah_aplikasi') &&
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>{this.props.wilayah.rows[0].nama}</NavTitle>
                    <NavTitleLarge sliding>
                        Indikator Pendidikan
                    </NavTitleLarge>
                    <NavRight sliding>
                        <Link panelOpen="right" onClick={this.bukaPengaturan} iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu">&nbsp;Menu</Link>
                    </NavRight>
                </Navbar>
                }
                <Subnavbar sliding>
                    <Segmented raised>
                        <Button tabLink="#tab1" href={"/formIndexPendidikan/"}>Form Input</Button>
                        <Button tabLink="#tab2" tabLinkActive>Chart</Button>
                    </Segmented>
                </Subnavbar>
                <Card>
                    <CardContent>
                        <Line 
                            data={this.state.data} options={options}
                        />
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
      setTabActive: Actions.setTabActive,
      getSekolah: Actions.getSekolah,
      getRekapSekolah: Actions.getRekapSekolah,
      getSekolahIndividu: Actions.getSekolahIndividu,
      getRaporDapodikWilayah: Actions.getRaporDapodikWilayah,
      setRaporDapodikWilayah: Actions.setRaporDapodikWilayah,
      getWilayah: Actions.getWilayah,
      getRekapSekolahAkreditasi: Actions.getRekapSekolahAkreditasi,
      setJudulKanan: Actions.setJudulKanan,
      setIsiKanan: Actions.setIsiKanan,
      getIndexPendidikan: Actions.getIndexPendidikan
    }, dispatch);
}

function mapStateToProps({ App, PesertaDidik, Gtk, RaporDapodik, RekapSekolah }) {

    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        sekolah: App.sekolah,
        rekap_sekolah: App.rekap_sekolah,
        sekolah_individu: App.sekolah_individu,
        wilayah: App.wilayah,
        dummy_rows: App.dummy_rows,
        rekap_sekolah_akreditasi: RekapSekolah.rekap_sekolah_akreditasi,
        judul_panel_kanan: App.judul_panel_kanan,
        isi_panel_kanan: App.isi_panel_kanan
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(chartIndexPendidikan));