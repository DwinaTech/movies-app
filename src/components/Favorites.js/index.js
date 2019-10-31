import React, { Component } from "react";
import MoveCard from "../Moves/MoveCard";
import { Row, Col } from "react-bootstrap";
import {
  getFavoriteMoves,
  markMoveAsFavorite,
  storeMovesData
} from "../../helpers";

export class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moves: [],
      actors: []
    };
  }

  componentDidMount() {
    const movesDate = getFavoriteMoves();
    const actors = Object.keys(movesDate || {});

    this.setState({
      moves: movesDate,
      actors
    });
  }

  handleFavorite = (e, moveTitle, actor) => {
    e.preventDefault();
    const updatedMoves = markMoveAsFavorite(moveTitle, actor);
    storeMovesData(updatedMoves).then(() => {
      window.location.reload();
    });
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
                    onClick={e =>
                      this.handleFavorite(e, move["Film"], actor)
                    }
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

export default Favorites;
