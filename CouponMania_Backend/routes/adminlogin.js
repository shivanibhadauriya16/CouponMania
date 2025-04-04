const express = require("express");
const router = express.Router();
const AdminLogin = require("./models/adminloginModel");

router.post("/check_admin", async (req, res) => {
  try {
    const { emailid, password } = req.body;
    const adminlogin = await AdminLogin.findOne({
      $and: [
        { $or: [{ emailid: emailid }, { mobileno: emailid }] },
        { password: password },
      ],
    });

    if (adminlogin) {
      return res.status(200).json({
        status: true,
        data: adminlogin,
        message: "Success...",
      });
    } else {
      return res.status(200).json({
        status: false,
        data: [],
        message: "Invalid Emailid/MobileNo...",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Database Error Pls Contact DBA...",
    });
  }
});

module.exports = router;
