import React from "react";
import "./Product.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "../../../axios";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};

function Product({ productId, name, description, categoryName, price, image }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const handleDelete = async () => {
    await axios
      .delete("/api/product/delete-product", { params: { id: productId } })
      .then((res) => {
        console.log("product deleted");
        window.location.reload();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="product">
      {/* delete product modal */}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="product-deleteModal">
              <p>Delete this product?</p>
              <div>
                <button className="product-deleteBtn" onClick={handleDelete}>
                  Yes
                </button>
                <button className="product-deleteBtn" onClick={handleClose}>
                  No
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>

      {/* product image */}
      <div className="product-img">
        <img src={image} alt="product" />
      </div>
      <div className="product-details">
        <p className="product-name">{name}</p>
        <p className="product-price">${price}</p>
      </div>
      <div className="product-author">
        <p>{description}</p>
        <p className="product-category">#{categoryName}</p>
      </div>
      <div className="product-update">
        <button
          onClick={handleOpen}
          className="product-deleteBtn"
          style={{ marginRight: "5px" }}
        >
          Delete Item
        </button>
        <button className="product-deleteBtn">Edit Item</button>
      </div>
    </div>
  );
}

export default Product;
