const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

/* GET login page. */
router.get('/', indexController.getLogin);

// POST /home - Procesar login
router.post('/home', indexController.postLogin);

module.exports = router;