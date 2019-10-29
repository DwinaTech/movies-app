import React from "react";
import { Card } from "react-bootstrap";

const MoveCard = ({ title, actor, release, image }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{release}</Card.Text>
        <Card.Text>{actor}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MoveCard;
