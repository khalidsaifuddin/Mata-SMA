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
    Button,
    CardContent,
    Card,
    ListInput
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

class editPenerimaSPM extends Component {
    state = {
        error: null,
        loading: false,
        routeParams: {
            foo: 'bar',
            start: 0,
            limit: 20,
            pelayanan_dasar_id: this.$f7route.params['pelayanan_dasar_id']
        },
        penerima_spm: {
            tahun: '2020',
            kebutuhan: '0',
            ketersediaan: '0',
            selisih: '0',
            harga_satuan: '0',
            kebutuhan_biaya: '0'
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
        
        this.props.getPenerimaSPM(this.state.routeParams).then((result)=>{
            this.setState({
                penerima_spm: this.props.penerima_spm.rows[0]
            });
        });

    }

    setValue = (key) => (e) => {
        console.log(key);
        console.log(e);

        this.setState({
            penerima_spm: {
                ...this.state.penerima_spm,
                [key]: e.target.value
            }
        },()=>{
            // console.log(this.state.penerima_spm);

            switch (key) {
                case 'kebutuhan':
                    this.setState({
                        penerima_spm: {
                            ...this.state.penerima_spm,
                            selisih: parseInt(this.state.penerima_spm.kebutuhan) - parseInt(this.state.penerima_spm.ketersediaan),
                            kebutuhan_biaya: parseInt(this.state.penerima_spm.harga_satuan) * (parseInt(this.state.penerima_spm.kebutuhan) - parseInt(this.state.penerima_spm.ketersediaan))
                        }
                    });
                    break;
            
                case 'ketersediaan':
                    this.setState({
                        penerima_spm: {
                            ...this.state.penerima_spm,
                            selisih: parseInt(this.state.penerima_spm.kebutuhan) - parseInt(this.state.penerima_spm.ketersediaan),
                            kebutuhan_biaya: parseInt(this.state.penerima_spm.harga_satuan) * (parseInt(this.state.penerima_spm.kebutuhan) - parseInt(this.state.penerima_spm.ketersediaan))
                        }
                    });
                    break;
                
                case 'harga_satuan':
                    this.setState({
                        penerima_spm: {
                            ...this.state.penerima_spm,
                            selisih: parseInt(this.state.penerima_spm.kebutuhan) - parseInt(this.state.penerima_spm.ketersediaan),
                            kebutuhan_biaya: parseInt(this.state.penerima_spm.harga_satuan) * (parseInt(this.state.penerima_spm.kebutuhan) - parseInt(this.state.penerima_spm.ketersediaan))
                        }
                    });
                    break;
                
                default:
                    break;
            }
        });
    }

    simpan = () => {
        this.$f7.dialog.preloader();
        this.props.simpanPenerimaSPM(this.state.penerima_spm).then((result)=>{
            if(result.payload.sukses){
                //berhasil
                this.$f7router.navigate("/formPenerimaSPM");
                this.$f7.dialog.close();
            }else{
                //gagal
                this.$f7.dialog.close();
                this.$f7.dialog.alert('Terdapat kesalahan pada jaringan atau sistem. Mohon dicoba kembali dalam beberapa saat', 'Peringatan');
            }
        })
    }

    render()
    {
        return (
            <Page name="editPenerimaSPM" hideBarsOnScroll>
                <Navbar sliding={false} large backLink="Kembali">
                    <NavTitle sliding className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>Edit Kebutuhan Penerima SPM</NavTitle>
                    <NavTitleLarge style={{background:'#F6BC31', color:'white'}} className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>Edit Kebutuhan Penerima SPM</NavTitleLarge>
                </Navbar>
                <Row noGap>
                    <Col width="100" tabletWidth="50">
                        <Card>
                            <CardContent>
                                <List>
                                    <ListItem className="keteranganss">
                                        <h4>Pelayanan Dasar</h4>
                                        <h2>{this.state.penerima_spm.pelayanan_dasar}</h2>
                                    </ListItem>
                                    <ListItem className="keteranganss">
                                        <h4>Komponen Kebutuhan SPM</h4>
                                        <h2>{this.state.penerima_spm.komponen_kebutuhan_spm}</h2>
                                    </ListItem>
                                    <ListItem className="keteranganss">
                                        <h4>Sasaran SPM</h4>
                                        <h2>{this.state.penerima_spm.sasaran_spm}</h2>
                                    </ListItem>
                                    <ListItem className="keteranganss">
                                        <h4>Keluaran</h4>
                                        <h2>{this.state.penerima_spm.keluaran}</h2>
                                    </ListItem>
                                    
                                </List>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="100" tabletWidth="50">

                        <Card>
                            <CardContent>
                                <List>
                                    <ListInput
                                        label="Tahun"
                                        type="text"
                                        placeholder="tahun"
                                        clearButton
                                        value={this.state.penerima_spm.tahun}
                                        onChange={this.setValue('tahun')}
                                    >
                                        <i slot="media" className="f7-icons">square_list</i>
                                    </ListInput>
                                    <ListInput
                                        label="Kebutuhan"
                                        type="text"
                                        placeholder="kebutuhan"
                                        clearButton
                                        value={this.state.penerima_spm.kebutuhan}
                                        onChange={this.setValue('kebutuhan')}
                                    >
                                        <i slot="media" className="f7-icons">square_list</i>
                                    </ListInput>
                                    <ListInput
                                        label="Ketersediaan"
                                        type="text"
                                        placeholder="ketersediaan"
                                        clearButton
                                        value={this.state.penerima_spm.ketersediaan}
                                        onChange={this.setValue('ketersediaan')}
                                    >
                                        <i slot="media" className="f7-icons">square_list</i>
                                    </ListInput>
                                    <ListInput
                                        label="Selisih (Kebutuhan - ketersediaan)"
                                        type="text"
                                        placeholder="selisih"
                                        clearButton
                                        value={this.state.penerima_spm.selisih}
                                        // onChange={this.setValue('selisih')}
                                    >
                                        <i slot="media" className="f7-icons">square_list</i>
                                    </ListInput>
                                    <ListInput
                                        label="Harga Satuan"
                                        type="text"
                                        placeholder="Harga Satuan"
                                        clearButton
                                        value={this.state.penerima_spm.harga_satuan}
                                        onChange={this.setValue('harga_satuan')}
                                    >
                                        <i slot="media" className="f7-icons">square_list</i>
                                    </ListInput>
                                    <ListInput
                                        label="Kebutuhan Biaya (Harga Satuan x selisih)"
                                        type="text"
                                        placeholder="Kebutuhan Biaya"
                                        clearButton
                                        value={this.state.penerima_spm.kebutuhan_biaya}
                                        // onChange={this.setValue('kebutuhan_biaya')}
                                    >
                                        <i slot="media" className="f7-icons">square_list</i>
                                    </ListInput>
                                </List>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="100" tabletWidth="100">
                        <Button className="buttonSimpan color-theme-deeporange" raised fill large onClick={this.simpan}>
                            <i className="f7-icons icons">floppy_disk</i>&nbsp;
                            Simpan
                        </Button>
                    </Col>
                </Row>
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      updateWindowDimension: Actions.updateWindowDimension,
      setLoading: Actions.setLoading,
      setTabActive: Actions.setTabActive,
      getPenerimaSPM: Actions.getPenerimaSPM,
      simpanPenerimaSPM: Actions.simpanPenerimaSPM
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

export default (connect(mapStateToProps, mapDispatchToProps)(editPenerimaSPM));
