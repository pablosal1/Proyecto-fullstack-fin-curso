require("./config/config");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const logins = require("./Controller/loginController");
const productos = require("./Controller/productosController");
const cors = require("cors");


// Antes de los endpoints, usamos los middlewares
app.use(express.json());

// informacion del archivo .env
const dotenv = require("dotenv");
dotenv.config();


// endpoint

app.use(cors({
    origin: 'http://localhost:3000', // Reemplaza con la URL de tu aplicación de frontend
    credentials: true,
    sameSite: 'Lax' 
  }));
app.use("/users", logins);
app.use("/auth", logins);
app.use("/productos", productos);
app.use('/imagenes', express.static('imagenes'));




// conexion a base de datos.

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
     

});

const db = mongoose.connection;

db.on("error", err => console.log("Connection to DB failed: ", err));
db.once("open", () => console.log("Connected to DB successfuly"));


app.listen(process.env.PORT , () => console.log("listening on port ", process.env.PORT)); 




