const fs = require('fs');
const fPath = __dirname +'/../public/uploads/';

const mvFile = (file, filePath) => {
    file.mv(filePath, (error) => {
        if (error)return error;
        return true;
    });
}

module.exports.onUploadFile = async (yourFile, uploadType) => {
    let res;
    const data = yourFile.name.split('.');
    let customFileName;
    
    switch (uploadType) {
        case 'avatars':
            customFileName = new Date().getTime() + '.' + data[1];
            const avatarPath = fPath + 'users/' + customFileName;
            mvFile(yourFile, avatarPath);
            break;
        case 'pictures':
            customFileName = new Date().getTime() + '.' + data[1];
            const picPath = fPath + 'employees/pictures/' + customFileName;
            mvFile(yourFile, picPath);
            break;
        case 'cvs':
            customFileName = new Date().getTime() + '.' + data[1]
            const cvPath = fPath + 'employees/cvs/' + customFileName;
            mvFile(yourFile, cvPath);
            break;
        case 'contracts':
            customFileName = new Date().getTime() + '.' + data[1]
            const contractPath = fPath + 'employees/contracts/' + customFileName;
            mvFile(yourFile, contractPath);
            break;
        default:
            return "Sorry, you have to choose between the following list: 'avatars', 'CVs', 'contracts', 'pictures' "
    }

    return {
        uploadedFileName: customFileName,
        message: "UPLOAD SUCCESSFUL"
    }
}

module.exports.deleteFileIfExistsBeforeUpload = (filename) => {
    try {
        fs.unlinkSync(fPath + filename);
        console.info("LAST FILE WAS DELETED...");
        return true;
    } catch (error) {
        console.error("DELETE FILE ERROR : ", error);
        return false;
    }
}