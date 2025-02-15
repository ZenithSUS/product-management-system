import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/context_provider";

export function CustomerTable({ customers }) {
    const Navigate = useNavigate();
    const { loading } = useStateContext();
    const { token, setChanged } = useStateContext();

    async function handleDelete(id) {
        try {
            if(!confirm('Are you sure do you want to delete this customer?')) return;
    
            const response = await fetch(`http://localhost/PMS_Api/request/customers.php?id=${id}`, {
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
                                <button className="delete-btn" onClick={() => { handleDelete(customer.id) } }>Delete</button>
                            </div>
                        </td>
                    </tr>
                ))}
                {
                    !loading && !customers && (
                        <tr>
                            <td colSpan={3} style={{textAlign: "center"}}>No customers found!</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}

export default CustomerTable;