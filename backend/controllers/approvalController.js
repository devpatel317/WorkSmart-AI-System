const ApprovalRequest = require("../models/ApprovalRequest")
const ApprovalAction = require("../models/ApprovalAction")


// exports.requestApproval = async (req,res) => {
//     const { request_id, actions, workflow_state, workflow_node } = req.body

//     await ApprovalRequest.create({ request_id, workflow_state, workflow_node })

//     const records = actions.map(a => ({
//         request_id,
//         employee_id : a.employee_id,
//         action : a.action,
//         risk : a.risk,
//         justification : a.justification,
//         approver_roles : a.approver_roles
//     }))

//     await ApprovalAction.insertMany(records)

//     res.json({
//         message : "Approval request stored",
//         request_id
//     })
// }

// exports.managerDecision = async (req,res) => {
//     const {request_id , decisions} = req.body

//     for(const d of decisions){
//         await ApprovalAction.updateOne(
//             {
//                 request_id,
//                 employee_id: d.employee_id,
//                 action: d.action
//             },
//             {
//                 approved: d.approved,
//                 approved_by: d.approved_by,
//                 comment: d.comment
//             }
//         )
//     }

//     // Determine aggregate request status: approved only if all actions approved === true,
//     // rejected if any action approved === false, otherwise keep pending.
//     const actions = await ApprovalAction.find({ request_id });
//     let aggregateStatus = "pending";

//     if (actions.every(a => a.approved === true)) {
//         aggregateStatus = "approved";
//     } else if (actions.some(a => a.approved === false)) {
//         aggregateStatus = "rejected";
//     }

//     await ApprovalRequest.updateOne(
//         { request_id },
//         {
//             status : aggregateStatus
//         }
//     )

//     // If request finished (approved/rejected), notify AI service to resume the workflow
//     try{
//         const AI_URL = process.env.AI_SERVICE_URL
//         if (AI_URL && aggregateStatus !== "pending"){
//             // send resume callback with the request_id and decisions
//             const fetch = globalThis.fetch || require('node-fetch')
//             await fetch(`${AI_URL}/api/agent/resume`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ request_id, status: aggregateStatus })
//             })
//         }
//     }catch(err){
//         console.error("Failed to notify AI service of approval result", err)
//     }

//     res.json({
//         message : "Approval recorded",
//         status: aggregateStatus
//     })
// }

// exports.getApprovalResult = async (req,res) => {
//     const { request_id } = req.params
    
//     const request = await ApprovalRequest.findOne({ request_id });
//     if (!request) {
//         return res.status(404).json({ status: "not_found" });
//     }

//     if (request.status !== "approved") {
//         return res.status(202).json({ status: "pending" });
//     }

//     const actions = await ApprovalAction.find({ request_id });

//     res.json({
//         status: "approved",
//         decisions: actions
//     });
    
// }

exports.getPendingApprovals = async (req,res) => {
    try{
        const pendingRequests = await ApprovalRequest.find({
            status : "pending_approval",
            // approverRoles: role
        }).sort({createdAt : -1}).lean()

        return res.status(200).json({
            count : pendingRequests.length,
            requests : pendingRequests
        })

    }
    catch(error){
        return res.status(500).json({
            error : "Failed to fetch pending approval requests"
        })
    }
}