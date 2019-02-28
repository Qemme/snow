import  ApiClient  from './ApiClient';
import React, { Component } from 'react'
import { connect } from "react-redux";
import {loadingStates} from "../redux/states"; 

import gql from "graphql-tag";
import { menu_load, menu_loaded } from "../redux/actions";
const moduleList = gql`query {modules{id,name,icon,menuItems{name, icon}}}`

class MenuLoader extends Component{
    componentDidMount(){
        const {apiClient}  = this.props;
        if (this.props.loadState==loadingStates.UNLOADED){
            this.props.menu_load();
            
            apiClient
                .query({query: moduleList}) 
                .then( (rest) => {
                    this.props.menu_loaded(rest.data.modules);
            }) 
        } 

    }

    render() {  
        const { children,...props } = this.props;
        return children(props)
    }
}

const mapStateToProps = state => {
    return { 
        loadState:state.menu.loadState, 
        modules:state.menu.modules
    };
};
  
export default connect(
    mapStateToProps,
    {  menu_load, menu_loaded }
  )(MenuLoader);
