import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import Navbar from './frontend/component/NavBar';




function App() {

useEffect(() => {
  fetch("http://localhost:8080/api")
    .then(res => res.json())
    .then(data => console.log(data));
  });

return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      
      </Routes>
    </BrowserRouter>
  
)
};

export default App;
