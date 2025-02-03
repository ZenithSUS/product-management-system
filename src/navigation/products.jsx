import React, { useState, useEffect } from "react";
import { useStateContext } from "../context/context_provider";
import { ProductTable } from "../components/tables";
import { Header, Sidebar } from "../components/ui_parts";
import { Navigate } from "react-router-dom";

export function Products() {
    const { token } = useStateContext();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    if(!token) {
        return <Navigate to='/login' />
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    async function getAllProducts() {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("process", "get_all_products");

            const response = await fetch("http://localhost/PMS_Api/request/products.php", {
                method: "POST",
                headers: {
                    "X-Authorization": `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            setProducts(data.data);
        } catch {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <>
            <Header />
            <Sidebar />
            <main>
                <h2>Products</h2>
                <ProductTable products={products} loading={loading} />
            </main>
        </>
    );
}

export default Products;