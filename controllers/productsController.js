const Product = require("../models/Products")

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.createProduct = async (req, res) => {
    const { name, description, purchasePrice, price } = req.body
    if (!name || !price || !purchasePrice) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const product = await Product.create({ name, description, price, createdBy: req.user.id })
        res.status(201).json({ message: "Product created", product })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateProduct = async (req, res) => {
    const { id } = req.params
    const { name, description, price } = req.body

    if (!name || !description || !price) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await Product.updateOne({ _id: id }, { name, description, price });
        res.status(200).json({ message: "Product updated" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await Product.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Product deleted", product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getProductsByUser = async (req, res) => {
    try {
        const products = await Product.find({ createdBy: req.user.id })
        if (products.length < 1) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
