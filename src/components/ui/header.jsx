import React, { useEffect } from "react";
import { useStateContext } from "../../context/context_provider";
import "../../styles/dashboard.css";


export function Header() {
    const { user, token, setToken, setUser } = useStateContext();

    const Logout = () => { 
        if(confirm("Are you sure you want to logout?")){
            localStorage.removeItem('TOKEN');    
            setToken(null);
            setUser(null);
        }
    };

    useEffect(() => {
        if (token) {
            getUser();
        }    
    }, [token]);

    async function getUser() {
        await fetch("http://localhost/PMS_Api/request/users.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ process: "get_user", })
        }).then((response) => response.json())
            .then((data) => setUser(data.username))
            .catch((error) => console.log(error));
    }


    return (
        <header>
            <h1>Product Management System</h1>
            <div className="user">
                <h2>{user ? user : "Loading..."}</h2>
                <button onClick={Logout}>Logout</button>
            </div>
        </header>
    );
}

export default Header;