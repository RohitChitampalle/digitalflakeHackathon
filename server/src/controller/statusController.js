const connection = require('../models/model');

let handleGetStatus = (req, res) => {
    try {
        let query = 'SELECT * FROM status WHERE status_code IS NOT NULL'
        connection.query(query, (err, results) => {
            if (err) {

                return res.status(501).json([{
                    "Error": err.sqlMessage
                }]);
            }
            return res.status(201).json(results)
        });

    } catch (error) {
        // console.log()
        return res.status(501).json([{
            "Error Name": error.name,
            "Error Message": error.message
        }])
    }

}


module.exports = {
    handleGetStatus
}