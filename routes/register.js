const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

// GET /register - Página de registro
router.get('/', registerController.getRegister);

// POST /register - Procesar registro
router.post('/', registerController.postRegister);

module.exports = router;