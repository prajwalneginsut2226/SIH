// src/components/Footer.js
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" bg-[#38B2AC] ">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg text-white font-bold">JK Medical</h2>
          <p className="text-white">© 2024 JK Medical. All rights reserved.</p>
        </div>
        <div className="flex  space-x-4 mb-4 md:mb-0">
          <Link to="/about" className="text-white hover:text-white">About</Link>
          <Link to="/contact" className="text-white hover:text-white">Contact</Link>
          <Link to="/privacy" className="text-white hover:text-white">Privacy Policy</Link>
        </div>
        <div className="flex space-x-4">
          <a href="https://facebook.com" className="text-white hover:text-white">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" className="text-white hover:text-white">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" className="text-white hover:text-white">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" className="text-white hover:text-white">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
