const express = require('express');
const router = express.Router();

// GET /register - Página de registro
router.get('/', (req, res) => {
  res.render('register');
});

// POST /register - Procesar registro (simulado)
router.post('/', (req, res) => {
  // Aquí iría la lógica de registro
  // Por ahora, redirigir a login
  res.redirect('/');
});

module.exports = router;