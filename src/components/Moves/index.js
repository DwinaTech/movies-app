import React, { Component } from "react";
import MoveCard from "./MoveCard.js";
import { Row, Col } from "react-bootstrap";
import {
  markMoveAsFavorite,
  storeMovesData,
  addFormatedDate,
  getActorsData
} from "../../helpers";
import "./moves.css";
import MoveModal from "./moveModal";

class Moves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moves: [],
      actors: [],
      showModal: false
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

  handleFavorite = (e, moveTitle, actor) => {
    e.preventDefault();
    const updatedMoves = markMoveAsFavorite(moveTitle, actor);
    storeMovesData(updatedMoves).then(() => {
      window.location.reload();
    });
  };

  onHideModal = () => {
    this.setState({ showModal: false, moveDate: {} });
  };

  onShowModal = moveDate => {
    this.setState({ showModal: true, moveDate });
  };

  render() {
    const { moves, actors, showModal, moveDate } = this.state;
    return (
      <Row className="moves">
        <MoveModal {...moveDate} />
        {actors.map(
          actor =>
            actor &&
            moves[actor].map(move => {
              const newProps = {
                title: move["Film"],
                image: move.ImageURL,
                actor: move["Bond Actor"],
                release: move["UK release date"]
              };
              const modalProps = {
                ...newProps,
                show: showModal,
                onHide: this.onHideModal,
                description: move["Description"],
                actor: move["Bond Actor"]
              };
              const cardProps = {
                ...newProps,
                onShowModal: e =>
                  this.onShowModal({ ...newProps, ...modalProps }),
                isFavorite: move.isFavorite,
                onClick: e => this.handleFavorite(e, move["Film"], actor)
              };
              return (
                <Col key={move["Film"]} xs={12} sm={12} md={4}>
                  <MoveCard {...cardProps} />
                </Col>
              );
            })
        )}
      </Row>
    );
  }
}

export default Moves;
