import React, { Component } from "react";
import data from "../../data/moves.json";
import MoveCard from "./MoveCard.js";
import { Row, Col } from "react-bootstrap";
import "./moves.css";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moves: data,
      actors: Object.keys(data || {})
    };
  }
  render() {
    const { moves, actors } = this.state;

    return (
      <Row className="moves">
        {actors.map(
          actor =>
            actor &&
            moves[actor].map(move => {
              const newProps = {
                title: move["Film"],
                actor: move["Bond Actor"],
                image: move.ImageURL,
                release: move["UK release date"]
              };
              return (
                <Col xs={12} sm={12} md={4}>
                  <MoveCard {...newProps} key={move["Film"]} />
                </Col>
              );
            })
        )}
      </Row>
    );
  }
}

export default index;
