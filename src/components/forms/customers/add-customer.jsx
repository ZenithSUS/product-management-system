import React, { useRef, useState } from "react";
import { useStateContext } from "../../../context/context_provider";
import '../../../styles/forms.css'

export const AddCustomer = ({ setShowForm }) => {
    const nameRef = useRef();
    const emailRef = useRef();
    const { token, setChanged } = useStateContext();
    const [errors, setErrors] = useState({});
    
    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("process", "add_customer");
        formData.append("name", nameRef.current.value);
        formData.append("email", emailRef.current.value);

        const response = await fetch("http://localhost/PMS_Api/request/customers.php", {
            method: "POST",
            headers: {
                "X-Authorization": `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await response.json();
        
        if (data.status === 200) {
            setShowForm(false);
            setChanged(true);
        } else {
            setErrors(data.error);
            console.log(data.error);
        }
    }

    return (
        <div className="add-container">
            <form>
            <h1>Add Customer</h1>
                <div className="input-field">
                    <label htmlFor="name">Name</label>
                    <input ref={nameRef} type="text" id="name" name="name" onInput={() => {setErrors(prevErrors => ({ ...prevErrors, name: "" }))}} />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input ref={emailRef} type="email" id="email" name="email" onInput={() => {setErrors(prevErrors => ({ ...prevErrors, email: "" }))}} />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="button-options">
                    <button type="submit" onClick={handleSubmit}>Add Customer</button>
                    <button onClick={() => setShowForm(false)}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddCustomer;