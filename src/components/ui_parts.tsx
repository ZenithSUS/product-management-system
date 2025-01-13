import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../styles/dashboard.css";

export function Header(props: any) {
    return (
        <header>
            <h1>Product Management System</h1>
            <div className="user">
                <h2>{props.user.name}</h2>
                <button onClick={() => window.location.href = "/login"}>Login</button>
            </div>
        </header>
    );
}

export function Sidebar() {
    return (
        <div className="sidebar">
            <h2>Navigation</h2>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/orders">Orders</Link></li>
                <li><Link to="/customers">Customers</Link></li>
            </ul>
        </div>
    );
}

