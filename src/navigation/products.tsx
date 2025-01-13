import React from "react";
import { ProductTable } from "../components/tables";
import { Header, Sidebar } from "../components/ui_parts";
export function Products(props: any) {
    return (
        <>
            <Header user={{ name: "User" }} />
            <Sidebar />
            <main>
                <h2>Products</h2>
                <ProductTable products={props.products} />
            </main>
        </>
    );
}

export default Products;