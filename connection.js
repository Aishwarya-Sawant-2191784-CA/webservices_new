const mysql = require("mysql");  // Creating Database Connection
const mysqlConnection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Brooklyn_236",
    database: "cloud",
    multipleStatements: true
});


mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connected");
    }
    else {
        console.log("Connection Failed");
    }
});

module.exports = mysqlConnection;