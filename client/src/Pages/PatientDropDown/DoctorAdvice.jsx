import React, { useState } from 'react';
import axios from 'axios';
import { FaHeartbeat } from 'react-icons/fa';
import { AiOutlineCheckCircle } from 'react-icons/ai';

function App() {
    // Initialize state for each input field
    const [disease, setDisease] = useState('');
    const [fever, setFever] = useState('');
    const [cough, setCough] = useState('');
    const [fatigue, setFatigue] = useState('');
    const [difficulty_Breathing, setDifficulty_Breathing] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [blood_Pressure, setBlood_Pressure] = useState('');
    const [cholesterol_Level, setCholesterol_Level] = useState('');
    const [prediction, setPrediction] = useState('');

    const handleSubmit = async () => {
        const data = {
            disease,
            fever,
            cough,
            fatigue,
            difficulty_Breathing,
            age,
            gender,
            blood_Pressure,
            cholesterol_Level,
        };

        try {
            const response = await axios.post('http://localhost:5000/predict', data);
            setPrediction(response.data.prediction);
        } catch (error) {
            console.error('Error making prediction:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-2xl font-bold text-center text-blue-600 flex items-center justify-center mb-6">
                    <FaHeartbeat className="mr-2" /> Disease Prediction
                </h1>
                
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Disease</label>
                    <input 
                        type="text" 
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300" 
                        value={disease} 
                        onChange={(e) => setDisease(e.target.value)} 
                        placeholder="Enter Disease"
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Fever</label>
                    <select 
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300" 
                        value={fever} 
                        onChange={(e) => setFever(e.target.value)}
                    >
                        <option value="">Select Fever Status</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Cough</label>
                    <select 
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300" 
                        value={cough} 
                        onChange={(e) => setCough(e.target.value)}
                    >
                        <option value="">Select Cough Status</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Fatigue</label>
                    <select 
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300" 
                        value={fatigue} 
                        onChange={(e) => setFatigue(e.target.value)}
                    >
                        <option value="">Select Fatigue Status</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Difficulty Breathing</label>
                    <select 
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300" 
                        value={difficulty_Breathing} 
                        onChange={(e) => setDifficulty_Breathing(e.target.value)}
                    >
                        <option value="">Select Breathing Status</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Age</label>
                    <input 
                        type="number" 
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300" 
                        value={age} 
                        onChange={(e) => setAge(e.target.value)} 
                        placeholder="Enter Age"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Gender</label>
                    <select 
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300" 
                        value={gender} 
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Blood Pressure</label>
                    <select 
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300" 
                        value={blood_Pressure} 
                        onChange={(e) => setBlood_Pressure(e.target.value)}
                    >
                        <option value="">Select Blood Pressure</option>
                        <option value="High">High</option>
                        <option value="Normal">Normal</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Cholesterol Level</label>
                    <select 
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300" 
                        value={cholesterol_Level} 
                        onChange={(e) => setCholesterol_Level(e.target.value)}
                    >
                        <option value="">Select Cholesterol Level</option>
                        <option value="High">High</option>
                        <option value="Normal">Normal</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                <button 
                    onClick={handleSubmit} 
                    className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 flex items-center justify-center"
                >
                    <AiOutlineCheckCircle className="mr-2" /> Predict
                </button>

                {prediction && (
                    <div className="mt-6 p-4 bg-green-100 text-green-700 border border-green-400 rounded-md">
                        <h2 className="text-xl font-bold">Prediction: {prediction}</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
