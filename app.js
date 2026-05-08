const express = require('express');
const session = require('express-session');
const app = express();
const port = 3001;

const path = require('path');

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para sesiones
app.use(session({
  secret: 'tu-secreto-aqui',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 horas
}));

// Rutas
const indexRoutes = require('./routes/index');
const homeRoutes = require('./routes/home');
const registerRoutes = require('./routes/register');
const profileRoutes = require('./routes/profile');
const cartRoutes = require('./routes/cart');
const productRoutes = require('./routes/product');

app.use('/', indexRoutes);
app.use('/home', homeRoutes);
app.use('/register', registerRoutes);
app.use('/profile', profileRoutes);
app.use('/cart', cartRoutes);
app.use('/product', productRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});