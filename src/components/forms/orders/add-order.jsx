import React, { useRef, useState, useEffect } from "react";
import { useStateContext } from "../../../context/context_provider";
import { FetchProducts } from "../../../services/product-api";
import { FetchCustomers } from "../../../services/customer-api";
import '../../../styles/forms.css'

export const AddOrder = ({ setShowForm, orders, formRef }) => {
    const { token, setChanged } = useStateContext();
    const [errors, setErrors] = useState({});
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [availableQuantity, setAvailableQuantity] = useState(0);
    const customerInfo = useRef();
    const productInfo = useRef();
    const quantity = useRef();
    const productOption = useRef();

    useEffect(() => {
        FetchCustomers(token, setCustomers);
        FetchProducts(token, setProducts);
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const customerIdInput = customerInfo.current.value ? customerInfo.current.value.toString() : "";
        const productIdInput = productInfo.current.value ? productInfo.current.value.toString() : "";
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

    function getAvailQuantity(productName) {
        const productIdInput = productInfo.current.value ? productInfo.current.value.toString() : "";
        const quantityInput = quantity.current.value ? parseInt(quantity.current.value) : 0;
        if (products && products.length > 0) {
            const product = products.find(product => product.id === productIdInput);
            if (product) {
                const totalPurchased = getTotalPurchases(productName);
                const available = product.quantity - (quantityInput + totalPurchased);
                console.log(product.quantity + "-" + quantityInput + "-" + totalPurchased + "=" + available);
                setAvailableQuantity(available >= 0 ? available : 0);
            }
        }
    }

    function getTotalPurchases(productNametoFind) {
        let totalPurchases = 0;
        if(orders && orders.length > 0) {
            const productPurchased = orders.filter(order => order.productName === productNametoFind);
            productPurchased.forEach(purchase => (totalPurchases += purchase.quantity));
        }
        return totalPurchases;
    }
        
    return (
        <>
            <div className="add-container" ref={formRef}>
                <form>
                    <h1>Add Order</h1>
                    <div className="input-field">
                        <label htmlFor="customerName">Customer Name</label>
                        <select ref={customerInfo} name="customer" id="customer" onInput={() => setErrors(prevErrors => ({...prevErrors, customerName: ""}))} >
                            <option value="">Select</option>
                            {customers && customers.length > 0 && customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>{customer.name}</option>
                            ))}
                        </select>
                        {errors && errors.customerName && (<span className="errors">{errors.customerName}</span>)}
                    </div>
                    <div className="input-field">
                        <label htmlFor="productName">Product Name</label>
                        <select ref={productInfo} name="product" id="product" onInput={() => setErrors(prevErrors => ({...prevErrors, productName: ""}))} onChange={(e) => getAvailQuantity(e.target.selectedOptions[0].dataset.name)}>
                            <option value="">Select</option>
                            {products && products.length > 0 && products.map((product) => (
                                <option ref={productOption} key={product.id} value={product.id} data-name={product.name} data-quantity={product.quantity}>{product.name}</option>
                            ))}
                            {products && products.length === 0 && <option value="">No products found</option>}
                        </select>
                        {errors && errors.productName && (<span className="errors">{errors.productName}</span>)}
                    </div>
                    <div className="input-field">
                        <label htmlFor="quantity">Quantity</label>
                        <input ref={quantity} type="number" name="quantity" id="quantity" onInput={() => {setErrors(prevErrors => ({...prevErrors, quantity: ""})); getAvailQuantity(productInfo.current.selectedOptions[0].dataset.name);}} />
                        {errors && errors.quantity && (<span className="errors">{errors.quantity}</span>)}
                        <span className="avail-quantity">Available Quantity: {availableQuantity}</span>
                    </div>
                    <div className="button-options">
                        <button type="submit" onClick={handleSubmit}>Add Order</button>
                        <button onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddOrder;