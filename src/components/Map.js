import React, { Component } from 'react';
import { InfoWindow, Marker, Map, GoogleApiWrapper } from 'google-maps-react';
import { URLs } from '../constants/URLs';
import getData from "../actions/getData";
import Button from 'react-bootstrap/Button';
import { APIs } from '../constants/APIs';

const mapStyles = {
  width: 'auto',
  maxWidth:'100%',
  height:'80vh'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markers:[],
      showingInfoWindow: false,
      activeMarker: {},
      selectedItem: {},
      items: this.props.items
    };
    // this.catItems = this.catItems.bind(this);
  }
  onMarkerClick = (props, marker, e) => {
    console.log(props);
    this.setState({
      selectedItem: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }


  onClose = props => {
    if(this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };


  render() {
    const { items } = this.props;
    const { activeMarker, selectedItem, showingInfoWindow } = this.state;
    this.state.items.map((item)=>{ console.log(item.longitude) })
    // console.log(selectedItem.identifier)
    let icon = {
      url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    }
    return (
      <div className="map">
      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={{
         lat: 51.51746,
         lng: -0.07329
        }}
      >
      {items.map((item) => {
        return (
          <Marker onClick={this.onMarkerClick} name={ `${item.name}` } position={{lat: item.latitude, lng: item.longitude}} identifier={`${item.id}`} key={`${item.id}`}/>
        )
      })}
      {selectedItem && (<InfoWindow
        marker={activeMarker}
        visible={showingInfoWindow}
        onClose={this.onClose}
      >
        <div>
          <h4>{selectedItem.name}</h4>
          <Button href={`/item/${selectedItem.identifier}`}> View Item </Button>
        </div>
      </InfoWindow>)}
      </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: APIs.maps
})(MapContainer);
