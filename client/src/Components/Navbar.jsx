
import React, { useContext, useState } from "react";
import { Context } from "../main";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AboutDropdown from '../Components/DropDown/AboutDropdown';
import PatientDropDown from '../Components/DropDown/PatientDropdown'

const Navbar = () => {
  const { isUserAuthenticated, setIsUserAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/user/logoutUser",
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setIsUserAuthenticated(false);
      navigateTo("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const goToLogin = () => {
    navigateTo("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <nav className="bg-[#38B2AC] py-4 px-12 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-2xl">
          <Link to="/" className="flex items-center">

            <span>JK Medical</span>
          </Link>
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          {isUserAuthenticated ? (
            <button
              className="text-white text-lg hover:text-white-300 font-semibold flex items-center"
              onClick={handleLogout}
            >

              LOGOUT
            </button>
          ) : (
            <button
              className="text-white text-lg hover:text-white-300 font-semibold flex items-center"
              onClick={goToLogin}
            >

              LOGIN
            </button>
          )}
          {isUserAuthenticated && (
            <Link to="/profile" className="text-white text-lg hover:text-white-300 font-semibold flex items-center">
              Profile

            </Link>
          )}
          {isUserAuthenticated && (
            <Link to="/skinDisease" className="text-white text-lg hover:text-white-300 font-semibold flex items-center">
              Check Skin Disease

            </Link>
          )}
          <div className="text-white text-lg hover:text-white-300 font-semibold flex items-center">

            <PatientDropDown />
          </div>


          <Link
            to="/contact"
            className="text-white text-lg hover:text-white-300 font-semibold flex items-center"
          >

            Contact Us
          </Link>


          <div className="text-white hover:text-white-300">
            <AboutDropdown />
            
          </div>

        </div>
        <div className="md:hidden">
          <button onClick={toggleSidebar} className="text-white">
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
