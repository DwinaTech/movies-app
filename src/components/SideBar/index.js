import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const SideBar = () => {
  const { pathname } = window.location;
  const [activeKey, setActiveKey] = useState(pathname);

  useEffect(() => {
    setActiveKey(pathname);
  }, [pathname]);

  return (
    <Nav
      variant="pills"
      className="flex-column side-bar"
      defaultActiveKey={activeKey}
    >
      <Nav.Item>
        <Nav.Link disabled>movies:</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/" as={Link} to="/">
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/movies" as={Link} to="/movies">
          Movies
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/favourite" as={Link} to="/favourite">
          Favourite
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/add-movie" as={Link} to="/add-movie">
          Add Film
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default SideBar;
