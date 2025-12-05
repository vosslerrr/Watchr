import { Routes, Route } from 'react-router-dom';
import Home from './HomePage/OutHomePage';
import LogIn from './Log-In/LogIn';
import Register from './Register/Register';
import OutMoviePage from './MoviePage/OutMoviePage';


function LoggedOutRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movie/:movieId" element={<OutMoviePage />} />
        </Routes>
    );
}

export default LoggedOutRoutes;