const mongooes = require("mongoose");

const slideSchema = mongooes.Schema({
  slideicon: {
    type: String,
    required: true,
  },
  companyid: {
    type: String,
    required: true,
  },
});

module.exports = mongooes.model("Slides", slideSchema);
