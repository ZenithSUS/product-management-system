import React, { useState, useEffect } from "react";
import { CustomerTable } from "../components/tables/customers";
import { useStateContext } from "../context/context_provider";
import { Header } from '../components/ui/header';
import { Sidebar } from '../components/ui/sidebar';
import { AddCustomer } from "../components/forms/customers/add-customer";

export function Customers(){
    const { token, loading, setLoading, changed, setChanged } = useStateContext();
    const [customers, setCustomers] = useState([])
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        let isMounted = true;
        setChanged(false);
        
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
                if (isMounted) {
                    setCustomers(data.data);
                }

            } catch (error) {
                console.log(error);
            } finally { 
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        getAllCustomers();

        return () => {
            isMounted = false;
        };
    }, [token, changed]);

    return (
        <>
            <Header />
            <Sidebar/>
            <main>
                <h2>Customers</h2>
                <CustomerTable customers={customers} loading={loading} />
                {!loading && customers && (
                        <div className="button-options">
                            <button onClick={() => { setShowForm(true) }}>Add Customer</button>
                        </div> 
                    )
                }
                { showForm && <AddCustomer setShowForm={setShowForm} /> }
            </main>
        </>
    );
}

export default Customers;