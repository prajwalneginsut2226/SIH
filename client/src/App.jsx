import React from 'react'
import { useContext,useEffect, useState } from "react";
import { Context} from "./main";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import axios from 'axios';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import PartnerWithUs from './Pages/PartnerWithUs';
import Contact from './Pages/Contact'
import WhoIAm from './Pages/WhoIAm'
import Home from './Pages/Home'
import HealthBlogs from './Pages/AboutDropDown/HealthBlogs';
import HealthCharacteristics from './Pages/AboutDropDown/HealthCharacteristics';
import MorningInstructions from './Pages/AboutDropDown/MorningInstructions';
import AboutUs from './Pages/AboutDropDown/AboutUs';
import DoctorAdvice from './Pages/PatientDropDown/DoctorAdvice';
import Alerts from './Pages/PatientDropDown/Alerts';
import SkinDisease from './Pages/SkinDisease';


function App() {
  const { isUserAuthenticated, setIsUserAuthenticated, setUser } =
    useContext(Context);



  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/v1/user/getUserProfile",
          {
            withCredentials: true,
          }
        );

        setIsUserAuthenticated(true);
        setUser(data.user);
      } catch (error) {
        setIsUserAuthenticated(false);
        setUser({});
      }
    };
    fetchUsers();
   
  }, [isUserAuthenticated,setUser]);

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/partnerWithUs' element={<PartnerWithUs/>}/>
      <Route path='/blog' element={<HealthBlogs/>}/>
      <Route path='/doctorAdvice' element={<DoctorAdvice/>}/>
      <Route path='/realTimeAlerts' element={<Alerts/>}/>
      <Route path='/healthCharacteristics' element={<HealthCharacteristics/>}/>
      <Route path='/morningInstructions' element={<MorningInstructions/>}/>
      <Route path='/skinDisease' element={<SkinDisease/>}/>
      <Route path='/whoIAm' element={<WhoIAm/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
