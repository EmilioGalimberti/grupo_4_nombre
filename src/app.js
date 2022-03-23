const path = require("path");
const express = require("express");
const app = express();

const webRoutes =  require('./routes/webRoutes.js');
const routesProducts =  require('./routes/productsRoutes.js');
const PORT = 3050;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.resolve(__dirname, '../public')));

// RUTAS QUE SE USAN
app.use("/", webRoutes);
app.use("/products", routesProducts);

//metodo para PUT y DELETE
const methodOverride = require('method-override');
app.use(methodOverride("_method"));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

