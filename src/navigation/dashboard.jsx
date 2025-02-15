import React, { useState, useEffect } from "react";
import { useStateContext } from "../context/context_provider";
import { GetAllData } from "../services/api";
import { Navigate } from "react-router-dom";
import { Header } from '../components/ui/header';
import { Sidebar } from '../components/ui/sidebar';

export function Dashboard() {
    const { token, loading, setLoading } = useStateContext();
    const [customers, setCustomers] = useState(0);
    const [orders, setOrders] = useState(0);
    const [products, setProducts] = useState(0);

    useEffect(() => {
        GetAllData(token, setCustomers, setOrders, setProducts, setLoading);
    }, []);

    if(!token) return <Navigate to="/login" />   
    
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