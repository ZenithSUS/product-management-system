import React, { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../context/context_provider";
import '../styles/login.css'



export function Login() {
    const { setUser, setToken } = useStateContext();
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if(username && password) {
            setUser({ username : username });
            setToken("dummy-token"); 
        }
    }
    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-field">
                        <label htmlFor="Username">Username</label>
                        <input ref={usernameRef} type="text" name="username" id="username" placeholder="Username" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="Password">Password</label>
                        <input ref={passwordRef} type="password" name="password" id="password" placeholder="Password" />
                    </div>
                    <button type="submit">Login</button>
                    
                    <p>Don't have an account? <a href="/register"> Register here </a></p>
                </form>
            </div>
        </>
    ); 
}