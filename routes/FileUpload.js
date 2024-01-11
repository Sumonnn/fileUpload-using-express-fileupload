const express = require('express');
const route = express.Router();

const { imageUpload, videoUpload, imageReducerUpload, localFileUpload } = require('../controllers/fileUpload');


//api route
route.post('/localFileUpload', localFileUpload);


module.exports = route;