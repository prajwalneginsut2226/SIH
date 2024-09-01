import React from 'react';
import { FaHospitalAlt, FaPhoneAlt, FaLaptopMedical, FaRegClipboard, FaUserMd } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const HeroSection = () => {
  return (
    <section className="bg-[#F6FBFF] py-16">
      <div className="container mx-auto flex flex-col h-screen p-12 lg:flex-row items-center">
        {/* Text Section */}
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h1 className="text-5xl font-extrabold text-[#2D3748] mb-4 leading-tight">
            Revolutionizing Healthcare <br /> One Click at a Time
          </h1>
          <p className="text-lg text-[#4A5568] mb-6">
            Experience the next level of healthcare management with our state-of-the-art web-based EMR and revenue cycle management solution.
          </p>
          <div className="flex space-x-4 mb-6">
            <Link to='/profile'>
              <button className="bg-[#38B2AC] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#319795] transition duration-300 ease-in-out transform hover:scale-105">
                Get Started
              </button>
            </Link>

            <Link to='/contact'>
              <button className="bg-[#2D3748] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#1A202C] transition duration-300 ease-in-out transform hover:scale-105">
                Contact Us
              </button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-[#4A5568] flex items-center">
            <FaPhoneAlt className="mr-2 text-[#38B2AC]" /> Call: +912345678900
          </p>
          <div className="mt-6 flex space-x-6">
            <div className="flex items-center space-x-2">
              <FaLaptopMedical className="text-[#38B2AC] text-2xl" />
              <span className="text-sm text-[#4A5568]">Telemedicine Ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaRegClipboard className="text-[#38B2AC] text-2xl" />
              <span className="text-sm text-[#4A5568]">Comprehensive Reporting</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaUserMd className="text-[#38B2AC] text-2xl" />
              <span className="text-sm text-[#4A5568]">Doctor Friendly Interface</span>
            </div>
          </div>
        </div>

        {/* Icon Section */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <FaHospitalAlt className="text-[#38B2AC] text-[16rem] lg:text-[20rem]" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
