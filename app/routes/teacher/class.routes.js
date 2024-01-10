const express = require("express");
const router = express.Router();
const middlewares = require('../../middlewares/user.middleware');
const ClassController = require('../../controllers/teacher/class.controller');


router.use(middlewares.authenticated);

// TEST ROUTE
router.get('/', ClassController.test);


module.exports = router;