const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const loginSchema = new mongoose.Schema(
    {
        email:{
            type: email,
            required: true
        },
        password:{
            type:password,
            required: true
        }

});

module.exports = mongoose.model('Login', signupSchema)