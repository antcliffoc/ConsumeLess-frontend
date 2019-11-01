import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = ({ target }, type) => {
    this.setState({
      ...this.state,
      [type]: target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target)
    console.log(data);
    
    const url = "http://localhost:1337/myfile.html"
    fetch(url, {
      method: 'POST',
      body: data,
      mode: 'no-cors',
    });
  }

  render() {
    const { username, email, password, confirmPassword } = this.state;

    return (
      <div className="container">
        <h3>Register to become a member</h3>
        <br />
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={event => this.handleChange(event, "username")}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={event => this.handleChange(event, "email")}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              name="password"
              autoComplete="password"
              value={password}
              onChange={event => this.handleChange(event, "password")}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Consfirm Password</Form.Label>
            <Form.Control
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="password"
              value={confirmPassword}
              onChange={event => this.handleChange(event, "confirmPassword")}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    )
  }
}