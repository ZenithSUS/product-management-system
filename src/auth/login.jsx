import React, { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../context/context_provider";
import '../styles/auth.css'



export function Login() {
    const { setToken } = useStateContext();
    const accountRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const account = accountRef.current?.value;
        const password = passwordRef.current?.value;
        
        const formData = new FormData();
        formData.append("process", "login");
        formData.append("account", account);
        formData.append("password", password);
        fetchAuth(formData);
    }

    async function fetchAuth(formData) {
        await fetch("http://localhost/PMS_Api/request/auth.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == 200) {
                    setToken(data.token);
                } else {
                    setError(data.error);
                    console.log(data.error);
                }
            })
            .catch((error) => console.log(error));
    }
    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-field">
                        <label htmlFor="Account">Username or Email</label>
                        <input ref={accountRef} type="text" name="account" id="account" placeholder="Username or Email" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="Password">Password</label>
                        <input ref={passwordRef} type="password" name="password" id="password" placeholder="Password" />
                    </div>
                    <button type="submit">Login</button>
                    <p className="register-link">Don't have an account? <a href="/register"> Register here </a></p>
                    <span className="error" style={{textAlign: "center", marginTop: "10px"}}>{error.auth_error || null}</span>
                </form>
            </div>
        </>
    ); 
}