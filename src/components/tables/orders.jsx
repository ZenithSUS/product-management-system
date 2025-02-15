import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/context_provider";

export function OrderTable({ orders }) {
    const Navigate = useNavigate();
    const { loading, token, setChanged } = useStateContext();

    async function handleDelete(id) {
        try {
            if(!confirm('Are you sure do you want to delete this order?')) return;
            const response = await fetch(`http://localhost/PMS_Api/request/orders.php?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'X-Authorization' : `Bearer ${token}`
                }
            });
            const data = await response.json();
            data.status === 200 ? setChanged(true) : console.log(data.error);
            
        } catch (error) {   
            console.log(error);
        }
    }
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
                                <button onClick={() => Navigate(`/orders/${order.id}`)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(order.id)}>Delete</button>
                            </div>
                        </td>
                    </tr>
                ))}
                {
                    !loading && !orders && (
                        <tr>
                            <td colSpan={4} style={{textAlign: "center"}}>No orders found!</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}

export default OrderTable;