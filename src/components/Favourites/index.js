import React, { Component } from "react";
import MovieCard from "../Movies/MovieCard";
import { Row, Col } from "react-bootstrap";
import {
  getFavouriteMovies,
  markMovieAsFavourite,
  storeMoviesData,
} from "../../helpers";
import MovieModal from "../Movies/MovieModal";

export class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      actors: [],
      movieDate: {}
    };
  }

  componentDidMount() {
    const moviesDate = getFavouriteMovies();
    const actors = Object.keys(moviesDate || {});
    this.setState({
      movies: moviesDate,
      actors
    });
  }

  handleFavourite = ({ event, actor, id }) => {
    event.preventDefault();
    const updatedmovies = markMovieAsFavourite({ actor, id });
    storeMoviesData(updatedmovies).then(() => {
      this.setState({ movies: getFavouriteMovies() });
    });
  };

  onHideModal = () => {
    this.setState({ showModal: false, movieDate: {} });
  };

  onShowModal = movieDate => {
    this.setState({ showModal: true, movieDate });
  };

  render() {
    const { movies, actors, showModal, movieDate } = this.state;
    return (
      <Row className="movies">
        <MovieModal {...movieDate} />
        {actors.map(
          actor =>
            actor &&
            movies[actor].map(movie => {
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
    );
  }
}

export default Favourites;
