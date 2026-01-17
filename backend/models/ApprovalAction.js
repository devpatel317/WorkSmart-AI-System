const mongoose = require("mongoose")

const ApprovalActionSchema = new mongoose.Schema({
    request_id : String,
    employee_id : String,
    action : String,
    risk : String,
    justification : String,
    approver_roles : [String],
    approved : {
        type : Boolean,
        default : null
    },
    approved_by : String,
    comment : String
})

module.exports = mongoose.model("ApprovalAction", ApprovalActionSchema)