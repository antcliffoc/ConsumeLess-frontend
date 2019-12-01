import React, { Component } from 'react';
import { InfoWindow, Marker, Map, GoogleApiWrapper } from 'google-maps-react';
import { URLs } from '../constants/URLs';
import getData from "../actions/getData";
import Button from 'react-bootstrap/Button';
import { APIs } from '../constants/APIs';
import { CategoryPics } from '../constants/CategoryPics';
import mapStyle from './mapStyle';

const mapSize = {
  width: 'auto',
  maxWidth:'100%',
  height:'50vh'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markers:[],
      showingInfoWindow: false,
      activeMarker: {},
      selectedItem: {},
      items: this.props.items,
      map_long: this.props.map_long,
      map_lat: this.props.map_lat
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
    const { map_long, map_lat, items } = this.props;
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
        style={mapSize}
        styles={mapStyle}
        initialCenter={{
         lat: map_lat,
         lng: map_long
        }}
      >
      {items.map((item) => {
        return (
          <Marker onClick={this.onMarkerClick} icon={{url: "/mapIcon.png", scaledSize: new window.google.maps.Size(38, 38) }} name={ `${item.name}` } category={item.category} position={{lat: item.latitude, lng: item.longitude}} identifier={`${item.id}`} key={`${item.id}`}/>
        )
      })}
      {selectedItem && (<InfoWindow
        marker={activeMarker}
        visible={showingInfoWindow}
        onClose={this.onClose}
      >
        <div>
          <h4 style={{color: '#303030'}}>{selectedItem.name}</h4>
          <img style={{height: 70}} src={CategoryPics[selectedItem.category]}/>
          <br/>
          <br/>
          <Button style={{backgroundColor: '#303030'}} href={`/item/${selectedItem.identifier}`}> View Item </Button>
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
