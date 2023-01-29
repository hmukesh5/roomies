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

//get request is made to http://ip:3000/roomies
app.get('/roomies', function (req, res) {
    
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

//post request is made to http://ip:3000/roomies
app.post('/roomies', function(req, res) {

});

// Starting our server.
app.listen(3000, () => {
 console.log('Server listening at http://localhost:3000/roomies');
});



//fetch stuff

//post request
/*
fetch('http://localhost:3000/store-data', {
        method: 'POST',
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify(this.state)
      }).then(function(response) {
        console.log(response)
        return response.json();
      });
*/

//