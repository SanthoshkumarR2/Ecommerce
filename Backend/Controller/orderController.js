const orderModel = require("../model/orderModel")
const productModel = require("../model/productModel")
const cartModel = require("../model/cartModel")


const orderMake = async(req,res)=>{

    try{
       
    const {allItems,orderBy,amount,QtyById} = req.body;

    const createOrder = new orderModel({
       
        items : allItems,
        orderBy : orderBy,
        payment : amount,
        quantityByItem : QtyById
    })

    await createOrder.save()

    
     let details = Object.entries(QtyById)
     console.log(details)

     for(let i=0;i<details.length;i++){
       
        console.log("filter",details[i][0])
        let data = await cartModel.findById(details[i][0]).populate({
            path: 'cartItems',
            select: '_id quantity' 
        })
        .select("-_id -addedByUser")    

        let itemId = data.cartItems._id

        let stockQty = data.cartItems.quantity;

        let remainQty = stockQty - details[i][1];

        console.log(itemId,stockQty,remainQty)

        let updateQty = await productModel.findByIdAndUpdate(itemId, {quantity : remainQty},{ new: true })

        console.log("data",data)
        console.log(updateQty)
     }

      res.status(200).send({message : "order created", data : createOrder})
    }catch(err){

        res.status(500).send({message : err.message})
    }
}

module.exports = orderMake;