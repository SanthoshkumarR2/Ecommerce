const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({

     items :[
        {   
         type : mongoose.Schema.Types.ObjectId,
         ref : "Product"
        }
     ],  
    
     orderBy : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
     },
     
     payment :{
         type : Number
     },
     quantityByItem : {
         type : Object
     }

})

module.exports = mongoose.model("Order",orderSchema)