import React, { useState, useEffect } from "react";
import { CustomerTable } from "../components/tables";
import { useStateContext } from "../context/context_provider";
import { Header, Sidebar } from "../components/ui_parts";

export function Customers(){
    const { token } = useStateContext();
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getAllCustomers();
    }, [customers]);

    async function getAllCustomers () {
        await fetch("http://localhost/PMS_Api/request/customers.php", 
            { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Authorization": `Bearer ${token}`,
                },
            }
        )
            .then((response) => response.json())
            .then((data) => setCustomers(data.data))
            .catch((error) => console.log(error));
    }
    
    return (
        <>
            <Header />
            <Sidebar/>
            <main>
                <h2>Customers</h2>
                <CustomerTable customers={customers} />
            </main>
        </>
    );
}

export default Customers;