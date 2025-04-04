var express = require("express");
var router = express.Router();
var Slides = require("./models/slidesModel");
var upload = require("./multer");

router.post(
  "/submit_slide",
  upload.single("slideicon"),
  async function (req, res, next) {
    var file = req.file.filename;
    req.body["slideicon"] = file;
    var slides = new Slides(req.body);
    await slides.save().then((saveDoc) => {
      if (slides === saveDoc) {
        res
          .status(200)
          .json({ status: true, message: "Slide Submitted Successfully" });
      } else {
        res.status(500).json({ status: true, message: "Fail To Submit Slide" });
      }
    });
  }
);

router.get("/display_all", async function (req, res, next) {
  var data = await Slides.find({});

  if (data) {
    res
      .status(200)
      .json({ result: data, status: true, message: "Slide find Successfully" });
  } else {
    res.status(500).json({ status: true, message: "Fail To find Slide" });
  }
});

router.post("/delete_slide", async function (req, res, next) {
  await Slides.deleteOne({ _id: req.body.id })
    .then(() => {
      res
        .status(200)
        .json({ status: true, message: "Slide Deleted Successfully" });
    })
    .catch((e) => {
      res.status(500).json({ status: false, message: "Fail To Deleted Slide" });
    });
});

module.exports = router;
