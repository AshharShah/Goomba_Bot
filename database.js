import mysql from "mysql2/promise";

// Create a connection to the database
const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ashhar",
  database: "pokemon_discord",
});

export default connection;
