const express = require("express");
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productsController");
const authMiddleware = require("./authMiddleware");
const router = express.Router();

router.get("/products", authMiddleware, getProducts);
router.get("/products/:id", authMiddleware, getProduct);
router.post("/products", authMiddleware, createProduct);
router.patch("/products/:id", authMiddleware, updateProduct);
router.delete("/products/:id", authMiddleware, deleteProduct);

module.exports = router;