const cartModel = require("../model/cartModel")


const addtoCart = async(req,res)=>{
    
    try{
    
    const {id} = req.params;

    

    const verifyProduct = await cartModel.findOne({cartItems : id})

    if(verifyProduct){

        res.status(403).send({message : "The item already exists"})
    }else{

        let newProduct = new cartModel({
            cartItems : id,
        })

        await newProduct.save()

        res.status(200).send({message : "The item is add to cart"})
    }
    }catch(err){
        res.status(500).send({message :err.message})
    }

}

const getAllItemsInCart = async(req,res)=>{
   try{
    const items = await cartModel.find({}).populate({path : "cartItems",select : "productName productImage description categoryName price quantity"  ,strictPopulate: false })
    if(!items){
        res.status(400).status({message : "There is no items in the cart"})
    }else{

        res.status(200).send(items)
    }
   }catch(err){
      res.status(500).send({message : err.message})
   }
}

const removeItemsInCart = async(req,res)=>{

    try{
    
    const {id} = req.params;

    const removeItem = await cartModel.findByIdAndDelete(id)

    res.status(200).send({message : "The item is removed",removeItem})
    
   }catch(err){

    res.status(500).send({message : err.message})
    }
}

const EmptyTheCart = async(req,res)=>{
   

    try{

        const removeFromCart = await cartModel.deleteMany({})

        res.status(200).send({message : "Items removed",removeFromCart})
   
    }catch(err){
        res.status(500).send({message : err.message})
    }
}


module.exports = {addtoCart,getAllItemsInCart,removeItemsInCart,EmptyTheCart};