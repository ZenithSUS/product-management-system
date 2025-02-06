import React, { useState, useEffect } from "react";
import { useStateContext } from "../context/context_provider";
import { OrderTable } from "../components/tables";
import { Header, Sidebar } from "../components/ui_parts";
import { Navigate } from "react-router-dom";

export function Orders() {
    const { token, loading, setLoading } = useStateContext();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getAllOrders();
    }, []);

    async function getAllOrders() {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("process", "get_all_orders");

            const response = await fetch("http://localhost/PMS_Api/request/orders.php", {
                method: "POST",
                headers : {
                    "X-Authorization": `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            setOrders(data.data);
        } catch {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    if(!token) {
        return <Navigate to='/login' />
    }
    
    return (
        <>
            <Header />
            <Sidebar />
            <main>
                <h2>Orders</h2>
                <OrderTable orders={orders} loading={loading} />
            </main>
        </>
    );
}

export default Orders;