import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './components/HomePage/HomePage';
import ProfilePage from './components/ProfilePage/ProfilePage'
function App() {
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}
export default App;