import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { updateMovesData } from "../../helpers";
import AlertComponent from "./AlertComponent";

export class AddMove extends Component {
  state = {
    title: "",
    actor: "",
    release: null,
    image: "",
    boxOffice: "",
    description: "",
    showAlert: false,
    alertMessage: "",
    alertHeading: "",
    alertType: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, actor, release, image, boxOffice, description } = this.state;
    if (!title || !actor || !release || !image || !boxOffice || !description) {
      this.setState({
        alertMessage: "All fields are required make sure you fill all of them!",
        alertHeading: "Error:",
        alertType: "danger",
        showAlert: true
      });
      return;
    }
    if (!image.includes('http://') && !image.includes('https://')) {
        this.setState({
            alertMessage: "You have to inter valid URL!",
            alertHeading: "Error:",
            alertType: "danger",
            showAlert: true
          });
          return;
    }
    const filmData = {
      Film: title,
      "Bond Actor": actor,
      "UK release date": release,
      ImageURL: image,
      Description: description,
      "Box Office(Millions)": boxOffice
    };

    updateMovesData(filmData, "Bond Films");
    this.setState({
      title: "",
      actor: "",
      release: null,
      image: "",
      boxOffice: "",
      description: "",
      alertMessage: "The film added successfully!",
      alertHeading: "Success:",
      alertType: "success",
      showAlert: true
    });
  };

  onClose = () => {
    this.setState({ showAlert: false });
  };

  render() {
    const {
      showAlert,
      alertMessage,
      alertHeading,
      alertType,
      title,
      actor,
      release,
      boxOffice,
      image,
      description
    } = this.state;
    return (
      <Row>
        <Col xs={12} md={{ span: 8, offset: 2 }}>
          {showAlert && (
            <AlertComponent
              type={alertType}
              onClose={this.onClose}
              heading={alertHeading}
              message={alertMessage}
            />
          )}
          <h1>Add new move:</h1>
          <Form>
            <Form.Group controlId="addMoveFormTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                defaultValue={title}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="addMoveFormActor">
              <Form.Label>Actor name</Form.Label>
              <Form.Control
                type="text"
                name="actor"
                defaultValue={actor}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="addMoveFormRelease">
              <Form.Label>Release Date</Form.Label>
              <Form.Control
                type="date"
                name="release"
                defaultValue={release}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="addMoveFormImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                defaultValue={image}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="addMoveFormBoxOffice">
              <Form.Label>Box Office</Form.Label>
              <Form.Control
                type="text"
                name="boxOffice"
                defaultValue={boxOffice}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="addMoveFormDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                rows="3"
                as="textarea"
                name="description"
                defaultValue={description}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button onClick={this.handleSubmit}>Submit</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default AddMove;
