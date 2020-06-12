const mongoose = require('mongoose');

const moodDataSchema = mongoose.Schema(
  {
    employeeID: {
      type: Number,
      require: true,
      trim: true,
      validate(value) {
        if (!value) throw new Error('No Value!');
      },
    },
    moodMeter: {
      type: Number,
      require: true,
    },
    workShifts: {
      type: String,
      require: true,
    },
    reviewersReason: {
      type: String,
      require: true,
    },
    ownWordReason: {
      type: String,
    },
    RCoaches: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Moods = mongoose.model('ReviewersMood', moodDataSchema);
module.exports = Moods;
