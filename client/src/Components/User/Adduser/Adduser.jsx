import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Nav from "react-bootstrap/Nav";
import { Link, useParams } from "react-router-dom"; // Import useParams to get URL params
import "./add.css";
import Dashboard from "../../Dashboard/Dashboard";

function Adduser() {
  const { userId } = useParams(); // Get the userId from URL params
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    role: "",
    image: null,
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (userId) {
      // Fetch user data if userId exists
      axios
        .get(`http://localhost:8000/api/user/${userId}`)
        .then((response) => {
          const userData = response.data;
          console.log("response==>", userData);
          setFormData(userData);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [userId]); // Fetch data whenever userId changes

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
    userData.append("mail_id", formData.email);
    userData.append("role", formData.role);
    userData.append("image", formData.image);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/set",
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("User updated successfully:", response.data);
      // Show success toast
      toast.success("User updated successfully!");
      // Show success message popup
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Error updating user:", error);
      // Show error toast with red background
      toast.error("Error updating user. Please try again.", {
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
        {/* <h1>User </h1> */}
        <button>
          {" "}
          <Nav.Link as={Link} to="/User">
            Back
          </Nav.Link>
        </button>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ""}
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
              value={formData.mobile || ""}
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
              value={formData.email || ""}
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
              value={formData.role || ""}
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
            User updated successfully!
            <button onClick={() => setShowSuccessMessage(false)}>Close</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Adduser;
