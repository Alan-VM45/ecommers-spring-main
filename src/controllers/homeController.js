const productsService = require('../services/productsService');
const cartService = require('../services/cartService');

function getHome(req, res) {
  const category = req.query.category || '';
  const search = req.query.search || '';

  let products = productsService.getAllProducts();
  if (category) {
    products = productsService.getProductsByCategory(category);
  }
  if (search) {
    products = productsService.searchProducts(search);
  }

  const topProducts = productsService.getTopProducts();
  const suggestedProducts = productsService.getSuggestedProducts();
  const popularProducts = productsService.getTopProducts();

  res.render('home', {
    products,
    topProducts,
    suggestedProducts,
    popularProducts,
    search,
    category,
    cartCount: cartService.getCartItemCount(req.session)
  });
}

module.exports = {
  getHome
};
