const express = require("express");
const engine = require("ejs-mate");
const path = require("path");
const morgan = require("morgan");

const app = express();

//settings
app.set("views", path.join(__dirname, "/models"));
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

//rutas
app.use("/", require("./routes/index"));

//start server
app.listen(app.get("port"), () => {
  console.log("initialized on port:", app.get("port"));
});

// app.get("/", (req, res) => {
//   res.send("hola mundo");
// });
