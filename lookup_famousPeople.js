const settings = require("./settings"); // settings.json
let name;

if (process.argv[2] === undefined) {
  return console.log("Please input a name");
} else {
  name = process.argv[2].toUpperCase();
  console.log(name);
}


// var pg = require('knex')({
//   client: 'pg',
//   connection: process.env.PG_CONNECTION_STRING,
//   searchPath: ['knex', 'public'],
// });

var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

function formatDate(birthdate) {
  let bdate = new Date(birthdate).toISOString().split('T')[0]; // function to change date format
  return bdate;
}

knex('famous_people')
  .select('first_name', 'last_name', 'birthdate')
  //.whereRaw("UPPER(first_name) = ? OR UPPER(last_name) = ?", [name, name])
  .where('first_name', 'ILIKE', name)
  .orWhere('last_name', 'ILIKE', name)
  .then( (rows) => {
    let queryData = [];
    
    for (let row of rows) {
      let i = queryData.push(row);
      console.log(`- ${i}: ${row.first_name} ${row.last_name}, born ${formatDate(row.birthdate)}`)
    }
  })
  .catch( (err) => {
    console.error(err);
  });



