import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { updateMoviesData, getMoviesData } from "../../helpers";
import AlertComponent from "./AlertComponent";
import "./index.css";

class AddMovie extends Component {
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
    if (!image.includes("http://") && !image.includes("https://")) {
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
    const currentData = getMoviesData();
    const isMovieExist = currentData["Bond Films"] && currentData["Bond Films"].filter(film => {
      if (
        film.Film === filmData.Film &&
        film["Bond Actor"] === filmData["Bond Actor"] &&
        film["UK release date"] === filmData["UK release date"] &&
        film.ImageURL === filmData.ImageURL &&
        film.Description === filmData.Description &&
        film["Box Office(Millions)"] === filmData["Box Office(Millions)"]
      ) {
        return true;
      }
      return false;
    });
    // Do not add new film data if already exist
    if (isMovieExist && isMovieExist.length) {
      this.setState({
        alertMessage: "This film already exist!",
        alertHeading: "Error:",
        alertType: "danger",
        showAlert: true
      });
      return;
    }
    updateMoviesData(filmData, "Bond Films");
    this.setState({
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
      <Row className="add-movie">
        <Col xs={12} md={{ span: 8, offset: 2 }}>
          {showAlert && (
            <AlertComponent
              type={alertType}
              onClose={this.onClose}
              heading={alertHeading}
              message={alertMessage}
            />
          )}
          <h1>Add new movie:</h1>
          <Form>
            <Form.Group controlId="addmovieFormTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                defaultValue={title}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="addmovieFormActor">
              <Form.Label>Actor name</Form.Label>
              <Form.Control
                type="text"
                name="actor"
                defaultValue={actor}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="addmovieFormRelease">
              <Form.Label>Release Date</Form.Label>
              <Form.Control
                type="date"
                name="release"
                defaultValue={release}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="addmovieFormImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                defaultValue={image}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="addmovieFormBoxOffice">
              <Form.Label>Box Office</Form.Label>
              <Form.Control
                type="text"
                name="boxOffice"
                defaultValue={boxOffice}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="addmovieFormDescription">
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

export default AddMovie;
