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

class SPMPendidik extends Component {
    state = {
        error: null,
        routeParams:{
            foo:'bar'
        },
        spm_pendidik: {
            rows: [],
            total: 0
        },
        spm_pendidik_total: {
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

        this.props.getSPMPendidik(this.state.routeParams).then((result)=>{
            this.setState({
                spm_pendidik: this.props.spm_pendidik
            },()=>{
                
            });
        });
    }

    render()
    {
        return (
            <Page name="SPMPendidik" hideBarsOnScroll>
                <Navbar sliding={false} large backLink="Kembali">
                    <NavTitle sliding>Pendidik (Form 1.3 D)</NavTitle>
                    <NavTitleLarge style={{background:'#F6BC31', color:'white'}}>Pendidik (Form 1.3 D)</NavTitleLarge>
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
                                    <th className="label-cell" rowSpan="3" style={{minWidth:'40px'}}>&nbsp;</th>
                                    <th className="label-cell" rowSpan="3" style={{minWidth:'120px', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}}>Jenjang</th>
                                    <th className="label-cell" rowSpan="3" style={{minWidth:'120px', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}}>Status</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}} colSpan="7">Pendidik PNS</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}} colSpan="7">Pendidik Non PNS</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}} rowSpan="3">Total<br/>Pendidik</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}} colSpan="3">Kebutuhan Pendidik</th>
                                </tr>
                                <tr>
                                    <th className="label-cell" colSpan="3" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}}>Belum D-IV/S1</th>
                                    <th className="label-cell" colSpan="3" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}}>Sudah D-IV/S1</th>
                                    <th className="label-cell" rowSpan="2" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}}>Jumlah<br/>Pendidik<br/>PNS</th>
                                    <th className="label-cell" colSpan="3" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}}>Belum D-IV/S1</th>
                                    <th className="label-cell" colSpan="3" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}}>Sudah D-IV/S1</th>
                                    <th className="label-cell" rowSpan="2" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}}>Jumlah<br/>Pendidik<br/>Non PNS</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}} rowSpan="2">Kebutuhan<br/>Jumlah<br/>Pendidik</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}} rowSpan="2">Jumlah<br/>Belum<br/>D-IV/S1</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}} rowSpan="2">Jumlah<br/>Belum<br/>Sertifikasi</th>
                                </tr>
                                <tr>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}}>Belum Bersertifikat</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}}>Bersertifikat</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}}>Jumlah</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}}>Belum Bersertifikat</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}}>Bersertifikat</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}}>Jumlah</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}}>Belum Bersertifikat</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}}>Bersertifikat</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}}>Jumlah</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}}>Belum Bersertifikat</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}}>Bersertifikat</th>
                                    <th className="label-cell" style={{textAlign:'center', color:'#434343', fontSize:'15px', border:'1px solid #ccc'}}>Jumlah</th>
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
                            {this.state.spm_pendidik.rows.map((option)=>{

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
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.pns_belum_s1_belum_bersertifikat))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.pns_belum_s1_bersertifikat))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.pns_belum_s1_jumlah))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.pns_s1_belum_bersertifikat))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.pns_s1_bersertifikat))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.pns_s1_jumlah))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.pns_belum_s1_jumlah)+parseInt(option.pns_s1_jumlah))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.non_pns_belum_s1_belum_bersertifikat))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.non_pns_belum_s1_bersertifikat))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.non_pns_belum_s1_jumlah))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.non_pns_s1_belum_bersertifikat))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.non_pns_s1_bersertifikat))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.non_pns_s1_jumlah))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.non_pns_belum_s1_jumlah)+parseInt(option.non_pns_s1_jumlah))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(option.total_pendidik))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(0))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(0))}</td>
                                        <td className="numeric-cell">{this.formatAngka(parseInt(0))}</td>
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
      getSPMPendidik: Actions.getSPMPendidik
    }, dispatch);
}

function mapStateToProps({ App, Spm }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        spm_pendidik: Spm.spm_pendidik
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(SPMPendidik));
