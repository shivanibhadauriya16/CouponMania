var express = require("express");
var router = express.Router();
var Wallets = require("./models/walletModel");
var upload = require("./multer");

router.post(
  "/submit_wallet",
  upload.single("walleticon"),
  async function (req, res, next) {
    var file = req.file.filename;
    req.body["walleticon"] = file;
    var wallets = new Wallets(req.body);
    await wallets.save().then((saveDoc) => {
      if (wallets === saveDoc) {
        res
          .status(200)
          .json({ status: true, message: "Wallet Submitted Successfully" });
      } else {
        res
          .status(500)
          .json({ status: true, message: "Fail To Submit Wallet" });
      }
    });
  }
);

router.get("/display_all", async function (req, res, next) {
  var data = await Wallets.find({});

  if (data) {
    res
      .status(200)
      .json({
        result: data,
        status: true,
        message: "Wallet find Successfully",
      });
  } else {
    res.status(500).json({ status: true, message: "Fail To find Wallet" });
  }
});

router.post("/submit_walletname", async function (req, res, next) {
  try {
    const updatedWallet = await Wallets.findOneAndUpdate(
      { _id: req.body._id }, 
      {
        walletname: req.body.walletname,
        walletdescription: req.body.walletdescription,
      },
      { new: true } 
    );

    if (updatedWallet) {
      res.status(200).json({
        status: true,
        message: "Wallet details updated successfully",
        data: updatedWallet,
      });
    } else {
      res.status(404).json({ status: false, message: "Wallet not found" });
    }
  } catch (error) {
    console.error("Error updating Wallet details:", error);
    res.status(500).json({
      status: false,
      message: "Failed to update Wallet details",
      error: error.message,
    });
  }
});

router.post(
  "/edit_wallet_picture",
  upload.single("walleticon"),
  async function (req, res, next) {
    try {
      var file = req.file.filename;
      req.body["walleticon"] = file;
      const updatedWallet = await Wallets.findOneAndUpdate(
        { _id: req.body._id },
        { walleticon: req.body.walleticon }
      );

      if (updatedWallet) {
        res
          .status(200)
          .json({
            status: true,
            message: "Wallet Icon changed successfully",
            data: updatedWallet,
          });
      } else {
        res
          .status(404)
          .json({ status: false, message: "Wallet Icon not found" });
      }
    } catch (error) {
      console.error("Error updating Wallet name:", error);
      res
        .status(500)
        .json({
          status: false,
          message: "Failed to change Wallet Icon",
          error: error.message,
        });
    }
  }
);

router.post("/delete_wallet", async function (req, res, next) {
  await Wallets.deleteOne({ _id: req.body.id })
    .then(() => {
      res
        .status(200)
        .json({ status: true, message: "Wallet Deleted Successfully" });
    })
    .catch((e) => {
      res
        .status(500)
        .json({ status: false, message: "Fail To Deleted Wallet" });
    });
});

module.exports = router;
