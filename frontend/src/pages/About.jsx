import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000"; // change if needed

function About() {
  const [aboutList, setAboutList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [editId, setEditId] = useState(null);

  // Fetch records
  const fetchAbout = async () => {
    try {
      const res = await axios.get(`${API_URL}/get-about`);
      setAboutList(res.data.data); // ✅ backend sends { message, data: [] }
    } catch (err) {
      console.error("Error fetching:", err.message);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.address) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editId) {
        // Update existing
        const res = await axios.put(
          `${API_URL}/update-about/${editId}`,
          formData
        );
        setAboutList((prev) =>
          prev.map((item) => (item._id === editId ? res.data.data : item))
        );
        setEditId(null);
      } else {
        // Create new
        const res = await axios.post(`${API_URL}/create-about`, formData);
        setAboutList((prev) => [...prev, res.data.data]);
      }

      setFormData({ name: "", email: "", address: "" }); // reset form
    } catch (err) {
      console.error("Error saving:", err.message);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/delete-about/${id}`);
      setAboutList((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting:", err.message);
    }
  };

  // Edit mode
  const handleEdit = (item) => {
    setFormData({ name: item.name, email: item.email, address: item.address });
    setEditId(item._id);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">About Management</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-2xl shadow-md space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
        />
        <input
          type="text"
          name="address"
          placeholder="Enter address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
        />

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
        >
          {editId ? "Update About" : "Create About"}
        </button>
      </form>

      {/* List */}
      <div className="mt-8 space-y-4">
        {Array.isArray(aboutList) && aboutList.length > 0 ? (
          aboutList.map((item) => (
            <div
              key={item._id}
              className="bg-black border border-gray-700 shadow-md rounded-2xl p-5 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-gray-300">{item.email}</p>
                <p className="text-gray-400">{item.address}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No records found.</p>
        )}
      </div>
    </div>
  );
}

export default About;
