const express = require("express");

const router = express.Router();

//root
router.get("/", (req, res, next) => {
  res.render("index.ejs");
});

//signup
router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.post("/signup", (req, res, next) => {
  console.log(req.body);
  res.send("received");
});

//signin
router.get("/signin", (req, res, next) => {
  res.render("signin");
});

router.post("/signin", (req, res, next) => {
  console.log(req.body);
  res.send("received");
});

module.exports = router;
