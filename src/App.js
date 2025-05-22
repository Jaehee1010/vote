import './App.css';
import React, { useEffect } from 'react';

function App() {

useEffect(() => {
  fetch("http://localhost:8080/api")
    .then(res => res.json())
    .then(data => console.log(data));
  });

return (
    <div className="App">
      Test
    </div>
  
)
};

export default App;
