import React, { useRef, useState } from "react";
import { useStateContext } from "../context/context_provider";
import '../styles/login.css'

const LoginForm = () => {
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
                </form>
            </div>
        </>
    ); 
} 

export function Login() {
    const form = LoginForm();
    return (
        <>
            {form}
        </>
    )
}