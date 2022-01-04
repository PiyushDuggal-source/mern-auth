const express = require("express");
const UserInfo = require("../models/models");
const routes = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

routes.get("/getUserInfos", (req, res) => {
  console.log(`${req.path} IS REACHED WITH ${req.method}`);
  UserInfo.find().then((users) => {
    const array = [];
    users.forEach((user) => {
      array.push({ name: user.name, hobby: user.hobby, salary: user.salary });
    });

    res.json(array);
  });
});

routes.post("/login", async (req, res) => {
  console.log(`${req.path} IS REACHED WITH ${req.method}`);
  const userInfo = req.body;
  const user = await UserInfo.findOne({
    email: userInfo.email,
  });

  if (!user) {
    return res.json({
      status: "not ok",
      error: "Invalid Email or Password",
      user: false,
    });
  }

  const isValidPassword = await bcrypt.compare(
    userInfo.password,
    user.password
  );
  if (!isValidPassword) {
    return res.json({
      status: "not ok",
      error: "Invalid Email or Password",
    });
  } else {
    const token = jwt.sign(
      {
        email: user.email,
        name: user.name,
        userId: user._id,
      },
      "samsoong"
    );
    res.json({ status: "ok", user: token, userId: user._id });
  }
});

routes.post("/signUp", async (req, res) => {
  console.log(`${req.path} IS REACHED WITH ${req.method}`);
  const userInfo = req.body;

  const newPassword = await bcrypt.hash(userInfo.password, 10);

  try {
    await UserInfo.create({
      email: userInfo.email,
      password: newPassword,
      name: userInfo.name,
      hobby: null,
      salary: null,
    });
    console.log("saved");
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: "Email is already in use!" });
  }
});

routes.get("/single", async (req, res) => {
  console.log(`${req.path} IS REACHED WITH ${req.method}`);
  const token = req.headers["x-access-token"];
  const user = jwt.decode(token);
  if (!user) {
    return;
  }
  await UserInfo.findOne({ email: user.email })
    .then((foundUser) => {
      res.json({
        name: foundUser.name,
        userId: foundUser._id,
        hobby: foundUser.hobby,
        salary: foundUser.salary,
        email: foundUser.email,
      });
    })
    .catch((err) => console.log(err));
});

routes.patch("/addDetails/:id", (req, res) => {
  console.log(`${req.path} IS REACHED WITH ${req.method}`);
  const id = req.params.id;

  UserInfo.findByIdAndUpdate(id, {
    $set: {
      hobby: req.body.hobby,
      salary: req.body.salary,
    },
  })
    .then((result) => {
      console.log("added the details");
    })
    .catch((err) => console.log(err));
});

routes.delete("/delete/:id", async (req, res) => {
  console.log(`${req.path} IS REACHED WITH ${req.method}`);
  try {
    await UserInfo.findByIdAndDelete(req.params.id).then((user) => {
      res.send({ status: "ok", message: `User:${user.name} has been deleted` });
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = routes;
