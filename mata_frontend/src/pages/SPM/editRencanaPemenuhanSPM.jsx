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
    ListInput,
    BlockHeader
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

class editRencanaPemenuhanSPM extends Component {
    state = {
        error: null,
        loading: false,
        routeParams: {
            foo: 'bar',
            start: 0,
            limit: 20,
            kegiatan_id: this.$f7route.params['kegiatan_id']
        },
        rencana_pemenuhan_spm: {
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
        
        this.props.getRencanaPemenuhanSPMFlat(this.state.routeParams).then((result)=>{
            this.setState({
                rencana_pemenuhan_spm: this.props.rencana_pemenuhan_spm.rows[0]
            });
        });

    }

    setValue = (key) => (e) => {
        console.log(key);
        console.log(e);

        this.setState({
            rencana_pemenuhan_spm: {
                ...this.state.rencana_pemenuhan_spm,
                [key]: e.target.value
            }
        },()=>{
            // console.log(this.state.rencana_pemenuhan_spm);

            
        });
    }

    simpan = () => {
        this.$f7.dialog.preloader();
        this.props.simpanRencanaPemenuhanSPM(this.state.rencana_pemenuhan_spm).then((result)=>{
            if(result.payload.sukses){
                //berhasil
                this.$f7router.navigate("/formRencanaPemenuhanSPM");
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
            <Page name="editRencanaPemenuhanSPM" hideBarsOnScroll>
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
                                        <h4>Sub Kegiatan</h4>
                                        <h2>{this.state.rencana_pemenuhan_spm.nama_kegiatan}</h2>
                                    </ListItem>
                                    <ListItem className="keteranganss">
                                        <h4>Keluaran (Output)</h4>
                                        <h2>{this.state.rencana_pemenuhan_spm.output_outcome}</h2>
                                    </ListItem>
                                    <ListItem className="keteranganss">
                                        <h4>Satuan</h4>
                                        <h2>{this.state.rencana_pemenuhan_spm.satuan}</h2>
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <List>
                                    <ListInput
                                        label="Jumlah Sasaran Pemenuhan (2019)"
                                        type="text"
                                        placeholder="Jumlah Sasaran Pemenuhan (2019)..."
                                        clearButton
                                        value={this.state.rencana_pemenuhan_spm.jumlah_sasaran_pemenuhan_n}
                                        onChange={this.setValue('jumlah_sasaran_pemenuhan_n')}
                                    >
                                        <i slot="media" className="f7-icons">square_list</i>
                                    </ListInput>
                                    <ListInput
                                        label="Alokasi Anggaran (2019)"
                                        type="text"
                                        placeholder="Alokasi Anggaran (2019)..."
                                        clearButton
                                        value={this.state.rencana_pemenuhan_spm.alokasi_anggaran_n}
                                        onChange={this.setValue('alokasi_anggaran_n')}
                                    >
                                        <i slot="media" className="f7-icons">square_list</i>
                                    </ListInput>
                                    <ListInput
                                        label="Sumber Dana"
                                        type="text"
                                        placeholder="Sumber Dana..."
                                        clearButton
                                        value={this.state.rencana_pemenuhan_spm.sumber_dana}
                                        onChange={this.setValue('sumber_dana')}
                                    >
                                        <i slot="media" className="f7-icons">square_list</i>
                                    </ListInput>
                                </List>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="100" tabletWidth="50">
                        {/* <BlockHeader>TARGET KINERJA PROGRAM PEMENUHAN PELAYANAN DASAR PENDIDIKAN DAN KERANGKA PENDANAAN	</BlockHeader> */}
                        <Card>
                            <CardContent>
                                <List>
                                    <ListInput
                                        label="Target 2020"
                                        type="text"
                                        placeholder="Target 2020..."
                                        clearButton
                                        value={this.state.rencana_pemenuhan_spm.target_n1}
                                        onChange={this.setValue('target_n1')}
                                    >
                                        <i slot="media" className="f7-icons">square_list</i>
                                    </ListInput>
                                    <ListInput
                                        label="Harga Satuan 2020"
                                        type="text"
                                        placeholder="Harga Satuan 2020..."
                                        clearButton
                                        value={this.state.rencana_pemenuhan_spm.harga_satuan_n1}
                                        onChange={this.setValue('harga_satuan_n1')}
                                    >
                                        <i slot="media" className="f7-icons">square_list</i>
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
                                        placeholder="Target 2021..."
                                        clearButton
                                        value={this.state.rencana_pemenuhan_spm.target_n2}
                                        onChange={this.setValue('target_n2')}
                                    >
                                        <i slot="media" className="f7-icons">square_list</i>
                                    </ListInput>
                                    <ListInput
                                        label="Harga Satuan 2021"
                                        type="text"
                                        placeholder="Harga Satuan 2021..."
                                        clearButton
                                        value={this.state.rencana_pemenuhan_spm.harga_satuan_n2}
                                        onChange={this.setValue('harga_satuan_n2')}
                                    >
                                        <i slot="media" className="f7-icons">square_list</i>
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
                                        placeholder="Target 2022..."
                                        clearButton
                                        value={this.state.rencana_pemenuhan_spm.target_n2}
                                        onChange={this.setValue('target_n3')}
                                    >
                                        <i slot="media" className="f7-icons">square_list</i>
                                    </ListInput>
                                    <ListInput
                                        label="Harga Satuan 2022"
                                        type="text"
                                        placeholder="Harga Satuan 2022..."
                                        clearButton
                                        value={this.state.rencana_pemenuhan_spm.harga_satuan_n2}
                                        onChange={this.setValue('harga_satuan_n3')}
                                    >
                                        <i slot="media" className="f7-icons">square_list</i>
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
                                        placeholder="Target 2023..."
                                        clearButton
                                        value={this.state.rencana_pemenuhan_spm.target_n2}
                                        onChange={this.setValue('target_n5')}
                                    >
                                        <i slot="media" className="f7-icons">square_list</i>
                                    </ListInput>
                                    <ListInput
                                        label="Harga Satuan 2023"
                                        type="text"
                                        placeholder="Harga Satuan 2023..."
                                        clearButton
                                        value={this.state.rencana_pemenuhan_spm.harga_satuan_n2}
                                        onChange={this.setValue('harga_satuan_n4')}
                                    >
                                        <i slot="media" className="f7-icons">square_list</i>
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
                                        placeholder="Target 2024..."
                                        clearButton
                                        value={this.state.rencana_pemenuhan_spm.target_n2}
                                        onChange={this.setValue('target_n5')}
                                    >
                                        <i slot="media" className="f7-icons">square_list</i>
                                    </ListInput>
                                    <ListInput
                                        label="Harga Satuan 2024"
                                        type="text"
                                        placeholder="Harga Satuan 2024..."
                                        clearButton
                                        value={this.state.rencana_pemenuhan_spm.harga_satuan_n2}
                                        onChange={this.setValue('harga_satuan_n5')}
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
      getRencanaPemenuhanSPMFlat: Actions.getRencanaPemenuhanSPMFlat,
      simpanRencanaPemenuhanSPM: Actions.simpanRencanaPemenuhanSPM
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

export default (connect(mapStateToProps, mapDispatchToProps)(editRencanaPemenuhanSPM));
