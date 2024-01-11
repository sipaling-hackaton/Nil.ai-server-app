const express = require("express");
const router = express.Router();
const middlewares = require('../../middlewares/user.middleware');
const ClassController = require('../../controllers/teacher/class.controller');


router.use(middlewares.authenticated);

// TEST ROUTE
router.get('/', ClassController.getAllClasses);
router.get('/:id', ClassController.getClassByID);
router.post('/', ClassController.createNewClass);
router.put('/', ClassController.updateClass);
router.delete('/', ClassController.deleteClass);


module.exports = router;