const express = require("express")
const app = express()
const mongoose = require("mongoose")

// Connect to DB
mongoose.connect("mongodb+srv://rifki:Rifkiamanda1@cluster0.mvvnv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", () => {
    console.log("connected to db")
})

// Import routes
const authRoute = require("./routes/auth")

// Route Middlewares

app.use("/api/user", authRoute)

app.listen(3000, () => console.log("Server up and running"))