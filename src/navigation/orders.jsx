import React, { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../context/context_provider";
import { Header } from '../components/ui/header';
import { Sidebar } from '../components/ui/sidebar';
import { OrderTable } from "../components/tables/orders";
import { AddOrder } from "../components/forms/orders/add-order";
import { FetchOrders } from "../services/order-api";

export function Orders() {
    const { token, loading, setLoading, changed, setChanged } = useStateContext();
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [ showForm, setShowForm ] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        FetchOrders(token, (data) => {
            setOrders(data);
            setFilteredOrders(data);
        }, setLoading, setChanged);
    }, [token, changed]);   

    if(!token) {
        return <Navigate to='/login' />
    }

    function handleSearch(e) {
        const search = e.target.value.toLowerCase();
        const filtered = orders.filter(order => order.customerName.toLowerCase().includes(search));
        setFilteredOrders(filtered);
    }

    function scrollToTarget() {
        if(formRef.current) {
            formRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
            })
        }
    }
    
    return (
        <>
            <Header />
            <Sidebar />
            <main>
                <h2>Orders</h2>
                <OrderTable orders={filteredOrders} />
                { !loading && (
                    <div className="table-options">
                        <div className="search-bar">
                            <input type="text" placeholder="Search..." onChange={handleSearch} />
                        </div>
                        <div className="button-options">
                            <button onClick={() => {setShowForm(true); scrollToTarget();}}>Add Order</button>
                        </div>
                    </div>
                )}
            
            { showForm && <AddOrder setShowForm={setShowForm} orders={orders} formRef={formRef} /> }
            </main>
        </>
    );
}

export default Orders;