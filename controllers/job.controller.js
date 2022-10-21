const { createJobServices, getAllJobsService, getJobByIdService, updateJobByIdService, applyJobService, createJobService } = require("../services/job.service");
const { findUserByEmail } = require("../services/user.service");



exports.createJob = async (req, res, next) => {
    try {
        const job = await createJobService(req.body);

        if (!job) {
            return res.status(500).json({
                status: "fail",
                message: "Couldn't create job",
                error: error.message,
            });
        }

        res.status(201).json({
            status: "success",
            message: "successfully created job",
            data: job,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Couldn't create job",
            error: error.message,
        });
    }
};


exports.getAllJobs = async (req, res) => {
    try {
        let filters = { ...req.query };
        const excludeFields = ["sort", "page", "limit"];
        excludeFields.forEach((field) => delete filters[field]);

        let filtersString = JSON.stringify(filters);
        filtersString = filtersString.replace(
            /\b(gt|gte|lt|lte)\b/g,
            (match) => `$${match}`
        );

        filters = JSON.parse(filtersString);

        const queries = {};

        if (req.query.sort) {
            // price,qunatity   -> 'price quantity'
            const sortBy = req.query.sort.split(",").join(" ");
            queries.sortBy = sortBy;
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            queries.fields = fields;
        }

        const jobs = await getAllJobsService(filters, queries);

        if (!jobs) {
            return res.status(500).json({
                status: "fail",
                message: "Couldn't get jobs",
                error: error.message,
            });
        }

        res.status(200).json({
            status: "success",
            message: "get all jobs",
            jobs,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Couldn't get jobs",
            error: error.message,
        });
    }
};


exports.getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await getJobByIdService(id);

        if (!job) {
            return res.status(400).json({
                status: "fail",
                message: "Couldn't get job with this id",
            });
        }

        res.status(200).json({
            status: "success",
            job,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get job with this id",
            error: error.message,
        });
    }
};


exports.updateJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const job = await updateJobByIdService(id, data);

        if (!job) {
            return res.status(400).json({
                status: "fail",
                message: "Couldn't get job with this id",
                error: error.message,
            });
        }

        res.status(201).json({
            status: "ok",
            message: "successfully updated job",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get job with this id",
            error: error.message,
        });
    }
};


exports.applyJob = async (req, res) => {
    try {
        const { email } = req.user || {};
        const { id } = req.params;
        const resume = req.resumeName;

        const user = await findUserByEmail(email);

        const application = await applyJobService(user, req.body, resume, id);

        if (!application) {
            return res.status(500).json({
                status: "fail",
                message: "Couldn't get job with this id",
            });
        }

        if (application === "Already Applied") {
            return res.status(400).json({
                status: "fail",
                message: "Already Applied",
            });
        }

        if (application === "deadline over") {
            if (expired) {
                return res.status(401).json({
                    status: "fail",
                    error: "deadline over",
                });
            }
        }

        res.status(200).json({
            status: "success",
            application,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Couldn't get job with this id",
            error: error.message,
        });
    }
};