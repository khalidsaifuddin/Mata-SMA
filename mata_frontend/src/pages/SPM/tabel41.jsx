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

class tabel41 extends Component {
    state = {
        error: null,
        loading: false,
        routeParams: {
            foo: 'bar',
            start: 0,
            limit: 20
        },
        tabel_41: {
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
        this.props.tabel41(this.state.routeParams).then((result)=>{
            this.setState({
                tabel_41: this.props.tabel_41
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
            <Page name="tabel41" hideBarsOnScroll>
                <Navbar sliding={false} large backLink="Kembali">
                    <NavTitle sliding className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>Realisasi Pencapaian Pelayanan Dasar ATS</NavTitle>
                    <NavTitleLarge style={{background:'#F6BC31', color:'white'}} className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>Realisasi Pencapaian Pelayanan Dasar ATS</NavTitleLarge>
                    <NavRight>
                        <Button raised fill className="bawahCiriBiru" style={{display:'inline-flex', borderRadius:'20px'}} onClick={()=>this.$f7router.navigate('/form41/')}>
                           <i className="icons f7-icons">plus_square_fill</i>&nbsp;
                            Tambah Realisasi
                        </Button>
                    </NavRight>
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
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'150px', border:'1px solid #cccccc'}} rowSpan="2">&nbsp;</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} rowSpan="2">No</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} rowSpan="2">Keluaran (Output)</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} rowSpan="2">Satuan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'100px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}} colSpan="2">Target</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'100px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}} colSpan="2">Realisasi</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'100px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}} colSpan="2">Capaian (%)</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} rowSpan="2">Sumber Dana</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} rowSpan="2">Permasalahan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} rowSpan="2">Solusi</th>
                                </tr>
                                <tr>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'100px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>Volume</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'100px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>Rp</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'100px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>Volume</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'100px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>Rp</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'100px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>Fisik</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'100px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>Keuangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.tabel_41.rows.map((option)=>{
                                    return (
                                        <tr key={option.realisasi_pencapaian_pemenuhan_pelayanan_dasar_ats_id}>
                                            <td>
                                                <Button raised fill style={{display:'inline-flex'}} onClick={()=>this.$f7router.navigate("/form41/"+option.realisasi_pencapaian_pemenuhan_pelayanan_dasar_ats_id)}>
                                                    <i className="f7-icons icons" style={{fontSize:'20px'}}>pencil_circle</i>&nbsp;
                                                    Edit
                                                </Button>
                                            </td>
                                            <td>{(parseInt(this.state.tabel_41.rows.indexOf(option))+1)}</td>
                                            <td>{option.keluaran}</td>
                                            <td>{option.satuan}</td>
                                            <td>{option.volume}</td>
                                            <td>{option.rupiaj}</td>
                                            <td>{option.realisasi}</td>
                                            <td>{option.capaian}</td>
                                            <td>{option.fisik}</td>
                                            <td>{option.keuangan}</td>
                                            <td>{option.sumber_dana}</td>
                                            <td>{option.permasalahan}</td>
                                            <td>{option.solusi}</td>
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
      tabel41: Actions.tabel41
    }, dispatch);
}

function mapStateToProps({ App, Spm }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        tabel_41: Spm.tabel_41
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(tabel41));
