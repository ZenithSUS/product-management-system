import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../../context/context_provider";
import { FetchCustomer } from "../../../services/customer-api";
import { Header } from '../../ui/header';
import { Sidebar } from '../../ui/sidebar';
import { useParams, useNavigate } from "react-router-dom";
import '../../../styles/forms.css'

export const EditCustomer = () => {
    const Navigate = useNavigate();
    const { token } = useStateContext();
    const { customerID } = useParams();
    const [customer, setCustomer] = useState({ name: "", email: "" });
    const [errors, setErrors] = useState({});
    const nameRef = useRef();
    const emailRef = useRef();

    useEffect(() => {
        FetchCustomer(token, setCustomer, customerID);
    }, [token]);

    async function editCustomer(e) {
        e.preventDefault();
        const formData = new FormData();
        const name = nameRef.current.value ? nameRef.current.value : "";
        const email = emailRef.current.value ? emailRef.current.value: "";
        formData.append('name', name);
        formData.append('email', email);
        formData.append('process', 'edit_customer');
        const response = await fetch(`http://localhost/PMS_Api/request/customers.php?id=${customerID}`, {
            method: "POST",
            headers: {
                "X-Authorization": `Bearer ${token}`
            },
            body: formData
        });

        const data = await response.json();

        if (data.status === 200) {
            window.location.href = '/customers';
        } else {
            setErrors(data.error);
            console.log(data.error);
        }
    }

    function handleCancel(e) {
        e.preventDefault();
        Navigate('/customers');
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setCustomer(prevCustomer => ({ ...prevCustomer, [name]: value }));
    }

    return (
        <>
        <Header />
        <Sidebar />
        <main>
        <div className="edit-container">
            <form>
            <h1>Edit Customer</h1>
                <div className="input-field">
                    <label htmlFor="name">Name</label>
                    <input ref={nameRef} type="text" id="name" name="name" onInput={() => {setErrors(prevErrors => ({ ...prevErrors, name: "" }))}} value={customer.name} onChange={handleInputChange} />
                    {errors && errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input ref={emailRef} type="email" id="email" name="email" onInput={() => {setErrors(prevErrors => ({ ...prevErrors, email: "" }))}} value={customer.email} onChange={handleInputChange} />
                    {errors && errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="button-options">
                    <button type="submit" onClick={editCustomer}>Save Changes</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
        </main>
        </>
    );
};

export default EditCustomer;