import React from "react";
import SideBar from "../components/SideBar";
import Home from "../components/Home";
import Moves from "../components/Moves";
import data from "../data/moves.json";
import AddMove from "../components/AddMove.js/index.js";
import Favorites from "../components/Favorites.js/index.js";
import { Container, Row, Col } from "react-bootstrap";
import { storeMovesData, getMovesData } from "../helpers";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./routes.css";

function Routes() {
  const filmsData = Object.keys(getMovesData() || {});
  if (!filmsData || !filmsData.length) {
    storeMovesData(data);
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
            <Route path="/moves" component={Moves} />
            <Route path="/favorite" component={Favorites} />
            <Route path="/add-move" component={AddMove} />
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default Routes;
