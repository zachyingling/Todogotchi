const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PetSchema = new Schema({
    userId: {
        type: Number
    },
    creatureId: {
        type: String
    },
    moodStatus: {
        type: Number
    },
    energyLevel: {
        type: Number
    },
    lastStatusChange: {
        type: Date
    }
});
var Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;