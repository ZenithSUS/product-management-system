import React, { useState, useEffect, useRef } from "react";
import { CustomerTable } from "../components/tables/customers";
import { useStateContext } from "../context/context_provider";
import { Header } from '../components/ui/header';
import { Sidebar } from '../components/ui/sidebar';
import { AddCustomer } from "../components/forms/customers/add-customer";
import { FetchCustomerPagination } from "../services/customer-api";
import "../styles/pagination.css";

export function Customers(){
    const { token, loading, setLoading, changed, setChanged } = useStateContext();
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const formRef = useRef(null);

    useEffect(() => {
        FetchCustomerPagination(token, (data) => {
            setCustomers(data.customers);
            setTotalPages(data.totalPages);
            setFilteredCustomers(data.customers);
        }, page, setLoading, setChanged);
    }, [token, page, changed]);

    
    function handlePageChange(e) {
        const newPage = e.target.value;
        setPage(newPage);
        FetchCustomerPagination(token, (data) => {
            setCustomers(data.customers);
            setTotalPages(data.totalPages);
            setFilteredCustomers(data.customers);
        }, newPage, setLoading, setChanged);
    }

    function handleSearch(e) {
        const search = e.target.value.toLowerCase();
        const filtered = customers.filter(customer => customer.name.toLowerCase().includes(search));
        setFilteredCustomers(filtered); 
    }

    function scrollToTarget() {
        if(formRef.current) {
            formRef.current.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
             }); 
        }
    }

    return (
        <>
            <Header />
            <Sidebar/>
            <main>
                <h2>Customers</h2>
                <CustomerTable customers={filteredCustomers} loading={loading} />
                {!loading && customers && (
                    <>
                        <div className="table-options">
                            <div className="search-bar">
                                <input type="text" placeholder="Search..." onChange={handleSearch} />
                            </div>
                            <div className="button-options">
                                <button onClick={() => {setShowForm(true); scrollToTarget(); }}>Add Customer</button>
                            </div>
                        </div>

                        <div className="pagination">
                            <button onClick={() => {handlePageChange({ target: { value: page - 1 } })}} disabled={page === 1}>Previous</button>
                            <h3>Page {page} of {totalPages}</h3> 
                            <button onClick={() => {handlePageChange({ target: { value: page + 1 } })}} disabled={page === totalPages}>Next</button>
                        </div>
                    </>
                    )
                }
                { showForm && <AddCustomer setShowForm={setShowForm} formRef={formRef} /> }
            </main>
        </>
    );
}

export default Customers;