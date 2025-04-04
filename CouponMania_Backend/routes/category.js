var express = require("express");
var router = express.Router();
var Categorys = require("./models/categoryModel");

router.post("/submit_category", async function (req, res, next) {
  var categorys = new Categorys(req.body);
  await categorys.save().then((saveDoc) => {
    if (categorys === saveDoc) {
      res
        .status(200)
        .json({ status: true, message: "Category Submitted Successfully" });
    } else {
      res
        .status(500)
        .json({ status: true, message: "Fail To Submit Category" });
    }
  });
});

router.get("/display_all_category", async function (req, res, next) {
  try {
    var data = await Categorys.find({});
    if (data) {
      res
        .status(200)
        .json({
          result: data,
          status: true,
          message: "Company find Successfully",
        }); // Return only the array
    } else {
      res.status(500).json({ status: false, message: "Fail to find Category" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
});

router.post("/edit_category", async function (req, res, next) {
  const { _id, ...data } = req.body;
  await Categorys.updateOne({ _id: _id }, data)
    .then(() => {
      res
        .status(200)
        .json({ status: true, message: "Category Edit Successfully" });
    })
    .catch((e) => {
      res.status(500).json({ status: false, message: "Fail To Edit Category" });
    });
});

router.post("/delete_category", async function (req, res, next) {
  await Categorys.deleteOne({ _id: req.body.id })
    .then(() => {
      res
        .status(200)
        .json({ status: true, message: "Category Deleted Successfully" });
    })
    .catch((e) => {
      res
        .status(500)
        .json({ status: false, message: "Fail To Deleted Category" });
    });
});

module.exports = router;
