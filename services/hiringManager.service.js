const HiringManager = require("../models/HiringManager");


exports.createHiringManagerService = async (data) => {
    const result = await HiringManager.create(data);
    return result;
}

exports.getAllHiringManagerService = async () => {
    const hiringManagers = await HiringManager.find({}).populate('userId');
    return hiringManagers;
}

exports.getHiringManagerByIdService = async (id) => {
    const hiringManager = await HiringManager.findOne({ _id: id }).populate('userId');
    return hiringManager;
}
