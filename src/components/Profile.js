import React, { Component } from 'react';
import AuthService from './AuthService';
import Navigation from './Navigation';
import getData from "../actions/getData";
import { URLs } from '../constants/URLs';
import ItemsTable from './ItemsTable';
import RequestTable from './RequestTable'
import BorrowedTable from './BorrowedTable'
import LentOutTable from './LentOutTable'

import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { MdGrade, MdEmail, MdLocationOn, MdAccountCircle } from 'react-icons/md';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        email: "",
        created_at: "",
      },
      itemsOwn: [],
      itemsBorrowed: [],
      itemsLent: [],
      bookingRequests: []
    }
    this.Auth = new AuthService();
    this.confirmRequest = this.confirmRequest.bind(this);
  }

  async componentDidMount() {
    const userId = await this.Auth.getProfile().user_id;
    const user = await getData(URLs.user + `${userId}`);
    this.setState({ user });

    const token = this.Auth.getToken();
    const itemsOwn = await getData(URLs.itemsOwn + `?token=${token}`);
    this.setState({ itemsOwn });
    console.log(itemsOwn)

    const itemsBorrowed = await getData(URLs.itemsBorrowed + `?token=${token}`);
    this.setState({ itemsBorrowed });
    console.log(itemsBorrowed)

    const itemsLent = await getData(URLs.itemsLent + `?token=${token}`);
    this.setState({ itemsLent });

    const bookingRequests = await getData(URLs.bookingRequests + `?token=${token}`);
    this.setState({ bookingRequests });
  }

  confirmRequest = (index, event) => {
    let id = this.state.bookingRequests[index].id
    this.Auth.confirmRequest(id)
      .then(res => this.props.history.replace('/profile'),
      this.setState({bookingRequests: [...this.state.bookingRequests.filter(request =>
      request.id !== id)]}))
      .catch(error => alert(error))
    this.forceUpdate()
  }

  rejectRequest = (index, event) => {
    let id = this.state.bookingRequests[index].id
    this.Auth.rejectRequest(id)
      .then(res => this.props.history.replace('/profile'),
      this.setState({bookingRequests: [...this.state.bookingRequests.filter(request =>
      request.id !== id)]}))
      .catch(error => alert(error))
  }

  render() {
    const { user, itemsOwn } = this.state;
    console.log(user)
    return (
      <div><Navigation />
        <Jumbotron variant="primary">
          <Container>
            <Row>
              <Col xs={6} md={4}>
                <Card style={{ width: '18rem' }} border="secondary">
                  <Card.Body>
                    <Card.Title className = "userNameTitle"><MdAccountCircle />  {user.username}</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem className="iconEmail"><MdEmail />  {user.email}</ListGroupItem>
                    <ListGroupItem className="iconLocation"><MdLocationOn / >  {user.postcode}</ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>

              <Col xs={6} md={4}>
                <Card style={{ width: '18rem' }}  border="secondary">
                  <Image variant="top" src="https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60"
                    roundedCircle />
                </Card>
              </Col>

              <Col xs={6} md={4}>
                <Card style={{ width: '18rem' }}  border="secondary">
                  <Card.Body>
                    <Card.Title className = "userNameTitle">User rating</Card.Title>
                  </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem className="star">
                        < MdGrade />
                        <MdGrade />
                        <MdGrade />
                        <MdGrade />
                        <MdGrade />
                      </ListGroupItem>
                      <ListGroupItem>Member since: {this.state.user.created_at}</ListGroupItem>
                    </ListGroup>
                </Card>
              </Col>
            </Row>
          </Container>
        </Jumbotron>

          <Container>
          <Accordion>
          <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0" className="profileItems">
                Items I own
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body><ItemsTable tableData={this.state.itemsOwn} /></Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0" className="profileItems">
                Items I have Borrowed
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body><BorrowedTable tableData={this.state.itemsBorrowed} /></Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1" className="profileItems">
                Items I am lending out
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body><LentOutTable tableData={this.state.itemsLent} /></Card.Body>
              </Accordion.Collapse>
              <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1" className="profileItems">
                Booking Requests
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body><RequestTable tableData={this.state.bookingRequests} confirmRequest={this.confirmRequest} rejectRequest={this.rejectRequest} /></Card.Body>
              </Accordion.Collapse>
            </Card>
            </Card>
          </Accordion>
        </Container>
      </div>
    )
  }
}
