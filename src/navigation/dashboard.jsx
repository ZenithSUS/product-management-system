import React, { useState, useEffect } from "react";
import { Header, Sidebar } from '../components/ui_parts';
import { useStateContext } from "../context/context_provider";
import { Navigate } from "react-router-dom";

export function Dashboard() {
    const { token } = useStateContext();
    const [customers, setCustomers] = useState(0);
    const [orders, setOrders] = useState(0);
    const [products, setProducts] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllData();
    }, []);

    async function getAllData() {
        setLoading(true);
        const formData = new FormData();

        try {
            // Customers
            formData.append("process", "get_all_customers");
            const customersResponse = await fetch("http://localhost/PMS_Api/request/customers.php", {
                method: "POST",
                headers: {
                    "X-Authorization": `Bearer ${token}`,
                },
                body: formData,
            });
            const customersData = await customersResponse.json();
            setCustomers(customersData.data.length);

            // Orders 
            formData.append("process", "get_all_orders");
            const ordersResponse = await fetch("http://localhost/PMS_Api/request/orders.php", {
                method: "POST",
                headers: {
                    "X-Authorization": `Bearer ${token}`,
                },
                body: formData,
            });
            const ordersData = await ordersResponse.json();
            setOrders(ordersData.data.length);

            // Products
            formData.append("process", "get_all_products");
            const productsResponse = await fetch("http://localhost/PMS_Api/request/products.php", {
                method: "POST",
                headers: {
                    "X-Authorization": `Bearer ${token}`,
                },
                body: formData,
            });
            const productsData = await productsResponse.json();
            setProducts(productsData.data.length);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    if(!token) {
        return <Navigate to="/login" />   
    }

    return (
      <>
        <Header />
        <Sidebar />
        <main>
            <h2>Dashboard</h2>
            <div className="overall-data">
                <div className="card">
                    <h3>Products</h3>
                    <p>{!loading ? products : "Loading..."}</p>
                </div>
                <div className="card">
                    <h3>Orders</h3>
                    <p>{!loading ? orders : "Loading..."}</p>
                </div>
                <div className="card">
                    <h3>Customers</h3>
                    <p>{!loading ? customers : "Loading..."}</p>
                </div>
            </div>
        </main>
      </>
    );
}

export default Dashboard;