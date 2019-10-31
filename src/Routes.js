import React from "react";
import SideBar from "./SideBar";
import Home from "./components/Home";
import Moves from "./components/Moves";
import data from "./data/moves.json";
import Favorites from "./components/Favorites.js";
import { storeMovesData, getMovesData } from "./helpers";
import { Container, Row, Col } from "react-bootstrap";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./routes.css";

function Routes() {
  const filmsData = Object.keys(getMovesData() || {});
  if (!filmsData || !filmsData.length) {    
    storeMovesData(data);
  }
  
  return (
    <Router>
      <Container fluid>
        <Row>
          <Col className="side-bar" xs={3} md={2} lg={1}>
            <SideBar />
          </Col>
          <Col className="main-contents" xs={9} md={10} lg={11}>
            <Route exact path="/" component={Home} />
            <Route path="/moves" component={Moves} />
            <Route
              path="/favorite"
              component={Favorites}
            />
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default Routes;
