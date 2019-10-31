import React, { Component } from "react";
import MoveCard from "../Moves/MoveCard";
import { Row, Col, Form, Button } from "react-bootstrap";
import {
  markMoveAsFavorite,
  storeMovesData,
  addFormatedDate,
  getActorsData
} from "../../helpers";
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
    const actors = getActorsData();
    const movesData = addFormatedDate();

    this.setState({
      moves: movesData,
      actors
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

  handleFavorite = (e, moveTitle, actor) => {
    e.preventDefault();
    const updatedMoves = markMoveAsFavorite(moveTitle, actor);
    storeMovesData(updatedMoves).then(() => {
      window.location.reload();
    });
  };

  renderMoves = () => {
    const { actors, moves } = this.state;

    return (
      actors.length &&
      actors.map(actor => {
        return this.filterMoves(moves[actor]).map(move => {
          const newProps = {
            title: move["Film"],
            image: move.ImageURL,
            actor: move["Bond Actor"],
            isFavorite: move.isFavorite,
            release: move["UK release date"]
          };
          return (
            <Col key={move["Film"]} xs={12} sm={12} md={4}>
              <MoveCard
                onClick={e =>
                  this.handleFavorite(e, move["Film"], actor)
                }
                {...newProps}
              />
            </Col>
          );
        });
      })
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