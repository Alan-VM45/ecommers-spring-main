function cartItemCount(session) {
  if (!session || !session.cart) {
    return 0;
  }
  return session.cart.reduce((count, item) => count + (item.quantity || 0), 0);
}

function getCart(session) {
  return (session && session.cart) ? session.cart : [];
}

function addToCart(session, productId, quantity = 1) {
  if (!session) return;
  if (!session.cart) session.cart = [];

  const item = session.cart.find((entry) => entry.id === productId);
  if (item) {
    item.quantity += quantity;
  } else {
    session.cart.push({ id: productId, quantity });
  }
}

function removeFromCart(session, productId) {
  if (!session || !session.cart) return;
  session.cart = session.cart.filter((item) => item.id !== productId);
}

module.exports = {
  cartItemCount,
  getCart,
  addToCart,
  removeFromCart
};
