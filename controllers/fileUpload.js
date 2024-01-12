const File = require('../models/FileModel');
const cloudinary = require('cloudinary').v2;


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

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function UploadFileToCloudinary(file, folder, quelity) {
    const options = { folder };
    options.resource_type = "auto";

    if (quelity) {
        options.quelity = quelity;
    }

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload ka handler
exports.imageUpload = async (req, res) => {
    try {
        //data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);
        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileTypes = file.name.split(".")[1].toLowerCase();

        if (!isFileTypeSupported(fileTypes, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }

        //file format supported hai
        const response = await UploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        //db me entry save krni h
        const fileDate = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            message: "Image Successfully Uploaded",
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}


//video upload ka handler

exports.videoUpload = async (req, res) => {
    try {
        //data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log(file);

        //validation
        const supportedTypes = ["mp4", "mov"];
        const fileTypes = file.name.split(".")[1].toLowerCase();

        //TODO: add a upper limit of 5MB for video
        if (!isFileTypeSupported(fileTypes, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }

        //file format supported hai
        const response = await UploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        //db me entry save krni h
        const fileDate = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            message: "Video Successfully Uploaded",
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}


//imageReducerUpload ka handler

exports.imageReducerUpload = async (req, res) => {
    try {
        //data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileTypes = file.name.split(".")[1].toLowerCase();

        //TODO: add a upper limit of 5MB for image
        if (!isFileTypeSupported(fileTypes, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }

        //file format supported hai
        //TODO:height attribute ka use krke reduce karna h image ko
        const response = await UploadFileToCloudinary(file, "Codehelp", 80);
        console.log(response);

        //db me entry save krni h
        const fileDate = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            message: "imageReducer Successfully Uploaded",
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}
