import React from "react";
import { Card } from "react-bootstrap";

const MoveCard = props => {
  const {
    title,
    actor,
    release,
    image,
    isFavorite,
    onClick,
    onShowModal
  } = props;
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img onClick={onShowModal} variant="top" src={image} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{release}</Card.Text>
        <Card.Text>{actor}</Card.Text>
        <Card.Text></Card.Text>
      </Card.Body>
      <Card.Footer onClick={onClick}>
        <i
          className="fa fa-heart"
          style={{ color: isFavorite ? "red" : "black" }}
        ></i>
        <small className="text-muted">{` Press to ${
          isFavorite ? "remove from" : "add to"
        } favorite list`}</small>
      </Card.Footer>
    </Card>
  );
};

export default MoveCard;
