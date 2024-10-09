import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    let [user, setUser] = useState(() => (
        localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null
    ));
    let [authTokens, setAuthTokens] = useState(() => (
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    ));
    let [loading, setLoading] = useState(true);

    let loginUser = async (formData) => {
        const response = await axios.post(
            'http://127.0.0.1:8000/auth/login/', 
            {
                username: formData.username,
                password: formData.password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        const data = response.data;
        
        if (data) {
            localStorage.setItem('authTokens', JSON.stringify(data));
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            navigate('/matrix');
        } else {
            alert('Something went wrong while loggin in the user!')
        }
    }

    let logoutUser = (e) => {
        e.preventDefault();
        localStorage.removeItem('authTokens');
        setAuthTokens(null);
        setUser(null);
        navigate('/login');
    }

    const updateToken = async () => { 
        const response = await axios.post(
            'http://127.0.0.1:8000/auth/login/refresh/',
            {
                refresh: authTokens?.refresh
            }
        )

        const data = response.data;

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens',JSON.stringify(data));
        } else {
            logoutUser();
        }

        if(loading) {
            setLoading(false);
        }
    }

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    useEffect(() => {
        const REFRESH_INTERVAL = 1000 * 60 * 29; // 29 minutes
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, [authTokens]);

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}