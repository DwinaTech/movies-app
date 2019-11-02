import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { updateMovesData } from "../../helpers";

export class AddMove extends Component {
  state = {
    title: "",
    actor: "",
    release: null,
    image: "",
    boxOffice: "",
    description: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, actor, release, image, boxOffice, description } = this.state;
    const filmData = {
      Film: title,
      "Bond Actor": actor,
      "UK release date": release,
      ImageURL: image,
      Description: description,
      "Box Office(Millions)": boxOffice
    };
    updateMovesData(filmData, 'Bond Films');
  };

  render() {
    return (
      <Row>
        <Col xs={12} md={{ span: 8, offset: 2 }}>
          <h1>Add new move:</h1>
          <Form>
            <Form.Group controlId="addMoveFormTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                name="title"
                type="text"
              />
            </Form.Group>
            <Form.Group controlId="addMoveFormActor">
              <Form.Label>Actor name</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                name="actor"
                type="text"
              />
            </Form.Group>
            <Form.Group controlId="addMoveFormRelease">
              <Form.Label>Release Date</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                name="release"
                type="date"
              />
            </Form.Group>
            <Form.Group controlId="addMoveFormImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                name="image"
                type="text"
              />
            </Form.Group>
            <Form.Group controlId="addMoveFormBoxOffice">
              <Form.Label>Box Office</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                name="boxOffice"
                type="text"
              />
            </Form.Group>
            <Form.Group controlId="addMoveFormDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                defaultValue="Add Description"
                rows="3"
                onChange={this.handleChange}
                name="description"
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
