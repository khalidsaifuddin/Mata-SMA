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

class formRencanaPemenuhanSPM extends Component {
    state = {
        error: null,
        loading: false,
        routeParams: {
            foo: 'bar',
            start: 0,
            limit: 20
        },
        rencana_pemenuhan_spm: {
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
        
        this.props.rootRencanaPemenuhanSPM(this.state.routeParams).then((result)=>{
            this.setState({
                rencana_pemenuhan_spm: this.props.rencana_pemenuhan_spm
            },()=>{
                this.$f7.dialog.close();
            });
        });

    }

    render()
    {
        return (
            <Page name="formRencanaPemenuhanSPM" hideBarsOnScroll>
                <Navbar sliding={false} large backLink="Kembali">
                    <NavTitle sliding className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>Rencana Pemenuhan SPM</NavTitle>
                    <NavTitleLarge style={{background:'#F6BC31', color:'white'}} className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>Rencana Pemenuhan SPM</NavTitleLarge>
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
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} rowSpan="3" style={{minWidth:'40px'}}>&nbsp;</th>
                                    {/* <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} rowSpan="3" style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'16px'}}>Urut</th> */}
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} rowSpan="3" style={{minWidth:'300px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'16px'}}>Program/Outcome/Kegiatan<br/>/Sub Kegiatan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} rowSpan="3" style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'16px'}}>Keluaran<br/>(Output)</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} rowSpan="3" style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'16px'}}>Satuan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} rowSpan="3" style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'16px'}}>Jumlah Sasaran<br/>Pemenuhan (2019)</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} rowSpan="3" style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'16px'}}>Alokasi<br/>Anggaran (2019)</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} rowSpan="3" style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'16px'}}>Sumber Dana</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} colSpan="15" style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'16px'}}>TARGET KINERJA PROGRAM PEMENUHAN PELAYANAN DASAR PENDIDIKAN DAN KERANGKA PENDANAAN</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} rowSpan="3" style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'16px'}}>Kondisi<br/>Akhir 2024</th>
                                </tr>
                                <tr>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} colSpan="3" style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'16px'}}>2020</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} colSpan="3" style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'16px'}}>2021</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} colSpan="3" style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'16px'}}>2022</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} colSpan="3" style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'16px'}}>2023</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} colSpan="3" style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'16px'}}>2024</th>
                                </tr>
                                <tr>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'16px'}}>Target</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'16px'}}>Harga Satuan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'16px'}}>Rp (Juta)</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'16px'}}>Target</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'16px'}}>Harga Satuan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'16px'}}>Rp (Juta)</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'16px'}}>Target</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'16px'}}>Harga Satuan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'16px'}}>Rp (Juta)</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'16px'}}>Target</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'16px'}}>Harga Satuan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'16px'}}>Rp (Juta)</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'16px'}}>Target</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'16px'}}>Harga Satuan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell th-judul"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center', padding:'16px'}}>Rp (Juta)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.rencana_pemenuhan_spm.rows.map((option)=>{
                                    return (
                                        <>
                                        <tr key={option.kegiatan_id}>
                                            <td></td>
                                            <td colSpan="22">{option.nama_kegiatan}</td>
                                        </tr>
                                        {option.children.rows.map((optionChildren1)=>{
                                            return (
                                                <>
                                                <tr key={optionChildren1.kegiatan_id}>
                                                    <td></td>
                                                    <td colSpan="22">
                                                        {/* <Row noGap> */}
                                                            <div className="arrow1">
                                                                <i className="f7-icons icons" style={{fontSize:'14px',marginRight:'16px',color:'#cccccc'}}>play_fill</i>&nbsp;
                                                            </div>
                                                            <div className="konten1">
                                                                {optionChildren1.nama_kegiatan}
                                                            </div>
                                                        {/* </Row> */}
                                                    </td>
                                                </tr>
                                                {optionChildren1.children.rows.map((optionChildren2)=>{
                                                    return (
                                                        <>
                                                            <tr key={optionChildren2.kegiatan_id}>
                                                                <td>
                                                                    <Button raised fill style={{display:'inline-flex'}} onClick={()=>this.$f7router.navigate("/editRencanaPemenuhanSPM/"+optionChildren2.kegiatan_id)}>
                                                                        <i className="f7-icons icons" style={{fontSize:'20px'}}>pencil_circle</i>&nbsp;
                                                                        Edit
                                                                    </Button>
                                                                </td>
                                                                <td>
                                                                    <div className="arrow2">
                                                                        <i className="f7-icons icons" style={{fontSize:'14px',marginRight:'16px',color:'#cccccc'}}>play_fill</i>&nbsp;
                                                                    </div>
                                                                    <div className="konten2">
                                                                        {optionChildren2.nama_kegiatan}
                                                                    </div>
                                                                    {/* <i className="f7-icons icons" style={{fontSize:'14px',marginRight:'16px',color:'#cccccc', marginLeft:'32px'}}>play_fill</i>&nbsp;
                                                                    {optionChildren2.nama_kegiatan} */}
                                                                </td>
                                                                <td>{optionChildren2.output_outcome}</td>
                                                                <td>{optionChildren2.satuan}</td>
                                                                <td style={{textAlign:'right'}}>{optionChildren2.jumlah_sasaran_pemenuhan_n ? this.formatAngka(optionChildren2.jumlah_sasaran_pemenuhan_n) : 0}</td>
                                                                <td style={{textAlign:'right'}}>{optionChildren2.alokasi_anggaran_n ? this.formatAngka(optionChildren2.alokasi_anggaran_n) : 0}</td>
                                                                <td style={{textAlign:'left'}}>{optionChildren2.sumber_dana ? optionChildren2.sumber_dana : '-'}</td>
                                                                <td style={{textAlign:'right'}}>{optionChildren2.target_n1 ? this.formatAngka(optionChildren2.target_n1) : 0}</td>
                                                                <td style={{textAlign:'right'}}>{optionChildren2.harga_satuan_n1 ? this.formatAngka(optionChildren2.harga_satuan_n1) : 0}</td>
                                                                <td style={{textAlign:'right'}}>{optionChildren2.target_n1 && optionChildren2.harga_satuan_n1 ? this.formatAngka(parseInt(optionChildren2.target_n1)*parseInt(optionChildren2.harga_satuan_n1)) : 0}</td>
                                                                <td style={{textAlign:'right'}}>{optionChildren2.target_n2 ? this.formatAngka(optionChildren2.target_n2) : 0}</td>
                                                                <td style={{textAlign:'right'}}>{optionChildren2.harga_satuan_n2 ? this.formatAngka(optionChildren2.harga_satuan_n2) : 0}</td>
                                                                <td style={{textAlign:'right'}}>{optionChildren2.target_n2 && optionChildren2.harga_satuan_n2 ? this.formatAngka(parseInt(optionChildren2.target_n2)*parseInt(optionChildren2.harga_satuan_n2)) : 0}</td>
                                                                <td style={{textAlign:'right'}}>{optionChildren2.target_n3 ? this.formatAngka(optionChildren2.target_n3) : 0}</td>
                                                                <td style={{textAlign:'right'}}>{optionChildren2.harga_satuan_n3 ? this.formatAngka(optionChildren2.harga_satuan_n3) : 0}</td>
                                                                <td style={{textAlign:'right'}}>{optionChildren2.target_n3 && optionChildren2.harga_satuan_n3 ? this.formatAngka(parseInt(optionChildren2.target_n3)*parseInt(optionChildren2.harga_satuan_n3)) : 0}</td>
                                                                <td style={{textAlign:'right'}}>{optionChildren2.target_n4 ? this.formatAngka(optionChildren2.target_n4) : 0}</td>
                                                                <td style={{textAlign:'right'}}>{optionChildren2.harga_satuan_n4 ? this.formatAngka(optionChildren2.harga_satuan_n4) : 0}</td>
                                                                <td style={{textAlign:'right'}}>{optionChildren2.target_n4 && optionChildren2.harga_satuan_n4 ? this.formatAngka(parseInt(optionChildren2.target_n4)*parseInt(optionChildren2.harga_satuan_n4)) : 0}</td>
                                                                <td style={{textAlign:'right'}}>{optionChildren2.target_n5 ? this.formatAngka(optionChildren2.target_n5) : 0}</td>
                                                                <td style={{textAlign:'right'}}>{optionChildren2.harga_satuan_n5 ? this.formatAngka(optionChildren2.harga_satuan_n5) : 0}</td>
                                                                <td style={{textAlign:'right'}}>{optionChildren2.target_n5 && optionChildren2.harga_satuan_n5 ? this.formatAngka(parseInt(optionChildren2.target_n5)*parseInt(optionChildren2.harga_satuan_n5)) : 0}</td>
                                                                <td style={{textAlign:'right'}}>{optionChildren2.kondisi_akhir_n5 ? this.formatAngka(optionChildren2.kondisi_akhir_n5) : 0}</td>
                                                            </tr>
                                                        </>
                                                    )
                                                })}
                                                </>
                                            )
                                        })}
                                        </>
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
      rootRencanaPemenuhanSPM: Actions.rootRencanaPemenuhanSPM
    }, dispatch);
}

function mapStateToProps({ App, Spm }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        rencana_pemenuhan_spm: Spm.rencana_pemenuhan_spm
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(formRencanaPemenuhanSPM));
