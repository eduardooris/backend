require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const productRoutes = require("./routes/productRoutes");
const { initIO, getIO } = require("./controllers/socket");
const cors = require("cors");
const config = require("./config");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log(`Connected on port -- ${PORT}`);
    const server = app.listen(PORT);
    initIO(server);
    getIO();
  })
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api", postRoutes);
app.use("/api", productRoutes);

