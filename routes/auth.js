const router = require("express").Router()
const User = require("../models/User")
const { registerValidation, loginValidation } = require("../validation")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


router.post("/register", async (req, res) => {
    // lets validate the data before we make a user
    const { error } = registerValidation(req.body)
    if (error) {
        return res.status(400).send(error?.details[0]?.message)
    }

    // checking if the user is already in the database

    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send("Email already exists")

    // Hash the passwords
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    })

    try {
        await user.save()
        res.send({
            user: user.id
        })
    } catch (error) {
        res.status(400).send(error)
    }

})

router.post("/login", async (req, res) => {
    const { error } = loginValidation(req.body)
    if (error) {
        return res.status(400).send(error?.details[0]?.message)
    }

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("Email doesn't exist")

    // if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send("Invalid password")

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header("auth-token", token).send(token)
})

module.exports = router