import { Routes, Route } from 'react-router-dom';
import Home from './HomePage/OutHomePage';
import LogIn from './Log-In/LogIn';

function LoggedOutRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
    );
}

export default LoggedOutRoutes;