import React from "react";
import { OrderTable } from "../components/tables";
import { Header, Sidebar } from "../components/ui_parts";

export function Orders(props: any) {
    return (
        <>
            <Header user={{name: "User"}} />
            <Sidebar />
            <main>
                <h2>Orders</h2>
                <OrderTable orders={props.orders} />
            </main>
        </>
    );
}

export default Orders;