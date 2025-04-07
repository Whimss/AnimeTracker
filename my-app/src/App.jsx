
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "../components/signup";
import Login from "../components/login";
import Dashboard from "../components/dashboard";
import PrivateRoute from "./privateRoute";

function App() {
  return (
    
    <Router>
      <Routes>
        
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}


export default App
