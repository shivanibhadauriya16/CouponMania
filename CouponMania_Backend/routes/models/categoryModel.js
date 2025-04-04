const mongooes = require("mongoose");

const categorySchema = mongooes.Schema({
  categoryname: {
    type: String,
    required: true,
  },
});

module.exports = mongooes.model("Categorys", categorySchema);
