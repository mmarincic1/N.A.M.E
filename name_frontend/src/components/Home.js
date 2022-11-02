import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Swal from 'sweetalert2'
import 'animate.css';
import Register from "./Register.js";


export default function Home() {
    const [ID, setID] = useState("");
    const [showRegister, setShowRegister] = useState(false);
    const [enable, setEnable] = useState(true);
    const [text, setText] = useState("Provjeri");

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("submit")
        if (text == "Registriraj") handleRegister(event);
        else {
            const jsonObj = {
                "ime": event.target[0].value,
                "prezime": event.target[1].value,
                "brojZdravstveneKartice": event.target[2].value
            }
            fetch("https://localhost:7162/Auth/userExists", {
                "method": "POST",
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify(jsonObj)
            }).then(res => {
                if (!res.ok) {
                    throw Error();
                }
                return res.json();
            }
            ).then(data => {
                setEnable(false);
                setShowRegister(true);
                setText("Registriraj")
            }).catch(error => {
                Swal.fire({
                    title: 'Neispravan broj zdravstvene kartice',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
            })
        }
    }

    const handleRegister = async (event) => {
        const target = event.target;
        const body = {
            "id": 0,
            "brojZdravstveneKartice": target[2].value,
            "email": target[5].value,
            "firstName": target[0].value,
            "lastName": target[1].value,
            "spol": target[3].id,
            "password": target[6].value,
            "adresa": "string",
            "grad": target[7].value,
            "opstina": target[8].value,
            "ustanovaId": target[9].value,
            "porodicniDoktorId": target[10].value
        }
        console.log("body", body)
        fetch("https://localhost:7162/Auth/registerUser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => {
                if (res.ok) {
                    console.log("registrovan")
                    window.location = "/login";
                }
                else console.log("jebiga")
            })
    }

    return (
        <>
            <div className="Auth-form-containern my-container">
                <form className="Auth-form mx-auto" onSubmit={handleSubmit}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Dobrodosli</h3>
                        <div className="form-group mt-3 required">
                            <label>Ime</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="Unesite ime"
                                disabled={!enable}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Prezime</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="Unesite prezime"
                                disabled={!enable}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Broj zdravstvene kartice</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                required
                                disabled={!enable}
                            />
                        </div>
                        {showRegister &&
                            <Register></Register>
                        }
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary btn-color">
                                {text}
                            </button>
                        </div>
                    </div>
                </form>
                
            </div>
        </>
    )
}