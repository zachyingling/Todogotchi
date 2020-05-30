import React from "react";
import { Button, Modal } from "react-bootstrap";

import "../HowToPlay/howtoplay.css"

import "../TodoList/TodoList.css";


function HowToPlay () {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button class="secondfancy" variant="warning" onClick={handleShow}>
        How To Play
      </Button>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title class="body">How To Play</Modal.Title>
        </Modal.Header>
        <Modal.Body class="body">
 

1. Insert a “todo” in the input box on the top left quadrant of the screen, they will appear in order of submission with both a “checkmark” and “x” button to the right of the item. <br></br><br></br>
2. Click the “checkmark” button once you complete the task, you will be granted 2 units of energy to interact with your pet, which in turn will raise their happiness level. <br></br><br></br>
3. Click the “x” button to delete a task.<br></br><br></br>
4. You can view your active task list by clicking the “active” button.<br></br><br></br>
5. You can view completed tasks by clicking the “complete” button.<br></br><br></br>
6. The “todos left:” will count the number of tasks you created that are unfinished.<br></br><br></br>
7. To give affection to your pet, press the “pet” button in the Productivity Pet window. The energy you earned will decrease by 1 point, but the happiness of your pet will increase.
<br></br><br></br>
Good luck! 



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