import React, { Component } from "react";
import HouseDataService from "../services/house.service";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default class SellList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchOwner = this.onChangeSearchOwner.bind(this);
    this.retrieveHouses = this.retrieveHouses.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveHouse = this.setActiveHouse.bind(this);
    this.removeAllHouses = this.removeAllHouses.bind(this);
    this.searchOwner = this.searchOwner.bind(this);

    this.state = {
      houses: [],
      currentHouse: null,
      currentIndex: -1,
      searchOwner: "",
    };
  }

  componentDidMount() {
    this.retrieveHouses();
  }

  onChangeSearchOwner(e) {
    const searchOwner = e.target.value;

    this.setState({
      searchOwner: searchOwner,
    });
  }

  retrieveHouses() {
    HouseDataService.getAllSellsAuth()
      .then((response) => {
        this.setState({
          houses: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveHouses();
    this.setState({
      currentHouse: null,
      currentIndex: -1,
    });
  }

  setActiveHouse(house, index) {
    this.setState({
      currentHouse: house,
      currentIndex: index,
    });
  }

  removeAllHouses() {
    HouseDataService.deleteAllSellsAuth()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchOwner() {
    HouseDataService.findSellByOwner(this.state.searchOwner)
      .then((response) => {
        this.setState({
          houses: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { houses, currentHouse } = this.state;

    return (
      <div className="text-center form-wrapper d-flex flex-column justify-content-center m-auto mt-4">
        <div className="col-sm-4 m-auto">
          <InputGroup className="d-flex flex-row justify-content-center m-auto">
            <Form.Control
              onChange={this.onChangeSearchOwner}
              placeholder="Search by owner"
            />
            <Button onClick={this.searchOwner} variant="outline-secondary">
              Search
            </Button>
          </InputGroup>
        </div>

        <div className="d-flex flex-column flex-wrap justify-content-center align-items-center ">
          <div className="text-center form-wrapper d-flex flex-column col-lg-4 mt-4">
            <h3>Sell List</h3>
            <div className="rent-list">
              <ListGroup className="fs-5" variant="flush">
                {houses &&
                  houses.map((house, index) => (
                    <ListGroup.Item
                      action
                      onClick={() => this.setActiveHouse(house, index)}
                      key={index}
                    >
                      {house.owner}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </div>

            <div className="text-center d-flex flex-row flex-wrap justify-content-center mt-4">
              <Button
                className="fs-5 m-1"
                type="submit"
                variant="danger"
                onClick={this.removeAllHouses}
              >
                Remove All
              </Button>
              <Button className="fs-5 m-1" type="submit" variant="success">
                <Link
                  className="link-light text-decoration-none"
                  to={"/auth/dashboard/sells/add"}
                >
                  Add a new house
                </Link>
              </Button>
            </div>
          </div>
          <div className="">
            {currentHouse ? (
              <div className="mt-3 fs-5">
                <div>
                  <label>
                    <strong>Owner:</strong>
                  </label>{" "}
                  {currentHouse.owner}
                </div>
                <div>
                  <label>
                    <strong>Address:</strong>
                  </label>{" "}
                  {currentHouse.address}
                </div>
                <div>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentHouse.sold ? "Sold" : "Pending"}
                </div>

                <Button
                  className="fs-5 mt-3 mb-3"
                  type="submit"
                  variant="success"
                >
                  <Link
                    className="link-light text-decoration-none"
                    to={"/auth/dashboard/sells/" + currentHouse.id}
                  >
                    View and Edit
                  </Link>
                </Button>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a House...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
