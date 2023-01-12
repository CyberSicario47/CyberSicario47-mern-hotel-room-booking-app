const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post("/register", async (req, res) => {
  console.log(req.body)
  const email = req.body.email;

  const user = new User({
    name: req.body.name,
    email: email,
    password: req.body.password,
  });
  try {
    const oldUser = await User.findOne({ email: email });
    if (!oldUser) {
      await user.save(user);
      return res.send("User Saved Successfully");
    }
    console.log(oldUser);
    return res.send("user Already exists");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/login", async (req, res) => {
  const {email, password} = req.body;
  try {
    const savedUser = await User.findOne(
      { email: email },
      { password: password }
    );
    if (savedUser) {
      res.send(savedUser);
    } else {
      return res
        .status(400)
        .json({ message: "Login failed invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.get("/allusers", async (req, res) => {
  try {
    const users = await User.find({});
    return res.json({ users });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(`${req.params.id}`);
    return res.json({ user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
