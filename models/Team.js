const mongoose = require("mongoose")

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    abbr: {
        type: String,
        required: true,
        max: 255,
        min: 2
    },
    logo: {
        type: String,
        max: 255,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('team', TeamSchema)