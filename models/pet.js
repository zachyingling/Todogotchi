const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PetSchema = new Schema({
    userId: {
        type: int
    },
    creatureId: {
        type: String
    },
    moodStatus: {
        type: int
    },
    energyLevel: {
        type: int
    },
    lastStatusChange: {
        type: timestamp
    }
});
const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;