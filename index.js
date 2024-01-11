//app create
const express = require('express');
const app = express();

//port find out karna h 
require('dotenv').config();
const PORT = process.env.PORT || 4000;

//middlewares add krna h
app.use(express.json());
const fileupload = require('express-fileupload');
app.use(fileupload());

//db Se connect krna h
const db = require('./config/database');
db.connect();

//cloud se connect krna h
const cloudinary = require('./config/clodinary');
cloudinary.cloudinaryConnect();

//api route mount krna h
const Upload = require('./routes/FileUpload');
app.use('/api/v1/upload', Upload);

//activate server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})