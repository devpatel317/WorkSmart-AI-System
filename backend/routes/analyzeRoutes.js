const express = require("express")
const router =  express.Router();

const {analyzeBurnout} = require("../controllers/analyzeController")

router.get(
    "/analyzeBurnout",
    analyzeBurnout
)

module.exports = router