const mongooes = require("mongoose");

const walletSchema = mongooes.Schema({
  walletname: {
    type: String,
    required: true,
  },
  walletdescription: {
    type: String,
    required: true,
  },
  walleticon: {
    type: String,
    required: true,
  },
});

module.exports = mongooes.model("Wallets", walletSchema);
