const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    date: { type: String, required: true },
    workedOn: String,
    learned: String,
    blockers: String,
    mood: Number,
    minutesFocused: Number,
    tags: [String],
  },
  { timestamps: true }
);

// Each user can only have one entry per date
entrySchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Entry", entrySchema);
