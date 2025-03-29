import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './pages/NavBar';
import Footer from './pages/Footer';

const Layout = () => {
  const [auth, setAuth] = useState(null)
  useEffect(()=>{
    let token = localStorage.getItem('token')
    setAuth(token)
  }, [auth])
  return (
    <div>
      {auth && <NavBar/>}
      <Outlet /> 
      <Footer/>
    </div>
  );
};

export default Layout;
