import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/context_provider";

export function ProductTable({ products }) {
    const Navigate = useNavigate();
    const { loading, token, setChanged } = useStateContext();

    async function handleDelete(id) {
        try {
            if(!confirm('Are you sure do you want to delete this product?')) return;
            
            const response = await fetch(`http://localhost/PMS_Api/request/products.php?id=${id}`, {
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
                                <button onClick={() => Navigate(`/products/${product.id}`)}>Edit</button>
                                <button className="delete-btn" onClick={() => {handleDelete(product.id)}}>Delete</button>
                            </div>
                        </td>
                    </tr>
                ))}
                {
                    !loading && (!products || products.length === 0) && (
                        <tr>
                            <td colSpan={4} style={{textAlign: "center"}}>No products found!</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}

export default ProductTable;