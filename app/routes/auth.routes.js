const express = require("express");
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

// TEST ROUTE 
router.get('/', AuthController.test);


module.exports = router;