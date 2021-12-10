const trainingModel = require('../models/training.model');
const {validate} = require("../utils/validators");
const objectID = require('mongoose').Types.ObjectId;

module.exports.list = async (req, res) => {
    await trainingModel.find((error, docs) =>  {
        if (error) return res.status(400).send(error)
        return res.status(200).send(docs);
    }).sort({ createdAt: -1 });
}

module.exports.create = async (req, res) => {
    const { type, startAt, endAt } = req.body;

    try {
        const training = await trainingModel.create({ type, startAt, endAt });
        return res.status(201).send(training);
    } catch (e) {
        const errors = validate(e);
        if (!errors) return res.status(400).send("SOME ERROR "+e);
        return res.status(422).send(errors);
    }
}

module.exports.read = async (req, res) => {
    if (false === objectID.isValid(req.params.id))
        return res.status(400).send("UNKNOWN ID " + req.params.id);
    await trainingModel.findById(
        {_id: req.params.id},
        (error, doc) => {
            if (error) return res.status(400).send(error)
            return res.status(200).send(doc);
        }
    )
}

module.exports.update = async (req, res) => {
    if (false === objectID.isValid(req.params.id))
        return res.status(400).send("UNKNOWN ID " + req.params.id);
    const editData = req.body;
   await trainingModel.findByIdAndUpdate(
       {_id: req.params.id},
       { $set: { editData } },
       { new: true, upsert: true, setDefaultsOnInsert: true },
       ((error, doc) => {
           if (error) return res.status(400).send(validate(error))
           return res.status(200).send(doc);
       })
   )
}

module.exports.delete = async (req, res) => {
    if (false === objectID.isValid(req.params.id))
        return res.status(400).send("UNKNOWN ID " + req.params.id);
    try {
        await trainingModel.deleteOne({_id: req.params.id});
        return res.status(204).send({message: 'Successful deleted.'})
    }catch (e){
        return res.status(400).send(e);
    }
}