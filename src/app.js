const path = require("path");
const express = require("express");
const app = express();

const webRoutes =  require('./routers/webRoutes.js');
const PORT = 3050;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.resolve(__dirname, '../public')));

app.use("/", webRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

