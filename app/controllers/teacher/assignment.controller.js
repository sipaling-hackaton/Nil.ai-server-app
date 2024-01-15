const AssignmentRepository = require("../../repository/assignment.repository");
const { v4: uuid } = require("uuid");
const { ErrorResponseException, createErrorDetail } = require('../../helpers/errors/error_response');
const { validateQuestions } = require('../../service/assignment.service')
const dataValidator = require('../../helpers/validator');
const utils = require('../../helpers/utils');
const { ForeignKeyViolationError } = require("../../helpers/errors/custom_exception");
const { Model } = require("objection");



const createNewAssignment = async (req, res) => {
    try {

        const {
            title = "",
            description, 
            class_id = "", 
            open_sub_time = "", 
            close_sub_time = "",
            questions = [], // rubrics is embedded on the question
        } = req.body;

        const validationInfoList = []; 

        if (!dataValidator.stringIsNotEmpty(title))
        {
            validationInfoList.push(createErrorDetail("TITLE_EMPTY", "Class title must not be empty."));      
        }  

        if (!dataValidator.isValidDateTime(open_sub_time))
        {
            validationInfoList.push(createErrorDetail("OPEN_TIME_INVALID", "Assignment open time is not valid."));      
        } 
        
        if (!dataValidator.isValidDateTime(close_sub_time))
        {
            validationInfoList.push(createErrorDetail("CLOSE_TIME_INVALID", "Assignment close time is not valid."));      
        }         
        
        if (validationInfoList.length > 0) {
            throw new ErrorResponseException(400, "Invalid data.", validationInfoList, null);
        }   

        // separate questions and rubrics
        
        // FROM format : 
        /*
            questions : [
                {
                    id : *x* (defined in backend)
                    assignment_id : *y* (defined in backend)
                    question : <String>
                    rubric : [
                        {
                            id : *z* (defined in backend)
                            question_id : *x*   (defined in backend)
                            description : <String>
                            point : <Integer>
                        }
                    ]
                }
            ]
        */
        
        // TO format : questions <Array>, rubric <Array>

        const { 
            error = null, 
            questions : processedQuestions, 
            rubrics, 
            assignment_id
        } = validateQuestions(questions);

        if (error){
            throw new ErrorResponseException(422, error)
        }

        const success = await AssignmentRepository.createAssignment(
            {
                id : assignment_id,
                code : utils.generateRandomId(10),
                title, 
                description,
                class_id, 
                open_sub_time, 
                close_sub_time,
                questions : processedQuestions , 
                rubrics
            }
        )
        
        if (!success) {
            throw new ForeignKeyViolationError("Class is not found.");
        }

        return res.status(201).send({
            status: 201,
            message: "Assignment created successfully.",
        });  
            
    } catch (err){
        if (err instanceof ForeignKeyViolationError) {
            return res.status(404).send({
                status: 404,
                message: "Class is not found."
              });            
        }

        if (err instanceof ErrorResponseException){
            return res.status(err.status).send({
                status: err.status,
                ...(err.type !== null && { type : err.type }),
                message: err.message,
                ...(err.errors !== null && { errors : err.errors}),
              });
        }

        console.error(err);
        return res.status(500).send({
          status: 500,
          message: "Internal server error."
        });
    }
}


const getAllAssignments = async (req, res) => {
    try {

        const {id} = req.params;
        
        const data =  await AssignmentRepository.getAssignments(req.user, id);

        return res.status(200).send({
            status: 200,
            message: "Successfully fetched all class's assignments.",
            data
        });            

        
    } catch (err){
        if (err instanceof ErrorResponseException){
            return res.status(err.status).send({
                status: err.status,
                ...(err.type !== null && { type : err.type }),
                message: err.message,
                ...(err.errors !== null && { errors : err.errors}),
              });
        }
        console.error(err);
        return res.status(500).send({
          status: 500,
          message: "Internal server error."
        });
    }
}

