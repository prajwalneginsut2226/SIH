// src/ImageUploader.js
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Context } from "../main";
import { useNavigate } from 'react-router-dom';



const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [diseaseData, setDiseaseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigateTo = useNavigate();

  const { isUserAuthenticated } = useContext(Context);


  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      setPreviewUrl(URL.createObjectURL(selectedImage));
      setDiseaseData(null); 
      setError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      setError('Please upload an image first!');
      return;
    }

    setLoading(true);
    setError('');
    setDiseaseData(null);

    const formData = new FormData();
    formData.append('image', image);

    try {
        const options = {
            method: 'POST',
            url: 'https://detect-skin-disease.p.rapidapi.com/facebody/analysis/detect-skin-disease',
            headers: {
              'x-rapidapi-key': 'c47aae8d2dmsh2bf2d702e962be8p1511f0jsn75e0b1d9b40b',
              'x-rapidapi-host': 'detect-skin-disease.p.rapidapi.com',
              
            },
            data: formData
          };

      const response = await axios(options);

      if (response.data.error_code === 0) {
        setDiseaseData(response.data.data);
      } else {
        setError('An error occurred while detecting the disease.');
      }

    } catch (err) {
      console.error(err);
      setError('An error occurred while detecting the disease.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    if (!isUserAuthenticated) {
      navigateTo("/login");
    }
  }, [isUserAuthenticated, navigateTo]);




  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Skin Disease Detection</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0 file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {previewUrl && (
          <div className="flex justify-center">
            <img
              src={previewUrl}
              alt="Selected"
              className="w-48 h-48 object-cover rounded-md border"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50"
        >
          {loading ? 'Detecting...' : 'Detect Disease'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {diseaseData && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Detection Results</h3>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Image Quality:</span> {diseaseData.image_quality.toFixed(2)}%
            </p>
            <p>
              <span className="font-medium">Body Part:</span> {diseaseData.body_part}
            </p>
            <p>
              <span className="font-medium">Image Type:</span> {diseaseData.image_type}
            </p>
            <div>
              <span className="font-medium">Detected Diseases:</span>
              <ul className="mt-2 list-disc list-inside space-y-1">
                {Object.entries(diseaseData.results_english).map(([disease, probability]) => (
                  <li key={disease}>
                    {disease.charAt(0).toUpperCase() + disease.slice(1)}: {(probability * 100).toFixed(2)}%
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
