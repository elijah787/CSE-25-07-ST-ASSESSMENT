require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

const authRoutes = require("./routes/authRoutes")


mongoose.connect(process.env.ASSESEMENTDB).then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Error", err));


app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));


app.use("/", authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
