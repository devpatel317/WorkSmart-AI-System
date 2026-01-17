const jwt = require("jsonwebtoken")
const RefreshToken = require("../models/RefreshToken")
const User = require("../models/User")
const bcrypt = require("bcrypt")

const generateAccessToken = (user) => {
    return jwt.sign(
        {id : user._id, role : user.role},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : "1d"}
    )
}

const generateRefreshToken = async (user) => {
    const token = jwt.sign(
        {id : user._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn : "7d"}
    );

    await RefreshToken.create({
        user : user._id,
        token,
        expiresAt : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })

    return token;
}

exports.registerUser = async(req,res) => {
    try{
        const {name, email, password} = req.body
        let {role} = req.body
        role =  role == "manager" ? "manager" : "employee";

        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(400).json({message : "User alerady exists"})

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password : hashedPassword,
            role
        })

        const accessToken = generateAccessToken(user)
        const refreshToken = await generateRefreshToken(user)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            message : "Registered Successfully",
            accessToken
        })
    }catch (error){
        res.status(500).json({message : error.message})
    }
}

exports.logingUser = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({email})
    if(!user) return res.status(400).json({message : "Invalid credentials"})

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({message : "Invaild credentials"})

    const accessToken = generateAccessToken(user);
    const refreshToken =  await generateRefreshToken(user);
    console.log("Refresh token value:", refreshToken);

    res.cookie("refreshToken", refreshToken, {
        httpOnly : true,
        sameSite : "strict",
        maxAge : 7 * 24 * 60 * 60 * 1000
    })

    res.json({"accessToken" : accessToken,"message" : "Login Successfully Completed", "user" : user})
}

exports.refreshAccessToken = async (req,res) => {
    const token = req.cookies.refreshToken;
    if(!token) return res.sendStatus(401);

    const storedToken = await RefreshToken.findOne({
        token,
        revoked : false
    })

    if(!storedToken) return res.sendStatus(403)

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async(err,decoded) => {
        if(err) return res.sendStatus(403)

        const user = await User.findById(decoded.id)
        if(!user) return res.sendStatus(403)
        

        const newAccessToken = generateAccessToken(user)
        res.json({"accessToken" : newAccessToken})
    }) 
}

exports.logoutUser = async (req,res) => {
    const token = req.cookies.refreshToken

    if(token){
        await RefreshToken.findOneAndUpdate(
            {token},
            {revoked : true}
        )
    }

    res.clearCookie("refreshToken")
    res.json({message : "Logged out successfully"})
}

 