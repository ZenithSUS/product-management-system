import React from "react";
import { Header, Sidebar } from '../components/ui_parts';
import { useStateContext } from "../context/context_provider";
import { Navigate } from "react-router-dom";


export function Dashboard(props) {
    const { token } = useStateContext();

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
                    <p>{props.customers.length}</p>
                </div>
            </div>
        </main>
      </>
    );
}  

export default Dashboard;