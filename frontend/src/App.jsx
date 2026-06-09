import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import MyApplications from "./pages/MyApplications";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>}/>
        <Route path="/applications" element={<MyApplications />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;