const mongoose = require("mongoose")

const DbConnect = async(req,res)=>{

    try{

       await mongoose.connect(process.env.MONGO_URI)
       console.log("Db connected")
    }
    catch(err){
      console.log(err.message)

    }


}

module.exports = DbConnect;