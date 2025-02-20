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

export { FetchProducts, FetchProduct };