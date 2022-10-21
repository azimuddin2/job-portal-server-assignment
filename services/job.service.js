const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");


exports.createJobService = async (data) => {
    const job = await Job.create(data);
    return job;
};


exports.getAllJobsService = async (filters, queries) => {
    const jobs = await Job.find(filters).sort(queries.sortBy);
    return jobs;
};


exports.getJobByIdService = async (id) => {
    const job = await Job.findOne({_id: id}).populate('createdBy').populate('createdBy.userId') 
    return job;
};


exports.updateJobByIdService = async (id, data) => {
    const result = await Brand.updateOne({ _id: id }, data, {
        runValidators: true
    });

    return result;
};


exports.applyJobService = async (user, data, resume, jobId) => {
    const { _id } = user;

    const jobInfo = await Job.findById(jobId);

    console.log(new Date(jobInfo.deadline));
    console.log(new Date());

    const expired = new Date() > new Date(jobInfo.deadline);
    console.log(expired);
    if (expired) {
        return "deadline over";
    }

    const alreadyApplied = await Application.findOne({
        "jobInfo.id": jobId,
        candidateId: _id,
    });

    if (alreadyApplied) {
        return "Already Applied";
    }

    const apply = await Application.create({
        ...data,
        "jobInfo.id": jobId,
        candidateId: _id,
        resume: resume,
    });

    await User.findOneAndUpdate({ _id }, { $push: { appliedJobs: apply._id } });

    const job = await Job.findOneAndUpdate(
        { _id: jobId },
        {
            $push: { appliedBy: { id: _id, applicationId: apply._id } },
        }
    );
    return apply;
};