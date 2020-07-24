const router = require("express").Router();
const multer = require("multer");
const multerConfig = require("../config/multer");

const upload = multer(multerConfig).single('file')

router.post("/post",(req,res)=>{
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).json({filename: req.file.filename});

})});

module.exports = (app) => app.use('/api/imageupload', router);