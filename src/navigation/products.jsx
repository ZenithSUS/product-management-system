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
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [ showForm, setShowForm ] = useState(false);

    if(!token) {
        return <Navigate to='/login' />
    }

    useEffect(() => {
        FetchProducts(token, (data) => {
            setProducts(data);
            setFilteredProducts(data);
        }, setLoading, setChanged);
    }, [token, changed]);
    

    function handleSearch (e) {
        const search = e.target.value.toLowerCase();
        const filtered = products.filter(product => product.name.toLowerCase().includes(search));
        setFilteredProducts(filtered);
    }
    return (
        <>
            <Header />
            <Sidebar />
            <main>
                <h2>Products</h2>
                <ProductTable products={filteredProducts} />
                {!loading && (
                    <div className="table-options">
                        <div className="search-bar">
                            <input type="text" placeholder="Search..." onChange={handleSearch} />
                        </div>
                        <div className="button-options">
                            <button onClick={() => setShowForm(true)}>Add Product</button>
                        </div>
                    </div>
                )}
                {showForm && <AddProduct setShowForm={setShowForm} />}
            </main>
        </>
    );
}

export default Products;