const productModel = require('../models/productModel');
const { cartItemCount } = require('../models/cartModel');

function getHome(req, res) {
  const category = req.query.category || '';
  const search = req.query.search || '';

  let products = productModel.getAllProducts();
  if (category) {
    products = productModel.getProductsByCategory(category);
  }
  if (search) {
    products = productModel.searchProducts(search);
  }

  const topProducts = productModel.getTopProducts();
  const suggestedProducts = productModel.getSuggestedProducts();
  const popularProducts = productModel.getTopProducts();

  res.render('home', {
    products,
    topProducts,
    suggestedProducts,
    popularProducts,
    search,
    category,
    cartCount: cartItemCount(req.session)
  });
}

module.exports = {
  getHome
};
