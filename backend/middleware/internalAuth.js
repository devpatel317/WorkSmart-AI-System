

module.exports = function internalAuth (req,res,next) {
    const internalKey = req.headers["x-internal-key"]

    if(!internalKey){
        return res.status(401).json({
            message : "Internal key missing"
        })
    }

    if(internalKey != process.env.INTERNAL_API_KEY){
        return res.status(403).json({
            message : "Invalid internal key"
        })
    }

    next();
}