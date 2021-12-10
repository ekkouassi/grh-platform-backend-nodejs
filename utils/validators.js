/**
 * @author Ernest KOUASSI <ernestkouassi02@gmail.com>
 */
const duplicateKeyValidator = errors => {
    let errorData;
    console.log(errors);
    if (errors.code === 11000){
        errorData = errors.keyValue;
        errorData.message = `value of ${Object.keys(errors.keyValue)} you are trying to save already exists.`;
        errorData.errorType = 'Duplicate Key.'
    }

    return errorData;
}

const requiredEnumValidator = errors => {
    const simplifyErrors = [];
    const errorData = [];
    for(let key in errors.errors){
        if(key){
            simplifyErrors.push(errors.errors[key].properties)
        }
    }
    simplifyErrors.map(item => {
        if (item.type === 'enum'){
            //accepted values
            errorData.push(
                {
                    property: item.path,
                    errorType: item.type,
                    message: (item.message.replace("Path ", "")).replace("path","property"),
                    acceptedValues: item.enumValues
                }
            )
        } else {
            errorData.push(
                {
                    property: item.path,
                    errorType: item.type,
                    message: item.message.replace("Path ", "")
                }
            )
        }

    });

    return errorData;
}

module.exports.validate = (error) => {
    let errors;
    const errorArrayKeys = Object.keys(error);
    console.log(errorArrayKeys[3]);
    switch (errorArrayKeys[0]) {
        case 'errors':
            errors = requiredEnumValidator(error);
            break;
        case 'driver':
            errors = duplicateKeyValidator(error)
            break;
    }

    return errors;
}

module.exports.propertyValidator = (property) => {
    return !property;
}

