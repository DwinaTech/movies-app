import React, { Component } from "react";
import MoveCard from "./MoveCard.js";
import { Row, Col, Form } from "react-bootstrap";
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
      showModal: false,
      leadActor: ''
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

  handleFavorite = ({ event, actor, id }) => {
    event.preventDefault();
    const updatedMoves = markMoveAsFavorite({ actor, id });
    storeMovesData(updatedMoves).then(() => {
      this.setState({ moves: addFormatedDate() });
    });
  };

  onHideModal = () => {
    this.setState({ showModal: false, moveDate: {} });
  };

  onShowModal = moveDate => {
    this.setState({ showModal: true, moveDate });
  };

  filterMoves = (moves = []) => {
    const { leadActor } = this.state;
    if (leadActor) {
      return moves.length && moves.filter(move => {
        const actor = move['Bond Actor'].toLowerCase();
        return actor.includes(leadActor.toLowerCase());
      });
    }
    return moves;
  };

  handleSearchChange = e => {
    e.preventDefault();
    this.setState({ leadActor: e.target.value })
  }

  render() {
    const { moves, actors, showModal, moveDate } = this.state;
    return (
      <div className="moves">
        <Row>
          <Col xs={12} className="search">
            <Form.Control onChange={this.handleSearchChange} name="leadActor" placeholder="Search by Lead actor" />
          </Col>
        </Row>
        <Row>
          <MoveModal {...moveDate} />
          {actors.map(
            actor =>
              actor &&
              this.filterMoves(moves[actor]).map(move => {
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
                  onShowModal: () =>
                    this.onShowModal({ ...newProps, ...modalProps }),
                  isFavorite: move.isFavorite,
                  onClick: event =>
                    this.handleFavorite({
                      event,
                      actor,
                      id: move.id
                    })
                };
                return (
                  <Col key={move.id} xs={12} sm={12} md={4}>
                    <MoveCard {...cardProps} />
                  </Col>
                );
              })
          )}
        </Row>
      </div>
    );
  }
}

export default Moves;
