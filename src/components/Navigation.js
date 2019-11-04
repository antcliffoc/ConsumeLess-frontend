import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import React, { Component } from 'react'

export default class Navigation extends Component {
  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="info" variant="dark">
        <div className="navbar-collapse collapse w-100 order-3 order-md-0 dual-collapse2">
          <Navbar.Brand href="/">Consume£e$$</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/items">
                <Nav.Link eventKey={1}>Home</Nav.Link>
              </LinkContainer>
                <NavDropdown title="User" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/items/new">Add New Item</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Log out</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav>
              <LinkContainer to="/register">
                <Nav.Link eventKey={2}>Register</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/">
              <Nav.Link eventKey={3}>Login</Nav.Link>
              </LinkContainer>
            </Nav>
        </Navbar.Collapse>
          </div>  
        </Navbar>    
      </div>     
    )
  }
}