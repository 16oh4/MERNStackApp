//USER SCHEMA
const mongoose = require('mongoose');

//Mongoose schema constructor
const Schema = mongoose.Schema;

//SINGLE FIELD
//trim: means whitespace will be removed
//timestamps for keeping track of creation/modification times

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
},
    {
        timestamps: true,
    }

);

const User = mongoose.model('User', userSchema);

//allow server.js to use the User model by attaching it as a property of module.exports
module.exports = User;