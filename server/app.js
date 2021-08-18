const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/auth");
const pinRoute = require("./routes/pins");
const path = require("path");
dotenv.config();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, DELETE, PATCH"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "origin, Authorization, Content-Type"
  );

  next();
});

app.use("/users", userRoute);
app.use("/pins", pinRoute);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
}

app.listen(process.env.PORT || 8080, () => {
  console.log("Backend server is running!");
});
