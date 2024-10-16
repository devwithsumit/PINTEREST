var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken")
const isLoggedin = require("../middlewares/isLoggedin");
const userModel = require('../models/userModel');
const upload = require("../config/multer-config");
const postModel = require('../models/postModel');

/* GET home page. */
router.get('/', async function (req, res, next) {
  let error = req.flash("error");
  let success = req.flash("success");
  let user;
  let isLoggedin = false;
  if (req.cookies.token) {
    isLoggedin = true;
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY)
    user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");
  }
  let posts = await postModel.find();
  res.render('index', { error, success, isLoggedin, user , posts });
});

router.get('/signup', function (req, res, next) {
  let error = req.flash("error");
  let success = req.flash("success");
  res.render('signup', {error, success});
});

router.get('/login', function (req, res, next) {
  let error = req.flash("error");
  let success = req.flash("success");
  res.render('login', {error, success});
});

router.get('/create-page', isLoggedin, function (req, res, next) {
  const isLoggedin = req.user ? true : false; 
  res.render('create', {user : req.user , isLoggedin});
});

router.post('/publish-pin', isLoggedin, upload.single("image"), async function (req, res, next) {
  let {title , caption} = req.body;
  let user = await userModel.findOne({email : req.user.email});
  let post =  await postModel.create({
    title,
    caption,
    image : req.file.filename,
    user : user._id,
  })
  user.posts.push(post._id);
  await user.save();

  req.flash("success", "post created successfully");
  res.redirect("/create-page");
});

router.get("/profile/created", isLoggedin, async function (req, res) {
  const isLoggedin = req.user ? true : false;
  let posts = await postModel.find({ user: req.user._id });
  res.render("profile_created", { user : req.user , isLoggedin, posts });
})

router.get("/profile/saved", isLoggedin, async function (req, res) {
  // let posts = await postModel.find({user : req.user._id});
  const isLoggedin = req.user ? true : false;
  res.render("profile_saved", { user: req.user, isLoggedin });
})

router.get("/logout", function (req, res) {
  res.clearCookie("token");
  res.redirect("/");
})


module.exports = router;
