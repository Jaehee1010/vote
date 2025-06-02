import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import Navbar from './frontend/component/NavBar';
import SignUp from './frontend/component/SignUp';
import SignUpList from './frontend/component/SignUpList'
import Main from './frontend/page/Main';
import Voter from './frontend/page/Voter';
import API from '../src/frontend/page/API';
import Pledge from './frontend/page/Pledge';
import Footer from './frontend/component/Footer'




function App() {
  
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

const Layout = () => {
  const location = useLocation();
  const hiddenPaths = ["/SignUp", "SignUpList"];

  const isHidden = hiddenPaths.includes(location.pathname);

  return (
    <>
      {!isHidden && <Navbar />}
      <Routes>
        <Route path="/" element={
          <>
            <API />
            <Main />
          </>
        } />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignUpList" element={<SignUpList />} />
        <Route path="/Voter" element={<Voter />} />
        <Route path="/Pledge" element={<Pledge />} />
      </Routes>
      {!isHidden && <Footer />}
    </>
  );
};


export default App;
