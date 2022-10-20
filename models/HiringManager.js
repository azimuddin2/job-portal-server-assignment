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

    email: {
        type: String,
        validate: [validator.isEmail, 'Provide a valid Email'],
        trim: true,
        lowercase: true,
        unique: true
    },

    contactNumber: [{
        type: String,
        required: [true, 'Please provide a contact number'],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value);
            },
            message: 'Please Provide a valid phone number',
        }
    }],

    imageURL: {
        type: String,
        validate: [validator.isURL, 'Please provide a valid url']
    },

    nationalIdImageURL: {
        type: String,
        required: true,
        validate: [validator.isURL, 'Please provide a valid url']
    },

    userId: {
        type: ObjectId,
        required: true,
        ref: "User"
    },

    status: {
        type: String,
        default: "active",
        enum: ["active", "block"]
    },

    role: {
        type: String,
        enum: ['candidate', 'hiring-manager'],
        default: "hiringManager"
    }

}, {
    timestamps: true
})

const HiringManager = mongoose.model("HiringManager", hiringManagerSchema);


module.exports = HiringManager;