const mongooes = require("mongoose");

const adminLoginSchema = mongooes.Schema({
  emailid: {
    type: String,
    required: true,
  },
  mobileno: {
    type: String,
    require: true,
  },
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  adminimage: {
    type: String,
    required: true,
  },
});

module.exports = mongooes.model("AdminLogin", adminLoginSchema);
