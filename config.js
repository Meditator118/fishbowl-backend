const mysql = require("mysql");
const fs = require("fs");
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "hzj1108",
  database: "acid",
});

module.exports = db;