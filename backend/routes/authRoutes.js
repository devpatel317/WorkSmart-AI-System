const express = require("express")
const router = express.Router();

const {
    registerUser,
    logingUser,
    refreshAccessToken,
    logoutUser
} = require("../controllers/authcontroller")

router.post("/register", registerUser)
router.post("/login", logingUser)
router.post("/refresh", refreshAccessToken)
router.post("/logout", logoutUser)

module.exports = router;