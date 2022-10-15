import React, { useEffect, useState } from 'react';


export default function Register(props) {

    const [gradovi, setGradovi] = useState([]);
    const [showEmptyGrad, setShowEmptyGrad] = useState(true);
    const [showGradovi, setShowGradovi] = useState(false);
    const [showOpcine, setShowOpcine] = useState(false);
    const [opcine, setOpcine] = useState([]);
    const [showEmptyOpcina, setShowEmptyOpcina] = useState(true);
    const [showUstanove, setShowUstanove] = useState(false);
    const [ustanove, setUstanove] = useState([]);
    const [showEmptyUstanova, setShowEmptyUstanova] = useState(true);
    const [showDoktori, setShowDoktori] = useState(false);
    const [doktori, setDoktori] = useState([]);
    const [showEmptyDoktor, setShowEmptyDoktor] = useState(true);


    useEffect(() => {
        async function dohvatiGradove() {
            fetch("https://localhost:7162/GetPodaciForma/cities")
                .then(res => res.json())
                .then(data => {
                    setGradovi(data)
                })
        }
        dohvatiGradove();
    }, [])

    useEffect(() => {
        setShowGradovi(true)
    }, [gradovi])

    const dohvatiOpcine = async (id) => {
        setShowEmptyGrad(false)
        
        fetch("https://localhost:7162/GetPodaciForma/county/" + id)
            .then(res => res.json())
            .then(data => {
                setOpcine(data)
            })
    }

    const dohvatiUstanove = async (id) => {
        fetch("https://localhost:7162/GetPodaciForma/hospitalsCounties/" + id)
            .then(res => res.json())
            .then(data => {
                setUstanove(data)
            })
        setShowUstanove(true)
    }

    const dohvatiDoktore = async (id) => {
        fetch("https://localhost:7162/GetPodaciForma/doctorsHospitals/" + id)
            .then(res => res.json())
            .then(data => {
                setDoktori(data)
            })
        setShowDoktori(true)
    }

useEffect(() => {
    setShowOpcine(true)
}, [opcine])


    const handleRegister = async () => {
        fetch("https://localhost:7162/Auth/registerUser", {
            "method": "POST",
            body: {

            }
        })
    }

    return (
        <>
            <div className="form-group mt-3" onChange={() => console.log(event.target.id) }>
            <input class="form-check-input" type="radio" name="spol" id="M"/>
                <label class="form-check-label ml" for="muski">
                    Muski
                </label>
            <input class="form-check-input ml" type="radio" name="spol" id="Z"/>
                <label class="form-check-label ml" for="zenski">
                    Zenski
                </label>
            </div>
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
            <div className="form-group mt-3">
                <label>Ponovite lozinku</label>
                <input
                    type="password"
                    className="form-control mt-1"
                    placeholder="Ponovite lozinku"
                />
            </div>
            <div className="form-group mt-3 required">
                <label>Grad</label>
                <select
                    aria-label="Odaberite grad"
                    className="form-select"
                    onChange={(event) => dohvatiOpcine(event.target.value)}
                >
                    {showEmptyGrad &&  <option selected></option>}
                    {showGradovi && gradovi.map(grad => 
                        <option value={grad.id}>{grad.naziv}</option>
                    )}
                </select>
            </div>
            <div className="form-group mt-3 required">
                <label>Opcina</label>
                <select
                    aria-label="Odaberite opcinu"
                    className="form-select"
                    onChange={(event) => {
                        setShowEmptyOpcina(false)
                        dohvatiUstanove(event.target.value)
                    }
                    }
                >
                    {showEmptyOpcina && <option selected></option>}
                    {showOpcine && opcine.map(opcina =>
                        <option value={opcina.id}>{opcina.naziv}</option>
                    )}
                </select>
            </div>
            <div className="form-group mt-3 required">
                <label>Ustanova</label>
                <select
                    aria-label="Odaberite ustanovu"
                    className="form-select"
                    onChange={(event) => {
                        setShowEmptyUstanova(false)
                        dohvatiDoktore(event.target.value)
                    }
                    }
                >
                    {showEmptyUstanova && <option selected></option>}
                    {showUstanove && ustanove.map(ustanova =>
                        <option value={ustanova.id}>{ustanova.naziv}</option>
                    )}
                </select>
            </div>
            <div className="form-group mt-3 required">
                <label>Doktor</label>
                <select
                    aria-label="Odaberite doktora/doktoricu"
                    className="form-select"
                    onChange={() => setShowEmptyDoktor(false)}
                >
                    {showEmptyDoktor && <option selected></option>}
                    {showDoktori && doktori.map(doktor =>
                        <option value={doktor.id}>{doktor.firstName + " " + doktor.lastName}</option>
                    )}
                </select>
            </div>
        </>
    )
}