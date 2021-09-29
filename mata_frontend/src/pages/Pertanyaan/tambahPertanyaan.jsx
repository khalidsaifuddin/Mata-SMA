import React, {Component} from 'react';
import {
    Page
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

import io from 'socket.io-client';

class tambahPertanyaan extends Component {
    state = {
        error: null,
        loading: false,
        routeParams:{
            foo: ''
        }
    }

    render()
    {
        return (
            <Page name="tambahPertanyaan" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Tambah Pertanyaan</NavTitle>
                    <NavTitleLarge>
                        Tambah Pertanyaan
                    </NavTitleLarge>
                </Navbar>
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      updateWindowDimension: Actions.updateWindowDimension,
      setLoading: Actions.setLoading
    }, dispatch);
}

function mapStateToProps({ App }) {
    return {
        window_dimension: App.window_dimension,
        loading: App.loading
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(tambahPertanyaan));
  