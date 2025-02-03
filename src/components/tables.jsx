import React from "react";
import { useNavigate } from "react-router-dom";

export function ProductTable({ products, loading }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    loading && (
                        <tr>
                            <td colSpan={4} style={{textAlign: "center"}}>Loading...</td>
                        </tr>
                    )
                }
                {!loading && products && products.map((product) => (
                    <tr key={product.id}>
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
                {
                    !loading && products.length === 0 && (
                        <tr>
                            <td colSpan={4} style={{textAlign: "center"}}>No products found!</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}

export function OrderTable({ orders, loading }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Customer Name</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    loading && (
                        <tr>
                            <td colSpan={4} style={{textAlign: "center"}}>Loading...</td>
                        </tr>
                    )
                }
                {!loading && orders && orders.map((order) => (
                    <tr key={order.id}>
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
                {
                    !loading && orders.length === 0 && (
                        <tr>
                            <td colSpan={4} style={{textAlign: "center"}}>No orders found!</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}

export function CustomerTable({ customers, loading }) {
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
                {
                    loading && (
                        <tr>
                            <td colSpan={3} style={{textAlign: "center"}}>Loading...</td>
                        </tr>
                    )
                }
                {!loading && customers && customers.map((customer) => (
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
                    !loading && customers.length === 0 && (
                        <tr>
                            <td colSpan={3} style={{textAlign: "center"}}>No customers found!</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}