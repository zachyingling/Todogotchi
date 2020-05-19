const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var petSchema = new Schema({
    userId: {
        type: Number,
        required: true
    },
    creatureId: {
        type: Number,
        unique: true
    },
    moodStatus: {
        type: Number,
        min: [1, "Very Sad"],
        max: [12, "Very Happy"]
    },
    energyLevel: {
        type: Number,
        min: [1, "Very Sleepy"],
        max: [12, "Well Rested"]
    },
    lastStatusChange: {
        type: Date,
        timestamps: true
    }
});
var Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;

