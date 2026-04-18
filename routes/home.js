const express = require('express');
const router = express.Router();

// GET /home - Página principal
router.get('/', (req, res) => {
  res.render('home');
});

module.exports = router;