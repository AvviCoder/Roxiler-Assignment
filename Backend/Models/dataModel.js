const mongoose = require("mongoose");

// data model => created as the per data present into the 3rd party api => in the project description 
const dataSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  sold: { type: Boolean, default: false },
  dateOfSale: { type: Date, default: null },
});

module.exports = mongoose.model("Data", dataSchema);
