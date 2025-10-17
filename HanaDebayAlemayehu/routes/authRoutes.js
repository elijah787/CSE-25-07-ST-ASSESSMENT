const express = require("express");
const path = require("path");
const router = express.Router();

const User= require("../models/userModel");

router.get("/get-login", (req, res) =>{
    res.render("login")
});

















module.exports = router;
