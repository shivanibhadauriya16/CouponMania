const mongooes = require("mongoose");

const subcategorySchema = mongooes.Schema({
  subcategoryname: {
    type: String,
    required: true,
  },
  categoryid: {
    type: mongooes.Schema.Types.ObjectId,
    require: true,
    ref: "categorys",
  },
});

module.exports = mongooes.model("SubCategorys", subcategorySchema);
