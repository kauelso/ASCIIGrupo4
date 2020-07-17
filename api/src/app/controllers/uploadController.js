const router = require("express").Router();
const multer = require("multer");
const multerConfig = require("../config/multer");

router.post("/post",multer(multerConfig).single('file'),(req,res)=>{
    if(!req.file){
        return res.status(401).json({error:"Nao foi possivel criar arquivo"});
    }

    return res.status(200).json({filename: req.file.filename});
})

module.exports = (app) => app.use('/api/imageupload', router);