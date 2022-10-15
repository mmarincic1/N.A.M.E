import React, { useEffect, useState } from 'react';
import './korisnik.css';

export default function KorisnikHome(props) {

    return (
        <>
        <header class="masthead">
            <div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
                <div class="d-flex justify-content-center">
                    <div class="text-center">
                        <h1 class="mx-auto my-0 text-uppercase">Dobro Došli</h1>
                        <h2 class="text-white-50 mx-auto mt-2 mb-5">Poruka dodatnog opisa za klijente</h2>
                        <a class="btn btn-primary" href="#upitPedijatru">Uputnica</a>
                    </div>
                </div>
            </div>
        </header>
        <section class="about-section text-center" id="upitPedijatru">
        <div className="Auth-form-container">
            <form className="Auth-form">
                <h3 className="Auth-form-title">Javite se vašem ljekaru</h3>
                <div className="form-group mt-3">
                    <label>Opišite vaš problem</label>
                    <input
                        type="textarea"
                        className="form-control mt-1"
                        placeholder="Enter email"
                    />
                </div>
                <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-primary">
                        Pošalji
                    </button>
                </div>
            </form>
    </div>
        </section>
        </>
    )
}