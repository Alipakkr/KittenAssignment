const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const cookieparser = require("cookie-parser");
const router = express.Router();
const {
  generateOtp,
  sendEmailVerification,
} = require("../controller/middlewares/otpRegistration.middleware");
const {
  redisClient,
} = require("../controller/middlewares/redis.middleware");

const {
  successResponse,
  failureResponse,
} = require("../utils/responseFormate");

//to create user to start game //

router.post("/register", async (req, res) => {
  const { username, email, password, otp } = req.body;

  try {
    if (
      !/[A-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/[!@#$%^&*()_+{}[;]/.test(password) ||
      password.length < 8
    ) {
      return res.status(400).json({ msg: "Cannot register" });
    }
    if (email || username) {
      const existEmailUser = await UserModel.findOne({ email });
      const existnameUser = await UserModel.findOne({ username });
      console.log(existnameUser);
      if (existEmailUser) {
        return res.status(400).json({ msg: "Email already exists" });
      }
      if (existnameUser) {
        return res.status(400).json({ msg: "username already exists" });
      }

      const storedOTP = await redisClient.get(email);
      if (storedOTP && storedOTP === otp) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({ username, email, password: hashedPassword });
        await user.save();
        res
          .status(200)
          .json({ msg: "User registered successfully", registeredUser: user });
      } else {
        console.log(storedOTP, " ", otp);
        res
          .status(400)
          .json({ error: "Invalid or expired OTP.Please request a new otp" });
      }
      // }
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  const otp = generateOtp();
  try {
    if (email) {
      const existEmailUser = await UserModel.findOne({ email });
      if (existEmailUser) {
        return res.status(400).json({ msg: "Email already exists" });
      }
      await redisClient.setex(email, 120, otp.toString());
      sendEmailVerification(email, otp);
      res.status(200).json({ msg: "OTP sent successfully" });
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

router.post("/login", async (req, res) => {
  const { emailOrUserName, password } = req.body;

  try {
    const user = await UserModel.findOne({
      $or: [{ email: emailOrUserName }, { username: emailOrUserName }],
    });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(400).json({ msg: "User does not exist!!!" });
        }
        if (result) {
          const access_token = jwt.sign(
            { userID: user._id, username: user.username },
            "SocialSnap",
            { expiresIn: "7d" }
          );
          const refresh_token = jwt.sign(
            { userID: user._id, username: user.username },
            "SocialSnap",
            { expiresIn: "14d" }
          );

          res.cookie("access_token", access_token, { httpOnly: true });
          res.cookie("refresh_token", refresh_token, { httpOnly: true });

          res.status(200).json({
            msg: "Login successful!",
            name: user.username,
            access_token,
            refresh_token,
          });
        } else {
          res.status(400).json({ msg: "Incorrect password!" });
        }
      });
    } else {
      res.status(400).json({ msg: "User does not exist!!!" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/createUser", async (req, res) => {
  try {
    console.log(req.body);
    let user = await UserModel.findOne({ username: req.body.username });
    if (user) {
      return successResponse(res, "user is already exists", user);
    }

    let newUser = await UserModel.create({
      username: req.body.username,
    });

    return successResponse(res, "username is created", newUser);
  } catch (error) {
    return failureResponse(res, error.message, error);
  }
});

//to get exist user details //

router.get("/getUser/:username", async (req, res) => {
  try {
    let user = await UserModel.findOne({ username: req.params.username });
    return successResponse(res, "User detail", user);
  } catch (error) {
    return failureResponse(res, error.message, error);
  }
});

// to updates users matches won (game points)

router.put("/updateUser", async (req, res) => {
  try {
    let user = await UserModel.findOne({ username: req.body.username });

    let newMatchesWon = parseInt(req.body.matchesWon);

    user.matchesWon = newMatchesWon;
    await user.save();

    return successResponse(res, "user is updated", user);
  } catch (error) {
    return failureResponse(res, error.message, error);
  }
});

// to fetch all users to show on leaderboard //

router.get("/fetchUsers", async (req, res) => {
  try {
    let users = await UserModel.find().sort({ matchesWon: -1 });
    return successResponse(res, "List of all users", users);
  } catch (error) {
    return failureResponse(res, error.message, error);
  }
});

module.exports = router;
