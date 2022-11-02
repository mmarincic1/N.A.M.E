import React, { useEffect, useState } from 'react';


export default function NovaForma(props) {

    const gradovi = ["Mostar", "Sarajevo"];
    const opcine = ["Novo Sarajevo", "Centar"];
    const ustanove = ["KUM", "CUM"]
    const odjeli = ["Radiologija", "Ortopedija"];
    const usluge = ["Rendgen slike", "CT Glave"];

    return (

            <form className="Auth-form" onSubmit={props.submitaj }>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Uputite pacijenta</h3>
                    <div className="form-group mt-3">
                        <label>Grad: </label>
                        <select
                            aria-label="Odaberite grad"
                            className="form-select"
                        >
                            <option selected></option>
                            {gradovi.map(grad =>
                                <option value={grad}>{grad}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group mt-3">
                        <label>Opcina: </label>
                        <select
                            aria-label="Odaberite opcinu"
                            className="form-select"
                        >
                            <option selected></option>
                            {opcine.map(grad =>
                                <option value={grad}>{grad}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group mt-3">
                        <label>Ustanova: </label>
                        <select
                            aria-label="Odaberite ustanovu"
                            className="form-select"
                        >
                            <option selected></option>
                            {ustanove.map(grad =>
                                <option value={grad}>{grad}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group mt-3">
                        <label>Odjel: </label>
                        <select
                            aria-label="Odaberite odjel"
                            className="form-select"
                        >
                            <option selected></option>
                            {odjeli.map(grad =>
                                <option value={grad}>{grad}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group mt-3">
                        <label>Usluga: </label>
                        <select
                            aria-label="Odaberite uslugu"
                            className="form-select"
                        >
                            <option selected></option>
                            {usluge.map(grad =>
                                <option value={grad}>{grad}</option>
                            )}
                        </select>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary btn-color">
                            Potvrdi
                        </button>
                    </div>
                </div>
            </form>
    )
}