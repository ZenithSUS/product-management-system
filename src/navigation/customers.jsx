import React, { useState, useEffect } from "react";
import { CustomerTable } from "../components/tables/customers";
import { useStateContext } from "../context/context_provider";
import { Header } from '../components/ui/header';
import { Sidebar } from '../components/ui/sidebar';
import { AddCustomer } from "../components/forms/customers/add-customer";
import { FetchCustomers } from "../services/api";

export function Customers(){
    const { token, loading, setLoading, changed, setChanged } = useStateContext();
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        FetchCustomers(token, (data) => {
            setCustomers(data);
            setFilteredCustomers(data);
        }, setLoading, setChanged);
    }, [token, changed]);

    function handleSearch(e) {
        const search = e.target.value.toLowerCase();
        const filtered = customers.filter(customer => customer.name.toLowerCase().includes(search));
        setFilteredCustomers(filtered); 
    }
    return (
        <>
            <Header />
            <Sidebar/>
            <main>
                <h2>Customers</h2>
                <CustomerTable customers={filteredCustomers} loading={loading} />
                {!loading && customers && (
                    <div className="table-options">
                        <div className="search-bar">
                            <input type="text" placeholder="Search..." onChange={handleSearch} />
                        </div>
                        <div className="button-options">
                            <button onClick={() => setShowForm(true)}>Add Customer</button>
                        </div>
                    </div>
                    )
                }
                { showForm && <AddCustomer setShowForm={setShowForm} /> }
            </main>
        </>
    );
}

export default Customers;