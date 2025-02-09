import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "../context/context_provider";
import { Header, Sidebar } from "./ui_parts";
import { useParams } from "react-router-dom";
import '../styles/forms.css'

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

export const EditCustomer = () => {
    const { token } = useStateContext();
    const { customerID } = useParams();
    const [customer, setCustomer] = useState({ name: "", email: "" });
    const [errors, setErrors] = useState({});
    const nameRef = useRef();
    const emailRef = useRef();

    useEffect(() => {
        fetchCustomer(customerID);
    }, [customerID]);

    async function fetchCustomer(customerID) {
        const response = await fetch(`http://localhost/PMS_Api/request/customers.php?id=${customerID}`, {
            method: "GET",
            headers: {
                "X-Authorization": `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (data.status === 200) {
            setCustomer(data.data);
        } else {
            setErrors(data.error);
            console.log(data.error);
        }
    }

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
        window.location.href = '/customers';
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setCustomer(prevCustomer => ({ ...prevCustomer, [name]: value }));
        console.log(customer.name)
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

export const AddOrder = ({ setShowForm }) => {
    const { token, setChanged } = useStateContext();
    const [errors, setErrors] = useState({});
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const customerName = useRef();
    const productName = useRef();
    const quantity = useRef();

    useEffect(() => {
        fetchCustomer();
        fetchProduct();
    }, []);

    async function fetchCustomer() {
        try {
            const formData = new FormData();
            formData.append('process', 'get_all_customers');
            const response = await fetch('http://localhost/PMS_Api/request/customers.php', {
                method: "POST",
                headers: {
                    "X-Authorization": `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();
            if (data && data.status === 200) {
                setCustomers(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchProduct() {
        try {
            const formData = new FormData();
            formData.append('process', 'get_all_products');
            const response = await fetch('http://localhost/PMS_Api/request/products.php', {
                method: "POST",
                headers: {
                    "X-Authorization": `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();
            if (data && data.status === 200) {
                setProducts(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const customerIdInput = customerName.current.value ? customerName.current.value.toString() : "";
        const productIdInput = productName.current.value ? productName.current.value.toString() : "";
        const quantityInput = quantity.current.value ? quantity.current.value : 0;

        const formData = new FormData();
        formData.append('customerId', customerIdInput);
        formData.append('productId', productIdInput);
        formData.append('quantity', quantityInput);
        formData.append('process', 'add_order');

        try {
            const response = await fetch('http://localhost/PMS_Api/request/orders.php', {
                method: "POST",
                headers: {
                    "X-Authorization": `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();
            if (data && data.status === 200) {
                setShowForm(false);
                setChanged(true);
            } else {
                setErrors(data.error);
                console.log(data.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="add-container">
                <form>
                    <h1>Add Order</h1>
                    <div className="input-field">
                        <label htmlFor="customerName">Customer Name</label>
                        <select ref={customerName} name="customer" id="customer" onInput={() => setErrors(prevErrors => ({...prevErrors, customer: ""}))}>
                            <option value="">Select</option>
                            {customers && customers.length > 0 && customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>{customer.name}</option>
                            ))}
                        </select>
                        {errors && errors.customer && (<span className="errors">{errors.customer}</span>)}
                    </div>
                    <div className="input-field">
                        <label htmlFor="productName">Product Name</label>
                        <select ref={productName} name="product" id="product" onInput={() => setErrors(prevErrors => ({...prevErrors, product: ""}))}>
                            <option value="">Select</option>
                            {products && products.length > 0 && products.map((product) => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </select>
                        {errors && errors.product && (<span className="errors">{errors.product}</span>)}
                    </div>
                    <div className="input-field">
                        <label htmlFor="quantity">Quantity</label>
                        <input ref={quantity} type="number" name="quantity" id="quantity" onInput={() => setErrors(prevErrors => ({...prevErrors, quantity: ""}))} />
                        {errors && errors.quantity && (<span className="errors">{errors.quantity}</span>)}
                    </div>
                    <div className="button-options">
                        <button onClick={handleSubmit}>Add Order</button>
                        <button onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    );
};