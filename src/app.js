const path = require("path");
const express = require("express");
const app = express();

const webRoutes =  require('./routes/webRoutes.js');
const routesProducts =  require('./routes/productsRoutes.js');
const PORT = 3050;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(express.urlencoded({extended: true})); //Esto es para formData
app.use(express.json())

const router = express.Router();
router.post('/modifyproduct', (req, res) => {
        res.send(req.body);
    }); 


//metodo para PUT y DELETE
const methodOverride = require('method-override');
app.use(methodOverride("_method"));

// RUTAS QUE SE USAN
app.use("/", webRoutes);
app.use("/products", routesProducts);





app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

