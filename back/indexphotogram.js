const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cors = require('cors');
var multer  = require('multer')
const path   = require('path');
var fs = require('fs');
//var upload = multer({ dest: 'uploads/' })

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const storageEngine = multer.diskStorage({
  destination: './uploads',
  filename: function(req, file, fn){
    var temp=new Date().getTime().toString()+'-'+file.fieldname+path.extname(file.originalname);
   
    fn(null,temp);
  }
}); 
 
var upload = multer({ storage: storageEngine });


mongoose.connect('mongodb://localhost:27017/photogram', { useNewUrlParser: true })
.then(() => {
  console.log("Connected to database!");
})
.catch((error) => {
  console.log("Connection failed!");
  console.log(error);
});
var fullPath="";
var imagename="";


const photoSchema = new Schema({
    title:  {type:String},
    desc: {type:String},
    imagepath: {type:String},
    imagename: {type:String},
    uid:{type:String,required:true},
    favorite:{ type:Boolean,required:true},
    date: { type: Date, default:new Date().toLocaleDateString() ,required:true}
  });

const Photo = mongoose.model('Photo', photoSchema);


// server.use(express.static('build'));
server.use(express.static('./uploads'));
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());
server.use(cors());


server.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  //console.log(req.file);
  // req.body will hold the text fields, if there were any
  res.json(req.file);
  fullPath = "http://localhost:8080/"+req.file.filename;
  imagename=req.file.filename;
  console.log("fullpath",fullPath);
  console.log("imagename",imagename)


});

server.post("/photo",function(req,res){
    
    let photo = new Photo();
    photo.title = req.body.title ;
    photo.desc = req.body.desc ;
    photo.uid = req.body.uid ;
    photo.favorite=req.body.favorite;
    //photo.date=req.body.date;
    photo.imagepath = fullPath ;
    photo.imagename=imagename;

    photo.save().then((doc)=>{
        res.json(doc);
        console.log(doc);
    })

})   

server.get("/photos",function(req,res){
    
 Photo.find({uid:req.query.uid}).then((docs)=>{
    res.json(docs);
 })

})   



server.put("/photo/:id",function(req,res){
  Photo.findOneAndUpdate({_id:req.params.id},{favorite:req.body.favorite},function(err,doc){
      console.log(doc)
       res.json(doc);
  })
  
})


server.delete("/photo/:id",function(req,res){
  Photo.findOneAndDelete({_id:req.params.id},function(err,doc){
      console.log(doc)  
      res.json(doc)// this will contain deleted object object
  })
})


server.get('/photo/:file(*)',(req, res) => {
  var file = req.params.file;
  var fileLocation = path.join('./uploads',file);
  res.download(fileLocation, file);
  console.log(fileLocation,file);
   
});


server.get("/photos/title",function(req,res){
  Photo.update({}, function (err, result) {

    if (err) {

        console.log("error query");

    } else {

        console.log(result);

    }

}).sort({title:1});
  
})


// server.get('*', function(req, res) {
//     res.sendFile('index.html', {root: path.join(__dirname, './build/')});
//   });





server.listen(process.env.PORT || 8080,function(){
    console.log("server started at localhost:8080");
})