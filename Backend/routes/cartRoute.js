const express= require("express")
const router = express.Router()

const {addtoCart,getAllItemsInCart,removeItemsInCart,EmptyTheCart} = require("../Controller/cartController")


router.post("/addtocart/:id",addtoCart)
router.get("/allCartItems/:userId",getAllItemsInCart)
router.delete("/:id",removeItemsInCart)
router.delete("/emptyTheCart/:userId",EmptyTheCart)

module.exports = router;