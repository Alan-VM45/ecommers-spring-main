const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// GET /cart - Página del carrito
router.get('/', cartController.getCartPage);

// POST /cart/add/:id - Agregar producto al carrito
router.post('/add/:id', cartController.postAddToCart);

// POST /cart/remove/:id - Quitar producto del carrito
router.post('/remove/:id', cartController.postRemoveFromCart);

// POST /cart/update/:id - Cambiar cantidad
router.post('/update/:id', cartController.postUpdateQuantity);

module.exports = router;