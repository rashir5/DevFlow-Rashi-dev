const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    date: { type: String, required: true, unique: true },
    workedOn: String,
    learned: String,
    blockers: String,
    mood: Number,
    minutesFocused: Number,
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entry", entrySchema);
