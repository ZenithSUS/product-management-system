import React, { useState, useEffect } from "react";
import { CustomerTable } from "../components/tables";
import { useStateContext } from "../context/context_provider";
import { Header, Sidebar } from "../components/ui_parts";

export function Customers(){
    const { token } = useStateContext();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllCustomers();
    }, []);

    async function getAllCustomers () {
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("process", "get_all_customers");
            const response = await fetch("http://localhost/PMS_Api/request/customers.php", 
                { 
                    method: "POST",
                    headers: {
                        "X-Authorization": `Bearer ${token}`,
                    },
                    body: formData,
                }
            )
            const data = await response.json();
            setCustomers(data.data);

        } catch {
            console.log(error);
        } finally { 
            setLoading(false);
        }
    }

    
    return (
        <>
            <Header />
            <Sidebar/>
            <main>
                <h2>Customers</h2>
                <CustomerTable customers={customers} loading={loading} />
            </main>
        </>
    );
}

export default Customers;