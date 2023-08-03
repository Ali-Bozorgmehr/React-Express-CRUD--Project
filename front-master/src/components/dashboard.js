import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import HouseDataService from "../services/house.service";

import { Button } from "react-bootstrap";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// get token generated on login

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.retrieveDashboard = this.retrieveDashboard.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      message: "",
    };
  }

  componentDidMount() {
    this.retrieveDashboard();
  }

  retrieveDashboard() {
    HouseDataService.getAuthDashboard()
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
      })
      .catch((error) => {
        error = new Error();
      });
  }

  logout() {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/user/login";
  }

  render() {
    return (
      <div className="text-center form-wrapper d-flex flex-column col-lg-4 m-auto mt-5">
        <h3 className="text-danger fs-6">{this.message}</h3>

        <ListGroup className="fs-5" variant="flush">
          <ListGroup.Item action href="/auth/dashboard/rents">
            Rents
          </ListGroup.Item>
          <ListGroup.Item action href="/auth/dashboard/sells">
            Sells
          </ListGroup.Item>
        </ListGroup>

        {/* logout */}
        <div className="p-2 text-center">
          <Button
            className="fs-5"
            type="submit"
            variant="danger"
            onClick={this.logout}
          >
            Logout
          </Button>
        </div>
      </div>
    );
  }
}
