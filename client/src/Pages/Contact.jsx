import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiMail,
  TiPhone,
} from "react-icons/ti";

function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      toast.error("Please enter your name.");
      return;
    }
    if (message.trim() === "") {
      toast.error("Please enter your message.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/v1/connect/createConnectMessage",
        { name, message },
        { withCredentials: true }
      );
      toast.success("Message sent successfully!");
      setName("");
      setMessage("");
    } catch (error) {
      console.log("Error sending message:", error);
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-100 to-slate-200 pt-12 min-h-screen">
      <div className="container mx-auto pt-16 pb-10">
      <motion.div className="" whileHover={{ scale: 1.4 }}>
          {" "}
          <h1 className="text-4xl text-slate-800 text-center font-bold mb-8 mt-16">
            Contact Us
          </h1>
        </motion.div>

        <ToastContainer position="top-center" />
        <div className="px-4 lg:px-24">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-slate-800 font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-slate-800 font-bold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                rows="5"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 hover:text-lg text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-12"
            >
              Submit
            </button>
          </form>
        </div>

        <div>
          <div className="flex justify-around  mt-16">
            <TiSocialFacebook className="w-10 h-10 text-purple-700 hover:text-purple-900" />
            <TiSocialLinkedin className="w-10 h-10 text-purple-700 hover:text-purple-900" />
            <TiSocialTwitter className="w-10 h-10 text-purple-700 hover:text-purple-900" />
            <TiMail className="w-10 h-10 text-purple-700 hover:text-purple-900" />
            <TiPhone className="w-10 h-10 text-purple-700 hover:text-purple-900" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
