import React, { Component } from "react";
import MoveCard from "./MoveCard.js";
import { Row, Col } from "react-bootstrap";
import {
  updateFavorite,
  storeFilmsData,
  addDateToFilms,
  getActorsData
} from "../../helper";
import "./moves.css";

class Moves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moves: [],
      actors: []
    };
  }

  componentDidMount() {
    const actors = getActorsData();
    const updateDateFormat = addDateToFilms();

    this.setState({
      moves: updateDateFormat,
      actors
    });
  }

  handleFavorite = (e, moveTitle, actor) => {
    e.preventDefault();
    const updatedMoves = updateFavorite(moveTitle, actor);
    storeFilmsData(updatedMoves).then(() => {
      this.setState({ moves: updatedMoves });
    });
  };

  render() {
    const { moves, actors } = this.state;

    return (
      <Row className="moves">
        {actors.map(
          actor =>
            actor &&
            moves[actor].map(moveContent => {
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
                    onClick={e => this.handleFavorite(e, moveContent["Film"], actor)}
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
