import { Routes, Route } from 'react-router-dom';
import Home from './HomePage/InHomePage';
import ProfilePage from './ProfilePage/InProfilePage';
import MoviePage from './MoviePage/InMoviePage';

function LoggedInRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path='/:movieId' element={<MoviePage />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
    );
}

export default LoggedInRoutes;