const express = require('express');
const router = express.Router();

// GET / - Página de login
router.get('/', (req, res) => {
  res.render('index');
});

// POST /home - Procesar login (simulado)
router.post('/home', (req, res) => {
  // Aquí iría la lógica de autenticación
  // Por ahora, redirigir a home
  res.redirect('/home');
});

module.exports = router;