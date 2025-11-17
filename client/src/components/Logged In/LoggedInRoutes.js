import { Routes, Route } from 'react-router-dom';
import Home from './HomePage/InHomePage';
import ProfilePage from './ProfilePage/InProfilePage';

function LoggedInRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:username" element={<ProfilePage />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
    );
}

export default LoggedInRoutes;