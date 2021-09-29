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
    Searchbar,
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    Icon,
    MenuItem,
    MenuDropdown,
    MenuDropdownItem, AccordionContent, ListInput, BlockHeader
} from 'framework7-react';

// import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";

import { Doughnut, Bar } from 'react-chartjs-2';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

// import 'framework7-icons';

class CustomQuerySarpras extends Component {
    state = {
        error: null,
        loading: true,
        kategori: [],
        kategori_terpilih: [],
        kategori_terpilih_arr: [],
        custom_query: {
            rows: [{
                ' ':''
            }],
            total: 0
        },
        header_custom: [],
        header_custom_kolom: [],
        routeParams: {
            start: 0,
            limit: 20,
            bentuk_pendidikan: 'SMA',
            nama_tabel: 'ruang',
            kode_wilayah: localStorage.getItem('kode_wilayah_aplikasi'),
            id_level_wilayah: localStorage.getItem('id_level_wilayah_aplikasi')
        }
    }

    formatAngka = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    componentDidMount = () => {
        
        this.props.getKategoriCustomQueryDatamart(this.state.routeParams).then((result)=>{

            this.setState({
                ...this.state,
                loading: false,
                kategori: result.payload
            },()=>{
                console.log(this.state.kategori)
            })

        })
        
    }

    kategoriChange = (option) => {
        // alert(kolom_id)
        this.setState({
            kategori_terpilih: {
                ...this.state.kategori_terpilih,
                [option.keterangan]: !this.state.kategori_terpilih[option.keterangan] ? option : (this.state.kategori_terpilih[option.keterangan] ? null : option)
            }
        },()=>{

            let kategori_terpilih_arr = [];

            // console.log(this.state.kategori_terpilih)
            for (const key in this.state.kategori_terpilih) {
                if (this.state.kategori_terpilih.hasOwnProperty(key)) {
                    let element = this.state.kategori_terpilih[key];

                    if(element){
                        element.parameter = 'CONTAINS'
                        element.parameter_value = (element.parameter_value ? '-' : element.parameter_value)

                        kategori_terpilih_arr.push(element)
                    }
                    
                }
            }

            console.log(kategori_terpilih_arr)
            this.setState({
                kategori_terpilih_arr: kategori_terpilih_arr
            },()=>{
                console.log(this.state.kategori_terpilih_arr)
            })

        })

    }

    paramChange = (kolom_id) => (e) => {
        console.log(kolom_id)
        console.log(e.currentTarget.value)

        // this.setState({
        //     kategori_terpilih_arr: [
        //         ...this.state.kategori_terpilih_arr,
        //     ]
        // })

        let kategori_terpilih_arr = [];

        this.state.kategori_terpilih_arr.map((option)=>{
            if(option.kolom_id === kolom_id){
                option.parameter = e.currentTarget.value
            }

            kategori_terpilih_arr.push(option)
        })

        this.setState({
            kategori_terpilih_arr: kategori_terpilih_arr
        },()=>{
            console.log(this.state.kategori_terpilih_arr)
        })
    }
    
    paramValueChange = (optionKategori) => (e) => {
        // console.log(kolom_id)
        // console.log(e.currentTarget.value)

        let kategori_terpilih_arr = [];

        this.state.kategori_terpilih_arr.map((option)=>{
            if(option.nama === optionKategori.nama){
                option.parameter_value = e.currentTarget.value
            }

            kategori_terpilih_arr.push(option)
        })

        this.setState({
            kategori_terpilih_arr: kategori_terpilih_arr
        },()=>{
            console.log(this.state.kategori_terpilih_arr)
        })
    }

    prosesCustomQuery = () => {
        this.$f7.dialog.preloader()
        // alert('tes')
        let header = [];
        let header_kolom = [];

        for (let index = 0; index < this.state.kategori_terpilih_arr.length; index++) {
            // const element = this.state.kategori_terpilih_arr[index];
            // header.push(this.state.kategori_terpilih_arr[index].keterangan)
            // header_kolom.push(this.state.kategori_terpilih_arr[index].keterangan)
            header.push(this.capitalizeFirstLetter(this.state.kategori_terpilih_arr[index].keterangan.replaceAll("_"," ")))
            header_kolom.push(this.state.kategori_terpilih_arr[index].nama)
        }

        // for (const key in this.state.kategori_terpilih_arr) {
        //     if (this.state.kategori_terpilih_arr.hasOwnProperty(key)) {
        //         const element = this.state.kategori_terpilih_arr[key];
                
        //         header.push(this.state.kategori_terpilih_arr[key])
        //     }
        // }

        console.log(header)

        this.setState({
            header_custom: header,
            header_custom_kolom: header_kolom
        },()=>{

            this.props.runCustomQueryDatamart({
                data:this.state.kategori_terpilih_arr, 
                ...this.state.routeParams, 
                start:0
            }).then((result)=>{
                this.setState({
                    custom_query: result.payload
                },()=>{
                    this.$f7.dialog.close()
                })
            }).catch(()=>{
                this.$f7.dialog.close()
            })

        })

    }

