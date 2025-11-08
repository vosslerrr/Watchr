import { Routes, Route } from 'react-router-dom';
import Home from './components/HomePage/HomePage';
import Profile from "./components/Profile/Profile";
function App() {
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}
export default App;