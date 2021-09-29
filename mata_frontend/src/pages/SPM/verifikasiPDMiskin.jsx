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

class verifikasiPDMiskin extends Component {
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
            this.props.getPDMiskin(this.state.routeParams).then((result)=>{
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
            this.props.getPDMiskin(this.state.routeParams).then((result)=>{
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

        this.props.getPDMiskin(this.state.routeParams).then((result)=>{

            setTimeout(() => {
                this.setState({
                    loading: false
                });
                
            }, 1000);
        });
    }

    klikVerval = (is_miskin) => {
        this.setState({
            ...this.state,
            routeParams: {
                ...this.state.routeParams,
                is_miskin: is_miskin
            }
        });
    }

    simpanVerval = () => {
        // console.log(this.state.routeParams);
        this.setState({
            loading: true
        },()=>{
            this.props.simpanVervalPDMiskin(this.state.routeParams).then((result)=>{

                if(result.payload.sukses){
                    //berhasil
                    this.$f7.dialog.alert('Berhasil menyimpan verifikasi PD Miskin!','Berhasil');
                }else{
                    //gagal
                    this.$f7.dialog.alert('Berhasil menyimpan verifikasi PD Miskin!','Berhasil');
                }

                setTimeout(() => {
                    this.$f7router.navigate("/formAnakMiskin");
                }, 2000);

            })
        });
    }

    render()
    {
        return (
            <Page name="verifikasiPDMiskin" hideBarsOnScroll>
                <Navbar sliding={false} large backLink="Kembali">
                    <NavTitle sliding>Verifikasi PD Miskin</NavTitle>
                    <NavTitleLarge style={{background:'#F6BC31', color:'white'}}>Verifikasi PD Miskin</NavTitleLarge>
                </Navbar>
                <Block strong style={{
                    marginTop:'0px'
                    // paddingLeft:'0px', 
                    // paddingRight:'0px', 
                    // paddingTop:'0px', 
                    // paddingBottom:'0px'
                }}>
                    <h1 style={{marginBottom:'8px'}} className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>{this.props.pd_miskin.rows[0].nama}</h1>
                    <h2 style={{marginTop:'0px', fontWeight:'normal'}} className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>{this.props.pd_miskin.rows[0].nik}</h2>

                    <List className={this.state.loading ? "skeleton-text skeleton-effect-blink" : ""}>
                        <ListItem title="Terindikasi PD Miskin">
                            <Radio 
                                name={"is_miskin"} 
                                value={9}
                                slot="media"
                                onChange={()=>this.klikVerval(9)}
                                disabled={this.state.loading}
                                // onChange={()=>this.klikPilihSekolah(option.sekolah_id, option.nama, option.npsn, (option.alamat_jalan + ", " + option.kecamatan + ", " + option.kabupaten + ", " + option.provinsi), option.bentuk_pendidikan_id, option.status_sekolah, option.jarak)}
                            />
                        </ListItem>
                        <ListItem title="PD Miskin (Terverifikasi)">
                            <Radio 
                                name={"is_miskin"} 
                                value={1} 
                                slot="media"
                                onChange={()=>this.klikVerval(1)}
                                disabled={this.state.loading}
                                // onChange={()=>this.klikPilihSekolah(option.sekolah_id, option.nama, option.npsn, (option.alamat_jalan + ", " + option.kecamatan + ", " + option.kabupaten + ", " + option.provinsi), option.bentuk_pendidikan_id, option.status_sekolah, option.jarak)}
                            />
                        </ListItem>
                        <ListItem title="Bukan PD MIskin">
                            <Radio 
                                name={"is_miskin"} 
                                value={0} 
                                slot="media"
                                onChange={()=>this.klikVerval(0)}
                                disabled={this.state.loading}
                                // onChange={()=>this.klikPilihSekolah(option.sekolah_id, option.nama, option.npsn, (option.alamat_jalan + ", " + option.kecamatan + ", " + option.kabupaten + ", " + option.provinsi), option.bentuk_pendidikan_id, option.status_sekolah, option.jarak)}
                            />
                        </ListItem>
                    </List>
                    <br/>
                    <br/>
                    <Button disabled={(this.state.loading ? true : (this.state.routeParams.is_miskin === null ? true : false))} raised fill large onClick={this.simpanVerval}>
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
      getPDMiskin: Actions.getPDMiskin,
      simpanVervalPDMiskin: Actions.simpanVervalPDMiskin
    }, dispatch);
}

function mapStateToProps({ App, Spm }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        pd_miskin: Spm.pd_miskin
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(verifikasiPDMiskin));
