const express = require('express');
const router = express.Router();

// Datos simulados de productos
const products = {
  1: {
    title: 'Coca-Cola Lata 220ml Pack x6',
    image: '/images/imagenes/coca cola.webp',
    description: 'Un refresco clásico. Pack de 6 latas de 220ml cada una. Ideal para tus comidas o reuniones.',
    price: '760',
    suggestions: [
      { id: 2, name: 'Blue Label', image: '/images/imagenes/thumb_70661_default_big.jpeg' },
      { id: 3, name: 'Producto 3', image: '/images/imagenes/OIP.webp' },
      { id: 4, name: 'Producto 4', image: '/images/imagenes/OIP.webp' },
      { id: 5, name: 'Producto 5', image: '/images/imagenes/OIP.webp' }
    ]
  },
  2: {
    title: 'Blue Label 750ml',
    image: '/images/imagenes/thumb_70661_default_big.jpeg',
    description: 'Blue Label es un whisky escocés premium de Johnnie Walker, conocido por su sabor suave, complejo y su mezcla de whiskies añejos de alta calidad.',
    price: '7.000',
    suggestions: [
      { id: 1, name: 'Coca-Cola Pack x6', image: '/images/imagenes/coca cola.webp' },
      { id: 3, name: 'Producto 3', image: '/images/imagenes/OIP.webp' },
      { id: 4, name: 'Producto 4', image: '/images/imagenes/OIP.webp' },
      { id: 5, name: 'Producto 5', image: '/images/imagenes/OIP.webp' }
    ]
  }
};

// GET /product/:id - Página de producto
router.get('/:id', (req, res) => {
  const productId = req.params.id;
  const product = products[productId];
  if (product) {
    res.render('product', product);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

module.exports = router;