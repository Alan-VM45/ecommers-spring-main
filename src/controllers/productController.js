const productsService = require('../services/productsService');
const cartService = require('../services/cartService');

function getProductDetail(req, res) {
  // US #17: Validar y normalizar ID
  const normalizedId = productsService.normalizeId(req.params.id);
  if (!normalizedId.isValid) {
    return res.status(400).render('errors/404', {
      cartCount: cartService.getCartItemCount(req.session)
    });
  }

  const product = productsService.getProductById(normalizedId.id);
  if (!product) {
    return res.status(404).render('errors/404', {
      cartCount: cartService.getCartItemCount(req.session)
    });
  }

  // US #8: Productos relacionados por categoría
  const relatedProducts = productsService.getRelatedProducts(product, 4);

  res.render('product', {
    product,
    relatedProducts,
    cartCount: cartService.getCartItemCount(req.session)
  });
}

function getByCategory(req, res) {
  const category = req.params.category;
  const products = productsService.getProductsByCategory(category);
  
  res.render('category', {
    category,
    products,
    cartCount: cartService.getCartItemCount(req.session)
  });
}

module.exports = {
  getProductDetail,
  getByCategory
};
