const mongoose = require("mongoose");
const db = require("../models");
// This file empties the Books collection and inserts the books below
// mongoose.connect(
//     process.env.MONGODB_URI ||
//     "mongodb://localhost/3001"
// );
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/todo_db");
const petSeed = [
    {
        moodStatus: 8,
        energyLevel: 10,
        lastStatusChange: new Date(Date.now())
    }
];
const toDoSeed = [
    {
        listItem: "Bathe the dogs",
        completionStatus: true,
        lastUpdated: new Date(Date.now())
    }
];
const userSeed = [
    {
<<<<<<< HEAD
        email: "a",
        password: "aaaaaaaa",
=======
        email: "marena.ferrel@gmail.com",
        password: "marena1234",
>>>>>>> 111dd23b1cec58fd3ce43ee928115b0059d18310
        login: new Date(Date.now())
    }
];
db.User
    //literally removes everything
    .remove({})
    //inserts the seed
    .then(() => db.User.insertMany(userSeed))
<<<<<<< HEAD
    // .then(() => db.User.findOneAndUpdate( { email: "a" }, {$push: { userToDos: }}, { new: true} ))
    // .then(() => db.User.findOneAndUpdate( { email: "a" }, {$push: { userPets: petSeed} }, { new: true} ))
=======
    // .then(() => db.User.findOneAndUpdate( { email: "marena.ferrel@gmail.com" }, {$push: { userToDos: }}, { new: true} ))
    // .then(() => db.User.findOneAndUpdate( { email: "marena.ferrel@gmail.com" }, {$push: { userPets: petSeed} }, { new: true} ))
>>>>>>> 111dd23b1cec58fd3ce43ee928115b0059d18310
    //tell me how many you inserted and then exit
    .then(data => {
        db.Pet
            //literally removes everything
            .remove({})
            //inserts the seed
            .then(() => db.Pet.collection.insertMany(petSeed))
            //tell me how many you inserted and then exit
            .then(data => {
                console.log(data.result.n + " records inserted!");
                console.log(data.ops[0]._id);
<<<<<<< HEAD
                console.log(data.ops[0]);
                db.User.findOneAndUpdate( { email: "a" }, { userPets: data.ops[0]} , { new: true} )
=======
                db.User.findOneAndUpdate( { email: "marena.ferrel@gmail.com" }, { userPets: data.ops[0]} , { new: true} )
>>>>>>> 111dd23b1cec58fd3ce43ee928115b0059d18310
                .then((result) => {
                    process.exit(0);
                })
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
                console.log(data.ops[0]._id);
<<<<<<< HEAD
                db.User.findOneAndUpdate( { email: "a" }, { userToDos: data.ops[0]} , { new: true} )
=======
                db.User.findOneAndUpdate( { email: "marena.ferrel@gmail.com" }, { userToDos: data.ops[0]} , { new: true} )
>>>>>>> 111dd23b1cec58fd3ce43ee928115b0059d18310
                .then((result) => {
                    process.exit(0);
                })
            })
            .catch(err => {
                console.error(err);
                process.exit(1);
            });
        // console.log(data.result.n + " records inserted!");
        // process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });