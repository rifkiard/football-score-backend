const router = require('express').Router()
const verify = require("./middlewares/verifyToken")

router.get("/", verify, (req, res) => {
})

module.exports = router