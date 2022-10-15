import {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './modal.css'
const RequestItem = (props) => {
     
    function openDescription(event, index){
        console.log("Index",index);
        setShow(true);
    }

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <div onClick={event => openDescription(event, props.index)}>
      <a className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">{props.index}</a>
    </div>
    <div className='modalCenter'>
      <Modal show={show} onHide={handleClose} style={{display:"flex !important"}} class='modal'>
        <Modal.Header closeButton>
          <Modal.Title><b>Pacijent:</b> {props.ime}</Modal.Title>
        </Modal.Header>
        <Modal.Body> <b>Opis zahtjeva:</b> {props.opis}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Odbij zahtjev
          </Button>
          <Button variant="success" onClick={handleClose}>
            Posalji uputnicu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
      
    </>
  );
};

export default RequestItem;