const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 8080;
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/form_data');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName : {
        type : String,
        require : true,
    },
    lastName : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : Number,
        require : true
    },
    address : {
        type : String,
        require : true
    },
    gender : {
        type : String,
        require : true
    }
}); 
app.use(express.static('public'));
app.get('/', (req, res)=>{
    res.redirect('index.html');
});
const User=mongoose.model('details',userSchema);
app.post('/addUsers',async (req, res)=>{
    try
    {
        const newUser = new User(req.body);
        console.log(newUser);
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err) {
        if(err.code === 11000) {
            res.status(400).json({message : "Email already Exist"});
        }
        else {
            res.status(500).json({message : "Internal Server Error"});
        }
    }
});
app.listen(port, (err)=>{
    if(err) {
        console.log('Some error Occured');
    }
    console.log(`Server is ready to pair on port ${port}`);
});