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

  res.render('home', {
    products,
    topProducts,
    suggestedProducts,
    search,
    category,
    cartCount: cartItemCount(req.session)
  });
}

module.exports = {
  getHome
};
