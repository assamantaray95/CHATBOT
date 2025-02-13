import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/custom.css";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Chatbot from "./components/Chatbot";
import Dashboard from "./components/admin/dashboard";
import PrivateRoute from "./components/config/PrivateRoute";
import Addq from "./components/admin/Addq";


function App() {

  const [userInfo, setUserRole] = useState('');
  useEffect(() => {
    const role = localStorage.getItem('role'); 
    setUserRole(role); 
  }, []);


  return (
    <>
      <Router>
        <Navbar/>
        <Routes>  
          <Route path="/" element={<Home/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/about/contact" element={<Contact/>}></Route>
          <Route path="/chatbot" element={<Chatbot/>}></Route>

          {/* <Route path="/test" element={<QuestionSearch/>}></Route> */}

          {/*Admin private Routes */}
          { userInfo === 'admin' && <Route path="/user/register" element={<PrivateRoute element = {<Register/>}/>}></Route> }
          <Route path="/admin/dashboard" element={<PrivateRoute element = {<Dashboard/>}/>}></Route>
          { userInfo === 'admin' && <Route path="/admin/add" element={<PrivateRoute element = {<Addq/>}/>}></Route> }
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
