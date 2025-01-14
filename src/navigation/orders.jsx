import React from "react";
import { OrderTable } from "../components/tables";
import { Header, Sidebar } from "../components/ui_parts";

export function Orders({ orders }) {
    return (
        <>
            <Header />
            <Sidebar />
            <main>
                <h2>Orders</h2>
                <OrderTable orders={orders} />
            </main>
        </>
    );
}

export default Orders;