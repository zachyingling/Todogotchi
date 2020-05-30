import React from "react";
import { Button, Modal } from "react-bootstrap";

function HowToPlay () {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Login Help
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Welcome! ToDoGotchi is designed to help you live a more productive life by granting you ownership of a Productivity Pet that can only be nurtured once you complete the goals you set for yourself! 


For existing users: enter your email and password, then press the submit button. 

To begin: create and account using your email address and a unique password of 8 alphabet characters, 

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HowToPlay;