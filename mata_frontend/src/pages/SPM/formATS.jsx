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

class formATS extends Component {
    state = {
        error: null,
        loading: true,
        routeParams: {
            foo: 'bar',
            start: 0,
            limit: 20
        },
        anak_tidak_sekolah: {
            rows: [],
            total: 0
        }
    }


    formatAngka = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    klikNext = () => {
        // alert('tes');
        
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: (parseInt(this.state.routeParams.start) + parseInt(this.state.routeParams.limit))
            }
        },()=>{
            this.props.getAnakTidakSekolah(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false,
                    anak_tidak_sekolah: this.props.anak_tidak_sekolah
                });
            });
        });
    }
    
    klikPrev = () => {
        // alert('tes');
        
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: (parseInt(this.state.routeParams.start) - parseInt(this.state.routeParams.limit))
            }
        },()=>{
            this.props.getAnakTidakSekolah(this.state.routeParams).then((result)=>{
                this.setState({
                    ...this.state,
                    loading: false,
                    anak_tidak_sekolah: this.props.anak_tidak_sekolah
                });
            });
        });
    }

    componentDidMount = () => {
        
        for (var property in this.props.tabBar) {
            // console.log(this.state.tabBar[property]);
            this.props.tabBar[property] = false;
        }
        
        this.props.tabBar.kategori = true;
        
        this.props.setTabActive(this.props.tabBar);
        console.log(this.props.tabBar);

        this.props.getAnakTidakSekolah(this.state.routeParams).then((result)=>{
            this.setState({
                loading: false,
                anak_tidak_sekolah: this.props.anak_tidak_sekolah
            });
        });
    }

    render()
    {
        return (
            <Page name="formATS" hideBarsOnScroll>
                <Navbar sliding={false} large backLink="Kembali">
                    <NavTitle sliding className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>Anak Tidak Sekolah</NavTitle>
                    <NavTitleLarge style={{background:'#F6BC31', color:'white'}} className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>Anak Tidak Sekolah</NavTitleLarge>
                </Navbar>
                <Block strong style={{
                    marginTop:'0px', 
                    paddingLeft:'0px', 
                    paddingRight:'0px', 
                    paddingTop:'0px', 
                    paddingBottom:'0px'
                }}>
                    <div className="data-table-footer" style={{display:'block'}}>
                        <div className="data-table-pagination">
                            <a onClick={this.klikPrev} href="#" className={"link "+(this.state.routeParams.start < 1 ? "disabled" : "" )}>
                                <i class="icon icon-prev color-gray"></i>
                            </a>
                            <a onClick={this.klikNext} href="#" className={"link "+((parseInt(this.state.routeParams.start)+20) > parseInt(this.props.anak_tidak_sekolah.total) ? "disabled" : "" )}>
                                <i className="icon icon-next color-gray"></i>
                            </a>
                            <span className="data-table-pagination-label">{(this.state.routeParams.start+1)}-{(this.state.routeParams.start)+parseInt(this.state.routeParams.limit)} dari {this.formatAngka(this.props.anak_tidak_sekolah.total)} Anak Tidak Sekolah</span>
                        </div>
                    </div>
                    <div className="data-table" style={{overflowY:'hidden'}}>
                        <table>
                            <thead style={{background:'#eeeeee'}}>
                                <tr>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'40px'}}>&nbsp;</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'40px', color:'#434343', fontSize:'15px', textAlign:'center'}}>No</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'center'}}>Status</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'center'}}>Nama</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'120px', color:'#434343', fontSize:'15px', textAlign:'center'}}>NIK</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'120px', color:'#434343', fontSize:'15px', textAlign:'center'}}>No KK</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'120px', color:'#434343', fontSize:'15px', textAlign:'center'}}>Jenis Kelamin</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'120px', color:'#434343', fontSize:'15px', textAlign:'center'}}>Tempat Lahir</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'120px', color:'#434343', fontSize:'15px', textAlign:'center'}}>Tanggal Lahir</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'120px', color:'#434343', fontSize:'15px', textAlign:'center'}}>Alamat</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'120px', color:'#434343', fontSize:'15px', textAlign:'center'}}>Desa Kelurahan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'center'}}>Kecamatan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'center'}}>Kabupaten/Kota</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'200px', color:'#434343', fontSize:'15px', textAlign:'center'}}>Provinsi</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'120px', color:'#434343', fontSize:'15px', textAlign:'center'}}>Nama Ibu Kandung</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'120px', color:'#434343', fontSize:'15px', textAlign:'center'}}>Kondisi Ekonomi<br/>(Miskin/Tidak Miskin)</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'120px', color:'#434343', fontSize:'15px', textAlign:'center'}}>Berkebutuhan Khusus<br/>(Ya/Tidak)</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'120px', color:'#434343', fontSize:'15px', textAlign:'center'}}>Jenis kebutuhan Khusus<br/>(Jika Ya)</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} colSpan="4" style={{minWidth:'120px', color:'#434343', fontSize:'15px', textAlign:'center'}}>Faktor Tidak Bersekolah</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'120px', color:'#434343', fontSize:'15px', textAlign:'center'}}>Uraian Faktor<br/>Tidak Bersekolah<br/>(Jika lainnya)</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'120px', color:'#434343', fontSize:'15px', textAlign:'center'}}>Rencana Melanjutkan<br/>Sekolah ke<br/>(PAUD/SD/SMP/Kesetaraan)</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'120px', color:'#434343', fontSize:'15px', textAlign:'center'}}>Nama<br/>Satuan Pendidikan</th>
                                    <th className={this.state.loading ? "skeleton-text skeleton-effect-blink label-cell" : "label-cell"} rowSpan="2" style={{minWidth:'120px', color:'#434343', fontSize:'15px', textAlign:'center'}}>NPSN</th>
                                </tr>
                                <tr>
                                    <th className="numeric-cell">Miskin</th>
                                    <th className="numeric-cell">Akses Tidak Terjangkau</th>
                                    <th className="numeric-cell">Kondisi Bencana</th>
                                    <th className="numeric-cell">Lainnya</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.anak_tidak_sekolah.rows.map((option)=>{
                                    return (
                                        <tr key={option.nik}>
                                            <td>
                                                <Button raised fill style={{background:(option.status_ats_id ? '#cccccc' : '#007AFF'), color:(option.status_ats_id ? '#434343' : '#ffffff')}} onClick={()=>this.$f7router.navigate("/verifikasiAts/"+option.nik)}>
                                                    <i className="icon f7-icons" style={{fontSize:'20px'}}>checkmark_rectangle</i>&nbsp;&nbsp;{(option.status_ats_id ? 'Terverifikasi' : 'Verifikasi')}
                                                </Button>
                                            </td>
                                            <td className="numeric-cell">{option.urutan}</td>
                                            {/* <td className="numeric-cell">{(parseInt(this.props.anak_tidak_sekolah.rows.indexOf(option))+1)}</td> */}
                                            <td className="label-cell">
                                                {option.status_ats}
                                            </td>
                                            <td className="label-cell">
                                                {option.nama}
                                            </td>
                                            <td className="label-cell">
                                                {option.nik}
                                            </td>
                                            <td className="label-cell">
                                                {option.no_kk}
                                            </td>
                                            <td className="label-cell">
                                                {option.jk}
                                            </td>
                                            <td className="label-cell">
                                                {option.tempat_lahir}
                                            </td>
                                            <td className="label-cell">
                                                {option.tanggal_lahir}
                                            </td>
                                            <td className="label-cell">
                                                {option.alamat}
                                            </td>
                                            <td className="label-cell">
                                                {option.desa_kelurahan}
                                            </td>
                                            <td className="label-cell">
                                                {option.kecamatan}
                                            </td>
                                            <td className="label-cell">
                                                {option.kabkota}
                                            </td>
                                            <td className="label-cell">
                                                {option.provinsi}
                                            </td>
                                            <td className="label-cell">
                                                {option.nama_ibu_kandung}  
                                            </td>
                                            <td className="label-cell">
                                                {'-'}
                                            </td>
                                            <td className="label-cell">
                                                {'-'}
                                            </td>
                                            <td className="label-cell">
                                                {'-'}
                                            </td>
                                            <td className="label-cell">
                                                {'-'}
                                            </td>
                                            <td className="label-cell">
                                                {'-'}
                                            </td>
                                            <td className="label-cell">
                                                {'-'}
                                            </td>
                                            <td className="label-cell">
                                                {'-'}
                                            </td>
                                            <td className="label-cell">
                                                {'-'}
                                            </td>
                                            <td className="label-cell">
                                                {'-'}
                                            </td>
                                            <td className="label-cell">
                                                {'-'}
                                            </td>
                                            <td className="label-cell">
                                                {'-'}
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
      getAnakTidakSekolah: Actions.getAnakTidakSekolah
    }, dispatch);
}

function mapStateToProps({ App, Spm }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        anak_tidak_sekolah: Spm.anak_tidak_sekolah
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(formATS));
