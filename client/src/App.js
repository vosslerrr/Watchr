import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './components/HomePage/HomePage';
import ProfilePage from './components/ProfilePage/ProfilePage'
import Register from './components/Register/Register'
import Login from "./components/LogIn/LogIn";

function App() {
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<Register />} /> 
      <Route path="/logout" element={<Login />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}
export default App;