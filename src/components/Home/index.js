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
import MoveModal from "../Moves/moveModal";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      to: "2000-01-01",
      from: "2019-01-01",
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

  handleFavorite = ({ event, actor, id }) => {
    event.preventDefault();
    const updatedMoves = markMoveAsFavorite({ actor, id });
    storeMovesData(updatedMoves).then(() => {
      this.setState({ moves: addFormatedDate() });
    });
  };

  renderMoves = () => {
    const { actors, moves, showModal } = this.state;
    return (
      actors.length &&
      actors.map(actor => {
        return this.filterMoves(moves[actor]).map(move => {
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
            onShowModal: () => this.onShowModal({ ...newProps, ...modalProps }),
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
        });
      })
    );
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onHideModal = () => {
    this.setState({ showModal: false, moveDate: {} });
  };

  onShowModal = moveDate => {
    this.setState({ showModal: true, moveDate });
  };

  render() {
    const { from, to, moveDate } = this.state;
    return (
      <React.Fragment>
        <MoveModal {...moveDate} />
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
            <Button as="a" href="/add-move">
              Create
            </Button>
          </Col>
        </Row>
        <Row className="moves">{this.renderMoves()}</Row>
      </React.Fragment>
    );
  }
}

export default Home;
