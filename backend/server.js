const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/authRoutes") 
const userRoutes = require("./routes/userRoutes")
const adminRoutes = require("./routes/adminRoutes")
const taskRoutes = require("./routes/taskRoutes")
const activityRoutes = require("./routes/activityRoutes")
const approvalRoutes = require("./routes/approvalRoutes")
const analyzeRoutes = require("./routes/analyzeRoutes")

const connectDB = require("./config/db")

dotenv.config();

const app = express()

// middleware
app.use(cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true
}))
// app.options("*", cors());
app.use(express.json())
app.use(cookieParser())

// connect database
connectDB()

// Testing route
app.get("/",(req,res) => {
    res.send("WorkSmart AI Backend is running...")
})

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/activity",activityRoutes)
app.use("/api/approval", approvalRoutes)
app.use("/api/analyze",analyzeRoutes)

const PORT =  process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

