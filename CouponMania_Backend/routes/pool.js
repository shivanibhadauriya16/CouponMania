const mongoose = require("mongoose");

var pool = () => {
  mongoose.Promise = global.Promise;

  mongoose.connect(
    `mongodb://localhost:27017/couponmania?retryWrites=true&w=majority`
  );

  mongoose.connection
    .once("open", () => console.log("MongoDb Running"))
    .on("error", (err) => console.log(err));
};

module.exports = pool;
