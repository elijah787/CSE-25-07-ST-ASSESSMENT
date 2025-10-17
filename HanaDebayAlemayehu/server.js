const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();


mongoose.connect(process.env.ASSESEMENTDB).then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Error", err));


app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))