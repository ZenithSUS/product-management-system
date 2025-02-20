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

async function FetchCustomerPagination(token, setCustomers, page, setLoading = null, setChanged = null) {

    if(setChanged && setLoading) {
        setLoading(true);
        setChanged(false);
    }

    await fetch(`http://localhost/PMS_Api/request/customers.php?page=${page}`, {
        method: "GET",
        headers: {
            "X-Authorization": `Bearer ${token}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                setCustomers({ customers: data.data, totalPages: data.totalPages });
            } else {
                return [];
            }
        })
        .catch((error) => {
            console.log(error);
            return [];
        }).finally(() => setLoading && setLoading(false));
    
}

export { FetchCustomers, FetchCustomer, FetchCustomerPagination };