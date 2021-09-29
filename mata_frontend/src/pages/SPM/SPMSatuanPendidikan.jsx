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

class SPMSatuanPendidikan extends Component {
    state = {
        error: null,
        routeParams:{
            foo:'bar'
        },
        spm_satuan_pendidikan: {
            rows: [],
            total: 0
        },
        spm_satuan_pendidikan_total: {
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

        this.props.getSPMSatuanPendidikan(this.state.routeParams).then((result)=>{
            this.setState({
                spm_satuan_pendidikan: this.props.spm_satuan_pendidikan
            },()=>{
                
            });
        });
    }

    render()
    {
        return (
            <Page name="SPMSatuanPendidikan" hideBarsOnScroll>
                <Navbar sliding={false} large backLink="Kembali">
                    <NavTitle sliding>Satuan Pendidikan (Form 1.3 C)</NavTitle>
                    <NavTitleLarge style={{background:'#F6BC31', color:'white'}}>Satuan Pendidikan (Form 1.3 C)</NavTitleLarge>
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
                            <thead style={{background:'#eeeeee', paddingBottom:'8px', paddingTop:'8px'}}>
                                <tr>
                                    <th className="label-cell" style={{minWidth:'40px'}}>&nbsp;</th>
                                    <th className="label-cell" style={{minWidth:'120px', color:'#434343', fontSize:'15px', paddingBottom:'10px', paddingTop:'10px'}}>Jenjang</th>
                                    <th className="label-cell" style={{minWidth:'120px', color:'#434343', fontSize:'15px', paddingBottom:'10px', paddingTop:'10px'}}>Status</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', paddingBottom:'10px', paddingTop:'10px'}}>Jumlah<br/>Satuan Pendidikan</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', paddingBottom:'10px', paddingTop:'10px'}}>Jumlah<br/>Rombongan Belajar</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', paddingBottom:'10px', paddingTop:'10px'}}>Jumlah<br/>Ruang Kelas</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', paddingBottom:'10px', paddingTop:'10px'}}>Jumlah<br/>Sekolah Terakreditasi</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', paddingBottom:'10px', paddingTop:'10px'}}>Jumlah<br/>Kebutuhan Peningkatan<br/>Satuan Pendidikan</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', paddingBottom:'10px', paddingTop:'10px'}}>Jumlah<br/>Jumlah Kebutuhan<br/>Ruang Kelas Baru</th>
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
                            {this.state.spm_satuan_pendidikan.rows.map((option)=>{

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
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.jumlah_satuan_pendidikan))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.jumlah_rombongan_belajar))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.jumlah_ruang_kelas))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.jumlah_sekolah_akreditasi))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.kebutuhan_peningkatan_kualitas_satuan_pendidikan))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.jumlah_kebutuhan_ruang_kelas_baru))}</td>
                                    </tr>
                                )
                            })}
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
      getSPMSatuanPendidikan: Actions.getSPMSatuanPendidikan
    }, dispatch);
}

function mapStateToProps({ App, Spm }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        spm_satuan_pendidikan: Spm.spm_satuan_pendidikan
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(SPMSatuanPendidikan));
