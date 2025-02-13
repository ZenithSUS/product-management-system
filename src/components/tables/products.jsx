import React from "react";
import { useStateContext } from "../../context/context_provider";

export function ProductTable({ products }) {
    const { loading } = useStateContext();
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
                                <button className="delete-btn">Delete</button>
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

export default ProductTable;