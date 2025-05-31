import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import Navbar from './frontend/component/NavBar';
import SignUp from './frontend/component/SignUp';
import SignUpList from './frontend/component/SignUpList'
import Main from './frontend/page/Main';
import Voter from './frontend/page/Voter';
import API from '../src/frontend/page/API';




function App() {
  
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
      <API/>
      <Routes>
        <Route path = '/SignUp' element = { <SignUp /> } />
        <Route path = '/SignUpList' element = { <SignUpList /> } />
        <Route path="/Main" element={<Main />} />
        <Route path='/Voter' element={<Voter />} />
      </Routes>
    </>
  );
};


export default App;
