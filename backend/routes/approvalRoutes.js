const express = require("express")
const router = express.Router()
const { getPendingApprovals } = require("../controllers/approvalController")

// router.post("/request", requestApproval)
// router.post("/decision", managerDecision)
// router.get("/result/:request_id", getApprovalResult)

// Manager dashboard endpoints
router.get("/pending", getPendingApprovals)
// router.get("/actions/:request_id", getActionsForRequest)
// router.get("/request/:request_id", getRequest)

module.exports = router