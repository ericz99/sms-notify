const mongoose = require("mongoose");

module.exports = async function(mongoURI, obj = {}) {
  await mongoose
    .connect(mongoURI, { useCreateIndex: true, useNewUrlParser: true, ...obj })
    .then(console.log("DB Server successully connected"))
    .catch(e => console.error(e));
};
