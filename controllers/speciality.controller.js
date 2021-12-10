const specialityModel = require('../models/speciality.model');
const { validate } = require('../utils/validators');
const objectID = require('mongoose').Types.ObjectId;

module.exports.list = (req, res) => {
    specialityModel.find((error, docs) => {
        if(error)
            return res.status(400).send(error)
        return res.status(200).send(docs)
    }).sort({createdAt: -1});
}

module.exports.create = async (req, res) => {
    const {name,departmentId, description} = req.body;
    try{
        const speciality = await specialityModel.create({ name, departmentId, description })

        return res.status(201).send(speciality);

    } catch(error){
        const errors = validate(error);
        return res.status(400).send(errors);
    }
}

module.exports.read = async (req, res) => {
    if(!objectID.isValid(req.params.id))
        return res.status(400).send('UNKNOWN ID : '+req.params.id);
    await specialityModel.findById({_id: req.params.id}, (error, doc) => {
        if(error)
            return res.status(400).send('Bad request : '+ error)
        return res.status(200).send(doc);
    });
}

module.exports.update = async (req, res) => {
    if(!objectID.isValid(req.params.id))
        return res.status(400).send('UNKNOWN ID : '+req.params.id);
    let name, slug, description
    if(req.body.name){
        name = req.body.name;
        description = req.body.description;
    }

    try{
        await specialityModel.findByIdAndUpdate(
            {_id: req.params.id},
            {new: true, upset: true, setDefaultsOnInsert: true},
            req.body.name ? {$set: name, description} : {$set: req.body},
            ((error, doc) => {
                if(error)
                    return res.status(400).send(error);
                return res.status(200).send(doc);
            })
        )

    }catch(error){
        const errors = specialityValidator(error);
        return res.status(400).send(errors);
    }
}

module.exports.delete = async (req, res) => {
    if(!objectID.isValid(req.params.id))
        return res.status(400).send('UNKNOWN ID : '+req.params.id);
    try{
        await specialityModel.deleteOne({_id: req.params.id});
        return res.status(204).send('Successful deleted.')
    }catch(error){
        return res.status(400).send('Bad request '+ error);
    }
}

