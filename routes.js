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

app.use(bodyParser.json());

//post request is made to http://ip:3000/roomies
//getting the name and groupid, and writing it
app.post('/roomies/name', function(req, res) {
    const data = req.body;
    console.log(data);

    //sql query to add name
    connection.getConnection(function (err, connection) {
        // Executing the MySQL query (select all data from the 'users' table).
        let sql = " INSERT IGNORE INTO names (name, groupid) VALUES ?";
        let values = [
            [data.name, data.groupid],            
        ];
        connection.query(sql, [values], function (error, results, fields) {
            if (error) throw error;
            console.log("recorded values");       
        });
    });

    res.status(200).json({ message: "Data received" });
});

//getting the name and groupid, and writing it
app.post('/roomies/task', function(req, res) {
    const data = req.body;
    console.log(data);

    //sql query to add name
    connection.getConnection(function (err, connection) {
        // Executing the MySQL query (select all data from the 'users' table).
        let sql = " INSERT IGNORE INTO shoppinglist (name, groupid) VALUES ?";
        let values = [
            [data.taskname, data.groupid]    
        ];
        connection.query(sql, [values], function (error, results, fields) {
            if (error) throw error;
            console.log("recorded values");       
        });
    });

    res.status(200).json({ message: "Data received" });
});

//get request is made to http://ip:3000/roomies
app.get('/roomies/task', function (req, res) {
    
    // Connecting to the database.
    connection.getConnection(function (err, connection) {

        let sql = 'SELECT name FROM shoppinglist WHERE groupid = 2';

        connection.query(sql, function (error, results) {
            if (error) throw error;
            const values = results.map(result => result.name);
            console.log(results);
            console.log(values);
            res.send({ values });
        });
  });

});

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

// Starting our server.
app.listen(3000, () => {
 console.log('Server listening at http://localhost:3000/roomies');
});