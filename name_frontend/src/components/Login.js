import React, { useEffect, useState } from 'react';


export default function Login(props) {

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log("event", event)
        const body = {
            "email": event.target[0].value,
            "password": event.target[1].value
        }
        console.log("body", body)
        fetch("https://localhost:7162/Auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => {
                if (res.ok) {
                    console.log("ok")
                    return res.json()
                }
                else {
                    console.log("not ok")
                }
            })
            .then(data => {
                console.log(data)
                localStorage.setItem("user", JSON.stringify(data));
                console.log("props", props)
                props.setPacijent(true);
                console.log("Korisnik nastiman");
                window.location = "/korisnik";
                console.log(JSON.parse(localStorage.getItem("user")))
            })
    }

    return (
        <>
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={(event) => handleLogin(event)}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Dobrodosli</h3>
                        <div className="form-group mt-3">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Unesite email"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Lozinka</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Unesite lozinku"
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary btn-color">
                                Prijavi me
                            </button>
                        </div>
                        <p className="forgot-password text-right mt-2">
                            <a href="#">Zaboravili ste sifru?</a>
                        </p>
                    </div>
                </form>
            </div>
        </>
    )
}