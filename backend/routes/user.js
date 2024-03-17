const express = require("express");
const UserModel = require("../models/user");
const router = express.Router();
const {
  successResponse,
  failureResponse,
} = require("../utils/responseFormate");

//to create user to start game //

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
