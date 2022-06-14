import React, { useState } from "react";
import { Modal,Container,Form,Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

import {  doc, setDoc, serverTimestamp,db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { ROOT_FOLDER } from "../hooks/useFolder"

function AddFolder({ currentFolder }) {

  const [IsOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(false);
  const { currentUser } = useAuth();

  async function addFolder(id, userId,path) {
    

    await setDoc(doc(db, "folders", id), {
      id,
      userId,
      parentId: currentFolder.id,
      path,
      createdAt: serverTimestamp(),
    });
  }

  const openModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };
  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentFolder == null) return;

    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ parentId: currentFolder.id, id });
      
    }

    addFolder(id,currentUser.uid,path);
    setId("");
    setIsOpen(false);
  };
  return (
    <Container>
      <Button variant="outline-success">
        <FontAwesomeIcon icon={faFolder} onClick={openModal} />
      </Button>
      <Modal show={IsOpen}>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>folder name</Form.Label>
              <Form.Control
                type="text"
                placeholder="folder name"
                autoFocus
                onChange={(e) => {
                  setId(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            add folder
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AddFolder;
