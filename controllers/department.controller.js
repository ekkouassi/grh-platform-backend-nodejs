const departmentModel = require('../models/department.model');
const {validate} = require('../utils/validators');
const objectID = require('mongoose').Types.ObjectId

module.exports.list = (req, res) => {
    departmentModel.find((error, docs) => {
        if(error)
            return res.status(400).send(error)
        return res.status(200).send(docs)
    }).sort({ createdAt: -1 });
}

module.exports.create = async (req, res) => {
    const {name, description} = req.body;
    try{
        const department = await departmentModel.create({ name, description })
        
        return res.status(201).send(department);
    } catch(error){
        const errors = validate(error);
        return res.status(422).send({errors})
    }
}

module.exports.read = async (req, res) => {
    if(!objectID.isValid(req.params.id))
        return res.status(400).send('UNKNOWN ID : '+req.params.id);
    
    await departmentModel.findById(req.params.id, (error, doc) => {
        if(!error)
            return res.status(200).send(doc);
        return res.status(400).send('Errorn occured '+ error);
    })
    
}

module.exports.update = async (req, res) => {
    if(!objectID.isValid(req.params.id))
        return res.status(400).send('UNKNOWN ID : '+req.params.id);
    let name, description = null;
    if(req.body.name){
        name = req.body.name;
        description = req.body.description;
    }
    
    try{
        await departmentModel.findByIdAndUpdate({_id: req.params.id},
            req.body.name ? { $set: name, description } : {$set: req.body},
            { new: true, upsert: true, setDefaultsOnInsert: true },
            ((error, doc) => {
                if(!error)
                    return res.status(200).send(doc)
                return res.status(400).send({message: error});
            })
        )

    } catch(error){
        return res.status(500).send(error);
    }
}

module.exports.delete = async (req, res) => {
    if(!objectID.isValid(req.params.id))
        return res.status(400).send('UNKNOWN ID : '+req.params.id);
    
    try{
        await departmentModel.findByIdAndDelete({ _id: req.params.id }).exec();
        return res.status(204).send({ message: 'Successful deleted.' })
    } catch(error){
        return res.status(400).send(error);
    }
}