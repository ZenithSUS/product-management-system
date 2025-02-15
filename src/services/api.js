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
        }).finally(() => setLoading(false));
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
        }).finally(() => setLoading(false));
}

export { FetchOrders, FetchCustomers, FetchProducts };