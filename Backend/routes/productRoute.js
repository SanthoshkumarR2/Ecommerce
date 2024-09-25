const express= require("express")
const dotenv = require("dotenv")

dotenv.config();
const router = express.Router()


const {createProduct,getAllProducts,findSingleProduct, categoryFilter} = require("../Controller/productController");
const { updateProduct } = require("../Controller/productController");
const { SearchProduct } = require("../Controller/productController");


router.post("/create",createProduct)
router.get("/getAll",getAllProducts)
router.get("/singleProduct/:id",findSingleProduct)
router.put("/:id",updateProduct)
router.get("/search/:keyword",SearchProduct)
router.post("/product-filter",categoryFilter);

module.exports = router;