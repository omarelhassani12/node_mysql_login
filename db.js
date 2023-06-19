const mysql = require('mysql');


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"nodejs-mysql-login",
});

db.connect((err)=>{
    if(err) {
        console.log(err);
    }
    else {
        console.log('MySql Connected successfully ');
    }
})

module.exports = db;