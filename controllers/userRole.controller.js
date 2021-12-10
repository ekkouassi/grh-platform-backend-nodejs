const userModel = require('../models/user.model');
const roleModel = require('../models/role.model');
const objectID = require('mongoose').Types.ObjectId;

const retrieveSelectedClearances = ( data = []) => {
    data.map((item, i) => {}
    );
    return data;
}

module.exports.addOrUpdateRrole = async (req, res) => {
    if (!objectID.isValid(req.params.userId))
        return res.status(400).send("ID UNKNOWN");
    const role = await roleModel.findById(req.body.roleId).exec();
    const userRole = {
        role: role.role,
        clearances: req.body.clearances
    };

    await userModel.findByIdAndUpdate(
            req.params.userId,
    { $set : { roles: userRole } },
    { new: true, upsert: true, setDefaultsOnInsert: true },
    (error, docs) => {
        if (error) return res.status(500).send({ message: "FAIL TO ADD ROLE" })
        return res.status(201).send(docs);
        }
    )
}

module.exports.removeClearance = async (req, res) => {
    if (!objectID.isValid(req.params.userId))
        return res.status(400).send("ID UNKNOWN");
    userModel.findByIdAndUpdate(
        req.params.userId,
        { $pull: { roles: req.body.clearances } },
        { new: true, upsert: true },
        (error, docs) => {

        }
    )
}

