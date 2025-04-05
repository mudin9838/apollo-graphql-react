import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const DeleteConfirmation = (props) => {
  return (
    <Modal show={props.showModal} onHide={props.closeConfirmDeleteModalHandler}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.closeConfirmDeleteModalHandler}>
          Close
        </Button>
        <Button 
          variant="primary" 
          onClick={props.confirmDeleteHandler}
        >
          Confirm Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmation;
