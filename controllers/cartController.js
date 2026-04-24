const {
  addToCart,
  removeFromCart,
  updateQuantity,
  getCart,
  cartItemCount
} = require('../models/cartModel');

function getCartPage(req, res) {
  const cart = getCart(req.session);
  res.render('cart', {
    cart,
    cartCount: cartItemCount(req.session),
    error: null
  });
}

function postAddToCart(req, res) {
  const result = addToCart(req.session, req.params.id);
  if (result.error) {
    return res.render('cart', {
      cart: getCart(req.session),
      cartCount: cartItemCount(req.session),
      error: result.error
    });
  }

  res.redirect('/cart');
}

function postRemoveFromCart(req, res) {
  removeFromCart(req.session, req.params.id);
  res.redirect('/cart');
}

function postUpdateQuantity(req, res) {
  const quantity = Number(req.body.quantity);
  const result = updateQuantity(req.session, req.params.id, quantity);

  if (result.error) {
    return res.render('cart', {
      cart: getCart(req.session),
      cartCount: cartItemCount(req.session),
      error: result.error
    });
  }

  res.redirect('/cart');
}

module.exports = {
  getCartPage,
  postAddToCart,
  postRemoveFromCart,
  postUpdateQuantity
};
