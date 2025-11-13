import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import LoggedInRoutes from './components/Logged In/LoggedInRoutes';
import LoggedOutRoutes from './components/Logged Out/LoggedOutRoutes';

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
           <LoggedOutRoutes />
        )}
        </>
    );
}
export default App;