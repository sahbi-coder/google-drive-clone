import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function N() {
  return (
    <>
      <Navbar
        expand="sm"
        bg="light"
        className="d-flex justify-content-around align-items-center"
      >
        <Navbar.Brand as={Link} to="/dashboard">
          google drive clone
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/">
            <FontAwesomeIcon icon={faUser} />
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}

export default N;
