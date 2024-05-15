const connection = require('../models/model');

const handleGetRole = (req, res) => {
    try {
        // Construct the SQL query to fetch all role lists from the database
        const query = 'SELECT * FROM role';

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
        // Extract role details from the request body
        const { rolename, status } = req.body;

        // Validate role input (optional)
        if (!rolename || !status) {
            return res.status(400).json({ message: 'Rolename and status are required fields' });
        }

        // Construct the SQL query to insert the new role into the database
        const query = 'INSERT INTO role (rolename, status) VALUES (?, ?)';
        const values = [rolename, status];

        // Execute the query to insert the new role
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
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
};



module.exports = {
    handleGetRole,
    handleAddNewRole
}