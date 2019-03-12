/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import MediaCard from '../../modules/media/MediaCard';
import BuObjects from '../../data/BuObjects';
import { connect } from "react-redux";
const objName = 'mediaList'
const query = `query{queryMediaRaw(clause:"{}"){id,name,blobRef,props, userOwner{firstName, avatar}, createdAt}}`

class MediaList extends React.Component {
  static getInitialProps({query}) {
    return {query,data:[], ...this.props}
  }

  getItems = ()=>{
    return this.props.data.slice(0,10).map((item)=>{
          return (<MediaCard key={item.id} media={item}></MediaCard>);
    })
  }
  render() {
    return (
     
       <BuObjects query={query} objectName={objName}>
         {this.getItems()}
        </BuObjects>
    );
  }
}

const mapStateToProps = state => {

  return (state) => { 

      if (state.buObjects[objName])
        return {
          loadState:state.buObjects[objName].state, 
          data:state.buObjects[objName].records
        }
        return {}
  };
};


export default connect(mapStateToProps,
null
)(MediaList);