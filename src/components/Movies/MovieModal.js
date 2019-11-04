import React from "react";
import { Modal, Button, Image } from "react-bootstrap";

const MovieModal = ({
  show,
  title,
  actor,
  image,
  onHide,
  release,
  description,
  boxOfficeTakings
}) => {
  return (
    <Modal
      size="lg"
      onHide={onHide}
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Image src={image} />
      </Modal.Header>
      <Modal.Body>
        <h4>{title}</h4>
        <h4>{release}</h4>
        <h4>{actor}</h4>
        <h4>{boxOfficeTakings}</h4>
        <p>{description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieModal;
