const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require('validator');

const applicationSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "your name is required"],
    },

    date: {
        type: String,
        required: [true, "date is required"]
    },

    address: {
        type: String,
        required: [true, "your address is required"],
    },

    candidateId: [{
        type: ObjectId,
        required: true,
        ref: "Candidate"
    }],

    jobId: [{
        type: ObjectId,
        required: true,
        ref: "Candidate"
    }],

    hiringManagerId: [{
        type: ObjectId,
        required: true,
        ref: "HiringManager"
    }],
    
    resume: {
        type: String,
        required: [true, "your resume is required"],
        validate: [validator.isURL, "Please provide valid urls"]
    }

}, {
    timestamps: true
});

const Application = mongoose.model("Application", applicationSchema);


module.exports = Application;