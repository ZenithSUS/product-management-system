import React, { useState, useEffect } from "react";
import { useStateContext } from "../context/context_provider";
import { ProductTable } from "../components/tables/products";
import { Header } from '../components/ui/header';
import { Sidebar } from '../components/ui/sidebar';
import { Navigate } from "react-router-dom";

export function Products() {
    const { token, setLoading } = useStateContext();
    const [products, setProducts] = useState([]);

    if(!token) {
        return <Navigate to='/login' />
    }

    useEffect(() => {
        getAllProducts();
    }, [token]);

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
                <ProductTable products={products} />
            </main>
        </>
    );
}

export default Products;