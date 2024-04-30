const exprees = require("express") //importing express framwork into node.js application
const app = exprees(); //creating and instance of express application
const PORT = 4000; //port no on which our application will run

const dbemp = require("./employee")

const { pool } = require('./pool');

// const dotenv = require("dotenv")
// dotenv.config();
require('dotenv').config();
// const pool = new Client({
//     user: process.env.user,
//     host:'localhost',
//     database:'postgres-api',
//     password: process.env.password,
//     port:5432
// });

app.use(exprees.json())

pool.connect()
.then(() => {
    console.log('Connected')
})
.catch((error) => {
    console.log('Error occurred while connecting DB', error.message);
})

app.post("/add", dbemp.createEmployee)
app.get("/all", dbemp.getEmployee)
app.get("/:id", dbemp.getEmployeeById)
app.put("/:id", dbemp.UpdateEmployee)
app.delete("/:id", dbemp.DeleteEmployee)


app.listen(PORT,()=> console.log(`The server is running on the port ${PORT}`))
