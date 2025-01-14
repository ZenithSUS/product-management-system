import React from "react";
import { CustomerTable } from "../components/tables";
import { Header, Sidebar } from "../components/ui_parts";

export function Customers({ customers }){
    return (
        <>
            <Header />
            <Sidebar/>
            <main>
                <h2>Customers</h2>
                <CustomerTable customers={ customers } />
            </main>
        </>
    );
}

export default Customers;