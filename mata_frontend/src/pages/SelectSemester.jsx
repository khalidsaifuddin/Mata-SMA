import React, {Component} from 'react';
import {
    List,
    ListItem
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

class SelectSemester extends Component {
    state = {
        error: null,
        loading: true,
    }

    componentDidMount = () => {
        this.setState({
            ...this.state,
            loading: false
        });
    }

    gantiSemester = (b) => {
        localStorage.setItem('semester_id_aplikasi', b.target.value);
        console.log(localStorage.getItem('semester_id_aplikasi'));
    }

    render()
    {
        return (
            <List style={{width:'100%',marginBottom:'0px',marginTop:'0px'}}>
                <ListItem
                title="Semester"
                smartSelect
                >
                    <select onChange={this.gantiSemester} name="semester_id" defaultValue={localStorage.getItem('semester_id_aplikasi')}>
                        <option value="20201">2020/2021 Genap</option>
                        <option value="20201">2020/2021 Ganjil</option>
                        <option value="20192">2019/2020 Genap</option>
                        <option value="20191">2019/2020 Ganjil</option>
                    </select>
                </ListItem>
            </List>
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

function mapStateToProps({ App, PesertaDidik, Gtk, RaporDapodik }) {

    return {
        window_dimension: App.window_dimension,
        loading: App.loading,
        tabBar: App.tabBar,
        sekolah: App.sekolah
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(SelectSemester));