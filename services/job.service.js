const Job = require("../models/Job");


exports.createJobService = async (data) => {
    const result = await Job.create(data);
    return result;
}

exports.getAllJobsService = async () => {
    const jobs = await Job.find({});
    return jobs;
}

exports.getJobByIdService = async (id) => {
    const job = await Job.findOne({ _id: id });
    return job;
}

exports.updateJobByIdService = async (id, data) => {
    const result = await Job.updateOne({ _id: id }, data, {
        runValidators: true
    });

    return result;
}