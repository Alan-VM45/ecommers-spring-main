const express = require('express');
const router = express.Router();

// GET /cart - Página del carrito
router.get('/', (req, res) => {
  res.render('cart');
});

module.exports = router;