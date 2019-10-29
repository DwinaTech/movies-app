import React from "react";
import SideBar from "./SideBar";
import Moves from "./components/Moves";
import { Container, Row, Col } from "react-bootstrap";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./routes.css";

function Routes() {
  return (
    <Router>
      <Container fluid>
        <Row>
          <Col className="side-bar" xs={3}>
            <SideBar />
          </Col>
          <Col className="main-contents" xs={9}>
            <Route exact path="/" render={() => <h1>Home component</h1>} />
            <Route path="/moves" component={Moves} />
            <Route
              path="/favorite"
              render={() => <h1>Favorite component</h1>}
            />
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default Routes;
