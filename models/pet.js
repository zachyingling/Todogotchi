const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PetSchema = new Schema({
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
const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;