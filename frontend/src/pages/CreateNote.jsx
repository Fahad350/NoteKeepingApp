import React, { useState, useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import { useNavigate } from "react-router-dom";

function CreateNote() {
  const { createNote } = useContext(NoteContext);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      alert("Please fill out both fields!");
      return;
    }

    await createNote(formData); // Context API function
    setFormData({ title: "", content: "" }); // reset form
    navigate("/"); // redirect to Home after creating note
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-black shadow-md rounded-2xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">
        Create a New Note
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <input
          type="text"
          name="title"
          placeholder="Enter note title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        {/* Content Input */}
        <textarea
          name="content"
          placeholder="Enter note content"
          value={formData.content}
          onChange={handleChange}
          rows="5"
          className="w-full p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition"
        >
          Save Note
        </button>
      </form>
    </div>
  );
}

export default CreateNote;
