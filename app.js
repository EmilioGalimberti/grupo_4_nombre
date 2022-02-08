const path = require("path");
const express = require("express");
const app = express();

const publicPath =  path.resolve(__dirname ,'./public')
app.use(express.static(publicPath))

app.listen(3050, () => {
    console.log("Servidor corriendo");
  });

  
app.get("/productCart", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/productCart.html"));
  });