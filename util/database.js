const mysql = require('mysql2');

const pool = mysql.createPool({
    host :'localhost',
    user : 'root',
    password : 'saini168',
    database : 'users'
})

module.exports = pool.Promise();