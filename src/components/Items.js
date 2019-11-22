import React, { Component } from "react";
import { Route } from 'react-router-dom';
import Itemcard from "./Itemcard"
import { URLs } from '../constants/URLs'
import Navigation from "./Navigation";
// import Cards from "./Cards";
import getData from "../actions/getData";

// import InfiniteCarousel from 'react-leaf-carousel';

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  async componentDidMount() {
    const items = await getData(URLs.items);
    this.setState({ items })
    console.log("me too")
  }

  render(){


    return (
      <div><Navigation />
      <div className="col-md-6 col-lg-4">
        {this.state.items.map((itemcard, i) => {
          return (
            <Itemcard itemcard={itemcard} key={i} />
          )
        })}
        </div>
        </div>
    );
  }
}

export default Items;
