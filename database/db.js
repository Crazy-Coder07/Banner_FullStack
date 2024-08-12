const sql = require("mysql");
const dotenv=require("dotenv");

dotenv.config(); 


// const connection = sql.createConnection({
//   host: "localhost",
//   port: 3306,
//   database: "banner_fullstack",
//   user: "aditya",
//   password: "aditya123",
//   multipleStatements: true,
// });

const connection = sql.createConnection({
  host: process.env.host,
  port: process.env.PORT,
  database: "defaultdb",
  user: "avnadmin",
  password: process.env.password,
  multipleStatements: true
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Banner Full Stack is Connected Db Connected");
});

module.exports = connection;
