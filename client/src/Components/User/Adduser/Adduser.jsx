import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "../../Dashboard/Dashboard";
import "./add.css";

function Adduser() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    role: "",
    image: null,
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = new FormData();
    userData.append("name", formData.name);
    userData.append("mobile", formData.mobile);
    userData.append("email", formData.email);
    userData.append("role", formData.role);
    userData.append("image", formData.image);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/add",
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("User added successfully:", response.data);
      // Show success toast
      toast.success("User added successfully!");
      // Show success message popup
      setShowSuccessMessage(true);
      // Reset form fields after successful submission
      setFormData({
        name: "",
        mobile: "",
        email: "",
        role: "",
        image: null,
      });
    } catch (error) {
      console.error("Error adding user:", error);
      // Show error toast with red background
      toast.error("Error adding user. Please try again.", {
        style: {
          background: "red",
        },
      });
    }
  };

  return (
    <>
      <Dashboard />
      <div className="role-container">
        <h1>User Add</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number:</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        {showSuccessMessage && (
          <div className="success-message">
            User added successfully!
            <button onClick={() => setShowSuccessMessage(false)}>Close</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Adduser;
