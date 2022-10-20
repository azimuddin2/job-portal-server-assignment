const { createJobService, getAllJobsService, getJobByIdService, updateJobByIdService } = require("../services/job.service");


exports.createJob = async (req, res, next) => {
    try {
        const result = await createJobService(req.body);
        res.status(200).json({
            status: "success",
            message: "Successfully created the job",
            data: result
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            message: "Couldn't create the job",
            error: error.message
        })
    }
};


exports.getAllJobs = async (req, res, next) => {
    try {
        const jobs = await getAllJobsService(req.body);

        res.status(200).json({
            status: "success",
            message: "Successfully get all the jobs",
            data: jobs
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the all jobs",
            error: error.message
        })
    }
};


exports.getJobById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const job = await getJobByIdService(id);

        if (!job) {
            return res.status(400).json({
                status: "fail",
                error: "couldn't find the job with this id"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfully get the job",
            data: job
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the job",
            error: error.message
        })
    }
};


exports.updateJobById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateJobByIdService(id, req.body);

        if (!result.modifiedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't update the job with this id"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfully update the job ",
            data: result

        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't update the job",
            error: error.message
        })
    }
};