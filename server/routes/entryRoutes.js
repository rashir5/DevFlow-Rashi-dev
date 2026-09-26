const router = require("express").Router();
const Entry = require("../models/Entry");

// create / update daily entry
router.post("/", async (req, res) => {
  try {
    const entry = await Entry.findOneAndUpdate(
      { date: req.body.date },
      req.body,
      { upsert: true, new: true }
    );

    res.json(entry);
  } catch {
    res.status(500).json({ message: "Failed to save entry" });
  }
});

// get all entries
router.get("/", async (req, res) => {
  try {
    const entries = await Entry.find().sort({ date: -1 });

    res.json(entries);
  } catch {
    res.status(500).json({ message: "Failed to load entries" });
  }
});

module.exports = router;
