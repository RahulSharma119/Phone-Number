const express = require("express");
const myParser = require('body-parser');
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const port = 80;


app.use(myParser.urlencoded({ extended: false }));

app.use(express.json({limit : '1mb'}));

app.use('/views',express.static(path.join(__dirname,"views")));

app.set('view engine', 'ejs');

//db controls
mongoose.connect('mongodb://localhost/contact')
        .catch((err) =>{console.log(err)});
var db = mongoose.connection;

var phnumberSchema = new mongoose.Schema({
    name :{type : String,
    required: true},
    number :{type : String,
    required: true}

});
const phnumber = mongoose.model('phnumber',phnumberSchema);




app.get('/',(req,res)=>{
    phnumber.find().then((result)=>{
        res.render('index',{collection: result});
    });
    console.log(req.connection.remoteAddress);
});

app.post("/addcontact",(req,res)=>{

    const phNumber = new phnumber({
        name : req.body.name,
        number : req.body.number
    });
    phNumber.save().then((result)=>{console.log(result)})
    .catch((err) => {console.log(err)});
    return res.redirect("/");
});

app.get('/detail',(req,res)=>{
    phnumber.find().then((result)=>{res.send(result)});
});

app.post("/deleteNumber",(req,res)=>{


    console.log(req.body);
    
    phnumber.deleteOne(req.body,(err)=>{
        if(err){
            console.log(err);
        }
    });
    // return res.redirect("/");
});

app.listen(port,()=>{
    console.log(`listining in port : ${port}`);
});