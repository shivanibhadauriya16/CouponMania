const mongooes = require("mongoose");

const couponSchema = mongooes.Schema({
  couponname: {
    type: String,
    required: true,
  },
  coupondescription: {
    type: String,
    required: true,
  },
  coupontype: {
    type: String,
    required: true,
  },
  couponsubheading: {
    type: String,
    required: true,
  },
  couponcode: {
    type: String,
    required: true,
  },
  companyid: {
    type: mongooes.Schema.Types.ObjectId,
    require: true,
    ref: "companys",
  },
  categoryid: {
    type: mongooes.Schema.Types.ObjectId,
    require: true,
    ref: "category",
  },
  subcategoryid: {
    type: mongooes.Schema.Types.ObjectId,
    require: true,
    ref: "subcategorys",
  },
});

module.exports = mongooes.model("Coupon", couponSchema);
