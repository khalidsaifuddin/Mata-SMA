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
    Card,
    CardContent,
    ListInput
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

class form41 extends Component {
    state = {
        error: null,
        loading: false,
        routeParams: {
            foo: 'bar',
            start: 0,
            limit: 20,
            realisasi_pencapaian_pemenuhan_pelayanan_dasar_ats_id: this.$f7route.params['realisasi_pencapaian_pemenuhan_pelayanan_dasar_ats_id'] ? this.$f7route.params['realisasi_pencapaian_pemenuhan_pelayanan_dasar_ats_id'] : null
        },
        tabel_41: {}
    }


    formatAngka = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    klikNext = () => {
        
    }
    
    klikPrev = () => {
        
    }

    setSelectValue = (b) => (key) => {
        console.log(b);
        console.log(key);

        this.setState({
            tabel_41: {
                ...this.state.tabel_41,
                [b]: key.target.value
            }
        },()=>{
            console.log(this.state.tabel_41);
        });
    }

    componentDidMount = () => {
        
        if(this.state.routeParams.realisasi_pencapaian_pemenuhan_pelayanan_dasar_ats_id){
            this.$f7.dialog.preloader();

            this.props.tabel41(this.state.routeParams).then((result)=>{
                this.setState({
                    tabel_41: this.props.tabel_41.rows[0]
                },()=>{
                    this.$f7.dialog.close();
                });
            });

        }

        this.props.getDinas(this.state.routeParams);

    }


    setValue = (key) => (e) => {

        this.setState({
            tabel_41: {
                ...this.state.tabel_41,
                [key]: e.target.value
            }
        },()=>{
            switch (key) {
                case 'target_n5':
                    this.setState({
                        tabel_41: {
                            ...this.state.tabel_41,
                            kondisi_akhir_n5: (parseInt(this.state.tabel_41.target_n5)*parseInt(this.state.tabel_41.harga_satuan_n5))
                        }
                    });
                    break;
            
                case 'harga_satuan_n5':
                    this.setState({
                        tabel_41: {
                            ...this.state.tabel_41,
                            kondisi_akhir_n5: (parseInt(this.state.tabel_41.target_n5)*parseInt(this.state.tabel_41.harga_satuan_n5))
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
        this.props.simpantabel41(this.state.tabel_41).then((result)=>{
            if(result.payload.sukses){
                //berhasil
                this.$f7router.navigate("/tabel41/");
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
            <Page name="form41" hideBarsOnScroll>
                <Navbar sliding={false} large backLink="Kembali">
                    <NavTitle sliding className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>Tambah Pemenuhan Pelayanan Dasar ATS</NavTitle>
                    <NavTitleLarge style={{background:'#F6BC31', color:'white'}} className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>Tambah Pemenuhan Pelayanan Dasar ATS</NavTitleLarge>
                </Navbar>
                <Row noGap>
                    <Col width="0" tabletWidth="15"></Col>
                    <Col width="100" tabletWidth="70">
                        <Card>
                            <CardContent>
                                <List>
                                    <ListInput
                                        label="Keluaran"
                                        type="text"
                                        placeholder="Keluaran"
                                        clearButton
                                        value={this.state.tabel_41.keluaran}
                                        onChange={this.setValue('keluaran')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="Satuan"
                                        type="text"
                                        placeholder="Satuan"
                                        clearButton
                                        value={this.state.tabel_41.satuan}
                                        onChange={this.setValue('satuan')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="volume"
                                        type="number"
                                        placeholder="volume"
                                        clearButton
                                        value={this.state.tabel_41.volume}
                                        onChange={this.setValue('volume')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="Rupiah"
                                        type="number"
                                        placeholder="Rupiah"
                                        clearButton
                                        value={this.state.tabel_41.rupiah}
                                        onChange={this.setValue('rupiah')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="Realisasi"
                                        type="number"
                                        placeholder="Realisasi"
                                        clearButton
                                        value={this.state.tabel_41.realisasi}
                                        onChange={this.setValue('realisasi')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="capaian"
                                        type="number"
                                        placeholder="capaian"
                                        clearButton
                                        value={this.state.tabel_41.capaian}
                                        onChange={this.setValue('capaian')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="fisik"
                                        type="number"
                                        placeholder="fisik"
                                        clearButton
                                        value={this.state.tabel_41.fisik}
                                        onChange={this.setValue('fisik')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="keuangan"
                                        type="number"
                                        placeholder="keuangan"
                                        clearButton
                                        value={this.state.tabel_41.keuangan}
                                        onChange={this.setValue('keuangan')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="sumber_dana"
                                        type="text"
                                        placeholder="sumber_dana"
                                        clearButton
                                        value={this.state.tabel_41.sumber_dana}
                                        onChange={this.setValue('sumber_dana')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="permasalahan"
                                        type="text"
                                        placeholder="permasalahan"
                                        clearButton
                                        value={this.state.tabel_41.permasalahan}
                                        onChange={this.setValue('permasalahan')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="solusi"
                                        type="text"
                                        placeholder="solusi"
                                        clearButton
                                        value={this.state.tabel_41.solusi}
                                        onChange={this.setValue('solusi')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                </List>
                                
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardContent>
                                <Button className="buttonSimpan color-theme-deeporange" raised fill large onClick={this.simpan}>
                                    <i className="f7-icons icons">floppy_disk</i>&nbsp;
                                    Simpan
                                </Button>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="0" tabletWidth="15"></Col>
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
      tabel41: Actions.tabel41,
      getDinas: Actions.getDinas,
      simpantabel41: Actions.simpantabel41
    }, dispatch);
}

function mapStateToProps({ App, Spm }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        tabel_41: Spm.tabel_41,
        dinas: Spm.dinas
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(form41));
