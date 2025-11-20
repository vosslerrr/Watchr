import { Routes, Route } from 'react-router-dom';
import Home from './HomePage/OutHomePage';
import LogIn from './Log-In/LogIn';
import Register from './Register/Register'

function LoggedOutRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
    );
}

export default LoggedOutRoutes;