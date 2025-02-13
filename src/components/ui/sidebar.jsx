import React from "react";
import { Link } from "react-router-dom";
import "../../styles/dashboard.css";

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

export default Sidebar;