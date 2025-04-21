import React from 'react';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {
  return (
    <div className="bg-white  min-h-screen justify-center items-center min-w-screen">
      

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>

    </div >
  );
}

export default App;
