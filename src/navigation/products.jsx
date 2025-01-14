import React from "react";
import { ProductTable } from "../components/tables";
import { Header, Sidebar } from "../components/ui_parts";
export function Products({ products }) {
    return (
        <>
            <Header />
            <Sidebar />
            <main>
                <h2>Products</h2>
                <ProductTable products={products} />
            </main>
        </>
    );
}

export default Products;