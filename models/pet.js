const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
    userId: {
        type: Number
    },
    creatureId: {
        type: Schema.Types.ObjectId,
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
const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;

