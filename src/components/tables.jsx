import React from "react";
import { useNavigate } from "react-router-dom";

export function ProductTable({ products }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td>
                            <div className="button-options">
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export function OrderTable({ orders }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.customerName}</td>
                        <td>{order.productName}</td>
                        <td>{order.quantity}</td>
                        <td>
                            <div className="button-options">
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export function CustomerTable({ customers }) {
    const Navigate = useNavigate();
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {customers && customers.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>
                            <div className="button-options">
                                <button onClick={() => { Navigate(`/customers/${customer.id}`)}}>Edit</button>
                                <button>Delete</button>
                            </div>
                        </td>
                    </tr>
                ))}
                {
                    customers.length === 0 && (
                        <tr>
                            <td colSpan={3} style={{textAlign: "center"}}>No customers found!</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}