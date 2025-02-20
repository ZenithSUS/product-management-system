async function GetAllData(token, setCustomers, setOrders, setProducts, setLoading) {
    setLoading(true);
    const formData = new FormData();

    try {
        // Customers
        formData.append("process", "get_all_customers");
        const customersResponse = await fetch("http://localhost/PMS_Api/request/customers.php", {
            method: "POST",
            headers: {
                "X-Authorization": `Bearer ${token}`,
            },
            body: formData,
        });
        const customersData = await customersResponse.json();
        setCustomers(customersData !== 404 ? customersData.data.length : 0);

        // Orders 
        formData.append("process", "get_all_orders");
        const ordersResponse = await fetch("http://localhost/PMS_Api/request/orders.php", {
            method: "POST",
            headers: {
                "X-Authorization": `Bearer ${token}`,
            },
            body: formData,
        });
        const ordersData = await ordersResponse.json();
        setOrders(ordersData.status !== 404 ? ordersData.data.length : 0);

        // Products
        formData.append("process", "get_all_products");
        const productsResponse = await fetch("http://localhost/PMS_Api/request/products.php", {
            method: "POST",
            headers: {
                "X-Authorization": `Bearer ${token}`,
            },
            body: formData,
        });
        const productsData = await productsResponse.json();
        setProducts(productsData.status !== 404 ? productsData.data.length : 0);
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
}

export { GetAllData };