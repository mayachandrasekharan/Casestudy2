// Task1: initiate app and run server at 3000

const express= require('express');
const app=new express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const PORT=process.env.PORT||3000;


const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 

const mongoose=require('mongoose');
const emp_Data=require('./models/emp.js');



//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

mongoose.connect('mongodb+srv://Maya1994:Maya1994@cluster0.je1xiwd.mongodb.net/casestudy2?retryWrites=true&w=majority')
.then(()=>{
    console.log('My mongodb is connected successfully !!');
})
.catch(error=>{
    console.log('Connection error'+error);
})






//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist',function(req,res){
    emp_Data.find().then(function(data){
        res.send(data);  
    })
});


//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist',function(req,res){
    emp_Data.findOne({"_id":req.params.id}).then(function(data){
        res.send(data);  
    })

})



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async(req,res)=>{
    try{
    let item =req.body;
    //console.log(item);
    const user=new emp_Data(item);
    const savedUser=await user.save();
    // console.log('saveddata:',savedUser)
    res.send(savedUser);
    }
    catch{
        console.log(error);
    }
})




//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id',(req,res)=>{
    let id = req.params.id;
    emp_Data.findByIdAndRemove({_id : id},(err,data)=> {
        if (err)
            res.send(err);
        else
            res.send(data);    
    });
})



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist', async (req, res) => {

    try {
        const data = await emp_Data.findByIdAndUpdate(
            {
                "_id": req.body._id
            },
            {
                $set: {
                    "name": req.body.name,
                    "location": req.body.location,
                    "position": req.body.position,
                    "salary": req.body.salary
                }
            }
        );

        console.log("data from put api or frontend= ", data);//to view in terminal
        res.send(data);//to view in postaman


    }
    catch (e) {
        console.log(`update error occured ${e}`);
    }

})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});


app.listen(PORT,()=>{
    console.log(`Server is connected in port ${PORT} !!`);
 })
