import React, { useState, useEffect } from "react";
import { useStateContext } from "../context/context_provider";
import { ProductTable } from "../components/tables/products";
import { Header } from '../components/ui/header';
import { Sidebar } from '../components/ui/sidebar';
import { Navigate } from "react-router-dom";
import { FetchProducts } from "../services/api";

export function Products() {
    const { token, setLoading, changed, setChanged } = useStateContext();
    const [products, setProducts] = useState([]);

    if(!token) {
        return <Navigate to='/login' />
    }

    useEffect(() => {
        FetchProducts(token, setProducts, setLoading, setChanged);
    }, [token, changed]);
    
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