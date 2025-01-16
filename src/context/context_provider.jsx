import { createContext, useContext, useState } from 'react';

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});

export const ContextProvider = ({children}) => {
    const [user, _setUser] = useState(JSON.parse(localStorage.getItem('USER')));
    const [token, _setToken] = useState(localStorage.getItem('TOKEN'));

    const setToken = (token) => {
        _setToken(token);
        if(token) {
            localStorage.setItem('TOKEN', token);
        } else {
            localStorage.removeItem('TOKEN');
        }
    }

    const setUser = (user) => {
        _setUser(user);
        if(user) {
            localStorage.setItem('USER', JSON.stringify(user));
        } else {
            localStorage.removeItem('USER');
        }
    }
    

    return (
        console.log(token, user),
        <StateContext.Provider value={{
            user, 
            setUser,
            token,
            setToken 
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);