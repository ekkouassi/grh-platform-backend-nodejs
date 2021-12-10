const bonusModel = require('../models/bonus.model');
const {validate} = require("../utils/validators");
const objectID = require('mongoose').Types.ObjectId;

module.exports.list = async (req, res) => {
    await bonusModel.find((error, docs) =>{
        if (error) return res.status.send(error);
        return res.status(200).send(docs);
    });
}

module.exports.create = async (req, res) => {
    const { amount, patterns, employee } = req.body;

    try {
        const bonus = await bonusModel.create({ amount, patterns, employee });
        return res.status(201).send(bonus);
    } catch (e) {
        const errors = validate(e);
        return res.status('422').send(errors);
    }
}

module.exports.read = async (req, res) => {
    if (false === objectID.isValid(req.params.id))
        return res.status(400).send("UNKNOWN ID " + req.params.id);
    await bonusModel.findById(
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
    const bonusData = req.body;
    await bonusModel.findByIdAndUpdate(
        {_id: req.params.id},
        { $set: { ...bonusData } },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        ((error, doc) => {
            if (error) return res.status(400).send(error);
            return res.status(200).send(doc);
        })
    )
}

module.exports.delete = async (req, res) => {
    if (false === objectID.isValid(req.params.id))
        return res.status(400).send("UNKNOWN ID " + req.params.id);
    try {
        await bonusModel.findByIdAndDelete({ _id: req.params.id }).exec();
        return res.status(204).send('Successful deleted.');
    } catch (e) {
        return res.status(400).send(e);
    }
}