    klikNext = () => {
        this.$f7.dialog.preloader()
        // alert('tes');
        
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: (parseInt(this.state.routeParams.start) + parseInt(this.state.routeParams.limit))
            }
        },()=>{
            this.props.runCustomQueryDatamart({data:this.state.kategori_terpilih_arr, ...this.state.routeParams}).then((result)=>{
                this.setState({
                    custom_query: result.payload
                },()=>{
                    this.$f7.dialog.close()
                })
            })
        });
    }
    
    klikPrev = () => {
        this.$f7.dialog.preloader()
        // alert('tes');
        
        this.setState({
            ...this.state,
            loading: true,
            routeParams: {
                ...this.state.routeParams,
                start: (parseInt(this.state.routeParams.start) - parseInt(this.state.routeParams.limit))
            }
        },()=>{
            this.props.runCustomQueryDatamart({data:this.state.kategori_terpilih_arr, ...this.state.routeParams}).then((result)=>{
                this.setState({
                    custom_query: result.payload
                },()=>{
                    this.$f7.dialog.close()
                })
            })
        });
    }

    // unduhexcel = () => {
    //     // alert('tes')
    //     if(this.state.custom_query.total > 1000000){
    //         this.$f7.dialog.alert('Dengan alasan optimasi, mohon proses query yang menghasilkan data maksimal 1.000.000 record sebelum mengunduh data', 'Peringatan')
    //     }else{
    //         window.open(localStorage.getItem('api_base')+"/api/CustomQuery/runCustomQueryDatamartExcel?data="+JSON.stringify(this.state.kategori_terpilih_arr)+"&start=0&limit=10000000", '_system')
    //     }
        
    // }

    JSONToCSVConvertor = (JSONData, ReportTitle, ShowLabel) => {
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        
        var CSV = 'sep=,' + '\r\n\n';
    
        //This condition will generate the Label/Header
        if (ShowLabel) {
            var row = "";
            
            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {
                
                //Now convert each value to string and comma-seprated
                row += index + ',';
            }
    
            row = row.slice(0, -1);
            
            //append Label row with line break
            CSV += row + '\r\n';
        }
        
        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            
            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }
    
            row.slice(0, row.length - 1);
            
            //add a line break after each row
            CSV += row + '\r\n';
        }
    
        if (CSV == '') {        
            alert("Invalid data");
            return;
        }   
        
        //Generate a file name
        var fileName = "";
        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += ReportTitle.replace(/ /g,"_");   
        
        //Initialize file format you want csv or xls
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        
        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension    
        // window.open(uri)
        // return true
        
        //this trick will generate a temp <a /> tag
        var link = document.createElement("a"); 
        link.className = "external";   
        link.href = uri;
        
        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";
        
        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    unduhexcel = () => {
        // alert('tes')
        // if(this.state.custom_query.total > 1000000){
        //     this.$f7.dialog.alert('Dengan alasan optimasi, mohon proses query yang menghasilkan data maksimal 1.000.000 record sebelum mengunduh data', 'Peringatan')
        // }else{

        //     if(this.state.kategori_terpilih_arr.length > 15){
        //         this.$f7.dialog.alert('Dengan alasan optimasi, mohon untuk membatasi kolom pilihan maksimal 15 kolom', 'Peringatan')
        //     }else{
        //         window.open(localStorage.getItem('api_base')+"/api/CustomQuery/runCustomQueryPesertaDidikExcel?data="+JSON.stringify(this.state.kategori_terpilih_arr)+"&start=0&limit=10000000", '_system')
        //     }

        // }
        
        if(this.state.custom_query.total > 1000000){
            this.$f7.dialog.alert('Dengan alasan optimasi, mohon proses query yang menghasilkan data maksimal 1.000.000 record sebelum mengunduh data', 'Peringatan')
        }else{
            this.$f7.dialog.preloader('Memroses file unduhan...')

            this.props.runCustomQueryDatamart({
                data:this.state.kategori_terpilih_arr, 
                ...this.state.routeParams,
                start: 0,
                limit: 100000000
            }).then((result)=>{
                this.$f7.dialog.close()
                this.JSONToCSVConvertor(result.payload.rows, 'Custom Query Sarpras', true)
                
            }).catch(()=>{
                this.$f7.dialog.close()
            })
        }

        
    }

    capitalizeFirstLetter = (string) => {
        let strings = string.charAt(0).toUpperCase() + string.slice(1)
        return strings.replaceAll('Kd','Kode')
        .replaceAll('Nm','Nama')
        .replaceAll('Ket','Keterangan')
        .replaceAll('Panj ','Panjang ')
        .replaceAll('Jml','Jumlah')
    }

    render()
    {
        return (
            <Page name="CustomQuerySarpras" hideBarsOnScroll>
                <Navbar sliding={false} onBackClick={this.backClick}>
                    <NavLeft>
                        <Link iconIos="f7:chevron_left" iconAurora="f7:chevron_left" iconMd="material:chevron_left" href="/">Beranda</Link>
                    </NavLeft>
                    <NavTitle sliding>Custom Query Sarpras</NavTitle>
                </Navbar>
                
                {/* body */}
                <Row noGap>
                    <Col width="100" tabletWidth="30" style={{border:'0px solid #ccc'}}>
                        <Card>
                            <CardHeader>
                                <b>Kategori</b>
                            </CardHeader>
                            <CardContent>
                                {/* <List accordionList>
                                <ListItem accordionItem title="Kolom">
                                <AccordionContent> */}
                                <List>
                                    {this.state.kategori.map((option)=>{
                                        if(
                                            option.keterangan.search("_id") === -1 && 
                                            option.keterangan.search("id_") === -1 && 
                                            option.keterangan.search("create") === -1 && 
                                            option.keterangan.search("update") === -1
                                        ){
                                            return (
                                                <ListItem 
                                                    checkbox 
                                                    title={this.capitalizeFirstLetter(option.keterangan.replaceAll("_"," "))} 
                                                    name="kategori-checkbox"
                                                    onChange={()=>this.kategoriChange(option)}
                                                ></ListItem>
                                                // <div>{this.capitalizeFirstLetter(option.keterangan.replace("_"," "))}</div>
                                                // <div>{this.capitalizeFirstLetter(option.keterangan.replaceAll("_"," "))}</div>
                                            )
                                        }
                                    })}
                                </List>
                                {/* </AccordionContent>
                                </ListItem>
                                </List> */}
                            </CardContent>
                        </Card>
                    </Col>
                    <Col width="100" tabletWidth="70" style={{border:'0px solid #ccc'}}>
                        <Row noGap>
                            <Col width="100" style={{border:'0px solid #ccc'}}>
                                <Card>
                                    <CardHeader>
                                        <b>Kategori Terpilih</b>
                                    </CardHeader>
                                    <CardContent>
                                        {/* kategori */}
                                        {this.state.kategori_terpilih_arr.map((optionKategoriTerpilih)=>{
                                            
                                            return (
                                                <Row noGap style={{borderBottom:'1px solid: #ccc'}}>
                                                    <Col width="100" tabletWidth="30" style={{fontSize:'15px', paddingTop:'20px', paddingLeft:'16px'}}>
                                                        {this.capitalizeFirstLetter(optionKategoriTerpilih.COLUMN_NAME.replaceAll("_"," "))}
                                                    </Col>
                                                    <Col width="50" tabletWidth="35">
                                                        <List>
                                                            <ListInput
                                                                label="Parameter"
                                                                type="select"
                                                                outline
                                                                floatingLabel
                                                                defaultValue={"CONTAINS"}
                                                                placeholder="Pilih Parameter..."
                                                                onChange={this.paramChange(optionKategoriTerpilih.kolom_id)}
                                                            >
                                                                <option value="CONTAINS">Mengandung kata</option>
                                                                <option value="EQUALS">Sama dengan (=)</option>
                                                                {optionKategoriTerpilih.tipe === 'angka' &&
                                                                    <option value="MORE_THAN">Lebih dari ({'>'})</option>
                                                                }
                                                                {optionKategoriTerpilih.tipe === 'angka' &&
                                                                    <option value="LESS_THAN">Kurang dari ({'<'})</option>
                                                                }
                                                            </ListInput>
                                                        </List>
                                                    </Col>
                                                    <Col width="50" tabletWidth="35">
                                                        <List>
                                                            <ListInput
                                                                label="Teks"
                                                                type="text"
                                                                placeholder="Teks Parameter..."
                                                                clearButton
                                                                floatingLabel
                                                                outline
                                                                onChange={this.paramValueChange(optionKategoriTerpilih)}
                                                            >
                                                            </ListInput>
                                                        </List>
                                                    </Col>
                                                </Row>
                                            )
                                        })}
                                        {/* <Row> */}
                                        {/* <Col width="67">&nbsp;</Col> */}
                                        {/* <Col width="33"> */}
                                        <Button disabled={this.state.kategori_terpilih_arr.length > 0 ? false : true} onClick={this.prosesCustomQuery} raised fill style={{display:'inline-flex',paddingLeft:'16px', paddingRight:'16px'}}>
                                            <i className="icons f7-icons" style={{fontSize:'20px'}}>gear_alt_fill</i>&nbsp;
                                            Proses Custom Query
                                        </Button>
                                        {/* </Col> */}
                                        {/* </Row> */}
                                    </CardContent>
                                </Card>
                            </Col>
                            <Col width="100" style={{border:'0px solid #ccc'}}>
                                <Card>
                                    <CardHeader>
                                        <b>Hasil Custom Query</b>
                                        <Button disabled={this.state.kategori_terpilih_arr.length > 0 ? false : true} onClick={this.unduhexcel} raised fill className="color-theme-teal" style={{display:'inline-flex', marginBottom:'8px'}}>
                                            <i className="icons f7-icons" style={{fontSize:'20px'}}>cloud_download_fill</i>&nbsp;
                                            Unduh File Excel
                                        </Button>
                                    </CardHeader>
                                    <CardContent>
                                        {/* <BlockHeader style={{textAlign:'right'}}>
                                            Menampilkan hasil 1-{parseInt(this.state.custom_query.total) >= 20 ? 20 : this.state.custom_query.total} dari {this.state.custom_query.total} sekolah
                                        </BlockHeader> */}
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
                                                    <a onClick={this.klikNext} href="#" className={"link "+((parseInt(this.state.routeParams.start)+20) > parseInt(this.state.custom_query.total) ? "disabled" : "" )}>
                                                        <i className="icon icon-next color-gray"></i>
                                                    </a>
                                                    <span className="data-table-pagination-label">{(this.state.routeParams.start+1)}-{((this.state.routeParams.start)+parseInt(this.state.routeParams.limit)) < this.state.custom_query.total ? ((this.state.routeParams.start)+parseInt(this.state.routeParams.limit)) : this.state.custom_query.total} dari {this.formatAngka(this.state.custom_query.total)} data</span>
                                                </div>
                                            </div>
                                            <div className="data-table" style={{overflowY:'hidden'}}>
                                                <table>
                                                    <thead style={{background:'#eeeeee'}}>
                                                        <tr>
                                                            {this.state.header_custom.map((head)=>{
                                                                return (
                                                                    <th className="label-cell" style={{minWidth:'60px'}}>{head}</th>
                                                                )
                                                            })}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.custom_query.rows.map((option)=>{
                                                        return (
                                                            // <>
                                                            <tr key={option.peserta_didik_id}>
                                                                {this.state.header_custom_kolom.map((optionKey)=>{
                                                                    return (
                                                                        <td className="label-cell">
                                                                            {option[optionKey]}
                                                                        </td>
                                                                    )
                                                                })}
                                                            </tr>
                                                            // </>
                                                        )
                                                    })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Block>
                                    </CardContent>
                                </Card>
                            </Col>
                        </Row>
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
      getSekolah: Actions.getSekolah,
      getRekapSekolah: Actions.getRekapSekolah,
      getSekolahIndividu: Actions.getSekolahIndividu,
      getRaporDapodikWilayah: Actions.getRaporDapodikWilayah,
      setRaporDapodikWilayah: Actions.setRaporDapodikWilayah,
      getWilayah: Actions.getWilayah,
      getRaporDapodikSekolah: Actions.getRaporDapodikSekolah,
      getKategoriCustomQueryDatamart: Actions.getKategoriCustomQueryDatamart,
      runCustomQueryDatamart: Actions.runCustomQueryDatamart
    }, dispatch);
}

function mapStateToProps({ App, RaporDapodik, CustomQuery }) {

    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        sekolah: App.sekolah,
        rekap_sekolah: App.rekap_sekolah,
        sekolah_individu: App.sekolah_individu,
        rapor_dapodik_wilayah: RaporDapodik.rapor_dapodik_wilayah,
        rapor_dapodik_sekolah: RaporDapodik.rapor_dapodik_sekolah,
        wilayah: App.wilayah,
        dummy_rows: App.dummy_rows,
        kategori_custom_query: CustomQuery.kategori_custom_query,
        custom_query: CustomQuery.custom_query
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(CustomQuerySarpras));