const path = require("path");
const multer = require("multer");
const fs = require("fs");

const folderName = "uploads";
const filePath = path.resolve(__dirname, "../", folderName);
if (!fs.existsSync(filePath)) fs.mkdirSync(filePath);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.resolve(filePath);
    cb(null, destinationPath);
  },

  filename: function (req, file, cb) {
    const finalName = Date.now() + path.extname(file.originalname);
    cb(null, finalName);
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
