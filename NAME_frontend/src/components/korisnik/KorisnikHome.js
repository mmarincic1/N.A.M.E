import React, { useEffect, useState } from 'react';
import './korisnik.css';

export default function KorisnikHome(props) {

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
            <form className="Auth-form" id="requestForm">
                <label>Zahtjev za doktora: Ime i prezime ljekara</label>
                <div className="form-group mt-3">
                    <textarea className='textareaForm' name="request" form="requestForm" placeholder='Opišite vaš problem...' cols={50} rows={50} ></textarea>
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