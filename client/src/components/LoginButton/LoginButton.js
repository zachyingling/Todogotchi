import React from "react";
import { Button, Modal } from "react-bootstrap";
import "../LoginButton/LoginButton.css"



function HowToPlay () {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Login Help
      </Button>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title class="body">Login Help</Modal.Title>
        </Modal.Header>
        <Modal.Body class="body">
        Welcome! ToDoGotchi is designed to help you live a more productive life by granting you ownership of a Productivity Pet that can only be nurtured once you complete the goals you set for yourself! 
<br></br><br></br>
For existing users: enter your email and password, then press the submit button.
<br></br><br></br>
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