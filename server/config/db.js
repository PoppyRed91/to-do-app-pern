const Pool = require("pg").Pool;


const pool = new Pool({
  user: "group4",
  password: "-RKub\\luuxXLg)P~",
  port: 5432,
  database: "group4",
  host: "34.79.81.42"
});

module.exports = pool;
