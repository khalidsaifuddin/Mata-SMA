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
    CardContent,
    Card
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class rpp extends Component {
    state = {
        error: null,
        routeParams: {
            foo:'bar'
        }
    }

    bulan = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember'
    ]

    modules = {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}, { 'script': 'sub'}, { 'script': 'super' }],
          ['link', 'image'],
          ['clean']
        ],
    }
    
    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'script',
        'link', 'image'
    ]

    editorChange = (key) => (e, delta, source, editor) => {

        let value = e;

        this.setState({
            routeParams: {
                ...this.state.routeParams,
                [key]: value
            }
        },()=>{

        });
    }

    componentDidMount = () => {

    }

    render()
    {
        return (
            <Page name="rpp" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>formulir RPP</NavTitle>
                </Navbar>
                <Row>
                    <Col width="0" tabletWidth="15"></Col>
                    <Col width="100" tabletWidth="70">

                        <Card>
                            <CardContent>
                                <Row>
                                    <Col width="30">
                                        <b>Nama Guru:</b>
                                    </Col>
                                    <Col width="70">
                                        Barkah Ramadhan
                                    </Col>
                                    <Col width="30">
                                        <b>Sekolah:</b>
                                    </Col>
                                    <Col width="70">
                                        SMP Negeri Cipamingkis 5
                                    </Col>
                                    <Col width="30">
                                        <b>Mata Pelajaran:</b>
                                    </Col>
                                    <Col width="70">
                                        Bahasa Inggris
                                    </Col>
                                    <Col width="30">
                                        <b>Kelas:</b>
                                    </Col>
                                    <Col width="70">
                                        VII.1
                                    </Col>
                                </Row>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <BlockTitle style={{marginLeft:'0px'}} className="judul_besar">A. Tujuan Pembelajaran</BlockTitle>
                                <List noHairlinesMd style={{marginBottom:'0px', width:'100%', padding:'8px'}}>
                                    <ReactQuill 
                                        theme="snow" 
                                        onChange={this.editorChange('tujuan_pembelajaran')}
                                        modules={this.modules}
                                        formats={this.formats}
                                        value={'0'}
                                        on
                                    />
                                </List>
                                
                                <BlockTitle style={{marginLeft:'0px'}} className="judul_besar">B. Kegiatan Pembelajaran</BlockTitle>
                                
                                <BlockTitle style={{marginLeft:'0px'}} className="judul_kecil">Kegiatan Pendahuluan</BlockTitle>
                                <List noHairlinesMd style={{marginBottom:'0px', width:'100%', padding:'8px'}}>
                                    <ReactQuill 
                                        theme="snow" 
                                        onChange={this.editorChange('tujuan_pembelajaran')}
                                        modules={this.modules}
                                        formats={this.formats}
                                        value={'0'}
                                        on
                                    />
                                </List>
                                
                                <BlockTitle style={{marginLeft:'0px'}} className="judul_kecil">Kegiatan Inti</BlockTitle>
                                <List noHairlinesMd style={{marginBottom:'0px', width:'100%', padding:'8px'}}>
                                    <ReactQuill 
                                        theme="snow" 
                                        onChange={this.editorChange('tujuan_pembelajaran')}
                                        modules={this.modules}
                                        formats={this.formats}
                                        value={'0'}
                                        on
                                    />
                                </List>
                                
                                <BlockTitle style={{marginLeft:'0px'}} className="judul_kecil">Kegiatan Penutup</BlockTitle>
                                <List noHairlinesMd style={{marginBottom:'0px', width:'100%', padding:'8px'}}>
                                    <ReactQuill 
                                        theme="snow" 
                                        onChange={this.editorChange('tujuan_pembelajaran')}
                                        modules={this.modules}
                                        formats={this.formats}
                                        value={'0'}
                                        on
                                    />
                                </List>
                                
                                
                                <BlockTitle style={{marginLeft:'0px'}} className="judul_besar">C. Penilaian</BlockTitle>
                                <List noHairlinesMd style={{marginBottom:'0px', width:'100%', padding:'8px'}}>
                                    <ReactQuill 
                                        theme="snow" 
                                        onChange={this.editorChange('tujuan_pembelajaran')}
                                        modules={this.modules}
                                        formats={this.formats}
                                        value={'0'}
                                        on
                                    />
                                </List>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Button raised fill large>
                                    <i className="icons f7-icons" style={{fontSize:'20px'}}>floppy_disk</i>&nbsp;
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
      setTabActive: Actions.setTabActive
    }, dispatch);
}

function mapStateToProps({ App }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(rpp));
  