import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../../../context/context_provider";
import { Header } from "../../ui/header";
import { Sidebar } from "../../ui/sidebar";

export function EditOrder({ orders }) {
    const { orderID } = useParams();
    const { token } = useStateContext();
    const [ orderInfo, setOrderInfo ] = useState(
        {
            id: "",
            customerName: "",
            productName: "",
            quantity: 0,
        }
    );
    const [ customers, setCustomers ] = useState([]);
    const [ products, setProducts ] = useState([]);
    const [ errors, setErrors ] = useState({});
    const [ availableQuantity, setAvailableQuantity ] = useState(orderInfo.quantity);
    const customerInfo = useRef();
    const productInfo = useRef();
    const quantity = useRef();

    useEffect(() => {
        fetchOrder(orderID);
        fetchCustomer();
        fetchProduct();
    }, []);

    async function fetchOrder(orderID) {
        try {
            const response = await fetch(`http://localhost/PMS_Api/request/orders.php?id=${orderID}`, {
                method: "GET",
                headers: {
                    "X-Authorization": `Bearer ${token}`
                }
            });
    
            const data = await response.json();
    
            if (data && data.status === 200) {
                setOrderInfo(data.data);
                console.log(data.data);
            } else {
                setErrors(data.error);
                console.log(data.error);
            }
        } catch (error) {
            console.log(error);
        }   
        
    }

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
                console.log(data.data);
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
                console.log(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function updateOrder(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', orderID);
        formData.append('customerId', customerInfo.current ? customerInfo.current.selectedOptions[0].dataset.id.toString() : "");
        formData.append('productId', productInfo.current ? productInfo.current.selectedOptions[0].dataset.id.toString() : "");
        formData.append('quantity', orderInfo.quantity ? parseInt(orderInfo.quantity) : 0);
        formData.append('process', 'edit_order');

        fetch(`http://localhost/PMS_Api/request/orders.php?id=${orderID}`, {
            method: "POST",
            headers: {
                "X-Authorization": `Bearer ${token}`
            },
            body: formData
        })
           .then((response) => response.json())
            .then((data) => {
                if (data && data.status === 200) {
                    window.location.href = "/orders";
                } else {
                    setErrors(data.error);
                    console.log(data.error);
                }
            })
            .catch((error) => console.log(error));
    }

    function getAvailQuantity(productId, productName) {
        const productIdInput = productId ? productId.toString() : "";
        const quantityInput = quantity.current.value ? parseInt(quantity.current.value) : 0;
        if (products && products.length > 0) {
            const product = products.find(product => product.id === productIdInput);
            if (product) {
                const totalPurchased = getTotalPurchases(productName);
                const available = product.quantity - (quantityInput + totalPurchased);
                setAvailableQuantity(available && available >= 0 ? available : 0);
            }
        }
    }

    function getTotalPurchases(productName) {
        const totalPurchased = orders.reduce((total, order) => {
            if (order.productName === productName) {
                return total + order.quantity;
            }
            return total;
        }, 0);
        return totalPurchased;
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setOrderInfo(prevOrderInfo => ({ ...prevOrderInfo, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
    }

    function handleProductChange(e) {
        handleInputChange(e);
        const selectedOption = e.target.selectedOptions[0];
        getAvailQuantity(selectedOption.dataset.id, selectedOption.value);
    }

    function handleCancel() {
        window.location.href = "/orders";
    }

    return (
        <>
            <Header />
            <Sidebar />
            <main>
                <div className="edit-container">
                    <form className="edit-form">
                        <h1>Edit Order</h1>
                        <div className="input-field">
                            <label>Customer Name</label>
                            <select
                                ref={customerInfo}
                                name="customerName"
                                value={orderInfo.customerName}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Customer</option>
                                {customers.map((customer) => (
                                    <option key={customer.id} value={customer.name} data-id={customer.id}>
                                        {customer.name}
                                    </option>
                                ))}
                            </select>
                            {errors.customerName && <span className="errors">{errors.customerName}</span>}
                        </div>
                        <div className="input-field">
                            <label>Product Name</label>
                            <select ref={productInfo} name="productName" value={orderInfo.productName} onChange={handleProductChange}>
                                <option value="" data-quantity={0}>Select Product</option>
                                {products.map((product) => (
                                    <option key={product.id} value={product.name} data-id={product.id} data-quantity={product.quantity}>
                                        {product.name}
                                    </option>
                                ))}
                            </select>
                            {errors.productName && <span className="errors">{errors.productName}</span>}
                        </div>
                        <div className="input-field">
                            <label>Quantity</label>
                            <input ref={quantity} type="number" name="quantity" value={orderInfo.quantity} onChange={handleInputChange} onInput={() => {getAvailQuantity(productInfo.current.selectedOptions[0].dataset.id, orderInfo.productName)}} />
                            {errors.quantity && <span className="errors">{errors.quantity}</span>}
                            <span className="avail-quantity">Available Quantity: {availableQuantity}</span>
                        </div>
                        <div className="button-options">
                            <button type="submit" onClick={updateOrder}>Update</button>
                            <button type="button" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );

}

export default EditOrder;