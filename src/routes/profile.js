const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// GET /profile - Perfil
router.get('/', mainController.profile);

module.exports = router;