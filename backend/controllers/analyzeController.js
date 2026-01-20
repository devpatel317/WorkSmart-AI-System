const mongoose = require("mongoose")
const axios = require("axios")
const ApprovalRequest = require("../models/ApprovalRequest")

exports.analyzeBurnout = async (req,res) => {
    try{
        const response = await axios.get("http://127.0.0.1:8000/api/ai/burnout/analyze")
        console.log("response", response)

        const {employee_snapshots,burnout_assessments,optimization_decisions,executed_actions} = response.data

        // for(const action of executed_actions){
        //     await ApprovalRequest.create({
        //         employeeId : action.employeeId,
        //         action : action.action,
        //         risk : action.risk,
        //         approverRoles : action.approver_roles,
        //         justification : action.justification,
        //         status : "pending_approval"
        //     })
        // }

        return res.status(200).json({
            message : "Burnout analysis completed",
            // burnout_assessments,
            // pending_actions : executed_actions 
            analyzed_data : response.data
        })
        
    }
    catch(error){
        return res.status(500).json({
            error : "Burnout analysis failed",
            message : error.message
        })
    }
}