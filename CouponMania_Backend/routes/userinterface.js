var express = require("express");
var router = express.Router();
var Companys = require("./models/companyModel");
var Categorys = require("./models/categoryModel");
var Coupons = require("./models/couponModel");
var Subcategorys = require("./models/subCategoryModel");
var Banks = require("./models/bankModel");
var Wallets = require("./models/walletModel");
var upload = require("./multer");

router.post("/display_top_cashback_coupons", async function (req, res, next) {
  try {
    var data = await Coupons.aggregate([
      {
        $match: { coupontype: "cashback" },
      },
      {
        $sort: { _id: -1 },
      },
      {
        $limit: 10,
      },
      {
        $lookup: {
          from: "companies",
          localField: "companyid",
          foreignField: "_id",
          as: "company_details",
        },
      },
      {
        $unwind: "$company_details",
      },
      {
        $project: {
          _id: 1,
          couponname: 1,
          coupondescription: 1,
          couponsubheading: 1,
          couponcode: 1,
          coupontype: 1,
          companyid: 1,
          categoryid: 1,
          subcategoryid: 1,
          "company_details.companyname": 1,
          "company_details.companyicon": 1,
        },
      },
    ]);

    if (data.length > 0) {
      res
        .status(200)
        .json({
          result: data,
          status: true,
          message: "Top 10 Cashback Coupons Retrieved Successfully",
        });
    } else {
      res
        .status(404)
        .json({ status: false, message: "No Cashback Coupons Found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        status: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
});

module.exports = router;
