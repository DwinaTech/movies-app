import React, { Component } from "react";
import data from "../../data/moves.json";
import MoveCard from "../Moves/MoveCard";
import { Row, Col, Form, Button } from "react-bootstrap";
import { formatDate, updateFavorite } from "../../helper";
import "./home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      to: "2000-01-01",
      from: "2019-01-01",
      moves: [],
      actors: []
    };
  }

  componentDidMount() {
    const updateDateFormat = Object.keys(data).map(actor => ({
      [actor]: data[actor].map(film => {
        return {
          ...film,
          date: formatDate(film["UK release date"])
        };
      })
    }));
    this.setState({
      moves: updateDateFormat[0],
      actors: Object.keys(data || {})
    });
  }

  filterMoves = moves => {
    const { from, to } = this.state;
    if (from && to) {
      return moves.filter(
        move =>
          (move.date > from && move.date < to) ||
          (move.date < from && move.date > to)
      );
    }
    return [];
  };

  handleFavorite = (e, moveTitle) => {
    e.preventDefault();
    const { moves, actors } = this.state;
    const updatedMoves = updateFavorite({ moveTitle, moves, actors });
    this.setState({ moves: updatedMoves[0] });
  };

  renderMoves = () => {
    const { actors, moves } = this.state;

    return (
      actors &&
      actors.length &&
      actors.map(actor =>
        this.filterMoves(moves[actor]).map(moveContent => {
          const newProps = {
            title: moveContent["Film"],
            image: moveContent.ImageURL,
            actor: moveContent["Bond Actor"],
            isFavorite: moveContent.isFavorite,
            release: moveContent["UK release date"]
          };
          return (
            <Col key={moveContent["Film"]} xs={12} sm={12} md={4}>
              <MoveCard
                onClick={e => this.handleFavorite(e, moveContent["Film"])}
                {...newProps}
              />
            </Col>
          );
        })
      )
    );
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { from, to } = this.state;
    return (
      <React.Fragment>
        <Row className="moves">
          <Col xs={12} sm={12} md={8}>
            <Form>
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={1}>
                  Form
                </Form.Label>
                <Col sm={5}>
                  <Form.Control
                    name="from"
                    value={from}
                    onChange={this.handleChange}
                    type="date"
                    placeholder="Date"
                  />
                </Col>
                <Form.Label column sm={1}>
                  To
                </Form.Label>
                <Col sm={5}>
                  <Form.Control
                    name="to"
                    value={to}
                    onChange={this.handleChange}
                    type="date"
                    placeholder="Date"
                  />
                </Col>
              </Form.Group>
            </Form>
          </Col>
          <Col xs={12} md={4} className="create-film">
            <Button>Create</Button>
          </Col>
        </Row>
        <Row className="moves">{this.renderMoves()}</Row>
      </React.Fragment>
    );
  }
}

export default Home;
