import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../context/context_provider";
import { Header } from '../components/ui/header';
import { Sidebar } from '../components/ui/sidebar';
import { OrderTable } from "../components/tables/orders";
import { AddOrder } from "../components/forms/orders/add-order";

export function Orders() {
    const { token, loading, setLoading, changed, setChanged } = useStateContext();
    const [orders, setOrders] = useState([]);
    const [ showForm, setShowForm ] = useState(false);

    useEffect(() => {
        getAllOrders();
    }, [token, changed]);

    async function getAllOrders() {
        try {
            setChanged(false);
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
            console.log(data)
            setOrders(data.data);
        } catch (error) {
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