const getSpecificAssignment = async (req, res) => {
    try {

        const {id} = req.params;
        
        const data =  await AssignmentRepository.getAssignmentsByID(req.user, id);

        if (!data){
            return res.status(404).send({
                status : 404, 
                message : "Assignment not found."
            })
        }

        return res.status(200).send({
            status: 200,
            message: "Successfully fetched assignment's data.",
            data
        });          
        
    } catch (err){
        if (err instanceof ErrorResponseException){
            return res.status(err.status).send({
                status: err.status,
                ...(err.type !== null && { type : err.type }),
                message: err.message,
                ...(err.errors !== null && { errors : err.errors}),
              });
        }
        console.error(err);
        return res.status(500).send({
          status: 500,
          message: "Internal server error."
        });
    }
}

const updateAssignmentData = async (req, res) => {
    try {

        const {id} = req.params

        const {
            title = "",
            description, 
            open_sub_time = "", 
            close_sub_time = "",
            questions = [], // rubrics is embedded on the question
        } = req.body;

        const validationInfoList = []; 

        if (!dataValidator.stringIsNotEmpty(title))
        {
            validationInfoList.push(createErrorDetail("TITLE_EMPTY", "Class title must not be empty."));      
        }  

        if (!dataValidator.isValidDateTime(open_sub_time))
        {
            validationInfoList.push(createErrorDetail("OPEN_TIME_INVALID", "Assignment open time is not valid."));      
        } 
        
        if (!dataValidator.isValidDateTime(close_sub_time))
        {
            validationInfoList.push(createErrorDetail("CLOSE_TIME_INVALID", "Assignment close time is not valid."));      
        }         
        
        if (validationInfoList.length > 0) {
            throw new ErrorResponseException(400, "Invalid data.", validationInfoList, null);
        }   

        // separate questions and rubrics
        
        // FROM format : 
        /*
            questions : [
                {
                    id : *x* (defined in backend)
                    assignment_id : *y* (defined in backend)
                    question : <String>
                    rubric : [
                        {
                            id : *z* (defined in backend)
                            question_id : *x*   (defined in backend)
                            description : <String>
                            point : <Integer>
                        }
                    ]
                }
            ]
        */
        
        // TO format : questions <Array>, rubric <Array>

        const { 
            error = null, 
            questions : processedQuestions, 
            rubrics, 
            assignment_id
        } = validateQuestions(questions, id);

        if (error){
            throw new ErrorResponseException(422, error)
        }

        const success = await AssignmentRepository.updateAssignment(
            req.user,
            id,
            {
                title,
                description,
                open_sub_time,
                close_sub_time,
                questions : processedQuestions,
                rubrics
            }
        )
        
        if (!success) {
            throw new ForeignKeyViolationError("Assignment is not found.");
        }

        return res.status(200).send({
            status: 200,
            message: "Assignment updated successfully.",
        });  
            
    } catch (err){
        if (err instanceof ForeignKeyViolationError) {
            return res.status(404).send({
                status: 404,
                message: "Assignment is not found."
              });            
        }

        if (err instanceof ErrorResponseException){
            return res.status(err.status).send({
                status: err.status,
                ...(err.type !== null && { type : err.type }),
                message: err.message,
                ...(err.errors !== null && { errors : err.errors}),
              });
        }

        console.error(err);
        return res.status(500).send({
          status: 500,
          message: "Internal server error."
        });
    }
}

const deleteAssignment = async (req, res) => {
    try {

        const {id} = req.params        

        const success = await AssignmentRepository.deleteAssignment(req.user, id);

        if (!success) {
            throw new ErrorResponseException(404, "Assignment is not found.");
        }

        return res.status(200).send({
            status: 200,
            message: "Assignment deleted successfully.",
        });          


        
    } catch (err){
        if (err instanceof ErrorResponseException){
            return res.status(err.status).send({
                status: err.status,
                ...(err.type !== null && { type : err.type }),
                message: err.message,
                ...(err.errors !== null && { errors : err.errors}),
              });
        }
        console.error(err);
        return res.status(500).send({
          status: 500,
          message: "Internal server error."
        });
    }
}

module.exports = {
    createNewAssignment, 
    getAllAssignments, 
    getSpecificAssignment,
    updateAssignmentData, 
    deleteAssignment
}




