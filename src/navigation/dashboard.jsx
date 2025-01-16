import React, { useState, useEffect } from "react";
import { Header, Sidebar } from '../components/ui_parts';
import { useStateContext } from "../context/context_provider";
import { Navigate } from "react-router-dom";


export function Dashboard(props) {
    const { token } = useStateContext();
    const [customers, setCustomers] = useState(0);

    useEffect(() => {
        getAllCustomers();
    }, [customers]);

    async function getAllCustomers () {
        await fetch("http://localhost/PMS_Api/request/customers.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: localStorage.getItem('TOKEN')
            })
        }).then((response) => response.json())
            .then((data) => setCustomers(data.data.length))
            .catch((error) => console.log(error));
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
                    <p>{props.products.length}</p>
                </div>
                <div className="card">
                    <h3>Orders</h3>
                    <p>{props.orders.length}</p>
                </div>
                <div className="card">
                    <h3>Customers</h3>
                    <p>{customers || <p>Loading...</p>}</p>
                </div>
            </div>
        </main>
      </>
    );
}  

export default Dashboard;