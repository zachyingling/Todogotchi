const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PetSchema = new Schema({
    userId: {
        type: Number,
        required: true,
        foreignKey: ""
    },
    creatureId: {
        type: String,
        required: true,
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
        timestamps: true, 
        required: true
    }
});
const Pet = mongoose.model("Pet", PetSchema);
//USE THIS??
// Pet.belongsTo(User, {foreignKey: 'userId'});

module.exports = Pet;

