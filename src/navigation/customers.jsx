import React, { useState, useEffect } from "react";
import { CustomerTable } from "../components/tables/customers";
import { useStateContext } from "../context/context_provider";
import { Header } from '../components/ui/header';
import { Sidebar } from '../components/ui/sidebar';
import { AddCustomer } from "../components/forms/customers/add-customer";
import { FetchCustomers } from "../services/api";

export function Customers(){
    const { token, loading, setLoading, changed, setChanged } = useStateContext();
    const [customers, setCustomers] = useState([])
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        FetchCustomers(token, setCustomers, setLoading, setChanged);
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