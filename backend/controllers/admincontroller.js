const User = require("../models/User")
const ActivityLog = require("../models/ActivityLog")
const bcrypt = require("bcrypt")
 
exports.createUser = async(req,res) => {
    try{
        const {name, email, password, role} = req.body;
        
        // Check Only manager and employee allowed
        if(!["manager", "employee"].includes(role)){
            return res.status(400).json({message : "Invalid role"})
        }

        // Check for existing user
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(400).json({message : "User already exists"})

        // encrypt password 
        const hashpassword = await bcrypt.hash(password,10)

        // creat user
        const user = await User.create({
            name,
            email,
            password : hashpassword,
            role
        })
        
        // Save activity log
        await ActivityLog.create({
            user : req.user._id,
            action : "CREATE_USER",
            targetType : "user",
            targetId : user._id
        })

        res.status(201).json({
            message : "User created successfully",
            user : {
                id : user._id,
                name : user.name,
                email : user.email,
                role : user.role
            }
        })

    }catch(error){
        res.status(500).json({
            message : "Server Error",
            error : error.message
        })
    }
}

exports.getAllUsers = async (req,res) => {
    try{
        const users = await User.find().select("-password").sort({createdAt : -1})
        res.status(200).json({
            success : true,
            count : users.length,
            users
        })
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}