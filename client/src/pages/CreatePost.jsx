import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { Loader, FormField } from "../components";

export const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('https://dalle-arbb.onrender.com/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  }
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSurpriseMe() {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  }

  const generateImage=async()=> {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://dalle-arbb.onrender.com/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  }
  return (
    <section className=" max-w-7xl mx-auto">
      <div>
        <h1 className=" font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className=" mt-3 text-gray-500 text-[16px] max-w[500px]">
          Create imaginative and visually stunning images through DALL-E AI and
          share with them to community
        </p>
      </div>
      <form className=" mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className=" flex flex-col gap-5">
          <FormField
            LabelName="Your Name"
            type="text"
            name="name"
            placeholder="ritik raj"
            handleChange={handleChange}
            value={form.name}
          />
          <FormField
            LabelName="Prompt"
            type="text"
            name="prompt"
            placeholder="a painting of a fox in the style of Starry Night"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className=" relative bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-[#6964ff] focus:border-blue-500 p-3 h-64 w-64 flex justify-center items-center">
            {form.photo ? (
              <div>
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className=" w-full h-full object-contain"
                />
              </div>
            ) : (
              <img
                src={preview}
                alt={preview}
                className=" w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className=" absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className=" mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className=" mt-10 ">
          <p className=" mt-2 text-gray-600 text-[14px]">
            Once you have created a image you want,you can share with others in
            community
          </p>
          <button
            type="submit"
            className=" mt-3 text-white font-medium bg-[#6469ff] w-full rounded-md px-5 py-2.5 sm:w-auto text-center"
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};
