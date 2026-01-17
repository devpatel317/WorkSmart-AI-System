const express = require("express")
const router =  express.Router();

const protect = require("../middleware/authMiddleware")
const authorizeRoles = require("../middleware/roleMiddleware")
const {createUser, getAllUsers} = require("../controllers/admincontroller")

router.post("/create-user",
    protect,
    authorizeRoles("admin"),
    createUser
)

router.get("/users", getAllUsers)

module.exports = router;