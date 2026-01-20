const mongoose = require("mongoose")
const ActivityLog = require("../models/ActivityLog")

exports.getLastActiveDays = async (req,res) => {
    try{
        const {employeeId} = req.params
        console.log("employeeId",employeeId)

        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(400).json({ error: "Invalid employee ID" });
        }

        const lastActivity = await ActivityLog.findOne({
            user : employeeId
        }).sort({createdAt : -1})
        .select("createdAt")

        console.log("lastActivity",lastActivity)                   

        if(!lastActivity){
            return res.json({
                employeeId,
                last_active_days : 0
            })
        }

        const now = new Date();
        const lastActive = new Date(lastActivity.createdAt)

        const diffTime = Math.abs(now - lastActive)
        let diffDays = Math.floor(diffTime/(1000*60*60*24))
        if(diffDays === 0){
            diffDays = 1
        }

        return res.json({
            employeeId,
            last_active_days : diffDays
        })

    }
    catch(error){
        res.status(500).json({
            error : error.message
        })
    }
}