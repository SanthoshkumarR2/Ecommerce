const express= require("express")
const router = express.Router()

const makeOrder = require("../Controller/orderController")

router.post("/create",makeOrder)

module.exports = router;