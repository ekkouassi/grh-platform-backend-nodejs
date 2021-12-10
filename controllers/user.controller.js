const userModel = require('../models/user.model');
const {propertyValidator, validate} = require("../utils/validators");
const objectID = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
const {onUploadFile, deleteFileIfExistsBeforeUpload} = require("../utils/upload");
const { JPEG, PNG, JPG } = require('../utils/constants');

const cryptPasswod = async (password) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
};

module.exports.updateEmail = (req, res) => {
    if (!objectID.isValid(req.params.id))
        return res.status(400).send("UNKNOWN ID : "+ req.params.id);

    if (!req.body.email) return res.status(422).send({ message: "L'adresse email est obligatoire." })
    userModel.findByIdAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        {new: true, upsert: true, setDefaultsOnInsert: true},
        ((err, doc) => {
            if (err)
                return res.status(400).send({message: "Erreur : "+ err})
            return res.status(201).send(doc)
        })
        )
}

module.exports.updatePassword = async (req, res) => {
    const { oldPassword, password, passwordConfirmation } = req.body;
    if (!objectID.isValid(req.params.id))
        return res.status(400).send("UNKNOWN ID : "+ req.params.id)

    if (propertyValidator(oldPassword) || propertyValidator(password) || propertyValidator(passwordConfirmation)){
        return res.status(422).send({message: "Tous les champs sont obligatoires !"})
    }

    if (password === passwordConfirmation){
        userModel.findById(req.params.id, (error, doc) => {
            if (error) return console.log("AN ERROR : ", error)
            bcrypt.compare(oldPassword, doc.password, async function (err, result) {
                if (result){
                    //console.log("COMPARE PASS ", result)
                    doc.password = await cryptPasswod(password);
                    console.log(doc.password);
                    doc.save((err, doc) => {
                        if (err) return res.status(500).send({message: "Erreur serveur, Mise à jour du mot de passe a échoué."})
                        return res.status(201).send(doc);
                    })
                } else {
                    return res.status(400).send({ message: "L'ancien mot de passe ne correspond pas à nos enregistrements." })
                }
            });
        });
    } else {
        return res.status(422).send({message: "Les deux mots de passe ne correspondent pas."});
    }
};

module.exports.updateProfile = async (req, res) => {
    if (!objectID.isValid(req.params.id))
        return res.status(400).send("UNKNOWN ID : "+ req.params.id);

    const user = await userModel.findById({ _id: req.params.id }).exec();
    if (!bcrypt.compareSync(req.body.password, user.password))
        return res.status(400).send({ message: 'The given password to ver' });

    try {
        userModel.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true, upsert: true, setDefaultsOnInsert: true},
            ((err, doc) => {
                if (err) return res.status(500).send({message: "Server error : "+ err})
                return res.status(200).send(doc);
            })
            )
    } catch (error) {
        const errors = validate(error);
        return res.status(422).send(errors);
    }
}

module.exports.updateAvatar = async (req, res) => {
    if (!objectID.isValid(req.params.id))
        return res.status(400).send("UNKNOWN ID : "+ req.params.id)

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({ message: "Aucun fichier n'a été téléchargé." });
    }

    const uploadFile = req.files.filename;

    if(uploadFile.size > 65536)
        // MAX SIZE IS : 0.5M
        return res.status(400).send({ message: "SIZE EXCEEDED: [MAX IS 0.5Mo]" });
  
    if(uploadFile.mimetype !== JPEG && uploadFile.mimetype !== JPG && uploadFile.mimetype !== PNG)
        return res.status(400).send({ message: `EXTENSION MUST BE: [JPEG, JPG, PNG]` })
    const result = await onUploadFile(uploadFile, 'avatars');
    await userModel.findById(req.params.id, (error, docs) => {
        if (error) return console.log("AN ERROR : ", error)
        if(docs.avatar){
            deleteFileIfExistsBeforeUpload('users/'+docs.avatar);
            docs.avatar = result.uploadedFileName;
            docs.save((error, docs) => {
                if(error)
                    console.log("SOME ERROR : ", error)
                return res.status(200).send(docs);
            });
        } else {
            userModel.findByIdAndUpdate(
                { _id: req.params.id },
                { $set: { avatar: result.uploadedFileName } },
                { new: true, upsert: true, setDefaultsOnInsert: true },
                (error, docs) => {
                    if(error)
                        console.log("SOME ERROR : ", error)
                    return res.status(200).send(docs);
                }
            )
        }
    });
}
