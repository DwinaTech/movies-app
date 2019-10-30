import React, { Component } from "react";
import data from "../../data/moves.json";
import MoveCard from "./MoveCard.js";
import { Row, Col } from "react-bootstrap";
import "./moves.css";

class Moves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moves: data,
      actors: Object.keys(data || {})
    };
  }

  handleFavorite = (e, moveTitle) => {
    e.preventDefault();
    const { moves, actors } = this.state;

    const updatedMoves = actors.map(actor => {
      return {
        [actor]: moves[actor].map(move => {
          if (move["Film"] === moveTitle) {
            return {
              ...move,
              isFavorite: true
            };
          }
          return move;
        })
      }
    });

    this.setState({ moves: updatedMoves[0] });
  };

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
                image: move.ImageURL,
                actor: move["Bond Actor"],
                isFavorite: move.isFavorite,
                release: move["UK release date"]
              };
              return (
                <Col key={move["Film"]} xs={12} sm={12} md={4}>
                  <MoveCard
                    onClick={e => this.handleFavorite(e, move["Film"])}
                    {...newProps}
                  />
                </Col>
              );
            })
        )}
      </Row>
    );
  }
}

export default Moves;
