const router = require("express").Router();
const multer = require("multer");
const multerConfig = require("../config/multer");

router.post("/post",multer().single('file'),(req,res)=>{
    console.log(req.file);
})

module.exports = (app) => app.use('/api/imageupload', router);