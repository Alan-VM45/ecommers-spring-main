const express = require('express');
const router = express.Router();

// GET /profile - Página de perfil
router.get('/', (req, res) => {
  res.render('profile');
});

module.exports = router;