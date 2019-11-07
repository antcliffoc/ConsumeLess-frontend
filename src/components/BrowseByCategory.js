import React, { Component } from "react";
import getData from "../actions/getData"
import { URLs } from '../constants/URLs';
import Carousel from './Carousel';
import MapContainer from "./Map";
import Navigation from './Navigation';

class BrowseByCategory extends Component {
  constructor(props) {
    super(props);
    this.updateItems = (category) => {
      let items
      return items = getData(URLs.category + `${category}`, {
          method: 'GET',
      })
          .then(items => {
          console.log(items)
          this.setState({items: items})
          return Promise.resolve(items);
          })
    }
    this.state = { items: [],
                   category: null,
                   categories: ['books', 'clothes', 'games', 'music', 'garden', 'toys']
                  };
  }

  async componentDidMount() {
    const items = await getData(URLs.category + `${this.state.category}`);
    this.setState({ items })
  }
  changeCategory = (category) => {
    console.log(`you clicked ${category}`)
    this.setState({ category})
    this.updateItems(category)
  }

  render(){
    console.log(this.state.items)
    const { items, category, categories } = this.state;
    return (
      <div>
      <Navigation/><br></br>
      <div>
      <Carousel categories={categories} category={category} changeCategory={this.changeCategory}/>
      </div><br></br><hr></hr><br></br>
      <div>
      <MapContainer items={items}/>
      </div>
      </div>
    )}
}

export default BrowseByCategory;
