import {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FormUputnica from "./FormUputnica";
import './modal.css'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn
} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2'
import 'animate.css';
const RequestItem = (props) => {
     
  function openDescription(event){
    setShow(true);
  }

    const [show, setShow] = useState(false);
    const [prikazi, setPrikazi] = useState(false);
  const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const prihvati = () => {
        setShow(false)
        setPrikazi(true)
    }

    const posalji = async () => {

        const body = {
            "id": props.id,
            "posiljalacId": props.posId,
            "primalacID": props.primId,
            "text": props.opis
        }
        fetch("https://localhost:7162/ZahtjeviHendl/odbijZahtjev", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => {
                if(!res.ok) console.log("ups")
                else
                window.location = window.location
            }
            )
    }

    const odobri = async () => {
        const body = {
            "id": props.id,
            "pacijentId": props.posId,
            "lokacija": "Sarajevo,Novo Sarajevo,KUM,Radiologija",
            "usluga": "CT glave",
            "doktorId": props.primId
        }
        const body2 = {
            "id": props.id,
            "posiljalacId": props.posId,
            "primalacID": props.primId,
            "text": props.opis
        }
        fetch("https://localhost:7162/ZahtjeviHendl/prihvatiZahtjev", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => {
                if (!res.ok) console.log("ups")
                else
                    fetch("https://localhost:7162/ZahtjeviHendl/obrisiStariZahtjev", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body2)
                    })
                        .then(res => {
                            if (!res.ok) console.log("ups")
                            else console.log(res.status); /*window.location = window.location*/
                        })
            }
            )
    }

  return (
      <>
          <MDBCard style={{ "width": "200px", "height": "235px" }}>
              <MDBCardBody>
                  <MDBCardTitle>{props.ime}</MDBCardTitle>
                  <MDBCardText>
                      {props.opis}
                  </MDBCardText>
                  <Button variant="primary" onClick={event => openDescription(event)}>Otvori</Button>
              </MDBCardBody>
          </MDBCard>
    <div className='modalCenter'>
      <Modal show={show} onHide={handleClose} style={{display:"flex !important"}} class='modal'>
        <Modal.Header closeButton>
          <Modal.Title><b>Pacijent:</b> {props.ime}</Modal.Title>
        </Modal.Header>
                  <Modal.Body> <b>Opis zahtjeva:</b> {props.opis}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={posalji}>
            Odbij zahtjev
          </Button>
          <Button variant="success" onClick={prihvati}>
            Prihvati zahtjev
          </Button>
        </Modal.Footer>
              </Modal>
              <Modal show={prikazi} onHide={() => setPrikazi(false)} style={{ display: "flex !important" }} class='modal'>
                  <Modal.Header closeButton>
                  </Modal.Header>
                  <Modal.Body>
                      <FormUputnica submitaj={posalji }></FormUputnica>
                  </Modal.Body>
              </Modal>
    </div>
      
    </>
  );
};

export default RequestItem;