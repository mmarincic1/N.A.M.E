import { Link, useLocation } from "react-router-dom";
import {BrowserRouter as Router} from 'react-router-dom';
import { useState } from "react";
import RequestItem from "./RequestItem";
import { useEffect } from "react";


const navigation = [
  {
    title: "Doctor Panel",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Zahtjevi za uputnicu",
    href: "/Requests",
    icon: "bi bi-bell",
  }
];

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


        let location = useLocation();
        let activeMember = null;
        const listItems = zahtjevi.map((d, index) => < RequestItem key={index} index={index} ime={d.osoba.firstName + " " + d.osoba.lastName} opis={d.text} />
        );
        return (
            <div className="mx-auto w-75 mt-5">


                <div className="list-group" id="list-tab" role="tablist">
                    {listItems}
                </div>

                <div className="col-8">
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">...</div>
                        <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">...</div>
                        <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
                        <div className="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">...</div>
                    </div>
                </div>
            </div>
        )
    
}
export default DoctorPanel;