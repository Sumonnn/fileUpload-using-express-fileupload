const File = require('../models/FileModel');

//localfileUpload -> handler function

exports.localFileUpload = async (req, res) => {
    try {
        //fetch file 
        const file = req.files.file;
        console.log("file agaya jii " + file);

        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("path -> ", path);

        //add path to the move fuction
        file.mv(path, (err) => {
            console.log(err);
        })

        //create a succesful response
        res.json({
            success: true,
            message: "Local File Uploaded Successfully",
        });

    } catch (error) {
        console.log(error);
    }
}