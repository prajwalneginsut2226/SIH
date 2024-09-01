import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from '../../main'
import {
  FaDog,
  FaBolt,
  FaWalking,
  FaSave,
} from "react-icons/fa";

const HealthCharacteristics = () => {
  // const [healthCharacteristics, setHealthCharacteristics] = useState("");

  const { isUserAuthenticated } = useContext(Context);

  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [energyLevel, setEnergyLevel] = useState("");
  const [nature, setNature] = useState("");

  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const navigateTo = useNavigate();


  const addHealthCharacteristics = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("age", age);
    formData.append("weight", weight);
    formData.append("height", height);
    formData.append("energyLevel", energyLevel);
    formData.append("nature", nature);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/healthCharacteristics/post",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    
      toast.success(data.message);

      setEnergyLevel("");
      setAge("");
      setWeight("")
      setHeight("");
      setNature("");

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!isUserAuthenticated) {
      navigateTo('/login');
    }
  }, [isUserAuthenticated, navigateTo]);



  const getAiResponse = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:3000/api/v1/aiResponse/getAIResponse', {
        withCredentials: true
      });

      setAiResponse(data.rawResponseText);
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }

  }
  const clearResponse = () => {
    setAiResponse('');
  };



  return (

    <div className=" p-8 min-h-screen flex flex-col items-center">
      <div className="max-w-2xl bg-white mx-auto mt-10 p-6 shadow-md rounded-lg">

        <div className="mt-10">
          <h2 className="text-2xl font-bold  mb-4">
            Create Health Characteristics
          </h2>

          <form onSubmit={addHealthCharacteristics} className="space-y-4">

            <div className="flex items-center mb-4">
              <FaDog className="mr-2 text-purple-500" />
              <input
                type="text"
                placeholder="Enter Weight In Kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="flex items-center mb-4">
              <FaDog className="mr-2 text-purple-500" />
              <input
                type="text"
                placeholder="Enter Height in cm"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="flex items-center mb-4">
              <FaDog className="mr-2 text-purple-500" />
              <input
                type="text"
                placeholder="Enter Age in Years"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="flex items-center mb-4">
              <FaBolt className="mr-2 text-purple-500" />
              <select
                value={energyLevel}
                onChange={(e) => setEnergyLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="">Energy Level</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="flex items-center mb-4">
              <FaWalking className="mr-2 text-purple-500" />
              <select
                value={nature}
                onChange={(e) => setNature(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="">Nature</option>
                <option value="Happy">Happy</option>
                <option value="Sad">Sad</option>
                <option value="Aggressive">Aggressive</option>

              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 flex items-center justify-center"
            >
              <FaSave className="mr-2" /> Add Health Characteristics
            </button>
          </form>

        </div>
      </div>

      <div>
        <button
          onClick={getAiResponse}
          className='px-2 py-1 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700'
          disabled={loading}>
          {loading ? 'Generating...' : 'AI Response'}
        </button>

        {aiResponse && (
          <div className="ai-response font-normal mt-4">
            <div dangerouslySetInnerHTML={{ __html: aiResponse }}></div>
            <button
              onClick={clearResponse}
              className='mt-2 px-2 py-1 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700'>
              Remove Response
            </button>
          </div>
        )}
      </div>

    </div>




  );
};

export default HealthCharacteristics;
