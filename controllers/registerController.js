const { cartItemCount } = require('../models/cartModel');

function getRegister(req, res) {
  res.render('register', {
    errors: [],
    username: '',
    email: '',
    cartCount: cartItemCount(req.session)
  });
}

function postRegister(req, res) {
  const { username, email, password } = req.body;
  const errors = [];

  if (!username || username.trim().length < 3) {
    errors.push('El nombre de usuario debe tener al menos 3 caracteres.');
  }
  if (!email || !email.includes('@')) {
    errors.push('Debes ingresar un correo válido.');
  }
  if (!password || password.length < 6) {
    errors.push('La contraseña debe tener al menos 6 caracteres.');
  }

  if (errors.length > 0) {
    return res.render('register', {
      errors,
      username,
      email,
      cartCount: cartItemCount(req.session)
    });
  }

  req.session.user = { username, email };
  res.redirect('/');
}

module.exports = {
  getRegister,
  postRegister
};
