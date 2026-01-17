const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    action: {
      type: String,
      required: true
    },

    targetType: {
      type: String,
      enum: ["task", "user"]
    },

    targetId: {
      type: mongoose.Schema.Types.ObjectId
    },

    metadata: {
      type: Object
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActivityLog", activityLogSchema);
