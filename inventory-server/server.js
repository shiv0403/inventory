require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/User");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const dbConnect = require("./config/dbConnect");

const authAPI = require("./apis/authAPI");

const emailAPI = require("./apis/emailAPI");

const productAPI = require("./apis/productAPI");

const categoryAPI = require("./apis/categoryAPI");

//connect to database
dbConnect();

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes

app.get("/", (req, res) => {
  res.send("inventory auth server");
});

//apis
app.use("/api/auth", authAPI);
app.use("/api/email", emailAPI);
app.use("/api/product", productAPI);
app.use("/api/category", categoryAPI);

//port

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));
