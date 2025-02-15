import React, { useState } from "react";
import { useStateContext } from "../../../context/context_provider";
import '../../../styles/forms.css';

export const AddProduct = ({ setShowForm }) => {
    const { token, setChanged } = useStateContext(); 
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [errors, setErrors] = useState({});

    function handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('productName', productName ? productName : '');
        formData.append('price', price ? price : 0);
        formData.append('quantity', quantity ? quantity : 0);
        formData.append('process', 'add_product');

        fetch('http://localhost/PMS_Api/request/products.php', {
            method: "POST",
            headers: {
                "X-Authorization": `Bearer ${token}`
            },
            body: formData
        }).then((response) => response.json())
            .then((data) => {
                if (data.status === 200) {
                    setShowForm(false);
                    setChanged(true);
                } else {
                    setErrors(data.error);
                    console.log(data.error);
                }
            }).catch((error) => console.log(error));
    }
    
    return (
        <div className="add-container">
            <form>
                <h1>Add Product</h1>
                <div className="input-field">
                    <label htmlFor="name">Product Name</label>
                    <input type="text" name="name" onInput={() => setErrors({ ...errors, name: "" })} onChange={(e) => setProductName(e.target.value)} />
                    {errors.name && <span className="errors">{errors.name}</span>}
                </div>
                <div className="input-field">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" onInput={() => setErrors({ ...errors, price: ""})} onChange={(e) => setPrice(e.target.value)} />
                    {errors.price && <span className="errors">{errors.price}</span>}
                </div>
                <div className="input-field">
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" name="quantity" onInput={() => setErrors({ ...errors, quantity: ""})} onChange={(e) => setQuantity(e.target.value)} />
                    {errors.quantity && <span className="errors">{errors.quantity}</span>}
                </div>
                <div className="button-options">
                    <button type="submit" onClick={handleSubmit}>Add Product</button>
                    <button onClick={() => setShowForm(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct;