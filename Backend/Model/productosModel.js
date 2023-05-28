const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let productosSchema = new Schema({
    nombrePastel: {
        type: String,
        required: [true, "Nombre pastel is required"]
    },
   
    precio:{
        type: String,
        required: [true, "Precio is required"]
    },
 
    file: {
        type:String,
        default: "default.png"
    },
    active: {
        type: Boolean,
        default: true
    }
    
});



const Productos = mongoose.model("Productos", productosSchema);

module.exports = Productos;