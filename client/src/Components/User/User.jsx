import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "../Dashboard/Dashboard";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import FaEdit and FaTrash icons from react-icons
import "./user.css"; // Import CSS file for styling
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function User() {
  const [userData, setUserData] = useState([]);
  const [columnNames, setColumnNames] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/list")
      .then((response) => {
        const { columnNames, results } = response.data;
        setUserData(results);
        setColumnNames(columnNames);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Function to render table header dynamically
  const renderTableHeader = () => (
    <tr>
      {columnNames.map((columnName) => (
        <th key={columnName}>{columnName}</th>
      ))}
      <th>Action</th> {/* Add Action column header */}
    </tr>
  );

  // Function to handle delete action
  const handleDelete = async (userId) => {
    try {
      // Delete user from backend
      await axios.delete(`http://localhost:8000/api/user/${userId}`);
      // Update state to remove the deleted user from the table data
      setUserData(userData.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Function to render table rows dynamically
  const renderTableData = () =>
    userData.map((user, index) => (
      <tr key={index} className={user.isDeleted ? "deleted-row" : ""}>
        {columnNames.map((columnName) => (
          <td key={columnName}>{user[columnName]}</td>
        ))}
        <td className="action-icons">
          {/* Add Edit and Delete icons with links */}
          <div style={{display:"flex"}}>
            <Nav.Link
              as={Link}
              to={{ pathname: `/edit/user/${user.id}`, state: { user } }}
            >
              <FaEdit />
            </Nav.Link>
            <button onClick={() => handleDelete(user.id)}>
              <FaTrash />
            </button>
          </div>
        </td>
      </tr>
    ));

  return (
    <>
      <Dashboard />
      <div className="role-container">
        <button className="add-user-button">
          <Nav.Link as={Link} to="/add/user">
            Add User
          </Nav.Link>
        </button>
        <table className="custom-table">
          <thead>{renderTableHeader()}</thead>
          <tbody>{renderTableData()}</tbody>
        </table>
      </div>
    </>
  );
}

export default User;
