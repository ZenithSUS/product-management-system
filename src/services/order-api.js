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

export { FetchOrders, FetchOrder }