const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const PassportLocal = require("passport-local").Strategy;

const app = express();
app.set("view engine", "ejs");
app.set("port", 3000);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secreto"));
app.use(
  session({
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new PassportLocal((username, password, done) => {
    if (username === "paiva" && password === "1234") {
      return done(null, { id: 1, name: "Paiva" });
    }
    done(null, false);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, { id: 1, name: "Paiva" });
});

app.get(
  "/" /*
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    else res.redirect("/login");
  },*/,
  (req, res) => {
    res.send("/login");
  }
);

app.get("/login", (req, res) => {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    succesRedirect: "/",
    failureRedirect: "/login",
  })
);

app.listen(app.get("port"), () => {
  console.log("server initialized on port:", app.get("port"));
});
