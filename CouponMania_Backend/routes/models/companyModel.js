const mongooes = require("mongoose");

const companySchema = mongooes.Schema({
  companyname: {
    type: String,
    required: true,
  },
  companydescription: {
    type: String,
    required: true,
  },
  companyicon: {
    type: String,
    required: true,
  },
});

module.exports = mongooes.model("Companys", companySchema);
