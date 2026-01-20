const express = require("express")
const router =  express.Router()

const { createTask } = require("../controllers/taskController")
const protect = require("../middleware/authMiddleware")
const authorizeRoles = require("../middleware/roleMiddleware")
const { updateTaskStatus, getTasksForEmployee, getWorkHistory, getManagerTasks } = require("../controllers/taskController")
const internalAuth = require("../middleware/internalAuth")


router.post(
    "/create-task",
    protect,
    authorizeRoles("manager"),
    createTask
)

router.patch(
    "/:taskId/status",
    protect,
    authorizeRoles("employee"),
    updateTaskStatus
)

router.get(
    "/get-tasks/:employeeId",
    internalAuth,
    // protect,
    getTasksForEmployee
)

router.get(
    "/getWorkHistory",
    protect,
    getWorkHistory
)

router.get(
    "/getManagerTasks",
    protect,
    getManagerTasks
)

module.exports = router