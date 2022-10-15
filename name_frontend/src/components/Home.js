import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function Home() {
    const [ID, setID] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("event", event);
        const body = {
            ime: event.target[0].value,
            prezime: event.target[1].value,
            brojZdravstveneKartice: event.target[2].value
        }
        const response = await fetch("https://localhost:7162/Auth/userExists", {
                   method: "POST",
                   headers: {
                    "Content-Type": "application/json"
                   },
                   body: body
                }
                   );
        const data = await response.json();
        console.log("data", data);

        window.location = "/register";
    }

    return (
        <>
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleSubmit}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Dobrodosli</h3>
                        <div className="form-group mt-3 required">
                            <label>Ime</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="Unesite ime"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Prezime</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="Unesite prezime"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Broj zdravstvene kartice</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                required
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Provjeri
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}