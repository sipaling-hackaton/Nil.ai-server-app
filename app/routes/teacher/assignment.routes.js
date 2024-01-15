const express = require("express");
const router = express.Router();
const middlewares = require('../../middlewares/user.middleware');
const AssignmentController = require('../../controllers/teacher/assignment.controller');

router.use(middlewares.authenticated);

router.post('/', AssignmentController.createNewAssignment);

module.exports = router;