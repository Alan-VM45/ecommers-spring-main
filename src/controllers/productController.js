const productModel = require('../models/productModel');
const { cartItemCount } = require('../models/cartModel');

function getProductDetail(req, res) {
  const product = productModel.getProductById(req.params.id);
  if (!product) {
    return res.status(404).render('404', {
      cartCount: cartItemCount(req.session)
    });
  }

  const suggestions = productModel.getSuggestedProducts(product);

  res.render('product', {
    product,
    suggestions,
    cartCount: cartItemCount(req.session)
  });
}

module.exports = {
  getProductDetail
};
