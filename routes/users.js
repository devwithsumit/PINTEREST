const express = require('express');
const router = express.Router();
const userModel = require("../models/userModel")
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const {generateToken} = require("../utils/generateToken")
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

/* GET users listing. */
router.get('/', async function(req, res){
  let users = await userModel.find();
  res.send(users);
});

router.post('/register', async function(req, res){
  let { fullname, email , password} = req.body;
  let hashedPassword = await bcrypt.hash(password, 10)

  let user = await userModel.create({
    fullname,
    email,
    password: hashedPassword,
  });
  let token = generateToken(user)
  res.cookie("token", token);

  res.redirect("/");
});

router.post('/login', async function(req, res){
  let user = await userModel.findOne({email : req.body.email});
  if (await bcrypt.compare(req.body.password, user.password)){
    let token = generateToken(user)
    res.cookie("token", token);
    req.flash("success", "You are logged in")
    res.redirect("/");
  }else{
    req.flash("error", "Something went wrong")
    res.redirect("/login");
  }
});

router.delete("/delete", async function(req, res){
  let user = userModel.deleteMany({});
  res.send(user);
})
module.exports = router;
