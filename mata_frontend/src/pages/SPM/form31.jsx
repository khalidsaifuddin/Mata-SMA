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

class form31 extends Component {
    state = {
        error: null,
        loading: false,
        routeParams: {
            foo: 'bar',
            start: 0,
            limit: 20,
            rencana_pemenuhan_pelayanan_dasar_ats_id: this.$f7route.params['rencana_pemenuhan_pelayanan_dasar_ats_id'] ? this.$f7route.params['rencana_pemenuhan_pelayanan_dasar_ats_id'] : null
        },
        tabel_31: {}
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
            tabel_31: {
                ...this.state.tabel_31,
                [b]: key.target.value
            }
        },()=>{
            console.log(this.state.tabel_31);
        });
    }

    componentDidMount = () => {
        
        if(this.state.routeParams.rencana_pemenuhan_pelayanan_dasar_ats_id){
            this.$f7.dialog.preloader();

            this.props.tabel31(this.state.routeParams).then((result)=>{
                this.setState({
                    tabel_31: this.props.tabel_31.rows[0]
                },()=>{
                    this.$f7.dialog.close();
                });
            });

        }

        this.props.getDinas(this.state.routeParams);

    }


    setValue = (key) => (e) => {

        this.setState({
            tabel_31: {
                ...this.state.tabel_31,
                [key]: e.target.value
            }
        },()=>{
            switch (key) {
                case 'target_n5':
                    this.setState({
                        tabel_31: {
                            ...this.state.tabel_31,
                            kondisi_akhir_n5: (parseInt(this.state.tabel_31.target_n5)*parseInt(this.state.tabel_31.harga_satuan_n5))
                        }
                    });
                    break;
            
                case 'harga_satuan_n5':
                    this.setState({
                        tabel_31: {
                            ...this.state.tabel_31,
                            kondisi_akhir_n5: (parseInt(this.state.tabel_31.target_n5)*parseInt(this.state.tabel_31.harga_satuan_n5))
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
        this.props.simpanTabel31(this.state.tabel_31).then((result)=>{
            if(result.payload.sukses){
                //berhasil
                this.$f7router.navigate("/tabel31/");
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
            <Page name="form31" hideBarsOnScroll>
                <Navbar sliding={false} large backLink="Kembali">
                    <NavTitle sliding className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>Pemenuhan Pelayanan Dasar ATS</NavTitle>
                    <NavTitleLarge style={{background:'#F6BC31', color:'white'}} className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>Pemenuhan Pelayanan Dasar ATS</NavTitleLarge>
                </Navbar>
                <Row noGap>
                    <Col width="0" tabletWidth="15"></Col>
                    <Col width="100" tabletWidth="70">
                        <Card>
                            <CardContent>
                                <List>
                                    <ListInput
                                        label="Program"
                                        type="text"
                                        placeholder="program"
                                        clearButton
                                        value={this.state.tabel_31.program}
                                        onChange={this.setValue('program')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="Outcome"
                                        type="text"
                                        placeholder="Outcome"
                                        clearButton
                                        value={this.state.tabel_31.outcame}
                                        onChange={this.setValue('outcame')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="Kegiatan"
                                        type="text"
                                        placeholder="Kegiatan"
                                        clearButton
                                        value={this.state.tabel_31.kegiatan}
                                        onChange={this.setValue('kegiatan')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="Sub Kegiatan"
                                        type="text"
                                        placeholder="Sub Kegiatan"
                                        clearButton
                                        value={this.state.tabel_31.sub_kegiatan}
                                        onChange={this.setValue('sub_kegiatan')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="Keluaran Output"
                                        type="text"
                                        placeholder="Keluaran Output"
                                        clearButton
                                        value={this.state.tabel_31.keluaran_output}
                                        onChange={this.setValue('keluaran_output')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="Satuan"
                                        type="number"
                                        placeholder="Satuan"
                                        clearButton
                                        value={this.state.tabel_31.satuan}
                                        onChange={this.setValue('satuan')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="Jumlah Sasaran Pemenuhan (2019)"
                                        type="number"
                                        placeholder="Jumlah Sasaran Pemenuhan (2019)"
                                        clearButton
                                        value={this.state.tabel_31.jumlah_sasaran_pemenuhan_n}
                                        onChange={this.setValue('jumlah_sasaran_pemenuhan_n')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="Alokasi Anggaran (2019)"
                                        type="number"
                                        placeholder="Alokasi Anggaran (2019)"
                                        clearButton
                                        value={this.state.tabel_31.alokasi_anggaran_n}
                                        onChange={this.setValue('alokasi_anggaran_n')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="Sumber Dana"
                                        type="text"
                                        placeholder="Sumber Dana"
                                        clearButton
                                        value={this.state.tabel_31.sumber_dana}
                                        onChange={this.setValue('sumber_dana')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                </List>
                                
                            </CardContent>
                        </Card>
                        <BlockTitle>TARGET KINERJA PROGRAM PEMENUHAN PELAYANAN DASAR PENDIDIKAN DAN KERANGKA PENDANAAN</BlockTitle>
                        <Card>
                            <CardContent>
                                <List>
                                    <ListInput
                                        label="Target 2020"
                                        type="text"
                                        placeholder="Target 2020"
                                        clearButton
                                        value={this.state.tabel_31.target_n1}
                                        onChange={this.setValue('target_n1')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="Harga Satuan 2020"
                                        type="text"
                                        placeholder="Harga Satuan 2020"
                                        clearButton
                                        value={this.state.tabel_31.harga_satuan_n1}
                                        onChange={this.setValue('harga_satuan_n1')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                </List>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <List>
                                    <ListInput
                                        label="Target 2021"
                                        type="text"
                                        placeholder="Target 2021"
                                        clearButton
                                        value={this.state.tabel_31.target_n2}
                                        onChange={this.setValue('target_n2')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="Harga Satuan 2021"
                                        type="text"
                                        placeholder="Harga Satuan 2021"
                                        clearButton
                                        value={this.state.tabel_31.harga_satuan_n2}
                                        onChange={this.setValue('harga_satuan_n2')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                </List>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <List>
                                    <ListInput
                                        label="Target 2022"
                                        type="text"
                                        placeholder="Target 2022"
                                        clearButton
                                        value={this.state.tabel_31.target_n3}
                                        onChange={this.setValue('target_n3')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="Harga Satuan 2022"
                                        type="text"
                                        placeholder="Harga Satuan 2022"
                                        clearButton
                                        value={this.state.tabel_31.harga_satuan_n3}
                                        onChange={this.setValue('harga_satuan_n3')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                </List>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <List>
                                    <ListInput
                                        label="Target 2023"
                                        type="text"
                                        placeholder="Target 2023"
                                        clearButton
                                        value={this.state.tabel_31.target_n4}
                                        onChange={this.setValue('target_n4')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="Harga Satuan 2023"
                                        type="text"
                                        placeholder="Harga Satuan 2023"
                                        clearButton
                                        value={this.state.tabel_31.harga_satuan_n4}
                                        onChange={this.setValue('harga_satuan_n4')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                </List>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <List>
                                    <ListInput
                                        label="Target 2024"
                                        type="text"
                                        placeholder="Target 2024"
                                        clearButton
                                        value={this.state.tabel_31.target_n5}
                                        onChange={this.setValue('target_n5')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="Harga Satuan 2024"
                                        type="text"
                                        placeholder="Harga Satuan 2024"
                                        clearButton
                                        value={this.state.tabel_31.harga_satuan_n5}
                                        onChange={this.setValue('harga_satuan_n5')}
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
      tabel31: Actions.tabel31,
      getDinas: Actions.getDinas,
      simpanTabel31: Actions.simpanTabel31
    }, dispatch);
}

function mapStateToProps({ App, Spm }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        tabel_31: Spm.tabel_31,
        dinas: Spm.dinas
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(form31));
