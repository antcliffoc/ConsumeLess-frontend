import React, { Component } from "react";
import getData from "../actions/getData"
import { URLs } from '../constants/URLs';
import Carousel from './Carousel';
import MapContainer from "./Map";
import Navigation from './Navigation';
import AuthService from './AuthService';


class BrowseByCategory extends Component {
  constructor(props) {
    super(props);
    this.updateItems = (category) => {
      getData(URLs.category + `${category}`, {
          method: 'GET',
      }).then(items => {
          console.log(items)
          this.setState({items: items})
          return Promise.resolve(items);
      }).catch(res => {
        this.setState({items: []});
        return Promise.reject(res);
      })
    }
    this.state = { items: [],
                   category: null,
                   map_long: null,
                   map_lat: null,
                   categories: ['books', 'clothes', 'games', 'music', 'equipment', 'toys']
                  };
    this.Auth = new AuthService();
    }

  async componentDidMount() {
    const map_long = await this.Auth.getProfile().user_long;
    this.setState({ map_long });
    const map_lat = await this.Auth.getProfile().user_lat;
    this.setState({ map_lat });

    const items = await getData(URLs.category + `${this.state.category}`);
    this.setState({ items })
  }
  changeCategory = (category) => {
    console.log(`you clicked ${category}`)
    this.setState({ category })
    this.updateItems(category)
  }

  render(){
    const { map_long, map_lat, items, category, categories } = this.state;
    if (map_long && map_lat) {
      return (
        <div>
          <Navigation/>
          <div  style={{padding:10}}>
            <Carousel categories={categories} category={category} changeCategory={this.changeCategory}/>
          </div>
          <div>
            <MapContainer items={items} map_long={map_long} map_lat={map_lat}/>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <Navigation/>
          <div  style={{padding:10}}>
            <Carousel categories={categories} category={category} changeCategory={this.changeCategory}/>
          </div>
        </div>
      )
    }
    }
}

export default BrowseByCategory;
