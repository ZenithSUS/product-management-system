import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context/context_provider";
import "../styles/dashboard.css";


export function Header() {
    const { user, token, setToken, setUser } = useStateContext();


    const Logout = () => { 
        setToken(null);
        setUser(null);
    };

    useEffect(() => {}, [token]);

    return (
        <header>
            <h1>Product Management System</h1>
            <div className="user">
                <h2>{user ? user.username : "User"}</h2>
                <button onClick={Logout}>Logout</button>
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

