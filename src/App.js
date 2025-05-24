import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import Navbar from './frontend/component/NavBar';
import SignUp from './frontend/component/SignUp';
import SignUpList from './frontend/component/SignUpList'




function App() {

useEffect(() => {
  fetch("http://0.0.0.0:8001")
  .then(res => res.json())
  .then(data => console.log(data));

  }, []);
  
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

const Layout = () => {
  const location = useLocation();
  const hideNavBarPaths = ["/SignUp", "SignUpList"];

  const hideNavBar = hideNavBarPaths.includes(location.pathname)

  return (
    <>
      {!hideNavBar && <Navbar />}
      <Routes>
        <Route path = '/SignUp' element = { <SignUp /> } />
        <Route path = '/SignUpList' element = { <SignUpList /> } />
      </Routes>
    </>
  );
};


export default App;
