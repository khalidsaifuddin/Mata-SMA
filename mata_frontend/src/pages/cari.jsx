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
    Searchbar
} from 'framework7-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

class cari extends Component {
    state = {
        error: null
    }

    backClick = () => {

        let properti = 'beranda';
        // alert('tes');
        // console.log(this.props.f7router.url.replace("/","").replace("/",""));
        // console.log(this.props.tabBar);
        for (var property in this.props.tabBar) {
            // console.log(this.state.tabBar[property]);
            this.props.tabBar[property] = false;
        }
        if(this.props.f7router.url.replace("/","").replace("/","") !== ""){
            properti = this.props.f7router.url.replace("/","").replace("/","");
        }
        this.props.tabBar[properti] = true;

        this.props.setTabActive(this.props.tabBar);
        console.log(this.props.tabBar.beranda);
    }

    render()
    {
        return (
            <Page name="cari" hideBarsOnScroll>
                <Navbar sliding={false} backLink="Kembali" onBackClick={this.backClick}>
                    <NavTitle sliding>Cari Materi</NavTitle>
                    {/* <NavTitleLarge>Cari</NavTitleLarge> */}
                </Navbar>
                <Searchbar
                    className="searchbar-demo"
                    // expandable
                    searchContainer=".search-list"
                    searchIn=".item-title"
                ></Searchbar>
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

export default (connect(mapStateToProps, mapDispatchToProps)(cari));
  