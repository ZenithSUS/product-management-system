import React, { useState, useEffect, useRef } from "react";
import { useStateContext } from "../../../context/context_provider";
import { FetchProduct } from "../../../services/api";
import { Header } from "../../ui/header";
import { Sidebar } from "../../ui/sidebar";
import { useParams, Navigate } from "react-router-dom";
import '../../../styles/forms.css'

export function EditProduct() {
    const { token } = useStateContext();
    const [productInfo, setProductInfo] = useState({
        name: '',
        quantity: '',
        price: ''
    }); 
    const inputRef = useRef(null);
    const [errors, setErrors] = useState([]);
    const { productID } = useParams();

    useEffect(() => {
        FetchProduct(token, setProductInfo, productID);
    }, [token]);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', e.target.name.value);
        formData.append('quantity', e.target.quantity.value);
        formData.append('price', e.target.price.value);
        formData.append('process', 'edit_product');

        const response = await fetch(`http://localhost/PMS_Api/request/products.php?id=${productID}`, {
            method: "POST",
            headers: {
                "X-Authorization": `Bearer ${token}`
            },
            body: formData
        });

        const data = await response.json();

        if (data.status === 200) {
            window.location.href = '/products';
        } else {
            setErrors(data.error);
            console.log(data.error);
        }
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setProductInfo({ ...productInfo, [name]: value });
        setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
    }

    function handleCancel() {
        Navigate('/products')
    }

    return (
        <>
            <Header />
            <Sidebar />
            <main>
                <div className="edit-container">
                    <form onSubmit={handleSubmit}>
                        <h1>Edit Product</h1>
                        <div className="input-field">
                            <label htmlFor="productName">Product Name</label>
                            <input ref={inputRef} name="name" value={productInfo.name} type="text" onChange={handleInputChange} />
                            {errors && errors.productName && <span className="errors">{errors.productName}</span>}
                        </div>
                        <div className="input-field">
                            <label htmlFor="quantity">Quantity</label>
                            <input ref={inputRef} name="quantity" value={productInfo.quantity} type="number" onChange={handleInputChange} />
                            {errors && errors.quantity && <span className="errors">{errors.quantity}</span>}
                        </div>
                        <div className="input-field">
                            <label htmlFor="price">Price</label>
                            <input ref={inputRef} name="price" value={productInfo.price} type="number" onChange={handleInputChange} />
                            {errors && errors.price && <span className="errors">{errors.price}</span>}
                        </div>
                        <div className="button-options">
                            <button type="submit">Save</button>
                            <button onClick={() => handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}

export default EditProduct;