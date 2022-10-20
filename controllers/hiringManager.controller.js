const { getAllHiringManagerService, getHiringManagerByIdService, createHiringManagerService } = require("../services/hiringManager.service");


exports.createHiringManager = async (req, res, next) => {
    try {
        const result = await createHiringManagerService(req.body);
        res.status(200).json({
            status: "success",
            message: "Successfully created the hiring manager",
            data: result
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            message: "Couldn't create the hiring manager",
            error: error.message
        })
    }
};

exports.getAllHiringManager = async (req, res, next) => {
    try {
        const hiringManagers = await getAllHiringManagerService(req.body);

        res.status(200).json({
            status: "success",
            message: "Successfully get all the hiring manager",
            data: hiringManagers
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the all hiring manager",
            error: error.message
        })
    }
};


exports.getHiringManagerById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const hiringManager = await getHiringManagerByIdService(id);

        if (!hiringManager) {
            return res.status(400).json({
                status: "fail",
                error: "couldn't find the hiring manager with this id"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfully get the hiring manager",
            data: hiringManager
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the hiring manage",
            error: error.message
        })
    }
};
