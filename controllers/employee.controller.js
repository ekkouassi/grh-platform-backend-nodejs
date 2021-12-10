const employeeModel = require('../models/employee.model');
const { validate } = require('../utils/validators');
const {HTTP_OK, HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_NOT_CONTENT, JPEG, JPG, PNG, PDF, WORD} = require("../utils/constants");
const {onUploadFile, deleteFileIfExistsBeforeUpload} = require("../utils/upload");
const objectID = require('mongoose').Types.ObjectId;

module.exports.list = async (req, res) => {
    await employeeModel.find((error, docs) => {
        if (error)
            return res.status(HTTP_BAD_REQUEST).send(error);
        return res.status(HTTP_OK).send(docs);
    });
}
module.exports.create = async (req, res) => {
    const employeeData = req.body;
    try{
        const employee = await employeeModel.create(employeeData);
        return res.status(HTTP_CREATED).send(employee);
    }catch(error){
        //console.log(error);
       const errors = validate(error);
       return res.status(422).send(errors);
    }
}

module.exports.read = async (req, res) => {
    if (false === objectID.isValid(req.params.id))
        return res.status(400).send('UNKNOWN ID '+ req.params.id)

    await employeeModel.findById({ _id: req.params.id }, (error, doc) => {
        if (error) return res.status(400).send(error)
        return res.status(HTTP_OK).send(doc);
    })
}

module.exports.update = async (req, res) => {
    const requestContent = req.body;
    if (false === objectID.isValid(req.params.id))
        return res.status(400).send('UNKNOWN ID '+ req.params.id)

    await employeeModel.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: requestContent },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        ((err, doc) => {
            if (err) return res.status(400).send(err)
            return res.status(HTTP_OK).send(doc);
        })
    )
}

module.exports.setDocument = async (req, res) => {
    if (false === objectID.isValid(req.params.id))
        return res.status(400).send("UNKNOWN ID "+ req.params.id);

    if (!req.files || Object.keys(req.files).length === 0)
        return res.status(422).send({ message: "No files have been downloaded." });

    const uploadFile = req.files.filename

    if (uploadFile.size > 65536)
        return res.status(400).send({ message: 'SIZE EXCEEDED: [MAX IS 0.5Mo]' })
    if(uploadFile.mimetype !== JPEG && uploadFile.mimetype !== JPG && uploadFile.mimetype !== PNG && uploadFile.mimetype !== PDF && uploadFile.mimetype !== WORD)
        return res.status(400).send({ message: `EXTENSION MUST BE: [JPEG, JPG, PNG, PDF, DOC]` })

    const result = await onUploadFile(uploadFile, req.body.fileType);
    await employeeModel.findById(
        { _id: req.params.id },
        ((err, doc) => {
            if (err) return console.log("AN ERROR : ", error)
            if (doc.documents.length > 0)
                doc.documents.map((file,index) => {
                    if (true === deleteFileIfExistsBeforeUpload(`employees/${ req.body.fileType }/${file}`)){
                        doc.documents.splice(index, 1);
                    }
                });
            doc.documents.push(result.uploadedFileName);

            employeeModel.findByIdAndUpdate(
                { _id: req.params.id },
                { $set: { documents: doc.documents } },
                { new: true, upsert: true, setDefaultsOnInsert: true },
                ((error, doc) => {
                    if (error) return res.status(400).send('SOME ERROR : ' + error)
                    return res.status(200).send(doc);
                })
            );
        })
    )

}

module.exports.delete = async (req, res) => {
    if (false === objectID.isValid(req.params.id))
        return res.status(400).send("UNKNOWN ID "+ req.params.id);
    try {
        await employeeModel.findByIdAndDelete({ _id: req.params.id }).exec();
        return res.status(HTTP_NOT_CONTENT).send({message: 'Successful deleted.'});
    } catch (e) {
        return res.status(400).send(e);
    }
}
