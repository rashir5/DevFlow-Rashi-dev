const router = require("express").Router();
const Entry = require("../models/Entry");
const requireAuth = require("../middleware/auth");

// All entry routes require authentication
router.use(requireAuth);

// create / update daily entry for the logged-in user
router.post("/", async (req, res) => {
  try {
    const { date, workedOn, learned, blockers, mood, minutesFocused, tags } = req.body;

    // Use $set so the update document doesn't re-assert the filter keys on upsert,
    // which avoids duplicate-key conflicts on the compound (userId, date) index.
    const entry = await Entry.findOneAndUpdate(
      { userId: req.userId, date },
      {
        $set: { workedOn, learned, blockers, mood, minutesFocused, tags },
        $setOnInsert: { userId: req.userId, date },
      },
      { upsert: true, new: true, runValidators: true }
    );

    res.json(entry);
  } catch (err) {
    console.error("POST /entries error:", err.message);
    res.status(500).json({ message: "Failed to save entry", detail: err.message });
  }
});

// get all entries for the logged-in user
router.get("/", async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.userId }).sort({ date: -1 });

    res.json(entries);
  } catch (err) {
    console.error("GET /entries error:", err.message);
    res.status(500).json({ message: "Failed to load entries", detail: err.message });
  }
});

module.exports = router;
