import React from 'react';
import { FaStethoscope, FaHospitalAlt, FaUserMd, FaHandsHelping, FaAward, FaRegHeart } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-4xl font-bold mb-6">Who We Are</h2>
            <p className="text-lg mb-6">
              JKMedical is a premier healthcare institution dedicated to improving the lives of our patients through comprehensive, compassionate care. We pride ourselves on our advanced facilities and a team of experts who are leaders in their respective fields.
            </p>
            <p className="text-lg">
              From preventive care to complex surgeries, our focus is on providing top-tier medical services with a personalized touch. Your health is our priority, and we work tirelessly to ensure you receive the best care possible.
            </p>
          </div>
          <div className="md:w-1/2">
            <img src="/h3.png" alt="Hospital" className="rounded-lg " />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="text-center">
            <FaStethoscope className="text-5xl text-[#0E0F14] mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Advanced Care</h3>
            <p className="text-lg">We offer state-of-the-art facilities and treatments to ensure the best outcomes for our patients.</p>
          </div>
          <div className="text-center">
            <FaUserMd className="text-5xl text-[#0E0F14] mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Expert Team</h3>
            <p className="text-lg">Our team of doctors, nurses, and staff are leaders in their fields, providing exceptional care with compassion.</p>
          </div>
          <div className="text-center">
            <FaHospitalAlt className="text-5xl text-[#0E0F14] mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Comprehensive Services</h3>
            <p className="text-lg">From routine check-ups to complex surgeries, we cover all aspects of healthcare under one roof.</p>
          </div>
        </div>
        <div className="mb-16">
          <h2 className="text-4xl font-semibold text-center mb-8">Our Mission & Vision</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4"><FaRegHeart className="inline-block text-[#0E0F14] mr-2" /> Our Mission</h3>
              <p className="text-lg">
                Our mission at JKMedical is to provide exceptional healthcare services to our community, emphasizing patient-centered care, innovation, and excellence. We are committed to improving lives through compassionate, comprehensive, and high-quality care.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4"><FaHandsHelping className="inline-block text-[#0E0F14] mr-2" /> Our Vision</h3>
              <p className="text-lg">
                We envision a world where everyone has access to the best healthcare. JKMedical strives to be at the forefront of medical advancements, continuously improving our services to meet the evolving needs of our patients.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#31353d] text-white py-12 rounded-lg shadow-lg mb-16">
          <div className="container mx-auto">
            <h2 className="text-4xl font-semibold text-center mb-8">Why Choose JKMedical</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <FaAward className="text-5xl mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-4">Award-Winning Care</h3>
                <p className="text-lg">Recognized nationally for our commitment to quality and patient safety.</p>
              </div>
              <div className="text-center">
                <FaRegHeart className="text-5xl mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-4">Patient-Centered Approach</h3>
                <p className="text-lg">We put our patients at the heart of everything we do, ensuring personalized care and attention.</p>
              </div>
              <div className="text-center">
                <FaHandsHelping className="text-5xl mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-4">Community Focused</h3>
                <p className="text-lg">We are deeply rooted in our community, providing care that is both accessible and exceptional.</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-semibold text-center mb-8">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <FaRegHeart className="text-5xl text-[#0E0F14] mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Compassion</h3>
              <p className="text-lg">We treat everyone with kindness and empathy, ensuring every patient feels valued and cared for.</p>
            </div>
            <div>
              <FaAward className="text-5xl text-[#0E0F14] mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Excellence</h3>
              <p className="text-lg">We strive for the highest standards in everything we do, from patient care to medical innovation.</p>
            </div>
            <div>
              <FaHandsHelping className="text-5xl text-[#0E0F14] mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Integrity</h3>
              <p className="text-lg">We are committed to honesty, transparency, and ethical practices in all our operations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
