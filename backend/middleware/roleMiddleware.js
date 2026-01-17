const authorizeRoles = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({
                message : "Role authorization failed"
            })
        }
        next()
    }
}

module.exports = authorizeRoles;