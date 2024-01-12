const express = require('express');
const route = express.Router();

const { imageUpload, videoUpload, imageReducerUpload, localFileUpload } = require('../controllers/fileUpload');


//api route
route.post('/localFileUpload', localFileUpload);
route.post('/imageUpload', imageUpload);
route.post('/videoUpload', videoUpload);
route.post('/imageReducerUpload', imageReducerUpload);

module.exports = route;