var express = require("express");
var router = express.Router();
var Companys = require("./models/companyModel");
var Categorys = require("./models/categoryModel");
var SubCategorys = require("./models/subCategoryModel");

router.get("/display_all_category", async function (req, res, next) {
  var data = await Categorys.find({});

  if (data) {
    res.status(200).json({
      result: data,
      status: true,
      message: "Category find Successfully",
    });
  } else {
    res.status(500).json({ status: true, message: "Fail To find Category" });
  }
});

router.post("/submit_subcategory", async function (req, res, next) {
  var subcategorys = new SubCategorys(req.body);
  await subcategorys.save().then((saveDoc) => {
    if (subcategorys === saveDoc) {
      res
        .status(200)
        .json({ status: true, message: "Sub Category Submitted Successfully" });
    } else {
      res
        .status(500)
        .json({ status: true, message: "Fail To Submit Sub Category" });
    }
  });
});

router.get("/display_all_subcategory", function (req, res, next) {
  SubCategorys.aggregate([
    {
      $lookup: {
        from: "categorys",
        localField: "categoryid",
        foreignField: "_id",
        as: "categoryData",
      },
    },
    {
      $unwind: {
        path: "$categoryData",
        preserveNullAndEmptyArrays: true,
      },
    },
  ])
    .then((result) => {
      res.status(200).json({ status: true, data: result });
    })
    .catch((err) => {
      console.error("Error fetching Sub Category:", err);
      res.status(500).json({ status: false, error: err.message });
    });
});

router.post("/edit_subcategory", async function (req, res, next) {
  const { _id, ...data } = req.body;
  await SubCategorys.updateOne({ _id: _id }, data)
    .then(() => {
      res
        .status(200)
        .json({ status: true, message: "Sub Category Edit Successfully" });
    })
    .catch((e) => {
      res
        .status(500)
        .json({ status: false, message: "Fail To Edit Sub Category" });
    });
});

router.post("/delete_subcategory", async function (req, res, next) {
  await SubCategorys.deleteOne({ _id: req.body.id })
    .then(() => {
      res
        .status(200)
        .json({ status: true, message: "Sub Category Deleted Successfully" });
    })
    .catch((e) => {
      res
        .status(500)
        .json({ status: false, message: "Fail To Deleted Sub Category" });
    });
});

module.exports = router;
