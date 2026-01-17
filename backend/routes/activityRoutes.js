const express = require("express")
const router = express.Router()
const {getLastActiveDays} = require("../controllers/activityController")
const internalAuth = require("../middleware/internalAuth")

router.get(
    "/last-active/:employeeId",
    internalAuth,
    getLastActiveDays
)

module.exports = router