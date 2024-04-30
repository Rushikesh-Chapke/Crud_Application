const {Client} = require("pg");

const pool = new Client({
    user: 'postgres',
    host:'localhost',
    database:'postgres-api',
    password: process.env.password,
    port:5432
});

module.exports =  {
    pool
}