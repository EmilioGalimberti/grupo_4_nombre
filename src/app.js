const path = require("path");
const express = require("express");
const app = express();
const webRoutes =  require('./routers/webRoutes.js');

app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, '../public')));

app.use("/", webRoutes);

app.listen(3050, () => {
    console.log("Servidor corriendo");
});

