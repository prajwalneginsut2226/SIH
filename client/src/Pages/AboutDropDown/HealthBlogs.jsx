import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlus, FaFileImage, FaTimes, FaPaperPlane } from "react-icons/fa";

const HealthBlogs = () => {
  const [mainImage, setMainImage] = useState("");
  const [paraOneImage, setParaOneImage] = useState("");
  const [description1, setDescription1] = useState("");
  const [paraTwoImage, setParaTwoImage] = useState("");
  const [description2, setDescription2] = useState("");
  const [paraThreeImage, setParaThreeImage] = useState("");
  const [description3, setDescription3] = useState("");
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [paraOneImagePreview, setParaOneImagePreview] = useState("");
  const [paraTwoImagePreview, setParaTwoImagePreview] = useState("");
  const [paraThreeImagePreview, setParaThreeImagePreview] = useState("");
  const [title, setTitle] = useState("");

  const [createBlog, setCreateBlog] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const navigateTo = useNavigate();

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/healthBlog/getAllBlogs",
        { withCredentials: true }
      );
      setBlogs(data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImagePreview = (e, setPreview, setFile) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
      setFile(file);
    };
  };

  const addBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
  
    formData.append("mainImage", mainImage);

    if (description1.length > 0) {
      formData.append("description1", description1);
    }
    if (paraOneImage) {
      formData.append("paraOneImage", paraOneImage);
    }

    if (description2.length > 0) {
      formData.append("description2", description2);
    }
    if (paraTwoImage) {
      formData.append("paraTwoImage", paraTwoImage);
    }

    if (description3.length > 0) {
      formData.append("description3", description3);
    }
    if (paraThreeImage) {
      formData.append("paraThreeImage", paraThreeImage);
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/healthBlog/createBlog",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setTitle("");
      

      setMainImage("");
      setMainImagePreview("");

      setDescription1("");
      setParaOneImage("");
      setParaOneImagePreview("");

      setDescription2("");
      setParaTwoImage("");
      setParaTwoImagePreview("");

      setDescription3("");
      setParaThreeImage("");
      setParaThreeImagePreview("");
      toast.success(data.message);
      getAllBlogs(); // Refresh the blog list after adding a new one
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  const showCreateBlog = (e) => {
    e.preventDefault();
    setCreateBlog(!createBlog);
  };

  return (
  
    <div className=" p-6">
     <button
        onClick={showCreateBlog}
        className="bg-green-600 text-white py-2 px-4 rounded-full flex items-center hover:bg-green-700"
      >
        {createBlog ? (
          <>
            <FaTimes className="mr-2" />
            Close Blog
          </>
        ) : (
          <>
            <FaPlus className="mr-2" />
            Create Blog
          </>
        )}
      </button>

      {createBlog && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-2xl font-bold mb-4">CREATE BLOG</h3>
          <form onSubmit={addBlog} className="space-y-6">
            <input
              type="text"
              placeholder="BLOG MAIN TITLE"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
            <div className="flex flex-col space-y-2">
              <label className="flex items-center text-lg">
                <FaFileImage className="mr-2" />
                BLOG MAIN IMAGE
              </label>
              <img
                src={mainImagePreview ? `${mainImagePreview}` : "/imgPL.webp"}
                alt="mainImg"
                className="w-full h-48 object-cover rounded-lg"
              />
              <input
                type="file"
                onChange={(e) => handleImagePreview(e, setMainImagePreview, setMainImage)}
                className="border-none"
              />
            </div>

            <div className="space-y-6">
              <div className="flex flex-col space-y-2">
                <img
                  src={paraOneImagePreview ? `${paraOneImagePreview}` : "/imgPL.webp"}
                  alt="subParaOneImg"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <input
                  type="file"
                  onChange={(e) => handleImagePreview(e, setParaOneImagePreview, setParaOneImage)}
                  className="border-none"
                />
                <textarea
                  rows="4"
                  placeholder="Blog First Sub Paragraph Comes Here..."
                  value={description1}
                  onChange={(e) => setDescription1(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <img
                  src={paraTwoImagePreview ? `${paraTwoImagePreview}` : "/imgPL.webp"}
                  alt="subParaTwoImg"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <input
                  type="file"
                  onChange={(e) => handleImagePreview(e, setParaTwoImagePreview, setParaTwoImage)}
                  className="border-none"
                />
                <textarea
                  rows="4"
                  placeholder="Blog Second Sub Paragraph Comes Here..."
                  value={description2}
                  onChange={(e) => setDescription2(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <img
                  src={paraThreeImagePreview ? `${paraThreeImagePreview}` : "/imgPL.webp"}
                  alt="subParaThreeImg"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <input
                  type="file"
                  onChange={(e) => handleImagePreview(e, setParaThreeImagePreview, setParaThreeImage)}
                  className="border-none"
                />
                <textarea
                  rows="4"
                  placeholder="Blog Third Sub Paragraph Comes Here..."
                  value={description3}
                  onChange={(e) => setDescription3(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

       

            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded-full flex items-center hover:bg-green-700"
            >
              <FaPaperPlane className="mr-2" />
              POST BLOG
            </button>
          </form>
        </div>
      )}

<section className="mt-8 md:mx-60 md:px-12 space-y-8">
  {blogs && blogs.length > 0 ? (
    blogs.map((element) => (
      <div key={element._id} className="bg-white p-8 rounded-lg shadow-lg">
        <h4 className="text-4xl font-extrabold mb-6">{element.title}</h4>
        {element.mainImage && (
          <img
            src={element.mainImage.url}
            alt="blogImg"
            className="mx-auto h-72 w-full object-cover rounded-lg mb-6"
          />
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 items-center">
          {element.paraOneImage && (
            <img
              src={element.paraOneImage.url}
              alt="blogImg"
              className="h-60 w-full object-cover rounded-lg"
            />
          )}
          <p className="text-white-900">{element.description1}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 items-center">
          {element.paraTwoImage && (
            <img
              src={element.paraTwoImage.url}
              alt="blogImg"
              className="h-60 w-full object-cover rounded-lg"
            />
          )}
          <p className="text-white-900">{element.description2}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {element.paraThreeImage && (
            <img
              src={element.paraThreeImage.url}
              alt="blogImg"
              className="h-60 w-full object-cover rounded-lg"
            />
          )}
          <p className="text-white-900">{element.description3}</p>
        </div>
        <h4 className="text-right font-bold text-lg text-green-600 mt-6">~{element.authorName}</h4>
      </div>
    ))
  ) : (
    <p className="text-center text-white-600">No blogs available.</p>
  )}
</section>


    </div>
  );
};

export default HealthBlogs;
