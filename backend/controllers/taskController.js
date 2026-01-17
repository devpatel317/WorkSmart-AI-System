const Task = require("../models/Task")
const ActivityLog = require("../models/ActivityLog")
const User = require("../models/User")
const mongoose = require("mongoose")

exports.createTask = async (req,res) => {
    try{
        console.log(req.body)
        const {title,description,assignedTo,deadline,priority} = req.body;
        // console.log(req.user)
        // console.log("AssignedBy :",req.user._id)
        // const assignedBy = req.user._id

        // check user exists or not
        const employee = await User.findById(assignedTo)
        if(!employee || employee.role != "employee"){
            return res.status(400).json({
                message : "Task can only be assigned to an employee"
            })
        }

        const task = await Task.create({
            title,
            description,
            priority,
            assignedTo,
            assignedBy:req.user.id,
            deadline
        })

        await ActivityLog.create({
            user : req.user.id,
            action : "CREATE_TASK",
            targetType : "task",
            targetId : task._id   
        })

        res.status(201).json({
            message : "Task Created Successfully",
            task
        })

    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

exports.updateTaskStatus = async (req,res) => {
    try{
        const {taskId} = req.params
        const {status} = req.body

        const allowedStatus = ["pending", "in_progress", "completed"]
        if(!allowedStatus.includes(status)){
            return res.json(400).json({
                message : "Invalid status value"
            })
        }

        const task = await Task.findById(taskId)
        if(!task) return res.status(404).json({message : "Task not found"})

        if(task.assignedTo.toString() !== req.user.id.toString()){
            return res.status(403).json({message : "You can update only your assigned tasks"})
        }

        task.status = status;
        await task.save()

        await ActivityLog.create({
            user : req.user.id,
            action : "UPDATE_TASK_STATUS",
            targetType : "task",
            targetId : task._id
        })

        res.json({
            message : "Task status updated",
            task
        })

    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

exports.getTasksForEmployee = async (req, res) => {
  try {
    const employeeId  = new mongoose.Types.ObjectId(req.user.id);
    isValid = mongoose.Types.ObjectId.isValid(employeeId)
    
    if (!isValid) {
      return res.status(400).json({ message: "Invalid employee id" });
    }

    const tasks = await Task.find({ assignedTo: employeeId }).select("_id status deadline description priority title");

    const formatted = tasks.map(task => ({
      id: task._id.toString(),
      title : task.title,
      description : task.description,
      status: task.status,
      priority : task.priority,
      deadline: task.deadline
    }));

    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks",
      error: error.message
    });
  }
};

exports.getWorkHistory = async (req,res) => {
    try{
        const history = await Task.find({
            assignedTo : req.user.id,
            status : "completed"
        }).sort({ completedAt : -1 })

        res.json(history)
    }
    catch(error){
        res.status(500).json({message : "Server error"})
    }
}

exports.getManagerTasks = async (req,res) => {
    try{
        console.log("api called")
        // console.log(req)
        const tasks = await Task.find({assignedBy : req.user.id})
        .populate("assignedTo", "name email")
        .sort({createdAt : -1})
        console.log(tasks)

        res.json(tasks)
    }
    catch(error){
        res.status(500).json({
            message : error.messgag
        })
    }
    
}