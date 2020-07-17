const router = require("express").Router();
const multer = require("multer");
const multerConfig = require("../config/multer");

router.post("/post",multer(multerConfig).single('file'),(req,res)=>{
    console.log(req.file);
    res.sendStatus(200);
})

module.exports = (app) => app.use('/api/imageupload', router);