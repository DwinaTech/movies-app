import React from "react";
import { Card } from "react-bootstrap";

const MovieCard = props => {
  const {
    title,
    actor,
    release,
    image,
    isFavourite,
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
          style={{ color: isFavourite ? "red" : "black" }}
        ></i>
        <small className="text-muted">{` Press to ${
          isFavourite ? "removie from" : "add to"
        } favourite list`}</small>
      </Card.Footer>
    </Card>
  );
};

export default MovieCard;
