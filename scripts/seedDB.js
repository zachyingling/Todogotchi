const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/todo_db"
);

const userSeed = [
    {
        // userId: 1,
        email: "marena.ferrel@gmail.com",
        //figure out how to encrypt this with zach
        password: "marena1234",
        login: new Date(Date.now())
    }
];
const petSeed = [
    {
        _userId: 1,
        creatureId: "Phoebe1",
        moodStatus: 8,
        energyLevel: 10,
        lastStatusChange: new Date(Date.now())
    }
];

const toDoSeed = [
    {
        userId: 1,
        listItem: "Bathe the dogs",
        completionStatus: true,
        lastUpdated: new Date(Date.now())
    }
];

db.User
    //literally removes everything
    .remove({})
    //inserts the seed
    .then(() => db.User.collection.insertMany(userSeed))
    //tell me how many you inserted and then exit
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

db.Pet
    //literally removes everything
    .remove({})
    //inserts the seed
    .then(() => db.Pet.collection.insertMany(petSeed))
    //tell me how many you inserted and then exit
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

db.ToDoList
    //literally removes everything
    .remove({})
    //inserts the seed
    .then(() => db.ToDoList.collection.insertMany(toDoSeed))
    //tell me how many you inserted and then exit
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });