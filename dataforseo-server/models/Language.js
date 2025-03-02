const mongoose = require("mongoose");

const LanguageSchema = new mongoose.Schema({
  language_code: { type: String, unique: true, required: true },
  language_name: { type: String, required: true },
});

module.exports = mongoose.model("Language", LanguageSchema);
