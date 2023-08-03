import React, { Component } from "react";
import HouseDataService from "../services/house.service";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class AddRent extends Component {
  constructor(props) {
    super(props);
    this.onChangeOwner = this.onChangeOwner.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeRented = this.onChangeRented.bind(this);
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
    this.saveHouse = this.saveHouse.bind(this);
    this.newHouse = this.newHouse.bind(this);

    this.state = {
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
      submitted: false,
    };
  }

  onChangeOwner(e) {
    this.setState({
      owner: e.target.value,
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }

  onChangeNoBedrooms(e) {
    this.setState({
      noBedrooms: e.target.value,
    });
  }

  onChangeArea(e) {
    this.setState({
      area: e.target.value,
    });
  }

  onChangeAvailFrom(e) {
    this.setState({
      availFrom: e.target.value,
    });
  }

  onChangeSuitableFor(e) {
    this.setState({
      suitableFor: e.target.value,
    });
  }

  onChangeParking(e) {
    this.setState({
      parking: e.target.value,
    });
  }

  onChangePetFriendly(e) {
    this.setState({
      petFriendly: e.target.value,
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }

  onChangeCosts(e) {
    this.setState({
      costs: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeImgCollection(e) {
    this.setState({
      imgCollection: e.target.files,
    });
  }

  onChangeRented(e) {
    this.setState({
      rented: e.target.value,
    });
  }

  saveHouse() {
    let formData = new FormData();
    formData.append("owner", this.state.owner);
    formData.append("address", this.state.address);
    formData.append("rented", this.state.rented);
    formData.append("noBedrooms", this.state.noBedrooms);
    formData.append("area", this.state.area);
    formData.append("availFrom", this.state.availFrom);
    formData.append("suitableFor", this.state.suitableFor);
    formData.append("parking", this.state.parking);
    formData.append("petFriendly", this.state.petFriendly);
    formData.append("price", this.state.price);
    formData.append("costs", this.state.costs);
    formData.append("description", this.state.description);
    formData.append("imgCollection", this.state.files);
    for (const key of Object.keys(this.state.imgCollection)) {
      formData.append("imgCollection", this.state.imgCollection[key]);
    }

    HouseDataService.createRentAuth(formData)
      .then((response) => {
        this.setState({
          id: response.data.id,
          owner: response.data.owner,
          address: response.data.address,
          rented: response.data.rented,
          noBedrooms: response.data.noBedrooms,
          area: response.data.area,
          availFrom: response.data.availFrom,
          suitableFor: response.data.suitableFor,
          parking: response.data.parking,
          petFriendly: response.data.petFriendly,
          price: response.data.price,
          costs: response.data.costs,
          description: response.data.description,
          imgCollection: response.data.imgCollection,
          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newHouse() {
    this.setState({
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
      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Button
              variant="success"
              size="lg"
              block="block"
              type="submit"
              onClick={this.newHouse}
            >
              Add
            </Button>
          </div>
        ) : (
          <div>
            <Form>
              <Form.Group className="p-2" controlId="owner">
                <Form.Control
                  placeholder="owner"
                  type="text"
                  onChange={this.onChangeOwner}
                  value={this.state.owner}
                />
              </Form.Group>
              <Form.Group className="p-2" controlId="address">
                <Form.Control
                  placeholder="address"
                  type="text"
                  onChange={this.onChangeAddress}
                  value={this.state.address}
                />
              </Form.Group>

              <Form.Group className="p-2" controlId="noBedrooms">
                <Form.Select
                  type="text"
                  onChange={this.onChangeNoBedrooms}
                  value={this.state.noBedrooms}
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
                  value={this.state.area}
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
                  value={this.state.availFrom}
                />
              </Form.Group>

              <Form.Group className="p-2" controlId="suitableFor">
                <Form.Select
                  type="text"
                  onChange={this.onChangeSuitableFor}
                  value={this.state.suitableFor}
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
                  value={this.state.parking}
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
                  value={this.state.petFriendly}
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
                  value={this.state.price}
                />
              </Form.Group>

              <Form.Group className="p-2" controlId="costs">
                <Form.Select
                  onChange={this.onChangeCosts}
                  value={this.state.costs}
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
                  value={this.state.description}
                  aria-label="Large"
                />
              </Form.Group>

              <Form.Group className="p-2">
                <Form.Control
                  name="image"
                  type="file"
                  onChange={this.onChangeImgCollection}
                  // value={this.state.imgCollection}
                  multiple
                />
              </Form.Group>

              <Form.Group className="p-2" controlId="rented">
                <Form.Select
                  onChange={this.onChangeRented}
                  value={this.state.rented}
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
              onClick={this.saveHouse}
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    );
  }
}
