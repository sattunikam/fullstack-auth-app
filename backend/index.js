require("dotenv").config()
const express = require("express")
const app = express()
 
const cookieParser = require("cookie-parser")
const cors = require("cors")

const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const noteRoutes = require("./routes/noteRoutes")

// middleware (guard)
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))

// routes
app.use("/api/auth", authRoutes)
app.use("/api/notes", noteRoutes)

const port = process.env.PORT

connectDB().then(()=>{
  app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
  })
})