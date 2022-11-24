const Category = require("../models/Category");
const Product = require("../models/Product");
const { generateUploadURL } = require("../s3");

const productImage = async function (req, res) {
  const uploadUrl = await generateUploadURL();
  console.log(uploadUrl);
  res.status(200).send({ uploadUrl });
};

const createProduct = async (req, res) => {
  let { userId, name, desc, price, image, categoryId } = req.body;
  console.log(req.body);
  try {
    const product = await Product.create({
      userId,
      name,
      description: desc,
      price,
      image,
      categoryId,
    });
    res.status(201).send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "unable to post product" });
  }
};

const updateProduct = async (req, res) => {
  let { productId, name, desc, price, image, categoryId } = req.body;

  try {
    const product = await Product.find({ _id: productId });

    if (!product) {
      return res.status(404).send({ msg: "product not found" });
    }
    const updatedProduct = await Product.updateOne(
      {
        _id: productId,
      },
      {
        name,
        description: desc,
        price,
        image,
        categoryId,
      }
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "unable to update product" });
  }
};

const deleteProduct = async (req, res) => {
  let { id } = req.query;

  Product.deleteOne({ _id: id })
    .then((result) => {
      res.status(201).send({ msg: "product deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ msg: "unable to delete product" });
    });
};

const getProducts = async (req, res) => {
  try {
    const products = await Category.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "categoryId",
          as: "products",
        },
      },
    ]);
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "unable to get products" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  productImage,
};
