const displacementModel = require('../models/displacement.model');
const {validate} = require("../utils/validators");
const objectID = require('mongoose').Types.ObjectId

module.exports.list = async (req, res) => {
    await displacementModel.find((error, docs) =>{
       if (error) return res.status(400).send(error);
       return res.status(200).send(docs);
    });
}

module.exports.create = async (req, res) => {
    const displacementData = req.body;

    try{
       const displacement = await displacementModel.create(displacementData);
       return res.status(201).send(displacement);
    } catch (error) {
        const errors = validate(error);
        return res.status(422).send(error);
    }
}

module.exports.read = async (req, res) => {
    if (false === objectID.isValid(req.params.id))
        return res.status(400).send('UNKNOWN ID : ' + req.params.id);

    await displacementModel.findById(
        {_id: req.params.id},
        (error, doc) => {
            if (error) return res.status(400).send(error)
            return res.status(200).send(doc);
        }
    )
}

module.exports.update = async (req, res) => {
    if (false === objectID.isValid(req.params.id))
        return res.status(400).send('UNKNOWN ID : ' + req.params.id);

    const updateData = req.body;

    await displacementModel.findByIdAndUpdate(
        {_id: req.params.id},
        {$set: updateData},
        { new: true, upsert: true, setDefaultsOnInsert: true },
        ((error, doc) => {
            if (error) return res.status(422).send(validate(error))
            return res.status(200).send(doc);
        })
    )
}

module.exports.delete = async (req, res) => {
    if (false === objectID.isValid(req.params.id))
        return res.status(400).send('UNKNOWN ID : ' + req.params.id);

    try{
        await displacementModel.findByIdAndDelete({_id: req.params.id}).exec();
        return res.status(204).send({ message: 'Deleted successfully.' })
    }catch (e) {
        return res.status(400).send(e);
    }
}