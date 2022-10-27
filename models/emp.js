// const mongoose=require('mongoose');
// const { stringify } = require('querystring');

// const Schema=mongoose.Schema;

// const employee_detail=new Schema(
//     {
//         name:String,
//         location:String,
//         position:String,
//         salary:Number
//     }
//     )
//     const emp_Data=mongoose.model('employee',employee_detail);
//     module.exports=emp_Data;
const mongoose = require("mongoose");//init

//schema definition
const schema = mongoose.Schema;

const employee_detail = new schema({
    name: String,
    location: String,
    position: String,
    salary: Number


})

// const employeeData = mongoose.model("datas", employee_detail); //for atlas need prural form
const employeeData = mongoose.model("employee", employee_detail); //for atlas need prural form

module.exports = employeeData;