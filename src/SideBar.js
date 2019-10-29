import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

const SideBar = () => {
  const [activeKey, setActiveKey] = useState(1);
  const handleClick = (e, newActiveKey) => {
      e.preventDefault();
      console.log('newActiveKey ====>>>>', newActiveKey);
      
    setActiveKey(newActiveKey);
  };

  return (
    <Nav variant="pills" className="flex-column" defaultActiveKey={activeKey}>
      <Nav.Item>
        <Nav.Link disabled>Moves:</Nav.Link>
      </Nav.Item>
      <Nav.Item onClick={e => handleClick(e, 1)}>
        <Nav.Link eventKey="1" as={Link} to="/">
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item onClick={e => handleClick(e, 2)}>
        <Nav.Link eventKey="2" as={Link} to="/moves">
          Moves
        </Nav.Link>
      </Nav.Item>
      <Nav.Item onClick={e => handleClick(e, 3)}>
        <Nav.Link eventKey="3" as={Link} to="/favorite">
          Favorite
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default SideBar;
