const express = require("express");
const bp = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const routes = require("./routes/routes");

const app = express();

app.use(bp.json());
app.use(cors());
app.use("/", routes);
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 4000;

mongoose.connect(process.env.DB_URL).then((res) => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});
