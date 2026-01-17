const User = require("../models/User")
 
exports.getAllEmployees = async(req,res) => {
    try{
        const employees = await User.find({role : "employee"}).select("_id name email role")

        const formatted = employees.map(emp => ({
            id : emp._id.toString(),
            name : emp.name,
            email : emp.email,
            role : emp.role
        }))

        res.status(200).json(formatted)
    }
    catch(error){
        res.status(500).json({
            message : "Failed to fetch employees",
            error : error.message
        })
    }
}