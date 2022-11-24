const {
  createProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  productImage,
} = require("../controllers/productController");

const router = require("express").Router();

router.get("/product-image", productImage);
router.post("/create-product", createProduct);
router.put("/update-product", updateProduct);
router.get("/get-products", getProducts);
router.delete("/delete-product", deleteProduct);

module.exports = router;
