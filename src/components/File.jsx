import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function File({ file }) {
  return (
    <Button
      variant="outline-dark"
      as={Link}
      to={`/dashboard/folders/${file.id}`}
    >
      <FontAwesomeIcon icon={faFile}/>{file.name}
    </Button>
  );
}

export default File;
