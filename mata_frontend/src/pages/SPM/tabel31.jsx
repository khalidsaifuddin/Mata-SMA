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

class tabel31 extends Component {
    state = {
        error: null,
        loading: false,
        routeParams: {
            foo: 'bar',
            start: 0,
            limit: 20
        },
        tabel_31: {
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
        this.props.tabel31(this.state.routeParams).then((result)=>{
            this.setState({
                tabel_31: this.props.tabel_31
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
            <Page name="tabel31" hideBarsOnScroll>
                <Navbar sliding={false} large backLink="Kembali">
                    <NavTitle sliding className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>Pemenuhan Pelayanan Dasar ATS</NavTitle>
                    <NavTitleLarge style={{background:'#F6BC31', color:'white'}} className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>Pemenuhan Pelayanan Dasar ATS</NavTitleLarge>
                    <NavRight>
                        <Button raised fill className="bawahCiriBiru" style={{display:'inline-flex', borderRadius:'20px'}} onClick={()=>this.$f7router.navigate('/form31/')}>
                           <i className="icons f7-icons">plus_square_fill</i>&nbsp;
                            Tambah Pemenuhan
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
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'150px', border:'1px solid #cccccc'}} rowSpan="3">&nbsp;</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} rowSpan="3">No</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} rowSpan="3">Program</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} rowSpan="3">Outcome</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} rowSpan="3">Kegiatan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} rowSpan="3">Sub Kegiatan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} rowSpan="3">Keluaran (Output)</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} rowSpan="3">Satuan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} rowSpan="3">Jumlah Sasaran<br/>Pemenuhan (2019)</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} rowSpan="3">Alokasi<br/>Anggaran (2019)</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} rowSpan="3">Sumber<br/>Dana</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} colSpan="15">TARGET KINERJA PROGRAM PEMENUHAN PELAYANAN DASAR PENDIDIKAN DAN KERANGKA PENDANAAN</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'8px', border:'1px solid #cccccc'}} rowSpan="3">Kondisi Akhir 2024</th>
                                </tr>
                                <tr>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}} colSpan="3">2020</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}} colSpan="3">2021</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}} colSpan="3">2022</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}} colSpan="3">2023</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}} colSpan="3">2024</th>
                                </tr>
                                <tr>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'150px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>Target</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'150px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>Harga Satuan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'150px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>Rp (Juta)</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'150px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>Target</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'150px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>Harga Satuan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'150px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>Rp (Juta)</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'150px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>Target</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'150px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>Harga Satuan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'150px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>Rp (Juta)</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'150px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>Target</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'150px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>Harga Satuan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'150px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>Rp (Juta)</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'150px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>Target</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'150px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>Harga Satuan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'150px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'8px', border:'1px solid #cccccc'}}>Rp (Juta)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.tabel_31.rows.map((option)=>{
                                    return (
                                        <tr key={option.rencana_pemenuhan_pelayanan_dasar_ats_id}>
                                            <td>
                                                <Button raised fill style={{display:'inline-flex'}} onClick={()=>this.$f7router.navigate("/form31/"+option.rencana_pemenuhan_pelayanan_dasar_ats_id)}>
                                                    <i className="f7-icons icons" style={{fontSize:'20px'}}>pencil_circle</i>&nbsp;
                                                    Edit
                                                </Button>
                                                {/* <Button className={'color-theme-red'} raised fill style={{display:'inline-flex', marginLeft:'4px', boxShadow:'0px 5px 0px #bc2a01'}} onClick={()=>this.hapus(option.rencana_pemenuhan_pelayanan_dasar_ats_id)}>
                                                    <i className="f7-icons icons" style={{fontSize:'20px'}}>trash</i>&nbsp;
                                                </Button> */}
                                            </td>
                                            <td>{(parseInt(this.state.tabel_31.rows.indexOf(option))+1)}</td>
                                            <td>{option.program}</td>
                                            <td>{option.outcame}</td>
                                            <td>{option.kegiatan}</td>
                                            <td>{option.sub_kegiatan}</td>
                                            <td>{option.keluaran_output}</td>
                                            <td>{option.satuan}</td>
                                            <td>{option.jumlah_sasaran_pemenuhan_n}</td>
                                            <td>{option.alokasi_anggaran_n}</td>
                                            <td>{option.sumber_dana}</td>
                                            <td style={{textAlign:'right', justifyContent:'space-between', alignItems:'center'}}>
                                                <div style={{float:'left'}}>
                                                    
                                                </div>
                                                <div>
                                                    {option.target_n1 ? this.formatAngka(parseInt(option.target_n1)) : '0'}
                                                </div>
                                            </td>
                                            <td style={{textAlign:'right', justifyContent:'space-between', alignItems:'center'}}>
                                                <div style={{float:'left'}}>
                                                    Rp
                                                </div>
                                                <div>
                                                    {option.harga_satuan_n1 ? this.formatAngka(parseInt(option.harga_satuan_n1)) : '0'}
                                                </div>
                                            </td>
                                            <td style={{textAlign:'right', justifyContent:'space-between', alignItems:'center'}}>
                                                <div style={{float:'left'}}>
                                                    Rp
                                                </div>
                                                <div>
                                                    {option.target_n1 && option.harga_satuan_n1 ? this.formatAngka(parseInt(option.target_n1)*parseInt(option.harga_satuan_n1)) : '0'}
                                                </div>
                                            </td>
                                            
                                            <td style={{textAlign:'right', justifyContent:'space-between', alignItems:'center'}}>
                                                <div style={{float:'left'}}>
                                                    
                                                </div>
                                                <div>
                                                    {option.target_n2 ? this.formatAngka(parseInt(option.target_n2)) : '0'}
                                                </div>
                                            </td>
                                            <td style={{textAlign:'right', justifyContent:'space-between', alignItems:'center'}}>
                                                <div style={{float:'left'}}>
                                                    Rp
                                                </div>
                                                <div>
                                                    {option.harga_satuan_n2 ? this.formatAngka(parseInt(option.harga_satuan_n2)) : '0'}
                                                </div>
                                            </td>
                                            <td style={{textAlign:'right', justifyContent:'space-between', alignItems:'center'}}>
                                                <div style={{float:'left'}}>
                                                    Rp
                                                </div>
                                                <div>
                                                    {option.target_n2 && option.harga_satuan_n2 ? this.formatAngka(parseInt(option.target_n2)*parseInt(option.harga_satuan_n2)) : '0'}
                                                </div>
                                            </td>

                                            <td style={{textAlign:'right', justifyContent:'space-between', alignItems:'center'}}>
                                                <div style={{float:'left'}}>
                                                    
                                                </div>
                                                <div>
                                                    {option.target_n3 ? this.formatAngka(parseInt(option.target_n3)) : '0'}
                                                </div>
                                            </td>
                                            <td style={{textAlign:'right', justifyContent:'space-between', alignItems:'center'}}>
                                                <div style={{float:'left'}}>
                                                    Rp
                                                </div>
                                                <div>
                                                    {option.harga_satuan_n3 ? this.formatAngka(parseInt(option.harga_satuan_n3)) : '0'}
                                                </div>
                                            </td>
                                            <td style={{textAlign:'right', justifyContent:'space-between', alignItems:'center'}}>
                                                <div style={{float:'left'}}>
                                                    Rp
                                                </div>
                                                <div>
                                                    {option.target_n3 && option.harga_satuan_n3 ? this.formatAngka(parseInt(option.target_n3)*parseInt(option.harga_satuan_n3)) : '0'}
                                                </div>
                                            </td>

                                            <td style={{textAlign:'right', justifyContent:'space-between', alignItems:'center'}}>
                                                <div style={{float:'left'}}>
                                                    
                                                </div>
                                                <div>
                                                    {option.target_n4 ? this.formatAngka(parseInt(option.target_n4)) : '0'}
                                                </div>
                                            </td>
                                            <td style={{textAlign:'right', justifyContent:'space-between', alignItems:'center'}}>
                                                <div style={{float:'left'}}>
                                                    Rp
                                                </div>
                                                <div>
                                                    {option.harga_satuan_n4 ? this.formatAngka(parseInt(option.harga_satuan_n4)) : '0'}
                                                </div>
                                            </td>
                                            <td style={{textAlign:'right', justifyContent:'space-between', alignItems:'center'}}>
                                                <div style={{float:'left'}}>
                                                    Rp
                                                </div>
                                                <div>
                                                    {option.target_n4 && option.harga_satuan_n4 ? this.formatAngka(parseInt(option.target_n4)*parseInt(option.harga_satuan_n4)) : '0'}
                                                </div>
                                            </td>

                                            <td style={{textAlign:'right', justifyContent:'space-between', alignItems:'center'}}>
                                                <div style={{float:'left'}}>
                                                    
                                                </div>
                                                <div>
                                                    {option.target_n5 ? this.formatAngka(parseInt(option.target_n5)) : '0'}
                                                </div>
                                            </td>
                                            <td style={{textAlign:'right', justifyContent:'space-between', alignItems:'center'}}>
                                                <div style={{float:'left'}}>
                                                    Rp
                                                </div>
                                                <div>
                                                    {option.harga_satuan_n5 ? this.formatAngka(parseInt(option.harga_satuan_n5)) : '0'}
                                                </div>
                                            </td>
                                            <td style={{textAlign:'right', justifyContent:'space-between', alignItems:'center'}}>
                                                <div style={{float:'left'}}>
                                                    Rp
                                                </div>
                                                <div>
                                                    {option.target_n5 && option.harga_satuan_n5 ? this.formatAngka(parseInt(option.target_n5)*parseInt(option.harga_satuan_n5)) : '0'}
                                                </div>
                                            </td>

                                            <td style={{textAlign:'right', justifyContent:'space-between', alignItems:'center'}}>
                                                <div style={{float:'left'}}>
                                                    Rp
                                                </div>
                                                <div>
                                                    {option.kondisi_akhir_n5 ? this.formatAngka(parseInt(option.kondisi_akhir_n5)) : '0'}
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
      tabel31: Actions.tabel31
    }, dispatch);
}

function mapStateToProps({ App, Spm }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        tabel_31: Spm.tabel_31
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(tabel31));
