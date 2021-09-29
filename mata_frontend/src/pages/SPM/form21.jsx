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

class form21 extends Component {
    state = {
        error: null,
        loading: false,
        routeParams: {
            foo: 'bar',
            start: 0,
            limit: 20,
            perhitungan_kebutuhan_ats_id: this.$f7route.params['perhitungan_kebutuhan_ats_id'] ? this.$f7route.params['perhitungan_kebutuhan_ats_id'] : null
        },
        tabel_21: {}
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
            tabel_21: {
                ...this.state.tabel_21,
                [b]: key.target.value
            }
        },()=>{
            console.log(this.state.tabel_21);
        });
    }

    componentDidMount = () => {
        
        if(this.state.routeParams.perhitungan_kebutuhan_ats_id){
            this.$f7.dialog.preloader();

            this.props.tabel21(this.state.routeParams).then((result)=>{
                this.setState({
                    tabel_21: this.props.tabel_21.rows[0]
                },()=>{
                    this.$f7.dialog.close();
                });
            });

        }

        this.props.getDinas(this.state.routeParams);

    }


    setValue = (key) => (e) => {

        this.setState({
            tabel_21: {
                ...this.state.tabel_21,
                [key]: e.target.value
            }
        },()=>{
            switch (key) {
                case 'jumlah_sasaran':
                    this.setState({
                        tabel_21: {
                            ...this.state.tabel_21,
                            besaran_biaya: (parseInt(this.state.tabel_21.jumlah_sasaran)*parseInt(this.state.tabel_21.harga_satuan))
                        }
                    });
                    break;
                case 'harga_satuan':
                    this.setState({
                        tabel_21: {
                            ...this.state.tabel_21,
                            besaran_biaya: (parseInt(this.state.tabel_21.jumlah_sasaran)*parseInt(this.state.tabel_21.harga_satuan))
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
        this.props.simpanTabel21(this.state.tabel_21).then((result)=>{
            if(result.payload.sukses){
                //berhasil
                this.$f7router.navigate("/tabel21/");
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
            <Page name="form21" hideBarsOnScroll>
                <Navbar sliding={false} large backLink="Kembali">
                    <NavTitle sliding className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>Kebutuhan ATS</NavTitle>
                    <NavTitleLarge style={{background:'#F6BC31', color:'white'}} className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>Kebutuhan ATS</NavTitleLarge>
                </Navbar>
                <Row noGap>
                    <Col width="0" tabletWidth="15"></Col>
                    <Col width="100" tabletWidth="70">
                        <Card>
                            <CardContent>
                                <List>
                                    <ListItem
                                    title="Faktor Tidak Bersekolah"
                                    smartSelect
                                    smartSelectParams={{openIn:'popup'}}
                                    >
                                        <select onChange={this.setSelectValue('faktor_tidak_sekolah_id')} name="faktor_tidak_sekolah_id" defaultValue={this.state.tabel_21.faktor_tidak_sekolah_id}>
                                            <option value="0" disabled>-</option>
                                            <option value="1">Miskin</option>
                                            <option value="2">Akses Tidak Terjangkau</option>
                                            <option value="3">Bencana Alam</option>
                                            <option value="4">Lainnya</option>
                                        </select>
                                    </ListItem>
                                    <ListInput
                                        label="bentuk pemenuhan pelayanan dasar"
                                        type="text"
                                        placeholder="bentuk pemenuhan pelayanan dasar"
                                        clearButton
                                        value={this.state.tabel_21.bentuk_pemenuhan_pelayanan_dasar}
                                        onChange={this.setValue('bentuk_pemenuhan_pelayanan_dasar')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListItem
                                    title="Penanggung Jawab"
                                    smartSelect
                                    smartSelectParams={{openIn:'popup'}}
                                    >
                                        <select onChange={this.setSelectValue('penanggung_jawab_id')} name="penanggung_jawab_id" defaultValue={this.state.tabel_21.penanggung_jawab_id}>
                                            <option value="0" disabled>-</option>
                                            {this.props.dinas.rows.map((optDinas)=>{
                                                return (
                                                    <option value={optDinas.penanggung_jawab_id}>{optDinas.nama}</option>
                                                )
                                            })}
                                        </select>
                                    </ListItem>
                                    <ListInput
                                        label="Jumlah Sasaran"
                                        type="number"
                                        placeholder="jumlah_sasaran"
                                        clearButton
                                        value={this.state.tabel_21.jumlah_sasaran}
                                        onChange={this.setValue('jumlah_sasaran')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="Harga Satuan"
                                        type="number"
                                        placeholder="harga_satuan"
                                        clearButton
                                        value={this.state.tabel_21.harga_satuan}
                                        onChange={this.setValue('harga_satuan')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    <ListInput
                                        label="Besaran Biaya"
                                        type="number"
                                        placeholder="besaran_biaya"
                                        clearButton
                                        value={this.state.tabel_21.besaran_biaya}
                                        // onChange={this.setValue('besaran_biaya')}
                                    >
                                        {/* <i slot="media" className="f7-icons">square_list</i> */}
                                    </ListInput>
                                    {/* <ListInput
                                        label="Faktor Tidak Bersekolah"
                                        type="text"
                                        placeholder="Faktor Tidak Bersekolah"
                                        clearButton
                                        value={this.state.tabel_21.tahun}
                                        onChange={this.setValue('tahun')}
                                    >
                                        <i slot="media" className="f7-icons">square_list</i>
                                    </ListInput>
                                    <ListInput
                                        label="Ketersediaan"
                                        type="text"
                                        placeholder="ketersediaan"
                                        clearButton
                                        value={this.state.tabel_21.ketersediaan}
                                        onChange={this.setValue('ketersediaan')}
                                    >
                                        <i slot="media" className="f7-icons">square_list</i>
                                    </ListInput>
                                    <ListInput
                                        label="Selisih (Kebutuhan - ketersediaan)"
                                        type="text"
                                        placeholder="selisih"
                                        clearButton
                                        value={this.state.tabel_21.selisih}
                                        // onChange={this.setValue('selisih')}
                                    >
                                        <i slot="media" className="f7-icons">square_list</i>
                                    </ListInput>
                                    <ListInput
                                        label="Harga Satuan"
                                        type="text"
                                        placeholder="Harga Satuan"
                                        clearButton
                                        value={this.state.tabel_21.harga_satuan}
                                        onChange={this.setValue('harga_satuan')}
                                    >
                                        <i slot="media" className="f7-icons">square_list</i>
                                    </ListInput>
                                    <ListInput
                                        label="Kebutuhan Biaya (Harga Satuan x selisih)"
                                        type="text"
                                        placeholder="Kebutuhan Biaya"
                                        clearButton
                                        value={this.state.tabel_21.kebutuhan_biaya}
                                        // onChange={this.setValue('kebutuhan_biaya')}
                                    >
                                        <i slot="media" className="f7-icons">square_list</i>
                                    </ListInput> */}
                                </List>
                                <br/>
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
      tabel21: Actions.tabel21,
      getDinas: Actions.getDinas,
      simpanTabel21: Actions.simpanTabel21
    }, dispatch);
}

function mapStateToProps({ App, Spm }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        tabel_21: Spm.tabel_21,
        dinas: Spm.dinas
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(form21));
