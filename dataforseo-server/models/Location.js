const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  location_code: { type: Number, unique: true, required: true },
  location_name: { type: String, required: true },
  county_iso_code: { type: String, required: true },
  location_type: { type: String, required: true },
});

module.exports = mongoose.model("Location", LocationSchema);
