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
    Button
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

class SPMUsiaSekolah extends Component {
    state = {
        error: null,
        routeParams:{
            foo:'bar'
        },
        spm_usia_sekolah: {
            rows: [],
            total: 0
        },
        spm_usia_sekolah_total: {
            total56: 0,
            total712: 0,
            total1315: 0,
            total1618: 0,
            total18: 0,
            totaltotal: 0
        }
    }


    formatAngka = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    componentDidMount = () => {
        
        for (var property in this.props.tabBar) {
            // console.log(this.state.tabBar[property]);
            this.props.tabBar[property] = false;
        }
        
        this.props.tabBar.kategori = true;
        
        this.props.setTabActive(this.props.tabBar);
        console.log(this.props.tabBar);

        this.props.getSPMUsiaSekolah(this.state.routeParams).then((result)=>{
            this.setState({
                spm_usia_sekolah: this.props.spm_usia_sekolah
            },()=>{
                let total56 = 0;
                let total712 = 0;
                let total1315 = 0;
                let total1618 = 0;
                let total18 = 0;
                let totaltotal = 0;

                this.state.spm_usia_sekolah.rows.map((option)=>{
                    total56 = total56+parseInt(option.umur_5_6_thn);
                    total712 = total712+parseInt(option.umur_7_12_thn);
                    total1315 = total1315+parseInt(option.umur_13_15_thn);
                    total1618 = total1618+parseInt(option.umur_16_18_thn);
                    total18 = total18+parseInt(option.umur_lebih_dari_18_thn);
                    totaltotal = totaltotal+parseInt(option.jumlah_total);
                });

                this.setState({
                    ...this.state,
                    spm_usia_sekolah_total: {
                        total56: total56,
                        total712: total712,
                        total1315: total1315,
                        total1618: total1618,
                        total18: total18,
                        totaltotal: totaltotal
                    }
                });
            });
        });
    }

