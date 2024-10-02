const multer = require("multer")
const path = require("path")
const { v4: uuidv4 } = require("uuid");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueFilename = uuidv4()
        cb(null, uniqueFilename + path.extname(file.originalname))
    }
})

module.exports = multer({ storage: storage });