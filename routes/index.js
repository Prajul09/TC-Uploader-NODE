var express = require('express');
var router = express.Router();
const upload = require('./multer');
const uuid = require("uuid").v4;
const fs = require('fs');
const path = require('path');

let LOCAL_DB = [];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('show',{cards:LOCAL_DB});
});

router.get('/add', function(req, res, next) {
  res.render('add');
});

router.post('/add', function(req, res, next) {
  upload(req,res,function(err){
    if(err)return res.send(err);
    const newImage = {
      id:uuid(),
      image: req.file.filename,
    };
    LOCAL_DB.push(newImage);
    res.redirect("/")
  });
});

router.get('/delete/:id', function(req, res, next) {
  const id = req.params.id;
  const cardIndex = LOCAL_DB.findIndex((d) => d.id === id);
  fs.unlinkSync(path.join(__dirname,'..','public',"uploads",LOCAL_DB[cardIndex].image
  ));
  LOCAL_DB.splice(cardIndex,1);
  res.redirect("/")
});

module.exports = router;
