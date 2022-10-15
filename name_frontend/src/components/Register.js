import React, { useEffect, useState } from 'react';


export default function Register(props) {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPass, setConfirmPass] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("event", event);
    }

    return (
        <>
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleSubmit}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Register</h3>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Confirm password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Re-type password"
                                onChange={(e) => setConfirmPass(e.target.value)}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                        <p className="forgot-password text-right mt-2">
                            <a href="#">Forgot password?</a>
                        </p>
                    </div>
                </form>
            </div>
        </>
    )
}