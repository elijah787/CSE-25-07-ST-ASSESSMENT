const express = require("express");
const path = require("path");
const router = express.Router();

const User= require("../models/userModel");
const { error } = require("console");

router.get("/login", (req, res) =>{
    res.render("login")
});

router.post("/login", async (req, res) => {
    try {
    const { email, password } = req.body;
    const user = await User.findOne({email})
    if(!user){
        return res.render("login" ,{error: "Invalid email/phone or password"})
    }
    res.redirect("/sucess")
        
    } catch (error) {
        console.error("Login Error", err);
        res.render("login", {error: "Something went wrong. Please try again."})
    }

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
