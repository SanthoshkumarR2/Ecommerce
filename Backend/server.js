const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv")
 dotenv.config()
const DbConnection = require("./Connection/Db.js")
const productRoute = require("./routes/productRoute.js")
const cartRoute = require("./routes/cartRoute.js")
const orderRoute = require("./routes/orderRoute.js")

const app = express();

app.use(express.json())
app.use(cors({
    origin : "http://localhost:3000"
}))

const port = 5000;

DbConnection()

app.use('/product',productRoute)
app.use('/cart',cartRoute)
app.use("/order",orderRoute)

app.get("/",(req,res)=>{
   res.send("Please welcome")
})

app.listen(port,()=>{
    console.log(`server run on port ${port}`)
})