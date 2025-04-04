var express = require("express");
var router = express.Router();
var Companys = require("./models/companyModel");
var Categorys = require("./models/categoryModel");
var Coupon = require("./models/couponModel");
var Subcategorys = require("./models/subCategoryModel");
var Banks = require("./models/bankModel");
var Wallets = require("./models/walletModel");
var upload = require("./multer");

router.get("/display_all_company", async function (req, res, next) {
  var data = await Companys.find({});

  if (data) {
    res.status(200).json({
      result: data,
      status: true,
      message: "Company find Successfully",
    });
  } else {
    res.status(500).json({ status: true, message: "Fail To find Company" });
  }
});

router.post("/fetch_bankoffer", async function (req, res, next) {
  try {
    console.log(req.body);

    const { bankid } = req.body;

    if (!bankid) {
      return res
        .status(400)
        .json({ status: false, message: "Bank ID is required" });
    }

    const data = await Coupon.find({ companyid: bankid });

    if (data.length > 0) {
      res.status(200).json({
        data: data,
        status: true,
        message: "Bank offers fetched successfully",
      });
    } else {
      console.log("error");
      res.status(404).json({
        status: false,
        message: "No offers found for the given Bank ID",
      });
    }
  } catch (error) {
    console.error("Error fetching bank offers:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
});

router.post("/fetch_bankdetails", async function (req, res, next) {
  try {
    console.log(req.body);

    const { bankid } = req.body;

    if (!bankid) {
      return res
        .status(400)
        .json({ status: false, message: "Bank ID is required" });
    }

    const data = await Banks.find({ _id: bankid });

    if (data.length > 0) {
      console.log(data);
      res.status(200).json({
        data: data,
        status: true,
        message: "Bank Details fetched successfully",
      });
    } else {
      console.log("error");
      res.status(404).json({
        status: false,
        message: "No Details found for the given Bank ID",
      });
    }
  } catch (error) {
    console.error("Error fetching bank Details:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
});

router.post("/fetch_walletoffer", async function (req, res, next) {
  try {
    console.log(req.body);

    const { walletid } = req.body;

    if (!walletid) {
      return res
        .status(400)
        .json({ status: false, message: "Wallet ID is required" });
    }

    const data = await Coupon.find({ companyid: walletid });

    if (data.length > 0) {
      console.log(data);
      res.status(200).json({
        data: data,
        status: true,
        message: "Wallet offers fetched successfully",
      });
    } else {
      res.status(404).json({
        status: false,
        message: "No offers found for the given Wallet ID",
      });
    }
  } catch (error) {
    console.error("Error fetching Wallet offers:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
});

router.post("/fetch_walletdetails", async function (req, res, next) {
  try {
    console.log(req.body);

    const { walletid } = req.body;

    if (!walletid) {
      return res
        .status(400)
        .json({ status: false, message: "Wallet ID is required" });
    }

    const data = await Wallets.find({ _id: walletid });

    if (data.length > 0) {
      res.status(200).json({
        data: data,
        status: true,
        message: "Wallet Details fetched successfully",
      });
    } else {
      console.log("error");
      res.status(404).json({
        status: false,
        message: "No Details found for the given Wallet ID",
      });
    }
  } catch (error) {
    console.error("Error fetching Wallet Details:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
});

router.post("/fetch_cashbackoffer", async function (req, res, next) {
  try {
    console.log(req.body);

    const { cashbackid } = req.body;

    if (!cashbackid) {
      return res
        .status(400)
        .json({ status: false, message: "Wallet ID is required" });
    }

    const data = await Coupon.find({ companyid: cashbackid });

    if (data.length > 0) {
      console.log(data);
      res.status(200).json({
        data: data,
        status: true,
        message: "High Casback offers fetched successfully",
      });
    } else {
      console.log("error");
      res.status(404).json({
        status: false,
        message: "No offers found for the given High Casback ID",
      });
    }
  } catch (error) {
    console.error("Error fetching High Casback offers:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
});

router.post("/fetch_cashbackdetails", async function (req, res, next) {
  try {
    console.log(req.body);

    const { cashbackid } = req.body;

    if (!cashbackid) {
      return res
        .status(400)
        .json({ status: false, message: "High Cashback ID is required" });
    }

    const data = await Companys.find({ _id: cashbackid });

    if (data.length > 0) {
      console.log(data);
      res.status(200).json({
        data: data,
        status: true,
        message: "High Cashback Details fetched successfully",
      });
    } else {
      console.log("error");
      res.status(404).json({
        status: false,
        message: "No Details found for the given High Cashback ID",
      });
    }
  } catch (error) {
    console.error("Error fetching High Cashback Details:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
});

router.post("/fetch_topstoreoffer", async function (req, res, next) {
  try {
    console.log(req.body);

    const { storeid } = req.body;

    if (!storeid) {
      return res
        .status(400)
        .json({ status: false, message: "Store ID is required" });
    }

    const data = await Coupon.find({ companyid: storeid });

    if (data.length > 0) {
      console.log(data);
      res.status(200).json({
        data: data,
        status: true,
        message: "Store offers fetched successfully",
      });
    } else {
      console.log("error");
      res.status(404).json({
        status: false,
        message: "No offers found for the given Store ID",
      });
    }
  } catch (error) {
    console.error("Error fetching Store offers:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
});

router.post("/fetch_topstoredetails", async function (req, res, next) {
  try {
    console.log(req.body);

    const { storeid } = req.body;

    if (!storeid) {
      return res
        .status(400)
        .json({ status: false, message: "Store ID is required" });
    }

    const data = await Companys.find({ _id: storeid });

    if (data.length > 0) {
      console.log(data);
      res.status(200).json({
        data: data,
        status: true,
        message: "Store Details fetched successfully",
      });
    } else {
      console.log("error");
      res.status(404).json({
        status: false,
        message: "No Details found for the given Store ID",
      });
    }
  } catch (error) {
    console.error("Error fetching High Cashback Details:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
});

router.get("/display_all_category", async function (req, res, next) {
  var data = await Categorys.find({});

  if (data) {
    res.status(200).json({
      result: data,
      status: true,
      message: "category find Successfully",
    });
  } else {
    res.status(500).json({ status: true, message: "Fail To find category" });
  }
});

router.post("/display_all_subcategory", async function (req, res, next) {
  const { id_category } = req.body;
  var data = await Subcategorys.find({ categoryid: id_category });

  if (data) {
    res.status(200).json({
      result: data,
      status: true,
      message: "Sub Category find Successfully",
    });
  } else {
    res
      .status(500)
      .json({ status: true, message: "Fail To find Sub Category" });
  }
});

router.post("/submit_coupon", async function (req, res, next) {
  var coupon = new Coupon(req.body);
  await coupon.save().then((saveDoc) => {
    if (coupon === saveDoc) {
      res
        .status(200)
        .json({ status: true, message: "Coupon Submitted Successfully" });
    } else {
      res.status(500).json({ status: false, message: "Fail To Submit Coupon" });
    }
  });
});

router.get("/display_all_coupon", function (req, res, next) {
  Coupon.aggregate([
    {
      $lookup: {
        from: "companys",
        localField: "companyid",
        foreignField: "_id",
        as: "companyData",
      },
    },
    {
      $lookup: {
        from: "categorys",
        localField: "categoryid",
        foreignField: "_id",
        as: "categoryData",
      },
    },
    {
      $lookup: {
        from: "subcategorys",
        localField: "subcategoryid",
        foreignField: "_id",
        as: "subcategoryData",
      },
    },
    {
      $unwind: {
        path: "$companyData",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$categoryData",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$subcategoryData",
        preserveNullAndEmptyArrays: true,
      },
    },
  ])
    .then((result) => {
      res.status(200).json({
        status: true,
        data: result,
        message: "Successfully fetched all coupons",
      });
    })
    .catch((err) => {
      console.error("Error fetching Coupon:", err);
      res.status(500).json({ status: false, error: err.message });
    });
});

router.post("/edit_coupon_data", async function (req, res, next) {
  const { couponid, ...data } = req.body;
  await Coupon.updateOne({ _id: couponid }, data)
    .then(() => {
      res
        .status(200)
        .json({ status: true, message: "Coupon Edit Successfully" });
    })
    .catch((e) => {
      res.status(500).json({ status: false, message: "Fail To Edit Coupon" });
    });
});

router.post("/delete_coupon", async function (req, res, next) {
  await Coupon.deleteOne({ _id: req.body.id })
    .then(() => {
      res
        .status(200)
        .json({ status: true, message: "Coupon Deleted Successfully" });
    })
    .catch((e) => {
      res
        .status(500)
        .json({ status: false, message: "Fail To Deleted Coupon" });
    });
});

router.get("/display_top_categories", async function (req, res, next) {
  try {
    var data = await Coupon.aggregate([
      {
        $group: {
          _id: "$categoryid",
          totalCoupons: { $sum: 1 },
        },
      },
      {
        $sort: { totalCoupons: -1 },
      },
      {
        $limit: 6,
      },
      {
        $lookup: {
          from: "categorys",
          localField: "_id",
          foreignField: "_id",
          as: "category_details",
        },
      },
      {
        $unwind: "$category_details",
      },
      {
        $project: {
          _id: 1,
          totalCoupons: 1,
          "category_details.categoryname": 1,
        },
      },
    ]);

    if (data.length > 0) {
      res.status(200).json({
        result: data,
        status: true,
        message: "Top 5 Categories Retrieved Successfully",
      });
    } else {
      res.status(404).json({ status: false, message: "No Categories Found" });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.get("/display_top_cashback_coupons", async function (req, res, next) {
  try {
    var data = await Coupon.aggregate([
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
          from: "companys",
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
      res.status(200).json({
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
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.post("/display_coupons_by_categoryid", async function (req, res, next) {
  try {
    const { categoryid } = req.body;

    if (!categoryid) {
      return res
        .status(400)
        .json({ status: false, message: "Category ID is required" });
    }

    var data = await Coupon.find({ categoryid: categoryid }).sort({
      createdAt: -1,
    });

    if (data.length > 0) {
      res.status(200).json({
        result: data,
        status: true,
        message: "Coupons Retrieved Successfully",
      });
    } else {
      res
        .status(404)
        .json({ status: false, message: "No Coupons Found for this Category" });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.post("/display_category_details", async function (req, res, next) {
  try {
    const { categoryid } = req.body;

    if (!categoryid) {
      return res
        .status(400)
        .json({ status: false, message: "Category ID is required" });
    }

    var data = await Categorys.findOne({ _id: categoryid });

    if (data) {
      res.status(200).json({
        result: data,
        status: true,
        message: "Category Details Retrieved Successfully",
      });
    } else {
      res.status(404).json({ status: false, message: "No Category Found" });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.post("/display_coupons_by_category", async function (req, res, next) {
  try {
    const { categoryid } = req.body;

    if (!categoryid) {
      return res
        .status(400)
        .json({ status: false, message: "Category ID is required" });
    }

    var data = await Coupon.find({ categoryid: categoryid })
      .limit(6)
      .sort({ createdAt: -1 });

    if (data.length > 0) {
      res.status(200).json({
        result: data,
        status: true,
        message: "Coupons Retrieved Successfully",
      });
    } else {
      res
        .status(404)
        .json({ status: false, message: "No Coupons Found for this Category" });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

router.get("/display_top_companies", async function (req, res) {
  try {
    const data = await Coupon.aggregate([
      {
        $group: {
          _id: "$companyid",
          totalCoupons: { $sum: 1 },
        },
      },
      { $sort: { totalCoupons: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "companys",
          localField: "_id",
          foreignField: "_id",
          as: "company_details",
        },
      },
      { $unwind: "$company_details" },
      {
        $project: {
          _id: 1,
          totalCoupons: 1,
          "company_details.companyname": 1,
          "company_details.companydescription": 1,
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
          message: "Top 10 Companies Retrieved Successfully",
        });
    } else {
      res.status(404).json({ status: false, message: "No Companies Found" });
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

router.get("/top_cashback_companies", async function (req, res, next) {
  try {
    var data = await Coupon.aggregate([
      {
        $match: { coupontype: "cashback" },
      },
      {
        $group: {
          _id: "$companyid",
          totalCashbackCoupons: { $sum: 1 },
        },
      },
      {
        $sort: { totalCashbackCoupons: -1 },
      },
      {
        $limit: 8,
      },
      {
        $lookup: {
          from: "companys",
          localField: "_id",
          foreignField: "_id",
          as: "companyDetails",
        },
      },
      {
        $unwind: "$companyDetails",
      },
      {
        $project: {
          _id: 1,
          totalCashbackCoupons: 1,
          "companyDetails.companyname": 1,
          "companyDetails.companydescription": 1,
          "companyDetails.companyicon": 1,
        },
      },
    ]);

    if (data.length > 0) {
      res
        .status(200)
        .json({
          result: data,
          status: true,
          message: "Top 10 Cashback Companies Retrieved Successfully",
        });
    } else {
      res
        .status(404)
        .json({ status: false, message: "No Cashback Companies Found" });
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
