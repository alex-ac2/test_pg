const settings = require("./settings"); // settings.json
let name;
let personEntry = process.argv.slice(2);


if (personEntry === undefined) {
  return console.log("Please input a name");
} else if (personEntry.length < 3) {
  return console.log("Please submit first_name, last_name, and birthdate(YYYY/mm/dd");
} else {
  firstNameEntry = personEntry[0].toLowerCase();
  lastNameEntry = personEntry[1].toLowerCase();
  birthdateEntry = personEntry[2].toLowerCase();

  //console.log(name);
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

knex('famous_people')
  .insert({first_name: firstNameEntry, last_name: lastNameEntry, birthdate: birthdateEntry})
  .returning('*')
  .then( (row) => {
    console.log(row);
    knex('famous_people').select()
    .then( rows => console.log(rows)); 
  });