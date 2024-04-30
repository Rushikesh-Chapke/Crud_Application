const { pool } = require('./pool');

const createEmployee = (req,res)=>{
     const {name, email} = req.body;
    // const name = req.body.name       // we can accept the object from the both way
    // const email = req.body.email
    pool.query('INSERT INTO employee (name,email) VALUES ($1,$2) RETURNING *',
     [name,email], 
     (error,result)=>{
        if(error){
            console.log(err)
            throw err;
        }
        res.status(200).json({
            msg:'data inserted successfully',
            data : result.rows[0]
        })
    })
}

const getEmployee = (req, res)=> {
    pool.query('SELECT * FROM employee', (err,result) =>{
        if(err){
            console.log(err)
            throw err
        }
        res.json({
            data: result.rows
        })
    })
}
const getEmployeeById = (req, res)=> {
    let id = parseInt(req.params.id)

    pool.query('SELECT * FROM employee WHERE id=$1',[id],(err,result) =>{
        if(err){
            console.log(err)
            throw err
        }
        res.json({
            data: result.rows
        })
    })
}

const UpdateEmployee = (req,res) =>{
    let id = parseInt(req.params.id)
    const {name, email} = req.body;

    pool.query('UPDATE employee SET name=$1, email=$2 WHERE id=$3',[name,email,id],(error, result)=>{
        if(error){
            console.log(error)
        }
        res.json({
            msg: 'Data Updated Successfully'
        })
    })
}

const DeleteEmployee = (req,res)=>{
    let id = parseInt(req.params.id)

    pool.query('Delete from employee where id=$1 ',[id],(error, result)=>{
        if(error){
            throw error
        }
        res.json({
            msg:'Data Deleted Successfully'
        })
    })
}
module.exports = {
    createEmployee, getEmployee,getEmployeeById, UpdateEmployee, DeleteEmployee
}
