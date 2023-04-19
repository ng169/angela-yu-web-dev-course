const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const DB_URI = "mongodb://localhost:27017/wikiDB";

mongoose.connect(DB_URI);

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.route("/articles")
    .get(function (req, res) {
        Article.find({}, function (err, articles) {
            if (!err) {
                res.send(articles);
            } else {
                res.send(err);
            }
        });
    })
    .post(function (req, res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(function (err) {
            if (!err) {
                res.send("Successfully added new article");
            } else {
                res.send(err);
            }
        });
    })
    .delete(function (req, res) {
        Article.deleteMany(function (err) {
            if (!err) {
                res.send("Successfully deleted all articles");
            } else {
                res.send(err);
            }
        });
    });

app.route("/articles/:articleName")
    .get(function (req, res) {
        Article.findOne({ title: req.params.articleName }, function (err, foundArticle) {
            if (foundArticle) {
                res.send(foundArticle);
            } else {
                res.send("No article matching that title was found");
            }
        });
    })
    .put(function (req, res) {
        Article.replaceOne(
            { title: req.params.articleName },
            {
                title: req.body.title,
                content: req.body.content
            },
            function (err) {
                if (!err)
                    res.send("Successfully updated article");
                else
                    res.send(err);
            });
    })
    .patch(function (req, res) {
        Article.updateOne(
            { title: req.params.articleName },
            {
                $set: req.body
            },
            function (err) {
                if (!err)
                    res.send("Successfully updated article");
                else
                    res.send(err);
            });
    })
    .delete(function (req, res) {
        Article.deleteOne(
            { title: req.params.articleName },
            function (err) {
                if (!err)
                    res.send("Successfully deleted article");
                else
                    res.send(err);
            });
    });

const port = 3000;
app.listen(port, function () {
    console.log("Server running on port " + port);
});

