const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");

const express = require("express");

const router = express.Router();

router.post("/create-category", createCategory);
router.get("/get-categories", getCategories);

module.exports = router;
