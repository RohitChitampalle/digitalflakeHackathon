const connection = require('../models/model');
const multer = require('multer');

// Configure Multer to store uploaded files
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

const handleGetUsers = (req, res) => {
    try {
        let query = 'SELECT id,name,mobile,role,status FROM users';
        // Execute the query to fetch all users from the database
        connection.query(query, (err, results) => {
            if (err) {
                // If there's an error, return a 501 status code with the error message
                return res.status(501).json([{ "Error": err.sqlMessage }]);
            }
            // If successful, return a 200 status code with the list of users
            return res.status(200).json(results);
        });
    } catch (error) {
        // If there's an unexpected error, return a 501 status code with the error details
        return res.status(501).json([{ "Error Name": error.name, "Error Message": error.message }]);
    }
};

const handleAddNewUser = (req, res) => {
    try {
        // Execute Multer middleware to handle file upload
        upload(req, res, (err) => {
            if (err) {
                // If there's an error uploading the image, return a 400 status code with the error message
                return res.status(400).json({ message: 'Error uploading image', error: err });
            }

            // Extract user data from the request body
            const { name, mobile, mail_id ,role} = req.body;
            const image = req.file ? req.file.buffer : null;

            // Validate user input (optional)
            if (!name || !mobile || !mail_id || !role) {
                return res.status(400).json({ message: 'Name, mobile, and mail_id are required fields' });
            }

            // Construct the SQL query to insert the new user into the database
            const query = 'INSERT INTO users (name, mobile, mail_id, role, image) VALUES (?, ?, ?, ?, ?)';
            const values = [name, mobile, mail_id, role, image];

            // Execute the query to insert the new user
            connection.query(query, values, (err, results) => {
                if (err) {
                    // If there's an error, return a 500 status code with the error message
                    return res.status(500).json({ message: 'Error inserting user', error: err });
                }
                // If successful, return a 201 status code with a success message
                return res.status(201).json({ message: 'User inserted successfully', userId: results.insertId });
            });
        });
    } catch (error) {
        // If there's an unexpected error, return a 500 status code with the error details
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
};

const handleEditUser = (req, res) => {
    try {
        // Execute Multer middleware to handle file upload
        upload(req, res, (err) => {
            if (err) {
                // If there's an error uploading the image, return a 400 status code with the error message
                return res.status(400).json({ message: 'Error uploading image', error: err });
            }

            // Extract user details from the request body
            const { name, mobile, role, status } = req.body;
            const image = req.file ? req.file.buffer : null; // If image uploaded, extract image buffer

            // Validate user input (if necessary)
            // Example validation:
            if (!name || !mobile || !role || !status) {
                return res.status(400).json({ message: 'Name, mobile, role, and status are required fields' });
            }

            // Construct the SQL query to update the user record in the database
            const query = 'UPDATE users SET name=?, mobile=?, role=?, status=?, image=? WHERE id=?';
            const values = [name, mobile, role, status, image, req.params.id];

            // Execute the query to update the user record
            connection.query(query, values, (err, results) => {
                if (err) {
                    // If there's an error, return a 500 status code with the error message
                    return res.status(500).json({ message: 'Error updating user', error: err });
                }
                // If successful, return a 200 status code with a success message
                return res.status(200).json({ message: 'User updated successfully' });
            });
        });
    } catch (error) {
        // If there's an unexpected error, return a 500 status code with the error details
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
};



module.exports = {
    handleGetUsers,
    handleAddNewUser,
    handleEditUser
}