import React, { Component } from "react";
import MovieCard from "./MovieCard";
import { Row, Col, Form } from "react-bootstrap";
import {
  markMovieAsFavourite,
  storeMoviesData,
  addFormatedDate,
  getActorsData
} from "../../helpers";
import "./movies.css";
import  MovieModal from "./MovieModal";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      actors: [],
      showModal: false,
      leadActor: ''
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

  handleFavourite = ({ event, actor, id }) => {
    event.preventDefault();
    const updatedMovies = markMovieAsFavourite({ actor, id });
    storeMoviesData(updatedMovies).then(() => {
      this.setState({ movies: addFormatedDate() });
    });
  };

  onHideModal = () => {
    this.setState({ showModal: false, movieDate: {} });
  };

  onShowModal = movieDate => {
    this.setState({ showModal: true, movieDate });
  };

  filterMovies = (movies = []) => {
    const { leadActor } = this.state;
    if (leadActor) {
      return movies.length && movies.filter(movie => {
        const actor = movie['Bond Actor'].toLowerCase();
        return actor.includes(leadActor.toLowerCase());
      });
    }
    return movies;
  };

  handleSearchChange = e => {
    e.preventDefault();
    this.setState({ leadActor: e.target.value })
  }

  render() {
    const { movies, actors, showModal, movieDate } = this.state;
    return (
      <div className="movies">
        <Row>
          <Col xs={12} className="search">
            <Form.Control onChange={this.handleSearchChange} name="leadActor" placeholder="Search by Lead actor" />
          </Col>
        </Row>
        <Row>
          <MovieModal {...movieDate} />
          {actors.map(
            actor =>
              actor &&
              this.filterMovies(movies[actor]).map(movie => {
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
                  onShowModal: () =>
                    this.onShowModal({ ...newProps, ...modalProps }),
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
              })
          )}
        </Row>
      </div>
    );
  }
}

export default Movies;
