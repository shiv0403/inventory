const bcrypt = require("bcryptjs");
const User = require("../models/User");

const tokenGenerator = require("../config/createToken");
const {
  sendVerificationEmail,
  sendForgotPasswordEmail,
} = require("../config/sendEmail");

const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "please fill all fields" });
  }

  if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
    return res
      .status(400)
      .json({ success: false, msg: "please fill all fields" });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      msg: "password length should be greater than 8!",
    });
  }

  // check if user is already
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return res
      .status(403)
      .json({ success: false, msg: "This email is already taken!" });
  }

  //use Model and create new user
  bcrypt.genSalt(12, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const hashedPassword = hash;

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      //generate token
      const token = tokenGenerator({ email: newUser.email });

      //send email

      const link =
        "http://" + req.hostname + ":5000/api/email/verify?token" + token;

      const sendMail = await sendVerificationEmail(newUser.email, link);

      if (sendMail) {
        res.status(201).json({
          success: true,
          msg: "Registeerd successfully! Error in sending verification email please try again later ",
        });
      } else {
        res.status(201).json({
          success: true,
          msg: "Registeerd successfully ",
        });
      }
    });
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid Email/Password!" });
  }

  // finding old user
  const oldUser = await User.findOne({ email });

  if (!oldUser) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid Email/Password!" });
  }
  //comparing passwords`
  const comparePassword = await bcrypt.compare(password, oldUser.password);

  if (!comparePassword) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid Email/Password!" });
  }

  //generate token with user info

  const token = tokenGenerator({ email: oldUser.email, _id: oldUser._id });

  //login response
  res.status(200).json({ success: true, token, msg: "LogIn Successful" });

  res.send("all correct");
};

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, msg: "please enter valid email" });
  }

  if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
    return res
      .status(400)
      .json({ success: false, msg: "please enter valid email" });
  }

  //user presnt check

  const oldUser = await User.findOne({ email });

  if (!oldUser) {
    return res.status(404).json({ success: false, msg: "user not found" });
  }

  //send forgot pass email

  const token = tokenGenerator({ email: oldUser.email });

  const link =
    "http://" + req.hostname + ":5000/api/auth/verifyToken?token" + token;

  const sendMail = await sendForgotPasswordEmail(oldUser.email, link);

  if (sendMail) {
    res.status(201).json({
      success: true,
      msg: "error in sending email!",
    });
  } else {
    res.status(201).json({
      success: true,
      msg: "Rest password email sent!",
    });
  }
};

//reset password controller

const resetPasswordController = async (req, res) => {
  const { email, newPassword, confirmNewPassword } = req.body;

  if (!email || !newPassword || !confirmNewPassword) {
    return res
      .status(400)
      .json({ success: false, msg: "please fill all fields" });
  }

  if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
    return res
      .status(400)
      .json({ success: false, msg: "please enter valid email" });
  }

  const olduser = await User.findOne({ email });

  if (!oldUser) {
    return res.status(400).json({ success: false, msg: "User Not Found" });
  }

  // old password is matching or not

  if (newPassword !== confirmNewPassword_) {
    return res
      .status(400)
      .json({ success: false, msg: "passswords donot match" });
  }

  bcrypt.genSalt(12, (err, salt) => {
    bcrypt.hash(newPassword, salt, async (err, hash) => {
      const hashedPassword = hash;

      const updateData = await User.FindOneAndUpdate(
        { email },
        {
          $set: {
            password: hashedPassword,
          },
        }
      );

      if (updateData) {
        res
          .status(200)
          .send({ success: true, msg: "password updated successfully" });
      } else {
        res.status(500).send({ success: true, msg: "something went wrong!!" });
      }
    });
  });
};

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
};
