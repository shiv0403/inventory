import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./AddProduct.css";
import PhotoUpload from "./PhotoUpload/PhotoUpload";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function AddProduct() {
  const navigate = useNavigate();
  const userId = "637e63ea8f7ae659909dc30e";

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("");

  const [open, setOpen] = React.useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function getCategories() {
      axios
        .get("/api/category/get-categories")
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getCategories();
  }, []);

  const handleFileChange = async (file, index) => {
    try {
      const response = await axios.get("/api/product/product-image");
      const uploadUrl = response.data.uploadUrl;
      await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file,
      }).then((res) => {
        const imgLink = uploadUrl.split("?")[0];
        console.log(imgLink);
        setImage(imgLink);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    console.log("submit btn");
    try {
      for (let i = 0; i < categories.length; ++i) {
        if (categories[i].name === selectedCategory) {
          setCategoryId(categories[i]._id);
        }
      }

      axios
        .post("/api/product/create-product", {
          userId,
          name,
          desc: description,
          price,
          image,
          categoryId,
        })
        .then((res) => {
          console.log("Product added");
          navigate("/");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategory = async () => {
    await axios
      .post("/api/category/create-category", { name: newCategory, userId })
      .then((res) => {
        console.log(res.data);
        setCategories([...categories, res.data]);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="addProduct">
      {/* modal */}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <input
              type="text"
              placeholder="Category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button onClick={handleCategory}>Submit</button>
          </Box>
        </Modal>
      </div>

      <div>
        <h1 className="addProduct-heading">Add new product...</h1>
      </div>
      <div className="addProduct-form">
        <form>
          <div className="addProduct-div">
            <p>Enter product name</p>
            <input
              type="text"
              name="productName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="addProduct-name addProduct-input"
            />
          </div>
          <div className="addProduct-div">
            <p>Enter Price ($)</p>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="addProduct-price addProduct-input"
            />
          </div>

          <div className="addProduct-div">
            <p>Enter description</p>
            <input
              type="text"
              name="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter..."
              className="addProduct-input"
            />
          </div>

          <div className="addProduct-div">
            <p>Select category</p>
            <div>
              <select
                className="addProduct-category addProduct-input"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories?.map((category) => (
                  <option key={category._id}>{category?.name}</option>
                ))}
              </select>
              <button className="addProduct-newCategory" onClick={handleOpen}>
                Add new +
              </button>
            </div>
          </div>
          <div className="addProduct-div">
            <p style={{ marginBottom: "5px" }}>Select an image</p>
            {image ? (
              <div
                className="addProduct-previewImg"
                style={{ height: "100px", width: "100px" }}
              >
                <img src={image} alt="image" />
              </div>
            ) : (
              <PhotoUpload handleFileChange={handleFileChange} index={1} />
            )}
          </div>
        </form>
        <div>
          <button className="addProduct-button" onClick={handleSubmit}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
