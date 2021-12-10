const additionalHourModel = require('../models/additionalHour.model');
const {validate} = require("../utils/validators");
const objectID = require('mongoose').Types.ObjectId;

module.exports.create = async (req, res) => {
    const {patterns, startAt, endAt, employee} = req.body;

    try{
        const response = await additionalHourModel.create({patterns, startAt, endAt, employee });
        return res.status(201).send(response);
    }catch (error){
        const errors = validate(error);
        return res.status(422).send(errors);
    }
}

module.exports.list = async (req, res) => {
    await additionalHourModel.find((error, docs) => {
        if (error) return res.status(400).send(error)
        return res.status(200).send(docs);
    })
}

module.exports.read = async (req, res) => {
    if (false === objectID.isValid(req.params.id))
        return res.status(400).send('UNKNOWN ID ' + req.params.id);
    await additionalHourModel.findById(
        {_id: req.params.id},
        (error, doc) => {
            if (error) return res.status(400).send(error)
            return res.status(200).send(doc);
        }
    )
}

module.exports.update = async (req, res) => {
    if (false === objectID.isValid(req.params.id))
        return res.status(400).send('UNKNOWN ID ' + req.params.id);
    const addHData = req.body;
    try{
        await additionalHourModel.findByIdAndUpdate(
            {_id: req.params.id},
            { $set: { ...addHData } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            ((error, doc) =>{
                if (error) return res.status(400).send(error)
                return res.status(200).send(doc);
            })
        )
    }catch (e) {
        const errors = validate(e);
        return res.status(422).send(errors);
    }
}

module.exports.delete = async (req, res) => {
    if (false === objectID.isValid(req.params.id))
        return res.status(400).send('UNKNOWN ID ' + req.params.id);
    try {
        await additionalHourModel.findByIdAndDelete({_id: req.params.id}).exec();
        return res.status(204).send({message: 'Successful deleted.'});
    } catch (e){
        return res.status(400).send(e);
    }
}