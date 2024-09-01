import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const PatientDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div
        className="text-white text-lg hover:text-gray-300 font-semibold flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
      
        Patient
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-slate-900 ring-1 ring-black ring-opacity-5 z-10">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
           
            {/* <Link
              to="/aiAdvice"
              className="block px-4 py-2 text-sm text-white hover:bg-purple-600 hover:text-white"
              role="menuitem"
              onClick={() => setIsOpen(false)} 
            >
              AI-Powered Diagnosis
            </Link> */}
            <Link
              to="/doctorAdvice"
              className="block px-4 py-2 text-sm text-white hover:bg-purple-600 hover:text-white"
              role="menuitem"
              onClick={() => setIsOpen(false)} 
            >
              Doctor Advice
            </Link>
            <Link
              to="/realTimeAlerts"
              className="block px-4 py-2 text-sm text-white hover:bg-purple-600 hover:text-white"
              role="menuitem"
              onClick={() => setIsOpen(false)} 
            >
              Alerts
            </Link>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDropdown;
