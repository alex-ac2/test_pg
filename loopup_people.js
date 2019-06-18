const name = process.argv[2].toUpperCase();

console.log(name);

const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Connected to DB");

  client.query(`SELECT first_name, last_name, to_char(birthdate, 'YYYY-MON-DD') AS birthdate 
  FROM famous_people 
  WHERE UPPER(first_name) = $1 OR UPPER(last_name) = $1`, [name], (err, result) => {
    let data = [];
    if (err) {
      return console.error("error running query", err);
    }
    //console.log(result)
    console.log(`\nFound ${result.rows.length} person(s) by the name ${name.toLocaleLowerCase()}:`);
    
    for (row of result.rows) {
      let i = data.push(row); 
      console.log(`- ${i}: ${row.first_name} ${row.last_name}, born ${row.birthdate}`)
    }
    
    client.end();
    
  }); 
});