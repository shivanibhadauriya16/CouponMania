const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

var mystorage = multer.diskStorage({
  destination: (req, file, path) => {
    path(null, "public/images");
  },

  filename: (req, file, path) => {
    var ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    var filename = uuidv4() + ext;
    path(null, filename);
  },
});

const upload = multer({ storage: mystorage });
module.exports = upload;
