import React from "react";
import { Header, Sidebar } from '../components/ui_parts';


export function Dashboard(props: any) {
    return (
      <>
        <Header user={{ name: "User" }} />
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