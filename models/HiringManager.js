const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require('validator');


const hiringManagerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
        lowercase: true,
        minLength: [3, 'Name must be at least 3 characters.'],
        maxLength: [100, 'Name is too large'],
    },

    userId: {
        type: ObjectId,
        required: true,
        ref: "User"
    },

    imageURL: {
        type: String,
        validate: [validator.isURL, 'Please provide a valid url']
    },

    nationalIdImageURL: {
        type: String,
        required: true,
        validate: [validator.isURL, 'Please provide a valid url']
    },

    presentAddress: {
        type: String,
        required: [true, 'Please provide your present address']
    },

    permanentAddress: {
        type: String,
        required: [true, 'Please provide your present address']
    },

    location: {
        type: String,
        trim: true,
        required: [true, "Please provide a store name"],
        lowercase: true,
        enum: {
            values: [
                "dhaka",
                "chattogram",
                "rajshahi",
                "sylhet",
                "feni",
                "rangpur",
                "khulna"
            ],
            message: "{VALUE} is not a valid name"
        }
    },

    status: {
        type: String,
        default: "active",
        enum: ["active", "block"],
    },

    role: {
        type: String,
        default: "hiring-manager",
        enum: ['candidate', 'hiring-manager'],
    }

}, {
    timestamps: true
})

const HiringManager = mongoose.model("HiringManager", hiringManagerSchema);


module.exports = HiringManager;