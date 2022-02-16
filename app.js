const path = require("path");
const express = require("express");
const app = express();

const publicPath =  path.resolve(__dirname ,'./public')
app.use(express.static(publicPath))



app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./src/views/index.html"));
});

app.get("/productCart", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./src/views/productCart.html"));
});

app.get("/productDetail", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./src/views/productDetail.html"));
});


app.get("/login", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./src/views/users/login.html"));
});

app.listen(3050, () => {
    console.log("Servidor corriendo");
  });