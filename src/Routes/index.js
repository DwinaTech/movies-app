import React from "react";
import SideBar from "../components/SideBar";
import Home from "../components/Home";
import movies from "../components/Movies";
import data from "../data/movies.json";
import AddMovie from "../components/AddMovie";
import Favourites from "../components/Favourites";
import { Container, Row, Col } from "react-bootstrap";
import { storeMoviesData, getMoviesData } from "../helpers";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./routes.css";

function Routes() {
  const filmsData = Object.keys(getMoviesData() || {});
  if (!filmsData || !filmsData.length) {
    storeMoviesData(data);
  }

  return (
    <Router>
      <Container>
        <Row>
          <Col className="side-bar-container" xs={3} md={2}>
            <SideBar />
          </Col>
          <Col className="main-contents" xs={9} md={10}>
            <Route exact path="/" component={Home} />
            <Route path="/movies" component={movies} />
            <Route path="/favourite" component={Favourites} />
            <Route path="/add-movie" component={AddMovie} />
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default Routes;
