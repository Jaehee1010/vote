import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import Navbar from './frontend/component/NavBar';
import SignUp from './frontend/component/SignUp';
import SignUpList from './frontend/component/SignUpList'
import Main from './frontend/page/Main';




function App() {

useEffect(() => {
  fetch("http://localhost:8080")
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
        <Route path="/Main" element={<Main />} />
      </Routes>
    </>
  );
};


export default App;
