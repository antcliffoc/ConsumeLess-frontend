import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { useHistory, withRouter } from 'react-router-dom';
import AuthService from './AuthService';
import getData from "../actions/getData";
import { URLs } from '../constants/URLs';
const Auth = new AuthService();

export default class Navigation extends Component {
  state = {
    user: {
      username: ""
    },
    navigate: false
  }

  async componentDidMount() {
    const userId = await Auth.getProfile().user_id;
    const user = await getData(URLs.user + `${userId}`);
    this.setState({ user });
  }

  render() {
    const { navigate } = this.state;
    if ( navigate ) {
      localStorage.removeItem('id_token');
      return <Redirect to="/" push={true} />
    }

    const { username } = this.state.user;

    return (
      <div>
        <Navbar collapseOnSelect expand="lg" variant="light" className="Navigation">
        <div className="navbar-collapse collapse w-100 order-3 order-md-0 dual-collapse2">
          <Navbar.Brand href="/"><img src={require('../logo-with-name-small.svg')} /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/categories">
                <Nav.Link eventKey={1}>Home</Nav.Link>
              </LinkContainer>
                <NavDropdown title={ username } id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/items/new">Add New Item</NavDropdown.Item>
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                </NavDropdown>
              <LinkContainer to="#">
                <Nav.Link eventKey={3} onClick={() => this.setState({ navigate: true })}>Log out</Nav.Link>
              </LinkContainer>
            </Nav>
        </Navbar.Collapse>
          </div>
        </Navbar>
      </div>
    )
  }
}
