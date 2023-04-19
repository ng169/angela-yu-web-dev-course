const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitsDB",);


const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name for the fruit."]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

// const fruit = new Fruit({
//     rating: 10,
//     review: "Pretty solid"
// });

// fruit.save();

// const kiwi = new Fruit({
//     name: "Kiwi",
//     rating: 10,
//     review: "Awesome"
// });

// const orange = new Fruit({
//     name: "Orange",
//     rating: 6,
//     review: "Too sour"
// });

// const banana = new Fruit({
//     name: "Banana",
//     rating: 10,
//     review: "Awesome and healthy"
// });


// Fruit.insertMany([kiwi, orange, banana], function (err) {
//     if (err)
//         console.log(err);
//     else
//         console.log("Successfully added");
// });

Fruit.find(function (err, fruits) {
    if (err)
        console.log(err);
    else {
        mongoose.connection.close();
        fruits.forEach(function (fruit) {
            console.log(fruit.name);
        });
    }
});

const mango = new Fruit({
    name: "Mango",
    rating: 9,
    review: "Decent"
});
mango.save();

const peopleSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", peopleSchema);

// const person = new Person({
//     name: "Amy",
//     age: 12,
//     favouriteFruit: pineapple
// });

// person.save();

Person.updateOne({ name: "John" }, { favouriteFruit: mango }, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Success");
    }
});