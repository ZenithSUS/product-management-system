import React, { useState, useEffect } from "react";
import { useStateContext } from "../context/context_provider";
import { ProductTable } from "../components/tables/products";
import { Header } from '../components/ui/header';
import { Sidebar } from '../components/ui/sidebar';
import { Navigate } from "react-router-dom";
import { AddProduct } from "../components/forms/products/add-product";
import { FetchProducts } from "../services/api";

export function Products() {
    const { token, loading, setLoading, changed, setChanged } = useStateContext();
    const [products, setProducts] = useState([]);
    const [ showForm, setShowForm ] = useState(false);

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
                {!loading && (
                    <button onClick={() => setShowForm(true)}>Add Product</button>
                )}
                {showForm && <AddProduct setShowForm={setShowForm} />}
            </main>
        </>
    );
}

export default Products;