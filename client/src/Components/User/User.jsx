import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "../Dashboard/Dashboard";
import "./user.css"; // Import CSS file for styling
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
// import Navbar from "react-bootstrap/Navbar";

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
    </tr>
  );

  // Function to render table rows dynamically
  const renderTableData = () =>
    userData.map((user, index) => (
      <tr key={index}>
        {columnNames.map((columnName) => (
          <td key={columnName}>{user[columnName]}</td>
        ))}
      </tr>
    ));

  return (
    <>
      <Dashboard />
      <div className="role-container">
        <button className="add-user-button">
          <Nav.Link as={Link} to="/add/user">
            {" "}
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
