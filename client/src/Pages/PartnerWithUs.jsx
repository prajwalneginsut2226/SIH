import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaBuilding, FaHandsHelping } from "react-icons/fa";




const PartnerWithUs = () => {

  const { isUserAuthenticated, setIsUserAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whyYouWantToCollab, setWhyYouWantToCollab] = useState("");
  const [nameOfCompany, setNameOfCompany] = useState("");
  const navigateTo = useNavigate();

  const partnerUsForm = async (e) => {
    e.preventDefault();
    if (email === "" ){
      toast.error("Enter your email");
    }
    else if(phone===""){
      toast.error("Enter Phone Number")
    }
    else if(whyYouWantToCollab===""){
      toast.error("Enter Reason for collaboration");
    }
    else if(nameOfCompany===""){
        toast.error("Enter your name Of Company");
      }
    else{

    
    try {
      const { data } = await axios.post("http://localhost:3000/api/v1/partnerWithUs/partnerUs/post", {
        email,
        phone,
        whyYouWantToCollab,
        nameOfCompany
      }, { withCredentials: true ,
        headers: { "Content-Type": "application/json" },
      });

    
      setEmail("");
      setPhone("");
      setWhyYouWantToCollab("");
      setNameOfCompany("");
    
      console.log("message sent");
    } catch (err) {
      console.log("Problem sending message");
      console.log(err);
    }
  };
}

  return (
    <div className="min-h-screen bg-gray-100 py-12 mx-12 px-12 my-12 rounded-xl shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Thinking of Collaboration?</h1>
        <div className="text-lg text-gray-700 mb-12">
          <p>
          JK Medical Hospital is proud to partner with industry leaders to enhance healthcare delivery and patient outcomes. Through our collaboration initiatives, we aim to leverage advanced medical technology, foster innovative research, and provide unparalleled patient care. 
          </p>
          <p className="mt-4">
          By working closely with our partners, we strive to share knowledge, develop new treatment protocols, and improve healthcare accessibility for our community. Our commitment to excellence is strengthened through these collaborations, ensuring that our patients receive the most up-to-date and effective treatments available. 
          </p>
          <p className="mt-4">
          We look forward to building more partnerships that further our mission of delivering compassionate, cutting-edge healthcare to all.
          </p>
          <p className="mt-4">
            Thank you for making a decision of partnership with us.
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center text-white-700">
          <FaHandsHelping className="inline-block text-green-500 mr-2" />
          Partner with Us
        </h2>
        <form onSubmit={partnerUsForm}>
          <div className="mb-4">
            <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="email">
              <FaEnvelope className="inline-block text-white-500 mr-2" />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full py-2 px-3 text-white-700 leading-tight focus:outline-none bg-white-200 rounded"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="phone">
              <FaPhone className="inline-block text-white-500 mr-2" />
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="w-full py-2 px-3 text-white-700 leading-tight focus:outline-none bg-white-200 rounded"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="nameOfCompany">
              <FaBuilding className="inline-block text-white-500 mr-2" />
              Name of Company
            </label>
            <input
              type="text"
              id="nameOfCompany"
              name="nameOfCompany"
              className="w-full py-2 px-3 text-white-700 leading-tight focus:outline-none bg-white-200 rounded"
              placeholder="Company Name"
              value={nameOfCompany}
              onChange={(e) => setNameOfCompany(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="whyYouWantToCollab">
              <FaHandsHelping className="inline-block text-white-500 mr-2" />
              Why do you want to collaborate?
            </label>
            <textarea
              id="whyYouWantToCollab"
              name="whyYouWantToCollab"
              className="w-full py-2 px-3 text-white-700 leading-tight focus:outline-none bg-white-200 rounded"
              placeholder="Your reasons for collaboration"
              value={whyYouWantToCollab}
              onChange={(e) => setWhyYouWantToCollab(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 flex items-center"
              type="submit"
            >
              <FaHandsHelping className="mr-2" />
              Submit
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PartnerWithUs;
