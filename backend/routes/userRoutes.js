const express = require("express")
const router = express.Router();
const protect = require("../middleware/authMiddleware")
const authorizeRoles = require("../middleware/roleMiddleware")
const {getAllEmployees} = require("../controllers/userController")
const internalAuth = require("../middleware/internalAuth")

router.get("/profile", protect, (req,res) => {
    res.json({
        message : "Protected route accessed",
        user : req.user
    })
})

router.get(
    "/employees",
    internalAuth,
    getAllEmployees
)

module.exports = router;

