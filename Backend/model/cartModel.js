const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({

    cartItems :{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product"
        },
   
})

module.exports = mongoose.model("Cart",cartSchema)