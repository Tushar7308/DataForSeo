const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
  "alpha-2": { type: String, unique: true, required: true },
  "name": { type: String, required: true },
});

module.exports = mongoose.model("Country", CountrySchema);
