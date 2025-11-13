import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import Home from './components/HomePage/HomePage';
import ProfilePage from './components/ProfilePage/ProfilePage'
import Register from './components/Register/Register'
import Login from "./components/LogIn/LogIn";
import LoggedInRoutes from './components/Logged In/LoggedInRoutes';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
            const decoded = jwtDecode(token);
            setUser({
                id: decoded.user.id,
                username: decoded.user.username
            });
            } catch (err) {
                localStorage.removeItem("token");
            }
        }
    }, []);

    return(
        <>
        {user ? (
           <LoggedInRoutes />
        ) : (
           <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<Register />} /> 
                <Route path="/logout" element={<Login />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        )}
        </>
    );
}
export default App;