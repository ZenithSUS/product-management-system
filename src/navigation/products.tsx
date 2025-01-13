import React from "react";
import { ProductTable } from "../components/tables";
export function Products(props: any) {
    return (
        <main>
            <h2>Products</h2>
            <ProductTable products={props.products} />
        </main>
    );
}

export default Products;