const router = require('express').Router()
const { storeTeamValidation } = require('../validation')
const verify = require("./middlewares/verifyToken")
const Team = require("../models/Team")


router.get("/", verify, async (req, res) => {
    const data = await Team.find()
    res.send({
        team: data
    })
})

router.post("/store", verify, async (req, res) => {
    const { error } = storeTeamValidation(req.body)
    if (error) {
        return res.status(400).send(error?.details[0]?.message)
    }

    const dataTeam = await Team.findOne({ email: req.body.abbr })
    if (dataTeam) return res.status(400).send("Team already exists")

    const team = new Team({
        name: req.body.name,
        abbr: req.body.abbr
    })

    try {
        await team.save()
        res.send({
            team: team.id
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router