const leaveModel = require('../models/leave.model');
const {validate} = require("../utils/validators");
const objectID = require('mongoose').Types.ObjectId;

module.exports.list = async (req, res) => {
    await leaveModel.find((error, docs) => {
        if (error) return res.status(400).send(error);
        return res.status(200).send(docs);
    })
}

module.exports.create = async (req, res) => {
    const leaveData = req.body;
    try {
        const absence = await leaveModel.create(leaveData);
        return res.status(201).send(absence);
    }catch (error){
        const errors = validate(error);
        return res.status(422).send(errors);
    }
}

module.exports.read = async (req, res) => {
    if (false === objectID.isValid(req.params.id))
        return res.status(400).send("UNKNOWN ID " + req.params.id)
    await leaveModel.findById(
        {_id: req.params.id},
        (error, doc) => {
            if (error) return res.status(400).send(error);
            return res.status(200).send(doc);
        }
    )
}

module.exports.update = async (req, res) => {
    if (false === objectID.isValid(req.params.id))
        return res.status(400).send("UNKNOWN ID " + req.params.id)
    const leaveData = req.body;
    await leaveModel.findByIdAndUpdate(
        {_id: req.params.id},
        { $set: leaveData },
        {new: true, upsert: true, setDefaultsOnInsert: true},
        ((error, doc) => {
          if (error)
              return res.status(422).send(validate(error));
          return res.status(200).send(doc);
        })
    )
}

module.exports.delete = async (req, res) => {
    if (false === objectID.isValid(req.params.id))
        return res.status(400).send("UNKNOWN ID " + req.params.id)

    try {
        await leaveModel.findByIdAndDelete({_id: req.params.id}).exec();
        return res.status(204).send({message: 'Leave deleted successful.'})
    } catch (error){
        return  res.status(400).send(error);
    }
}