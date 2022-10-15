import React, { useEffect, useState } from 'react';
import './korisnik.css';
import Swal from 'sweetalert2'
import 'animate.css';

export default function KorisnikHome(props) {
    const [doktor, setDoktor] = useState("");

    useEffect(() => {
        async function ZoviteDoktore(id) {
            fetch("https://localhost:7162/GetPodaciForma/doctor/" + id)
                .then(res => {
                    if (!res.ok) console.log("jebajiga")
                    else return res.json()
                })
                .then(data => {
                    setDoktor("dr. " + data.firstName + " " + data.lastName);
                })
            
        }
        ZoviteDoktore(JSON.parse(localStorage.getItem("user")).porodicniDoktorId);
    }, [])

    const posaljiDoktoru = async (event) => {
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        const body = {
            "id": 0,
            "posiljalacId": user.id,
            "primalacID": user.porodicniDoktorId,
            "text": event.target[0].value
        }

        console.log("body", body)

        fetch("https://localhost:7162/ZahjeviUputnice/noviZahtjev", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => {
                if (res.ok) {
                    console.log("bravo")
                    Swal.fire({
                        title: 'Zahtjev uspjesno poslan',
                        text: 'Vas zahtjev je poslan doktoru i ceka obradu',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                    event.target[0].value = ""
                }
                else console.log("neee")
            })
    }


    return (
        <>

        <header className="masthead">
            <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
                <div className="d-flex justify-content-center">
                    <div className="text-center">
                        <h1 className="mx-auto my-0 text-uppercase">Dobro Došli</h1>
                        <h2 className="text-white-50 mx-auto mt-2 mb-5">Poruka dodatnog opisa za klijente</h2>
                        <a className="btn btn-primary" href="#upitPedijatru">Uputnica</a>

                    </div>
                </div>
            </div>
        </header>
        <section className="about-section text-center" id="upitPedijatru">
        <h3 className='text-white'>Uputite poruku vašem doktoru</h3>

        <div className="Auth-form-container">
                    <form className="Auth-form" id="requestForm" onSubmit={posaljiDoktoru }>
                        <label>{"Zahtjev za " + doktor }</label>
                <div className="form-group mt-3">
                            <textarea className='form-control z-depth-1 my-area' rows="3" name="request" form="requestForm" placeholder='Opišite vaš problem...' cols="50" ></textarea>
                </div>
                <div className="d-grid gap-2 mt-3 divSredina">
                    <button type="submit" className="btn btn-primary sredina">
                        Pošalji
                    </button>
                </div>
            </form>
    </div>
        </section>
        </>
    )
}