const roleModel = require('../models/role.model');
const {validate} = require('../utils/validators');
const ObjectID = require('mongoose').Types.ObjectId;


module.exports.showRoles = (req, res) => {
    roleModel.find((err, docs) => {
        if(err) {
            return res.status(400).send(error)
        }
        return res.status(200).send(docs);
    }).sort({ createdAt: -1 })
}

module.exports.showRole = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("UNKNOWN ID :" + req.params.id);

    await roleModel.findById(req.params.id, (error, docs) => {
        if (!error)
            return res.status(200).send(docs)
        return res.status(400).send("Errorn occured " + error);
    });
}

module.exports.createRole = async (req, res) => {
    const { role, clearance } = req.body;
  
    try {
        const newRole = await roleModel.create({ role, clearance });
        return res.status(201).send(newRole);
    } catch (error) {
        const errors = validate(error);
        res.status(422).send(errors);
    }
}

module.exports.updateRole = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("UNKNOWN ID : "+ req.params.id);
  try {
      await roleModel.findByIdAndUpdate({ _id: req.params.id },
          { $set: req.body },
          { new: true, upsert: true, setDefaultsOnInsert: true},
          ((err, doc) => {
              if(!err)
                  return res.status(200).send(doc)
              return res.status(400).json({ message: err })
          })
      )
  } catch (e) {
      return res.status(500).json({ e })
  }
}

module.exports.deleteRole = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("UNKNOWN ID : "+ req.params.id);
    try {
        await roleModel.remove({_id: req.params.id}).exec();
        return res.status(204).send({ message: "Successful deleted." })
    }catch (e) {
        return res.status(400).json({ message: e })
    }
}

