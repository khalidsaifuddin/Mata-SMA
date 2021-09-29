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

class tabel43 extends Component {
    state = {
        error: null,
        loading: false,
        routeParams: {
            foo: 'bar',
            start: 0,
            limit: 20
        },
        tabel_43: {
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
        this.props.tabel43(this.state.routeParams).then((result)=>{
            this.setState({
                tabel_43: this.props.tabel_43
            },()=>{
                this.$f7.dialog.close();
            });
        });

    }

    hapus = (id) => {
        this.$f7.dialog.confirm('Apakah Anda yakin ingin menghapus record ini?', 'Konfirmasi Hapus', ()=>{

        });
    }

    render()
    {
        return (
            <Page name="tabel43" hideBarsOnScroll>
                <Navbar sliding={false} large backLink="Kembali">
                    <NavTitle sliding className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>Capaian SPM</NavTitle>
                    <NavTitleLarge style={{background:'#F6BC31', color:'white'}} className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>Capaian SPM</NavTitleLarge>
                    {/* <NavRight>
                        <Button raised fill className="bawahCiriBiru" style={{display:'inline-flex', borderRadius:'20px'}} onClick={()=>this.$f7router.navigate('/form31/')}>
                           <i className="icons f7-icons">plus_square_fill</i>&nbsp;
                            Tambah Pemenuhan
                        </Button>
                    </NavRight> */}
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
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'10px', border:'1px solid #cccccc'}} rowSpan="2">&nbsp;</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} rowSpan="2">No</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} rowSpan="2">Kelompok Usia    </th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} rowSpan="2">Jumlah Anak</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} colSpan="7">Sedang Bersekolah</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} rowSpan="2">ATS</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} rowSpan="2">Capaian (%)</th>
                                </tr>
                                <tr>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>TK/RA/Sederajat</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>SD/MI/Sederajat</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>SMP/MTs/Sederajat</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>SMA/SMK/MA/Sederajat</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>SLB/Sederajat</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>Kesetaraan/Sederajat</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>Jumlah</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.tabel_43.rows.map((option)=>{
                                    return (
                                        <tr key={option.rentang_umur}>
                                            <td></td>
                                            <td>{(parseInt(this.state.tabel_43.rows.indexOf(option))+1)}</td>
                                            <td>{option.rentang_umur}</td>
                                            <td>{option.jumlah_anak ? this.formatAngka(option.jumlah_anak) : '0'}</td>
                                            <td>{option.tk ? this.formatAngka(option.tk) : '0'}</td>
                                            <td>{option.sd ? this.formatAngka(option.sd) : '0'}</td>
                                            <td>{option.smp ? this.formatAngka(option.smp) : '0'}</td>
                                            <td>{option.sma_smk ? this.formatAngka(option.sma_smk) : '0'}</td>
                                            <td>{option.slb ? this.formatAngka(option.slb) : '0'}</td>
                                            <td>{option.kesetaraan ? this.formatAngka(option.kesetaraan) : '0'}</td>
                                            <td>{option.jumlah_total ? this.formatAngka(option.jumlah_total) : '0'}</td>
                                            <td>{option.ats ? this.formatAngka(option.ats) : '0'}</td>
                                            <td>{option.capaian ? <>{option.capaian}%</> : '-'}</td>
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
      tabel43: Actions.tabel43
    }, dispatch);
}

function mapStateToProps({ App, Spm }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        tabel_43: Spm.tabel_43
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(tabel43));