    render()
    {
        return (
            <Page name="SPMUsiaSekolah" hideBarsOnScroll>
                <Navbar sliding={false} large backLink="Kembali">
                    <NavTitle sliding>Usia Sekolah (Form 1.3 A)</NavTitle>
                    <NavTitleLarge style={{background:'#F6BC31', color:'white'}}>Usia Sekolah (Form 1.3 A)</NavTitleLarge>
                </Navbar>
                <Block strong style={{
                    marginTop:'0px', 
                    paddingLeft:'0px', 
                    paddingRight:'0px', 
                    paddingTop:'0px', 
                    paddingBottom:'0px'
                }}>
                    <div className="data-table" style={{overflowY:'hidden'}}>
                        <table>
                            <thead style={{background:'#eeeeee'}}>
                                <tr>
                                    <th className="label-cell" rowSpan="2" style={{minWidth:'40px'}}>&nbsp;</th>
                                    <th className="label-cell" rowSpan="2" style={{minWidth:'120px', color:'#434343', fontSize:'15px'}}>Jenjang</th>
                                    <th className="label-cell" rowSpan="2" style={{minWidth:'120px', color:'#434343', fontSize:'15px'}}>Status</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px'}} colSpan="6">Jenjang Usia</th>
                                </tr>
                                <tr>
                                    <th className="numeric-cell">5-6 Tahun</th>
                                    <th className="numeric-cell">7-12 Tahun</th>
                                    <th className="numeric-cell">13-15 Tahun</th>
                                    <th className="numeric-cell">16-18 Tahun</th>
                                    <th className="numeric-cell"> {'>'} 18 Tahun</th>
                                    <th className="numeric-cell">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.loading ?
                            <>
                                {this.props.dummy_rows.rows.map((option)=>{
                                    return (
                                        <tr>
                                            <td className="label-cell skeleton-text skeleton-effect-blink">
                                                loremipsum
                                            </td>
                                            <td className="label-cell skeleton-text skeleton-effect-blink">lorenipsumlorenipsum</td>
                                            <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                            <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                            <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                            <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                            <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                            <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                            <td className="numeric-cell skeleton-text skeleton-effect-blink">lorenipsum</td>
                                        </tr>
                                    )
                                })}
                            </>
                            :
                            <>
                            {this.state.spm_usia_sekolah.rows.map((option)=>{

                                return (
                                    <tr key={option.kode_wilayah}>
                                        <td className="label-cell">
                                            &nbsp;
                                        </td>
                                        {/* <td className="label-cell">
                                            {option.nama}
                                        </td> */}
                                        {option.status_sekolah === 'Negeri' &&
                                        <td className="label-cell" rowSpan="2">
                                            {option.nama}
                                        </td>
                                        }
                                        <td className="label-cell">
                                            {option.status_sekolah}
                                        </td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.umur_5_6_thn))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.umur_7_12_thn))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.umur_13_15_thn))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.umur_16_18_thn))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.umur_lebih_dari_18_thn))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.jumlah_total))}</td>
                                    </tr>
                                )
                            })}
                            <tr key={"total"}>
                                <td className="label-cell">
                                    &nbsp;
                                </td>
                                <td className="label-cell" colSpan={2}>
                                    <b>Total</b>
                                </td>
                                <td className="numeric-cell"><b>{this.formatAngka(parseInt(this.state.spm_usia_sekolah_total.total56))}</b></td>
                                <td className="numeric-cell"><b>{this.formatAngka(parseInt(this.state.spm_usia_sekolah_total.total712))}</b></td>
                                <td className="numeric-cell"><b>{this.formatAngka(parseInt(this.state.spm_usia_sekolah_total.total1315))}</b></td>
                                <td className="numeric-cell"><b>{this.formatAngka(parseInt(this.state.spm_usia_sekolah_total.total1618))}</b></td>
                                <td className="numeric-cell"><b>{this.formatAngka(parseInt(this.state.spm_usia_sekolah_total.total18))}</b></td>
                                <td className="numeric-cell"><b>{this.formatAngka(parseInt(this.state.spm_usia_sekolah_total.totaltotal))}</b></td>
                            </tr>
                            {/* {this.props.rekap_peserta_didik_ringkasan.rows.map((option)=>{
                                return(
                                    <tr key={option.kode_wilayah}>
                                        <td className="label-cell">
                                            <MenuItem style={{marginLeft: 'auto', marginTop: '4px', marginBottom: '4px'}} iconF7="menu" dropdown className="MenuDetail">
                                                <MenuDropdown left style={{zIndex:999999}}>
                                                    <MenuDropdownItem href={"/PesertaDidik/Ringkasan/"+option.id_level_wilayah+"/"+option.kode_wilayah} onClick={()=>this.dataRaporWilayah(option.kode_wilayah.trim())}>
                                                        <span>Rekap Wilayah {option.nama}</span>
                                                        <Icon className="margin-left" f7="bookmark" />
                                                    </MenuDropdownItem>
                                                    <MenuDropdownItem href={"/PesertaDidik/RingkasanSp/"+(parseInt(option.id_level_wilayah))+"/"+option.kode_wilayah.trim()}>
                                                        <span>Rekap Sekolah {option.nama}</span>
                                                        <Icon className="margin-left" f7="bookmark" />
                                                    </MenuDropdownItem>
                                                </MenuDropdown>
                                            </MenuItem>
                                        </td>
                                        <td className="label-cell">
                                            {option.nama}<br/>
                                            {parseInt(option.id_level_wilayah) === 1 && <span></span>}
                                            {parseInt(option.id_level_wilayah) === 2 && <span style={{fontSize:'11px', color:'#434343'}}>{option.induk_propinsi}</span>}
                                            {parseInt(option.id_level_wilayah) === 3 && <span style={{fontSize:'11px', color:'#434343'}}>{option.induk_kabupaten}</span>}
                                        </td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_negeri))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_swasta))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt((parseInt(option.pd_negeri)+parseInt(option.pd_swasta))))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_1))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_2))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_3))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_4))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_5))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_6))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_7))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_8))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_9))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_10))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_11))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_12))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.pd_kelas_13))}</td>
                                    </tr>
                                )
                            })} */}
                            </>
                            }
                            </tbody>
                        </table>
                        <div className="data-table-footer" style={{display:'block', height:'75px'}}>
                            <div className="data-table-pagination">
                                &nbsp;
                            </div>
                        </div>
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
      setTabActive: Actions.setTabActive,
      getSPMUsiaSekolah: Actions.getSPMUsiaSekolah
    }, dispatch);
}

function mapStateToProps({ App, Spm }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        spm_usia_sekolah: Spm.spm_usia_sekolah
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(SPMUsiaSekolah));
