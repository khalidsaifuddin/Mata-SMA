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

class tabel21 extends Component {
    state = {
        error: null,
        loading: false,
        routeParams: {
            foo: 'bar',
            start: 0,
            limit: 20
        },
        tabel_21: {
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
        this.props.tabel21(this.state.routeParams).then((result)=>{
            this.setState({
                tabel_21: this.props.tabel_21
            },()=>{
                this.$f7.dialog.close();
            });
        });

    }

    render()
    {
        return (
            <Page name="tabel21" hideBarsOnScroll>
                <Navbar sliding={false} large backLink="Kembali">
                    <NavTitle sliding className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>Perhitungan Kebutuhan ATS</NavTitle>
                    <NavTitleLarge style={{background:'#F6BC31', color:'white'}} className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>Perhitungan Kebutuhan ATS</NavTitleLarge>
                    <NavRight>
                        <Button raised fill className="bawahCiriBiru" style={{display:'inline-flex', borderRadius:'20px'}} onClick={()=>this.$f7router.navigate('/form21/')}>
                           <i className="icons f7-icons">plus_square_fill</i>&nbsp;
                            Tambah Kebutuhan
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
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px'}}>&nbsp;</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'16px'}}>No</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'16px'}}>Faktor<br/>Tidak Bersekolah</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'16px'}}>Bentuk Pemenuhan<br/>Pelayanan Dasar</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'right', padding:'16px'}}>Jumlah<br/>Sasaran</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'right', padding:'16px'}}>Harga Satuan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink numeric-cell" : "numeric-cell"} style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'right', padding:'16px'}}>Besaran Biaya</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'left', padding:'16px'}}>Penanggung<br/>Jawab</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.tabel_21.rows.map((option)=>{
                                    return (
                                        <tr key={option.perhitungan_kebutuhan_ats_id}>
                                            <td>
                                                <Button raised fill style={{display:'inline-flex'}} onClick={()=>this.$f7router.navigate("/form21/"+option.perhitungan_kebutuhan_ats_id)}>
                                                    <i className="f7-icons icons" style={{fontSize:'20px'}}>pencil_circle</i>&nbsp;
                                                    Edit
                                                </Button>
                                            </td>
                                            <td>{(parseInt(this.state.tabel_21.rows.indexOf(option))+1)}</td>
                                            <td>{option.faktor_tidak_sekolah}</td>
                                            <td>{option.bentuk_pemenuhan_pelayanan_dasar}</td>
                                            <td style={{textAlign:'right'}}>{option.jumlah_sasaran ? this.formatAngka(parseInt(option.jumlah_sasaran)) : '0'}</td>
                                            <td style={{textAlign:'right', justifyContent:'space-between', alignItems:'center'}}>
                                                <div style={{float:'left'}}>
                                                    Rp
                                                </div>
                                                <div>
                                                    {option.harga_satuan ? this.formatAngka(parseInt(option.harga_satuan)) : '0'}
                                                </div>
                                            </td>
                                            <td style={{textAlign:'right', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                                <div>
                                                    Rp
                                                </div>
                                                <div>
                                                    {option.harga_satuan && option.jumlah_sasaran ? this.formatAngka(parseInt(option.harga_satuan)*parseInt(option.jumlah_sasaran)) : '0'}
                                                </div>
                                            </td>
                                            {/* <td style={{textAlign:'right'}}>{option.besaran_biaya ? this.formatAngka(parseInt(option.besaran_biaya)) : '0'}</td> */}
                                            <td>{option.penanggung_jawab}</td>
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
      tabel21: Actions.tabel21
    }, dispatch);
}

function mapStateToProps({ App, Spm }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        tabel_21: Spm.tabel_21
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(tabel21));
