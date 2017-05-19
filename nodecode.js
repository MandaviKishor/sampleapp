var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

//db connection
mongoose.connect(url);
var db = mongoose.connection;
db.on('error',function(){
    console.log("con error");
})
db.once('open', function (){
    console.log("db connected");
})

//middle ware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

var todoSchema = mongoose.Schema({
    todo: String
});
var Todo = mongoose.model('Todo',todoSchema);

// var todo1 = new Todo({
//     todo:"first"
// });
// todo1.save(function(err){
//     if(err){
//         console.log("error while save");
//     }
//     console.log("saved")
// });
//apis
app.get('/data', function(req, res){
    // ¿console.log("db", db);
   Todo.find(function(err, data){
        console.log("data", data);
        res.send(data);
   })
});

app.post('/data', function(req, res){
   console.log("hello"+JSON.stringify(req.body));
   var todo1 = new Todo(req.body);
   db.collection('todos').insert(req.body,function(err,records) {
     console.log("Record added as "+records);
   })
});
 
//server run
app.listen(8088, function () {
  console.log('Example app listening on port 8088!')
})