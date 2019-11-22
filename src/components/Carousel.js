import React, { Component } from 'react'
import InfiniteCarousel from 'react-leaf-carousel';
import Card from 'react-bootstrap/Card'
import { LinkContainer } from 'react-router-bootstrap';
import MapContainer from "./Map";
import getData from "../actions/getData"
import { URLs } from '../constants/URLs';
import { CategoryPics } from '../constants/CategoryPics';

export default class Carousel extends Component {

  constructor(props) {
    super(props);
    // this.getItemsByCategory = this.getItemsByCategory.bind(this)
    this.state = {
      category: this.props.category,

    };
  };

  render() {
    const { changeCategory, categories} = this.props;
    return (
      <div>
        <div>
          <InfiniteCarousel
          breakpoints={[
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
          ]}
          dots={false}
          showSides={true}
          sidesOpacity={.5}
          sideSize={.3}
          slidesToScroll={4}
          slidesToShow={4}
          scrollOnDevice={true}
          >

            <Card classname="cardsize" style={{ width: '15rem' }} border="secondary" bg="">
              <Card.Body>
                <LinkContainer to="#books">
                  <Card.Link onClick={changeCategory.bind(this, categories[0])} >
                    <Card.Header bg="info"><Card.Title>Books</Card.Title></Card.Header>
                  </Card.Link>
                </LinkContainer>
                <Card.Img variant="top" src={CategoryPics.books} />
                <Card.Text className="text-center">
                Find your favourite books here, anything from fiction all the way to non-fiction
                </Card.Text>
              </Card.Body>
            </Card>

            <Card classname="cardsize" style={{ width: '15rem' }} border="secondary" bg="">
              <Card.Body>
                <LinkContainer to="#clothes">
                  <Card.Link onClick={changeCategory.bind(this, categories[1])} >
                    <Card.Header bg="info"><Card.Title>Clothes</Card.Title></Card.Header>
                  </Card.Link>
                </LinkContainer>
                <Card.Img variant="top" src={CategoryPics.clothes} />
                <Card.Text className="text-center">
                Still wearing that GAP jumper from 2006? Stop embarrasing yourself here
                </Card.Text>
              </Card.Body>
            </Card>

            <Card classname="cardsize" style={{ width: '15rem' }} border="secondary" bg="">
              <Card.Body>
                <LinkContainer to="#games">
                  <Card.Link onClick={changeCategory.bind(this, categories[2])} >
                    <Card.Header bg="info"> <Card.Title>Games</Card.Title></Card.Header>
                  </Card.Link>
                </LinkContainer>
                <Card.Img variant="top" src={CategoryPics.games} />
                <Card.Text className="text-center">
                The outdoors is overrated. Keep yourself inside with these board games.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card classname="cardsize" style={{ width: '15rem' }} border="secondary" bg="">
              <Card.Body>
                <LinkContainer to="#music">
                  <Card.Link onClick={changeCategory.bind(this, categories[3])} >
                    <Card.Header bg="info"> <Card.Title>Music</Card.Title></Card.Header>
                  </Card.Link>
                </LinkContainer>
                <Card.Img variant="top" src={CategoryPics.music} />
                <Card.Text className="text-center">
                Tired of peace and quiet and need a drumset for your child?
                </Card.Text>
              </Card.Body>
            </Card>

            <Card style={{ width: '15rem' }} border="secondary" bg="">
              <Card.Body>
                <LinkContainer to="#garden">
                  <Card.Link onClick={changeCategory.bind(this, categories[4])} >
                    <Card.Header bg="info"> <Card.Title>Garden & Home</Card.Title></Card.Header>
                  </Card.Link>
                </LinkContainer>
                <Card.Img variant="top" src={CategoryPics.equipment} />
                <Card.Text className="text-center">
                Need to mow but don't know where to go? We've got the answer!
                </Card.Text>
              </Card.Body>
            </Card>

            <Card classname="cardsize" style={{ width: '15rem' }} border="secondary" bg="">
              <Card.Body>
                <LinkContainer to="#toys">
                  <Card.Link onClick={changeCategory.bind(this, categories[5])} >
                    <Card.Header bg="info"> <Card.Title>Toys</Card.Title></Card.Header>
                  </Card.Link>
                </LinkContainer>
                <Card.Img variant="top" src={CategoryPics.toys} />
                <Card.Text className="text-center">
                Train your children to play by themselves. (Safety cannot be guaranteed).
                </Card.Text>
              </Card.Body>
            </Card>

          </InfiniteCarousel>
        </div>
      </div>
    )
  }
}
