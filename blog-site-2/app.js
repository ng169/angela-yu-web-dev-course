const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const PASSWORD = "DHPwruNBxDzK7pjC";
const DB_NAME = "blogsDB";
mongoose.connect("mongodb+srv://ng169:" + PASSWORD + "@cluster0.nxsy2lf.mongodb.net/" + DB_NAME);


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const blogSchema = {
  title: String,
  content: String
};

const Blog = mongoose.model("Blog", blogSchema);


app.get("/", function (req, res) {
  Blog.find({}, function (err, posts) {
    if (!err) {
      res.render("home", {
        posts: posts
      });
    }

  });


});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.get("/compose", function (req, res) {
  res.render("compose");
});


app.post("/compose", function (req, res) {
  const blog = new Blog({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  blog.save(function (err) {
    if (!err)
      res.redirect("/");
  });


});



app.get("/posts/:post_id", function (req, res) {
  post_id = req.params.post_id;
  Blog.findById(post_id, function (err, post) {
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });


});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
