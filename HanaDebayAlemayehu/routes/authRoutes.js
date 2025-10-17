const express = require("express");
const path = require("path");
const router = express.Router();

const User= require("../models/userModel");

router.get("/login", (req, res) =>{
    res.render("login")
});

router.post("/login", async (req, res) => {

})


router.get("/signup", (req, res)=>{
    res.render("signup")
});


router.post("/signup", async (req, res) => {
    
})

router.get("/sucess", (req,res) => {
    res.render("sucess-page")
});














module.exports = router;
