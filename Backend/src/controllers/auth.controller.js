const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache")
const blacklistModel = require("../models/blacklist.model")


async function registerController(req, res) {
  const { username, email, password } = req.body;
  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User is already registered",
    });
  }
  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "User registered successfully",
    user: {
      username: user.username,
      id: user._id,
      email: user.email,
    },
  });
}

async function loginController(req, res) {
  const { email, password, username } = req.body;
  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  }).select("+password");
  if (!user) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );
  res.cookie('token',token);
  return res.status(200).json({
    message:"User logged in",
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
  })
}

async function getMe(req,res) {
    const user = await userModel.findById(req.user.id)

    return res.status(200).json({
        message:"User fetched",
        user
    })
}

async function logoutController(req,res) {
    const token = req.cookies.token

    res.clearCookie("token")

    await redis.set(token,Date.now().toString(),"EX",60*60)

    return res.status(200).json({
        message:"User logged out"
    })
}


module.exports = {
  registerController,
  loginController,
  getMe,
  logoutController
};
