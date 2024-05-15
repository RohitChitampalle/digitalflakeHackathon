const connection = require('../models/model');

const handleGetRole = (req, res) => {
    try {
        // Construct the SQL query to fetch all role lists from the database
        const query = 'SELECT rolename,id FROM role';

        // Execute the query to fetch all role lists
        connection.query(query, (err, results) => {
            if (err) {
                // If there's an error, return a 500 status code with the error message
                return res.status(500).json({ message: 'Error fetching role lists', error: err });
            }
            // If successful, return a 200 status code with the role lists
            // const roles = results.map(result => result.role);
            // return res.status(200).json({ roles: roles });
            return res.status(200).json(results);
        });
    } catch (error) {
        // If there's an unexpected error, return a 500 status code with the error details
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
};

const handleAddNewRole = (req, res) => {
    try {
        // Extract role data from the request body
        const { rolename, status } = req.body;

        // console.log("Body --->",req);


        // Validate role input (if necessary)
        if (!rolename || !status) {
            return res.status(400).json({ message: 'Rolename and status are required fields' });
        }

        // Construct the SQL query to insert the role data into the database
        const query = 'INSERT INTO roles (rolename, status) VALUES (?, ?)';
        const values = [rolename, status];

        // Execute the query to insert the role data
        connection.query(query, values, (err, results) => {
            if (err) {
                // If there's an error, return a 500 status code with the error message
                return res.status(500).json({ message: 'Error inserting role', error: err });
            }
            // If successful, return a 201 status code with a success message
            return res.status(201).json({ message: 'Role inserted successfully', roleId: results.insertId });
        });
    } catch (error) {
        // If there's an unexpected error, return a 500 status code with the error details
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const handleEditRole = (req, res) => {
    try {
        // Extract role data from the request body
        const { rolename } = req.body;
        const roleId = req.params.id;

        console.log(roleId)
        console.log(rolename)

        // Validate role input (if necessary)
        if (!rolename) {
            return res.status(400).json({ message: 'Rolename is required' });
        }

        // Construct the SQL query to update the rolename in the database for the specified role ID
        const query = 'UPDATE role SET rolename = ? WHERE id = ?';
        const values = [rolename, roleId];

        // Execute the query to update the rolename
        connection.query(query, values, (err, results) => {
            if (err) {
                // If there's an error, return a 500 status code with the error message
                return res.status(500).json({ message: 'Error updating rolename', error: err });
            }
            // If successful, check if any rows were affected
            if (results.affectedRows === 0) {
                // If no rows were affected, it means the role ID was not found
                return res.status(404).json({ message: 'Role not found' });
            }
            // If successful, return a 200 status code with a success message
            return res.status(200).json({ message: 'Rolename updated successfully' });
        });
    } catch (error) {
        // If there's an unexpected error, return a 500 status code with the error details
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
};



module.exports = {
    handleGetRole,
    handleAddNewRole,
    handleEditRole
}