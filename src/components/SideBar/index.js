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
    <Nav variant="pills" className="flex-column side-bar" defaultActiveKey={activeKey}>
      <Nav.Item>
        <Nav.Link disabled>Moves:</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/" as={Link} to="/">
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/moves" as={Link} to="/moves">
          Moves
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/favorite" as={Link} to="/favorite">
          Favorite
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default SideBar;
