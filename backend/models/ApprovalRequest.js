const mongoose = require("mongoose")

const ApprovalRequestSchema = new mongoose.Schema({
    //  requestId: {
    //   type: String,
    //   required: true,
    //   index: true
    // },

    employeeId: {
      type: String,
      required: true
    },

    action: {
      type: String,
      required: true,
      enum: ["reassign", "reduce_load", "break", "delay"]
    },

    risk: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true
    },

    approverRoles: {
      type: [String],
      enum: ["manager", "admin"],
      required: true
    },

    justification: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "executed"],
      default: "pending",
      index: true
    },

    approvedBy: {
      type: String,
      default: null
    },

    approvedAt: {
      type: Date,
      default: null
    },

    rejectionReason: {
      type: String,
      default: null
    },

    executedAt: {
      type: Date,
      default: null
    },

    createdBy: {
      type: String, // manager/admin who triggered analysis
      required: true
    }
},
{
    timestamps : true
}
)

module.exports = mongoose.model("ApprovalRequest", ApprovalRequestSchema)