const express = require("express");
const path = require("path");
const router = express.Router();

const User= require("../models/userModel");

router.get("/get-login", (req, res) =>{
    res.render("login")
});


router.get("/signup", (req, res)=>{
    res.render("signup")
});


router.get("/sucess", (req,res) => {
    res.render("sucess-page")
});














module.exports = router;
