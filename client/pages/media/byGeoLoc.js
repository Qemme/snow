/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../../modules/components/AppFrame';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';
import GMap from '../../modules/media/GMap';

import MediaRaw from '../../data/MediaRaw';
import apiClient from "../../modules/ApiClient"
import { connect } from "react-redux";


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const MediaRawWithApiClient = props => <MediaRaw apiClient={apiClient} {...props}/>
const greatPlace = {lat: 52.6743317,lng:6.2571985};

class Index extends React.Component {
  
 
  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    greatPlaceCoords: PropTypes.any
  };

  static defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 9,
    greatPlaceCoords: greatPlace
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    let popperContent=<div>
      <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
      <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
    </div>;
    
  
    return (
      <AppFrame noBorder={true} popperContent={popperContent}>
      <MediaRawWithApiClient>
        <GMap
          bootstrapURLKeys={{key: 'AIzaSyDKzVON9dMEWaJqWw8ARIa9wM2gU465btk'}}
          //apiKey= // set if you need stats etc ...
          center={this.props.center}
          zoom={this.props.zoom}
          markers={this.props.data.map((elem)=>{
            var {props, ...item} = elem;
            
            var propObj = JSON.parse(props)
            return {
              ...propObj,
                ...item
            }
          })}>
      </GMap>
      </MediaRawWithApiClient>
      </AppFrame>
    );
  }
}

const mapStateToProps = state => {
  return { 
      data:state.mediaRaw.records
  };
};

export default connect(
  mapStateToProps,
)(Index);