const Category = require("../models/Category");

const createCategory = (req, res) => {
  let { name, userId } = req.body;

  Category.create({
    name,
    userId,
  })
    .then((category) => {
      res.status(201).send(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ msg: "unable to add category" });
    });
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).send(categories);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "unable to fetch categories" });
  }
};

module.exports = { createCategory, getCategories };
