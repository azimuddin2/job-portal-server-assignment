const Job = require("../models/Job");



exports.getAllJobsHiringManagerServices = async (email) => {
    return await Job.find({  email });
};

exports.getJobHiringManagerByIdServices = async (email, id) => {
    const job = await Job.findOne({ _id: id, "createdBy.email": email })
        .populate("appliedBy.userId")
        .populate("appliedBy.applicationId");

    return job;
};