const express = require("express");
const app = express();


app.get("/", function (request, response) {
    response.send("Hello")
})
app.get("/about", function (request, response) {
    response.send("About page")
})
app.get("/contact", function (request, response) {
    response.send("<h1>contact page</h1>")
})

app.listen(3000, function () {
    console.log("Server started at port 3000");
});