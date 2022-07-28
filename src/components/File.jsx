import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

function File({ file }) {
  return (
    <Button
      variant="outline-dark"
      onClick={() => {
        window.open(file.url);
      }}
    >
      <FontAwesomeIcon icon={faFile} />
      {file.name}
    </Button>
  );
}

export default File;
