import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Folder({ folder }) {
 
  return (
    <Button
      variant="outline-dark"
      as={Link}
      to={`/dashboard/folders/${folder.id}`}
    >
      <FontAwesomeIcon icon={faFolder} />
      {folder.id}
    </Button>
  );
}

export default Folder;
