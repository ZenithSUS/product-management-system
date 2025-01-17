import React, { useState, useRef } from "react";
import '../styles/auth.css'

export function Register() {
    const emailInput = useRef();
    const usernameInput = useRef();
    const passwordInput = useRef();
    const confirmpasswordInput = useRef();
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("process", "register");
        formData.append("email", emailInput.current.value);
        formData.append("username", usernameInput.current.value);
        formData.append("password", passwordInput.current.value);
        formData.append("confirmpassword", confirmpasswordInput.current.value);
        fetchAuth(formData);
    }

    async function fetchAuth(formData) {
        await fetch("http://localhost/PMS_Api/request/auth.php", {
            method: "POST",
            body: formData,  
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.status == 200) {
                    window.location.href = "/login";
                } else {
                    setErrors(data.error);
                    console.log(data.error);
                }
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className="container"> 
            <form onSubmit={handleSubmit} className="register-form"> 
            <h1>Register</h1>
                <div className="input-field">
                    <label htmlFor="Username">Username</label>
                    <input type="text" placeholder="Username" ref={usernameInput} name="username" onInput={() => {setErrors({...errors, username: "", usernameValid: ""})}} />  
                    <span className="error-message">
                        {errors.username || (errors.usernameValid && Object.values(errors.usernameValid).map((element, index) => <span key={index}>{"- " + element}</span>))}
                    </span>
                </div>
                <div className="input-field">
                    <label htmlFor="Email">Email</label>
                    <input type="text" placeholder="Email" ref={emailInput} name="email" onInput={() => {setErrors({...errors, email: ""})}} />
                    <span className="error-message">{errors.email || errors.emailValid}</span>
                </div>
                <div className="input-field">
                    <label htmlFor="Password">Password</label>
                    <input type="password" placeholder="Password" ref={passwordInput} name="password" onInput={() => {setErrors({...errors, password: "", passwordValid: ""})}}  />
                    <span className="error-message">{errors.password || (errors.passwordValid && Object.values(errors.passwordValid).map((element, index) => <span key={index}>{"- " + element}</span>))}</span>
                </div>  
                <div className="input-field">
                    <label htmlFor="ConfirmPassword">Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" ref={confirmpasswordInput} name="confirmpassword" onInput={() => {setErrors({...errors, confirmpassword: ""})}}  />
                    <span className="error-message">{errors.confirmpassword}</span>
                </div>
                <button type="submit" value={"Register"}>Register</button>
                <p className="login-link">Already have an account? <a href="/login">Login</a></p>  
            </form>
        </div>
    );
}