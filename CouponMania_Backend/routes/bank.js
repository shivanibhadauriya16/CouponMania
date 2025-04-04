var express = require("express");
var router = express.Router();
var Banks = require("./models/bankModel");
var upload = require("./multer");

router.post(
  "/submit_bank",
  upload.single("bankicon"),
  async function (req, res, next) {
    var file = req.file.filename;
    req.body["bankicon"] = file;
    var banks = new Banks(req.body);
    await banks.save().then((saveDoc) => {
      if (banks === saveDoc) {
        res
          .status(200)
          .json({ status: true, message: "Bank Submitted Successfully" });
      } else {
        res.status(500).json({ status: true, message: "Fail To Submit Bank" });
      }
    });
  }
);

router.get("/display_all", async function (req, res, next) {
  var data = await Banks.find({});

  if (data) {
    res
      .status(200)
      .json({ result: data, status: true, message: "Banks find Successfully" });
  } else {
    res.status(500).json({ status: true, message: "Fail To find Banks" });
  }
});

router.post("/submit_bankname", async function (req, res, next) {
  try {
    const updatedBank = await Banks.findOneAndUpdate(
      { _id: req.body._id },
      {
        bankname: req.body.bankname,
        bankdescription: req.body.bankdescription,
      },
      { new: true }
    );

    if (updatedBank) {
      res.status(200).json({
        status: true,
        message: "Bank details updated successfully",
        data: updatedBank,
      });
    } else {
      res.status(404).json({ status: false, message: "Bank not found" });
    }
  } catch (error) {
    console.error("Error updating bank details:", error);
    res.status(500).json({
      status: false,
      message: "Failed to update bank details",
      error: error.message,
    });
  }
});

router.post(
  "/edit_bank_picture",
  upload.single("bankicon"),
  async function (req, res, next) {
    try {
      var file = req.file.filename;
      req.body["bankicon"] = file;
      const updatedBank = await Banks.findOneAndUpdate(
        { _id: req.body._id },
        { bankicon: req.body.bankicon }
      );

      if (updatedBank) {
        res
          .status(200)
          .json({
            status: true,
            message: "Bank Icon changed successfully",
            data: updatedBank,
          });
      } else {
        res.status(404).json({ status: false, message: "Bank Icon not found" });
      }
    } catch (error) {
      console.error("Error updating Bank name:", error);
      res
        .status(500)
        .json({
          status: false,
          message: "Failed to change Bank Icon",
          error: error.message,
        });
    }
  }
);

router.post("/delete_bank", async function (req, res, next) {
  await Banks.deleteOne({ _id: req.body.id })
    .then(() => {
      res
        .status(200)
        .json({ status: true, message: "Bank Deleted Successfully" });
    })
    .catch((e) => {
      res.status(500).json({ status: false, message: "Fail To Deleted Bank" });
    });
});

module.exports = router;
