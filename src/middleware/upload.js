const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
var path = require("path");
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/static/assets/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
});
module.exports = uploadFile;
