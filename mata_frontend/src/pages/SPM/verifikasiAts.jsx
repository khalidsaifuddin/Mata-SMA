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
    Radio,
    Preloader
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

class verifikasiAts extends Component {
    state = {
        error: null,
        loading: true,
        routeParams: {
            foo: 'bar',
            start: 0,
            limit: 20,
            nik: this.$f7route.params['nik']
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
                    loading: false
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
                    loading: false
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

            setTimeout(() => {
                this.setState({
                    loading: false
                });
                
            }, 1000);

        });
    }

    klikVerval = (status_ats_id) => {
        this.setState({
            ...this.state,
            routeParams: {
                ...this.state.routeParams,
                status_ats_id: status_ats_id
            }
        });
    }

    simpanVerval = () => {
        // console.log(this.state.routeParams);
        this.setState({
            loading: true
        },()=>{
            this.props.simpanVervalAts(this.state.routeParams).then((result)=>{

                if(result.payload.sukses){
                    //berhasil
                    this.$f7.dialog.alert('Berhasil menyimpan verifikasi ATS!','Berhasil');
                }else{
                    //gagal
                    this.$f7.dialog.alert('Berhasil menyimpan verifikasi ATS!','Berhasil');
                }

                setTimeout(() => {
                    this.$f7router.navigate("/formATS");
                }, 2000);

            })
        });
    }

    render()
    {
        return (
            <Page name="verifikasiAts" hideBarsOnScroll>
                <Navbar sliding={false} large backLink="Kembali">
                    <NavTitle sliding>Verifikasi ATS</NavTitle>
                    <NavTitleLarge style={{background:'#F6BC31', color:'white'}}>Verifikasi ATS</NavTitleLarge>
                </Navbar>
                <Block strong style={{
                    marginTop:'0px'
                    // paddingLeft:'0px', 
                    // paddingRight:'0px', 
                    // paddingTop:'0px', 
                    // paddingBottom:'0px'
                }}>
                    <h1 style={{marginBottom:'8px'}} className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>{this.props.anak_tidak_sekolah.rows[0].nama}</h1>
                    <h2 style={{marginTop:'0px', fontWeight:'normal'}} className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>{this.props.anak_tidak_sekolah.rows[0].nik}</h2>

                    <List className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>
                        <ListItem title="Terindikasi ATS">
                            <Radio 
                                name={"status_ats_id"} 
                                value={1} 
                                slot="media"
                                onChange={()=>this.klikVerval(1)}
                                disabled={this.state.loading}
                                // onChange={()=>this.klikPilihSekolah(option.sekolah_id, option.nama, option.npsn, (option.alamat_jalan + ", " + option.kecamatan + ", " + option.kabupaten + ", " + option.provinsi), option.bentuk_pendidikan_id, option.status_sekolah, option.jarak)}
                            />
                        </ListItem>
                        <ListItem title="ATS (Terverifikasi)">
                            <Radio 
                                name={"status_ats_id"} 
                                value={2} 
                                slot="media"
                                onChange={()=>this.klikVerval(2)}
                                disabled={this.state.loading}
                                // onChange={()=>this.klikPilihSekolah(option.sekolah_id, option.nama, option.npsn, (option.alamat_jalan + ", " + option.kecamatan + ", " + option.kabupaten + ", " + option.provinsi), option.bentuk_pendidikan_id, option.status_sekolah, option.jarak)}
                            />
                        </ListItem>
                        <ListItem title="Bukan ATS (Dapodik Formal)">
                            <Radio 
                                name={"status_ats_id"} 
                                value={3} 
                                slot="media"
                                onChange={()=>this.klikVerval(3)}
                                disabled={this.state.loading}
                                // onChange={()=>this.klikPilihSekolah(option.sekolah_id, option.nama, option.npsn, (option.alamat_jalan + ", " + option.kecamatan + ", " + option.kabupaten + ", " + option.provinsi), option.bentuk_pendidikan_id, option.status_sekolah, option.jarak)}
                            />
                        </ListItem>
                        <ListItem title="Bukan ATS (Emis Formal)">
                            <Radio 
                                name={"status_ats_id"} 
                                value={4} 
                                slot="media"
                                onChange={()=>this.klikVerval(4)}
                                disabled={this.state.loading}
                                // onChange={()=>this.klikPilihSekolah(option.sekolah_id, option.nama, option.npsn, (option.alamat_jalan + ", " + option.kecamatan + ", " + option.kabupaten + ", " + option.provinsi), option.bentuk_pendidikan_id, option.status_sekolah, option.jarak)}
                            />
                        </ListItem>
                        <ListItem title="Non Formal">
                            <Radio 
                                name={"status_ats_id"} 
                                value={5} 
                                slot="media"
                                onChange={()=>this.klikVerval(5)}
                                disabled={this.state.loading}
                                // onChange={()=>this.klikPilihSekolah(option.sekolah_id, option.nama, option.npsn, (option.alamat_jalan + ", " + option.kecamatan + ", " + option.kabupaten + ", " + option.provinsi), option.bentuk_pendidikan_id, option.status_sekolah, option.jarak)}
                            />
                        </ListItem>
                    </List>
                    <br/>
                    <br/>
                    <Button disabled={(this.state.loading ? true : (this.state.routeParams.status_ats_id === null ? true : false))} raised fill large onClick={this.simpanVerval}>
                    {this.state.loading && <Preloader color="white"></Preloader>}&nbsp;Simpan
                    </Button>
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
      getAnakTidakSekolah: Actions.getAnakTidakSekolah,
      simpanVervalAts: Actions.simpanVervalAts
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

export default (connect(mapStateToProps, mapDispatchToProps)(verifikasiAts));
