import React from "react";
import { Alert } from "react-bootstrap";

const AlertComponent = ({ message, heading, onClose, type }) => (
  <Alert variant={type} onClose={onClose} dismissible>
    <Alert.Heading>{heading}</Alert.Heading>
    <p>{message}</p>
  </Alert>
);

export default AlertComponent;
