import { Link, useLocation } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect } from "react";
import RequestItem from "./RequestItem";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './modal.css'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn
} from 'mdb-react-ui-kit';

import "./doktor-panel.css"

const DoctorPanel = () => {

    useEffect(() => {
        const id = JSON.parse(localStorage.getItem("doktor")).id;
        console.log("id", id)
        async function dohvatiZahtjeve(id) {
            fetch("https://localhost:7162/ListeKontroler/getZahtjeviDoktor/" + id, {
                method: "POST"
            })
                .then(res => {
                    if (res.ok) {
                        console.log("dobri zahtjevi")
                        return res.json()
                    }
                    else {
                        console.log("rip")
                    }
                })
                .then(data => {
                    const noviZahtjevi = data.map(async zahtjev => {
                        console.log("zahtjev", zahtjev)
                        const resp = await fetch("https://localhost:7162/UserModel?id=" + zahtjev.posiljalacId,
                            {
                                method: "POST"
                            }
                        )
                        const osoba = await resp.json()
                        console.log("osoba", osoba);
                        zahtjev.osoba = osoba
                        console.log("zahtjev2", zahtjev)
                        return zahtjev
                    }
                    )
                    Promise.all(noviZahtjevi)
                        .then(niz => {
                            console.log("NIZ IZ PROMISA ", niz);
                            setZahtjevi(niz);
                            console.log("uspjesno");
                        }
                        )

                }
                )
        }
        dohvatiZahtjeve(id)
    }, [])

    const [zahtjevi, setZahtjevi] = useState([]);
    const [zahtjev1, setZahtjev1] = useState({});
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function otvoriModal(tuc) {

        setShow(true)
    }
    return (
        <>
            <div className="cardsList">{
                zahtjevi.map((zahtjev, index) => < RequestItem id={zahtjev.id} posId={zahtjev.posiljalacId} primId={zahtjev.primalacID} key={index} index={index} ime={zahtjev.osoba.firstName + " " + zahtjev.osoba.lastName} opis={zahtjev.text} />
            )}
        </div>
        </>
    )
};

export default DoctorPanel;