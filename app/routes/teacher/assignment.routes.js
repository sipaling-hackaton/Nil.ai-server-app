const express = require("express");
const router = express.Router();
const middlewares = require('../../middlewares/user.middleware');
const AssignmentController = require('../../controllers/teacher/assignment.controller');

router.use(middlewares.authenticated);

router.get('/class/:id', AssignmentController.getAllAssignments);
router.get('/:id', AssignmentController.getSpecificAssignment);
router.post('/', AssignmentController.createNewAssignment);
router.put('/:id', AssignmentController.updateAssignmentData);


module.exports = router;