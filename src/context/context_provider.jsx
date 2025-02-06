import { createContext, useContext, useState } from 'react';

const StateContext = createContext({
    user: null,
    token: null,
    loading: null,
    changed: null,
    setUser: () => {},
    setToken: () => {},
    setLoading: () => {},
    setChanged: () => {},
});

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState('');
    const [token, _setToken] = useState(localStorage.getItem('TOKEN'));
    const [loading, setLoading] = useState(true);
    const [changed, setChanged] = useState(false);

    const setToken = (token) => {
        _setToken(token);
        if(token) {
            localStorage.setItem('TOKEN', token);
        } else {
            localStorage.removeItem('TOKEN');
        }
    }
    

    return (
        <StateContext.Provider value={{
            user, 
            setUser,
            token,
            setToken,
            loading,
            setLoading, 
            changed,
            setChanged,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);