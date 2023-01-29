// node.js server

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'roomies'
});

const app = express();

app.get('/users', function (req, res) {
    
    // Connecting to the database.
    connection.getConnection(function (err, connection) {

        // Executing the MySQL query (select all data from the 'users' table).
        connection.query('SELECT * FROM group1', function (error, results, fields) {
            if (error) throw error;

            // Getting the 'response' from the database and sending it to our route. This is were the data is.
            res.send(results)
        });
  });

});

// Starting our server.
app.listen(3000, () => {
 console.log('Data fetched at http://localhost:3000/users');
});
