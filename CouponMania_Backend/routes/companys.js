var express = require("express");
var router = express.Router();
var Companys = require("./models/companyModel");
var upload = require("./multer");

router.post(
  "/submit_company",
  upload.single("companyicon"),
  async function (req, res, next) {
    var file = req.file.filename;
    req.body["companyicon"] = file;
    var companys = new Companys(req.body);
    await companys.save().then((saveDoc) => {
      if (companys === saveDoc) {
        res
          .status(200)
          .json({ status: true, message: "Company Submitted Successfully" });
      } else {
        res
          .status(500)
          .json({ status: true, message: "Fail To Submit Company" });
      }
    });
  }
);

router.get("/display_all", async function (req, res, next) {
  var data = await Companys.find({});

  if (data) {
    res
      .status(200)
      .json({
        result: data,
        status: true,
        message: "Company find Successfully",
      });
  } else {
    res.status(500).json({ status: true, message: "Fail To find Company" });
  }
});

router.post("/submit_companyname", async function (req, res, next) {
  try {
    const updatedCompany = await Companys.findOneAndUpdate(
      { _id: req.body._id },
      {
        companyname: req.body.companyname,
        companydescription: req.body.companydescription,
      }
    );

    if (updatedCompany) {
      res
        .status(200)
        .json({
          status: true,
          message: "Company Data changed successfully",
          data: updatedCompany,
        });
    } else {
      res.status(404).json({ status: false, message: "Company not found" });
    }
  } catch (error) {
    console.error("Error updating company name:", error);
    res
      .status(500)
      .json({
        status: false,
        message: "Failed to change company Data",
        error: error.message,
      });
  }
});

router.post(
  "/edit_company_picture",
  upload.single("companyicon"),
  async function (req, res, next) {
    try {
      var file = req.file.filename;
      req.body["companyicon"] = file;
      const updatedCompany = await Companys.findOneAndUpdate(
        { _id: req.body._id },
        { companyicon: req.body.companyicon }
      );

      if (updatedCompany) {
        res
          .status(200)
          .json({
            status: true,
            message: "Company Icon name changed successfully",
            data: updatedCompany,
          });
      } else {
        res
          .status(404)
          .json({ status: false, message: "Company Icon not found" });
      }
    } catch (error) {
      console.error("Error updating company name:", error);
      res
        .status(500)
        .json({
          status: false,
          message: "Failed to change company Icon",
          error: error.message,
        });
    }
  }
);

router.post("/delete_company", async function (req, res, next) {
  await Companys.deleteOne({ _id: req.body.id })
    .then(() => {
      res
        .status(200)
        .json({ status: true, message: "Company Deleted Successfully" });
    })
    .catch((e) => {
      res
        .status(500)
        .json({ status: false, message: "Fail To Deleted Company" });
    });
});

module.exports = router;
