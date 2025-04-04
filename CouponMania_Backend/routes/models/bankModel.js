const mongooes = require("mongoose");

const bankSchema = mongooes.Schema({
  bankname: {
    type: String,
    required: true,
  },
  bankdescription: {
    type: String,
    required: true,
  },
  bankicon: {
    type: String,
    required: true,
  },
});

module.exports = mongooes.model("Banks", bankSchema);
