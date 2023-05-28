const mongoose = require("mongoose");
const Schema = mongoose.Schema;



let loginSchema = new Schema({

    nombre: {
        type: String,
        required: false

    },

    apellidos: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: [ "Username is require"],
        trim: true,
    },


    email: {
        type: String,
        unique: true,
        required: [ "Email is required"],
        trim: true,
        minlength: 6,

    },
    password: {
        type: String,
        required: [ "Password is required"],
        unique: true,
        trim: true,
        minlength: 60,
        maxlength: 60
    },

    role: {
        type: String,
        required: [true, "Role is required"],
        enum: ["admin", "user"],
        trim: true,
        default: "user"

    },
    
    file: {
        type: String,
        default: "default.png"
    }

} 

);





const Login = mongoose.model("Login", loginSchema);

module.exports = Login;
