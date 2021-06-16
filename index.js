const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")

// Import routes
const authRoute = require("./routes/auth")
const teamRoute = require("./routes/team")

dotenv.config()

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, () => {
    console.log("connected to db")
})

// Middleware
app.use(express.json())

// Route Middlewares
app.use("/api/user", authRoute)
app.use("/api/team", teamRoute)

app.listen(3000, () => console.log("Server up and running"))