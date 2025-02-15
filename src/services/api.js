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


async function FetchOrders(token, setOrders, setLoading = null, setChanged = null) {
    if (setLoading && setChanged) {
        setLoading(true);
        setChanged(false);
    }

    await fetch("http://localhost/PMS_Api/request/orders.php", {
        method: "GET",
        headers: {
            "X-Authorization": `Bearer ${token}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                return setOrders(data.data);
            } else {
                return [];
            }
        })
        .catch((error) => {
            console.log(error);
            return [];
        }).finally(() => setLoading && setLoading(false));
}

async function FetchOrder(token, setOrderInfo, orderID) {
    await fetch(`http://localhost/PMS_Api/request/orders.php?id=${orderID}`, {
        method: "GET",
        headers: {
            "X-Authorization": `Bearer ${token}`
        }
    }).then((response) => response.json())
        .then((data) => {
            if (data && data.status === 200) {
                setOrderInfo(data.data);
                console.log(data.data);
            } else {
                setErrors(data.error);
                console.log(data.error);
            }
        }).catch((error) => console.log(error));
}

async function FetchCustomers(token, setCustomers, setLoading = null, setChanged = null) {

    if(setChanged && setLoading) {
        setLoading(true);
        setChanged(false);
    }
   
    await fetch("http://localhost/PMS_Api/request/customers.php", {
        method: "GET",
        headers: {
            "X-Authorization": `Bearer ${token}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                return setCustomers(data.data);
            } else {
                return [];
            }
        })
        .catch((error) => {
            console.log(error);
            return [];
        }).finally(() => setLoading && setLoading(false));
}

async function FetchCustomer(token, setCustomer, customerID) {
    await fetch(`http://localhost/PMS_Api/request/customers.php?id=${customerID}`, {
        method: "GET",
        headers: {
            "X-Authorization": `Bearer ${token}`,
        },
    }).then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                setCustomer(data.data);
                console.log(data.data);
            } else {
                setErrors(data.error);
                console.log(data.error);
            }
    }).catch((error) => console.log(error));
}

async function FetchProducts(token, setProducts, setLoading = null, setChanged = null) {

    if(setChanged && setLoading) {
        setLoading(true);
        setChanged(false);
    }

    await fetch("http://localhost/PMS_Api/request/products.php", {
        method: "GET",
        headers: {
            "X-Authorization": `Bearer ${token}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                return setProducts(data.data);
            } else {
                return [];
            }
        })
        .catch((error) => {
            console.log(error);
            return [];
        }).finally(() => setLoading && setLoading(false));
}

async function FetchProduct(token, setProduct, productID) {
    await fetch(`http://localhost/PMS_Api/request/products.php?id=${productID}`, {
        method: "GET",
        headers: {
            "X-Authorization": `Bearer ${token}`,
        },
    }).then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                setProduct(data.data);
                console.log(data.data);
            } else {
                setErrors(data.error);
                console.log(data.error);
            }
    }).catch((error) => console.log(error));
}

export { GetAllData, FetchOrder, FetchOrders, FetchCustomer, FetchCustomers, FetchProduct, FetchProducts };