import { React, Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import HouseDataService from "../services/house.service";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
      login: "",
    };
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    HouseDataService.postLogin(userData)
      .then((result) => {
        this.setState({ login: true });
        // set the cookie
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });

        window.location.href = "/auth/dashboard";
      })
      .catch((error) => {
        error = new Error();
      });
  }

  render() {
    return (
      <div className="form-wrapper d-flex flex-column col-lg-4 m-auto mt-5">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="p-2" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChangeEmail}
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="p-2" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChangePassword}
              placeholder="Password"
            />
          </Form.Group>

          <div className="p-2 text-center">
            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
              Login
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
