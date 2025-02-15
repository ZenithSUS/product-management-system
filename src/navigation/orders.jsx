import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../context/context_provider";
import { Header } from '../components/ui/header';
import { Sidebar } from '../components/ui/sidebar';
import { OrderTable } from "../components/tables/orders";
import { AddOrder } from "../components/forms/orders/add-order";
import { FetchOrders } from "../services/api";

export function Orders() {
    const { token, loading, setLoading, changed, setChanged } = useStateContext();
    const [orders, setOrders] = useState([]);
    const [ showForm, setShowForm ] = useState(false);

    useEffect(() => {
        FetchOrders(token, setOrders, setLoading, setChanged);
    }, [token, changed]);


    if(!token) {
        return <Navigate to='/login' />
    }
    
    return (
        <>
            <Header />
            <Sidebar />
            <main>
                <h2>Orders</h2>
                <OrderTable orders={orders} />
                { !loading && (
                    <div className="button-options">
                        <button onClick={() => setShowForm(true)}>Add Order</button>
                    </div>
                )}
            
            { showForm && <AddOrder setShowForm={setShowForm} orders={orders}/> }
            </main>
        </>
    );
}

export default Orders;