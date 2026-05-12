const productModel = require('../models/productModel');
const { cartItemCount } = require('../models/cartModel');

function getProductDetail(req, res) {
  const product = productModel.getProductById(req.params.id);
  if (!product) {
    return res.status(404).render('errors/404', {
      cartCount: cartItemCount(req.session)
    });
  }

  // US #8: Productos relacionados por categoría
  let relatedProducts = [];
  if (product.category) {
    relatedProducts = productModel.getProductsByCategory(product.category)
      .filter(p => p.id !== product.id); // No incluir el producto actual
  }

  // Si hay más de 4, seleccionar 4 al azar
  if (relatedProducts.length > 4) {
    relatedProducts = relatedProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
  }

  res.render('product', {
    product,
    relatedProducts,
    cartCount: cartItemCount(req.session)
  });
}

function getByCategory(req, res) {
  const category = req.params.category;
  const products = productModel.getProductsByCategory(category);
  
  res.render('category', {
    category,
    products,
    cartCount: cartItemCount(req.session)
  });
}

module.exports = {
  getProductDetail,
  getByCategory
};
