const HiringManager = require("../models/HiringManager");


exports.createHiringManagerService = async (data) => {
    const result = await HiringManager.create(data);
    return result;
}

exports.getAllHiringManagerService = async () => {
    const hiringManagers = await HiringManager.find({});
    return hiringManagers;
}

exports.getHiringManagerByIdService = async (id) => {
    const hiringManager = await HiringManager.findOne({ _id: id });
    return hiringManager;
}
