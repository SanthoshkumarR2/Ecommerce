const productModel = require("../model/productModel")
// const cloudinary = require("cloudinary").v2;

const createProduct = async(req,res)=>{

      try{

        const {productName,productImage,categoryName,description,price,quantity} = req.body;
           
          const createOne = new productModel({
         
              productImage : productImage,
              productName : productName,
              categoryName : categoryName,
              description : description,
              price : price,
              quantity : quantity,
             
            })
           
            await createOne.save();

            console.log("product",createOne)
  
            res.status(200).send({message : "product created..!"})
       
       
      

    } catch(err){

         res.status(500).send({message : err.message})
      }    
}

const getAllProducts = async(req,res)=>{

   try{
    const allItems = await productModel.find({})
    
    if(allItems){
        res.status(200).send(allItems)
    }else{
        res.send({message : "No products find"})
    }
   }catch(err){

      res.status(500).send({message : err.message})   
    
    }
    
}

const findSingleProduct = async(req,res)=>{

    try{
    
    const {id} = req.params;
    
    const getSingle = await productModel.findById(id) 

    if(getSingle){
        res.status(200).send(getSingle)
    }else{
        res.send({message : "There is No product"})
    }
    }catch(err){
        res.status(500).send({message : err.message})
    }
}


const updateProduct = async(req,res)=>{

    try{

        const {id} = req.params;
        const {productName,productImage,categoryName,description,price,quantity} = req.body;
       
        let updateData ={}

       const checkData = await productModel.findById({_id : id})
        
        if(!checkData){
           res.status(404).send({message : "Product not found"})
        }else{
          
               
   
               updateData.productImage = productImage,
               updateData.productName = productName,
               updateData.description = description,
               updateData.categoryName = categoryName,
               updateData.price = price,
               updateData.quantity = quantity
           

           console.log(updateData)
   
           const Update = await productModel.findByIdAndUpdate(id,updateData,{ new: true })

           console.log(Update)

           res.status(200).send({message : "The Blog updated successfully"})
        }

    }catch(err){
        res.status(500).send({message : err.message})
    }
     
}


const SearchProduct = async(req,res)=>{
   
    
    try {
        const { keyword } = req.params;
        
        const results = await productModel
          .find({
            $or: [
              { productName: { $regex: keyword, $options: "i" } },
              { description: { $regex: keyword, $options: "i" } },
            ],
            
          })

          console.log(results)
         
        res.status(200).send(results);
      } catch (error) {
       
        res.status(400).send({
          success: false,
          message: error.message,
          error,
        });
      }
}



const categoryFilter = async (req,res) =>{

  try{
   
     const { checked} = req.body;

     console.log(checked)
       
    if(checked.length == 1 && checked.includes("others")){
     
      let values = ["electronics","dress","furnitures"]
      const datas = await productModel.find(
           {
            categoryName:{$nin: values},
          
          });
      res.status(200).send({success: true,datas});
      
    }
    else if(checked.length > 0 && !checked.includes("others")){
     
      const datas = await productModel.find({categoryName:{$in: checked}});
      console.log(datas)
      res.status(200).send({success: true,datas});
    }
    else if(checked.length == 0){
      
      const datas = await productModel.find({});
      res.status(200).send({success: true,datas}); 

    }else{
         const datas = await productModel.find({categoryName:{$in: checked}});
          console.log(datas)
          res.status(200).send({success: true,datas});
    
          } 
    }

 
 
  catch(error){
    
    console.log(error);
    res.status(400).send({

      success: false,
      message:"Error while filter the products",
      error
    })
}
}





module.exports = {createProduct,getAllProducts,findSingleProduct,updateProduct,SearchProduct,categoryFilter};