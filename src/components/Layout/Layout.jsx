import React from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import Footer from '../Footer/Footer.jsx'
import Navabr from '../Navbar/Navbar.jsx'

export default function Layout({userData,setuserData}) {
  
  let navigate=useNavigate();
  function LOgOut()
  {
    localStorage.removeItem('userToken');
    setuserData(null);
    navigate('/login');
  }


return <>

    <Navabr LOgOut={LOgOut}/>
  <div className="container">
  <Outlet></Outlet>
  </div>
  <Footer/>
  </>
}
