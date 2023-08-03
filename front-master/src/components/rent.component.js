import React, { Component } from "react";
import HouseDataService from "../services/house.service";
import { withRouter } from "../common/with-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class RentHouse extends Component {
  constructor(props) {
    super(props);
    this.onChangeOwner = this.onChangeOwner.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeNoBedrooms = this.onChangeNoBedrooms.bind(this);
    this.onChangeArea = this.onChangeArea.bind(this);
    this.onChangeAvailFrom = this.onChangeAvailFrom.bind(this);
    this.onChangeSuitableFor = this.onChangeSuitableFor.bind(this);
    this.onChangeParking = this.onChangeParking.bind(this);
    this.onChangePetFriendly = this.onChangePetFriendly.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeCosts = this.onChangeCosts.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeImgCollection = this.onChangeImgCollection.bind(this);
    this.onChangeRented = this.onChangeRented.bind(this);
    this.getHouse = this.getHouse.bind(this);
    this.updateHouse = this.updateHouse.bind(this);
    this.deleteHouse = this.deleteHouse.bind(this);

    this.state = {
      currentHouse: {
        id: null,
        owner: "",
        address: "",
        noBedrooms: "",
        area: "",
        availFrom: "",
        suitableFor: "",
        parking: "",
        petFriendly: "",
        price: "",
        costs: "",
        description: "",
        imgCollection: "",
        rented: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getHouse(this.props.router.params.id);
  }

  onChangeOwner(e) {
    const owner = e.target.value;

    this.setState(function (prevState) {
      return {
        currentHouse: {
          ...prevState.currentHouse,
          owner: owner,
        },
      };
    });
  }

  onChangeAddress(e) {
    const address = e.target.value;

    this.setState((prevState) => ({
      currentHouse: {
        ...prevState.currentHouse,
        address: address,
      },
    }));
  }

  onChangeNoBedrooms(e) {
    const noBedrooms = e.target.value;

    this.setState((prevState) => ({
      currentHouse: {
        ...prevState.currentHouse,
        noBedrooms: noBedrooms,
      },
    }));
  }

  onChangeArea(e) {
    const area = e.target.value;

    this.setState((prevState) => ({
      currentHouse: {
        ...prevState.currentHouse,
        area: area,
      },
    }));
  }

  onChangeAvailFrom(e) {
    const availFrom = e.target.value;

    this.setState((prevState) => ({
      currentHouse: {
        ...prevState.currentHouse,
        availFrom: availFrom,
      },
    }));
  }

  onChangeSuitableFor(e) {
    const suitableFor = e.target.value;

    this.setState((prevState) => ({
      currentHouse: {
        ...prevState.currentHouse,
        suitableFor: suitableFor,
      },
    }));
  }

  onChangeParking(e) {
    const parking = e.target.value;

    this.setState((prevState) => ({
      currentHouse: {
        ...prevState.currentHouse,
        parking: parking,
      },
    }));
  }

  onChangePetFriendly(e) {
    const petFriendly = e.target.value;

    this.setState((prevState) => ({
      currentHouse: {
        ...prevState.currentHouse,
        petFriendly: petFriendly,
      },
    }));
  }

  onChangePrice(e) {
    const price = e.target.value;

    this.setState((prevState) => ({
      currentHouse: {
        ...prevState.currentHouse,
        price: price,
      },
    }));
  }

  onChangeCosts(e) {
    const costs = e.target.value;

    this.setState((prevState) => ({
      currentHouse: {
        ...prevState.currentHouse,
        costs: costs,
      },
    }));
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentHouse: {
        ...prevState.currentHouse,
        description: description,
      },
    }));
  }

  onChangeImgCollection(e) {
    const imgCollection = e.target.files;

    this.setState((prevState) => ({
      currentHouse: {
        ...prevState.currentHouse,
        imgCollection: imgCollection,
      },
    }));
  }

  onChangeRented(e) {
    const rented = e.target.value;

    this.setState((prevState) => ({
      currentHouse: {
        ...prevState.currentHouse,
        rented: rented,
      },
    }));
  }

  getHouse(id) {
    HouseDataService.getRentAuth(id)
      .then((response) => {
        this.setState({
          currentHouse: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateHouse() {
    HouseDataService.updateRentAuth(
      this.state.currentHouse.id,
      this.state.currentHouse
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The house was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteHouse() {
    HouseDataService.deleteRentAuth(this.state.currentHouse.id)
      .then((response) => {
        console.log(response.data);
        this.props.router.navigate("/auth/dashboard/rents");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentHouse } = this.state;

    return (
      <div>
        {currentHouse ? (
          <div className="edit-form">
            <h4>House</h4>
            <Form>
              <Form.Group className="p-2" controlId="owner">
                <Form.Control
                  placeholder="owner"
                  type="text"
                  onChange={this.onChangeOwner}
                  value={currentHouse.owner}
                />
              </Form.Group>
              <Form.Group className="p-2" controlId="address">
                <Form.Control
                  placeholder="address"
                  type="text"
                  onChange={this.onChangeAddress}
                  value={currentHouse.address}
                />
              </Form.Group>

              <Form.Group className="p-2" controlId="noBedrooms">
                <Form.Select
                  type="text"
                  onChange={this.onChangeNoBedrooms}
                  value={currentHouse.noBedrooms}
                >
                  <option value="" disabled selected>
                    Number of bedrooms
                  </option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="p-2" controlId="area">
                <Form.Control
                  placeholder="area "
                  type="number"
                  onChange={this.onChangeArea}
                  value={currentHouse.area}
                />
              </Form.Group>

              <Form.Group
                className="p-2 d-flex flex-row align-items-center"
                controlId="availFrom"
              >
                <Form.Label className="p-2">Available from</Form.Label>
                <Form.Control
                  className="p-2"
                  type="date"
                  onChange={this.onChangeAvailFrom}
                  value={currentHouse.availFrom}
                />
              </Form.Group>

              <Form.Group className="p-2" controlId="suitableFor">
                <Form.Select
                  type="text"
                  onChange={this.onChangeSuitableFor}
                  value={currentHouse.suitableFor}
                >
                  <option value="" disabled selected>
                    Suitable for (No. persons)
                  </option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="p-2" controlId="parking">
                <Form.Select
                  onChange={this.onChangeParking}
                  value={currentHouse.parking}
                >
                  <option value="" disabled selected>
                    Parking
                  </option>
                  <option>Private</option>
                  <option>Public</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="p-2" controlId="petFriendly">
                <Form.Select
                  onChange={this.onChangePetFriendly}
                  value={currentHouse.petFriendly}
                >
                  <option value="" disabled selected>
                    Pets
                  </option>
                  <option>Allowed</option>
                  <option>Not allowed</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="p-2" controlId="price">
                <Form.Control
                  placeholder="price"
                  type="number"
                  onChange={this.onChangePrice}
                  value={currentHouse.price}
                />
              </Form.Group>

              <Form.Group className="p-2" controlId="costs">
                <Form.Select
                  onChange={this.onChangeCosts}
                  value={currentHouse.costs}
                >
                  <option value="" disabled selected>
                    Costs
                  </option>
                  <option>Inclusive</option>
                  <option>Exclusive</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="p-2" controlId="description">
                <Form.Control
                  placeholder="Description (optional)"
                  type="textarea"
                  onChange={this.onChangeDescription}
                  value={currentHouse.description}
                  aria-label="Large"
                />
              </Form.Group>

              <Form.Group className="p-2">
                <Form.Control
                  name="image"
                  type="file"
                  accept="image/jpg"
                  onChange={this.onChangeImgCollection}
                  // value={currentHouse.imgCollection}
                  multiple
                />
              </Form.Group>

              <Form.Group className="p-2" controlId="rented">
                <Form.Select
                  onChange={this.onChangeRented}
                  value={currentHouse.rented}
                >
                  <option value="" disabled selected>
                    Rented
                  </option>
                  <option>Yes</option>
                  <option>No</option>
                </Form.Select>
              </Form.Group>
            </Form>

            <Button
              variant="success"
              size="lg"
              block="block"
              type="submit"
              onClick={this.deleteHouse}
            >
              Delete
            </Button>
            <Button
              variant="success"
              size="lg"
              block="block"
              type="submit"
              onClick={this.updateHouse}
            >
              Update
            </Button>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a House...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(RentHouse);
