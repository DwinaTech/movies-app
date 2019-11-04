import React, { Component } from "react";
import MovieCard from "../Movies/MovieCard";
import { Row, Col, Form, Button } from "react-bootstrap";
import {
  markMovieAsFavourite,
  storeMoviesData,
  addFormatedDate,
  getActorsData
} from "../../helpers";
import "./home.css";
import MovieModal from "../Movies/MovieModal";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      to: "2000-01-01",
      from: "2019-01-01",
      movies: [],
      actors: [],
      showModal: false
    };
  }

  componentDidMount() {
    const actors = getActorsData();
    const moviesData = addFormatedDate();
    this.setState({
      movies: moviesData,
      actors
    });
  }

  filterMovies = movies => {
    const { from, to } = this.state;
    if (from && to) {
      return movies.filter(
        movie =>
          (movie.date > from && movie.date < to) ||
          (movie.date < from && movie.date > to)
      );
    }
    return [];
  };

  handleFavourite = ({ event, actor, id }) => {
    event.preventDefault();
    const updatedMovies = markMovieAsFavourite({ actor, id });
    storeMoviesData(updatedMovies).then(() => {
      this.setState({ movies: addFormatedDate() });
    });
  };

  renderMovies = () => {
    const { actors, movies, showModal } = this.state;
    return (
      actors.length &&
      actors.map(actor => {
        return this.filterMovies(movies[actor]).map(movie => {
          const newProps = {
            title: movie["Film"],
            image: movie.ImageURL,
            actor: movie["Bond Actor"],
            release: movie["UK release date"]
          };
          const modalProps = {
            ...newProps,
            show: showModal,
            onHide: this.onHideModal,
            description: movie["Description"],
            actor: movie["Bond Actor"]
          };
          const cardProps = {
            ...newProps,
            onShowModal: () => this.onShowModal({ ...newProps, ...modalProps }),
            isFavourite: movie.isFavourite,
            onClick: event =>
              this.handleFavourite({
                event,
                actor,
                id: movie.id
              })
          };
          return (
            <Col key={movie.id} xs={12} sm={12} md={4}>
              <MovieCard {...cardProps} />
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
    this.setState({ showModal: false, movieDate: {} });
  };

  onShowModal = movieDate => {
    this.setState({ showModal: true, movieDate });
  };

  render() {
    const { from, to, movieDate } = this.state;
    return (
      <React.Fragment>
        <MovieModal {...movieDate} />
        <Row className="movies">
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
            <Button as="a" href="/add-movie">
              Create
            </Button>
          </Col>
        </Row>
        <Row className="movies">{this.renderMovies()}</Row>
      </React.Fragment>
    );
  }
}

export default Home;
