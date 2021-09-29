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

class formPenerimaSPM extends Component {
    state = {
        error: null,
        loading: false,
        routeParams: {
            foo: 'bar',
            start: 0,
            limit: 20
        },
        penerima_spm: {
            rows: [],
            total: 0
        }
    }


    formatAngka = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    klikNext = () => {
        
    }
    
    klikPrev = () => {
        
    }

    componentDidMount = () => {
        this.$f7.dialog.preloader();
        this.props.getPenerimaSPM(this.state.routeParams).then((result)=>{
            this.setState({
                penerima_spm: this.props.penerima_spm
            },()=>{
                this.$f7.dialog.close();
            });
        });

    }

    render()
    {
        return (
            <Page name="formPenerimaSPM" hideBarsOnScroll>
                <Navbar sliding={false} large backLink="Kembali">
                    <NavTitle sliding className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>Kebutuhan Penerima SPM</NavTitle>
                    <NavTitleLarge style={{background:'#F6BC31', color:'white'}} className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>Kebutuhan Penerima SPM</NavTitleLarge>
                </Navbar>
                <Block strong style={{
                    marginTop:'0px', 
                    paddingLeft:'0px', 
                    paddingRight:'0px', 
                    paddingTop:'0px', 
                    paddingBottom:'0px'
                }}>
                    {/* <div className="data-table-footer" style={{display:'block'}}>
                        <div className="data-table-pagination">
                            <a onClick={this.klikPrev} href="#" className={"link "+(this.state.routeParams.start < 1 ? "disabled" : "" )}>
                                <i class="icon icon-prev color-gray"></i>
                            </a>
                            <a onClick={this.klikNext} href="#" className={"link "+((parseInt(this.state.routeParams.start)+20) > parseInt(this.state.form_penerima_spm.total) ? "disabled" : "" )}>
                                <i className="icon icon-next color-gray"></i>
                            </a>
                            <span className="data-table-pagination-label">{(this.state.routeParams.start+1)}-{(this.state.routeParams.start)+parseInt(this.state.routeParams.limit)} dari {this.formatAngka(this.state.form_penerima_spm.total)} Anak Tidak Sekolah</span>
                        </div>
                    </div> */}
                    <div className="data-table" style={{overflowY:'hidden'}}>
                        <table>
                            <thead style={{background:'#eeeeee'}}>
                                <tr>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'40px'}}>&nbsp;</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'16px'}}>Urut</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'16px'}}>Jenis<br/>Pelayanan Dasar</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'16px'}}>Bentuk<br/>Satuan Pendidikan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'16px'}}>Komponen Penghitungan<br/>Kebutuhan SPM Pendidikan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'16px'}}>Sasaran Penerima<br/>SPM Pendidikan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'16px'}}>Keluaran</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'16px'}}>Satuan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} rowSpan="2" style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'right', padding:'16px'}}>Kebutuhan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} rowSpan="2" style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'right', padding:'16px'}}>Ketersediaan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} rowSpan="2" style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'right', padding:'16px'}}>Selisih (+/-)</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} rowSpan="2" style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'right', padding:'16px'}}>Harga Satuan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} rowSpan="2" style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'right', padding:'16px'}}>Kebutuhan Biaya</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.penerima_spm.rows.map((option)=>{
                                    return (
                                        <tr key={option.pelayanan_dasar_id}>
                                            <td>
                                                <Button raised fill style={{display:'inline-flex'}} onClick={()=>this.$f7router.navigate("/editPenerimaSPM/"+option.pelayanan_dasar_id)}>
                                                    <i className="f7-icons icons" style={{fontSize:'20px'}}>pencil_circle</i>&nbsp;
                                                    Edit
                                                </Button>
                                            </td>
                                            <td>{(option.no_urut ? this.formatAngka(option.no_urut) : 0)}</td>
                                            <td>{(option.pelayanan_dasar ? this.formatAngka(option.pelayanan_dasar) : 0)}</td>
                                            <td>{(option.satuan_pendidikan_id ? this.formatAngka(option.satuan_pendidikan_id) : 0)}</td>
                                            <td>{(option.komponen_kebutuhan_spm ? this.formatAngka(option.komponen_kebutuhan_spm) : 0)}</td>
                                            <td>{(option.sasaran_spm ? this.formatAngka(option.sasaran_spm) : 0)}</td>
                                            <td>{(option.keluaran ? this.formatAngka(option.keluaran) : 0)}</td>
                                            <td>{(option.satuan ? this.formatAngka(option.satuan) : 0)}</td>
                                            <td>{(option.kebutuhan ? this.formatAngka(option.kebutuhan) : 0)}</td>
                                            <td>{(option.ketersediaan ? this.formatAngka(option.ketersediaan) : 0)}</td>
                                            <td>{(option.selisih ? this.formatAngka(option.selisih) : 0)}</td>
                                            <td style={{textAlign:'right', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                                <div>
                                                    Rp
                                                </div>
                                                <div>
                                                    {(option.harga_satuan ? this.formatAngka(option.harga_satuan) : 0)}
                                                </div>
                                            </td>
                                            <td style={{textAlign:'right', justifyContent:'space-between', alignItems:'center'}}>
                                                <div style={{float:'left'}}>
                                                    Rp
                                                </div>
                                                <div>
                                                    {(option.kebutuhan_biaya ? this.formatAngka(option.kebutuhan_biaya) : 0)}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
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
      setTabActive: Actions.setTabActive,
      getPenerimaSPM: Actions.getPenerimaSPM
    }, dispatch);
}

function mapStateToProps({ App, Spm }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        penerima_spm: Spm.penerima_spm
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(formPenerimaSPM));
