const productModel = require('../models/productModel');
const {
  addToCart,
  removeFromCart,
  updateQuantity,
  getCart,
  cartItemCount
} = require('../models/cartModel');

function buildCartItems(session) {
  const rawCart = getCart(session);
  return rawCart.map((item) => {
    const product = productModel.getProductById(item.id);
    return {
      ...item,
      product,
      subtotal: product ? product.price * item.quantity : 0
    };
  });
}

function getCartPage(req, res) {
  const cartItems = buildCartItems(req.session);
  const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  res.render('cart', {
    cart: cartItems,
    cartCount: cartItemCount(req.session),
    total,
    error: null
  });
}

function postAddToCart(req, res) {
  const productId = Number(req.params.id);
  const product = productModel.getProductById(productId);

  if (!product) {
    return res.status(404).render('errors/404', {
      cartCount: cartItemCount(req.session)
    });
  }

  if (product.stock === 0) {
    const relatedProducts = productModel.getProductsByCategory(product.category)
      .filter(p => p.id !== product.id)
      .slice(0, 4);

    return res.render('product', {
      product,
      relatedProducts,
      cartCount: cartItemCount(req.session),
      error: 'No se puede agregar al carrito porque el producto está sin stock.'
    });
  }

  const result = addToCart(req.session, productId);
  if (result.error) {
    const cartItems = buildCartItems(req.session);
    const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
    return res.render('cart', {
      cart: cartItems,
      cartCount: cartItemCount(req.session),
      total,
      error: result.error
    });
  }

  res.redirect('/cart');
}

function postRemoveFromCart(req, res) {
  removeFromCart(req.session, Number(req.params.id));
  res.redirect('/cart');
}

function postUpdateQuantity(req, res) {
  const quantity = Number(req.body.quantity);
  const result = updateQuantity(req.session, Number(req.params.id), quantity);

  if (result.error) {
    const cartItems = buildCartItems(req.session);
    const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
    return res.render('cart', {
      cart: cartItems,
      cartCount: cartItemCount(req.session),
      total,
      error: result.error
    });
  }

  res.redirect('/cart');
}

function getCheckout(req, res) {
  res.render('checkout', {
    cartCount: cartItemCount(req.session)
  });
}

module.exports = {
  getCartPage,
  postAddToCart,
  postRemoveFromCart,
  postUpdateQuantity,
  getCheckout
};
