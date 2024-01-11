const ClassRepository = require("../../repository/class.repository");
const { v4: uuid } = require("uuid");
const { ErrorResponseException, createErrorDetail } = require('../../helpers/errors/error_response');
const dataValidator = require('../../helpers/validator');

const createNewClass = async (req, res) => {
    try {

        const {title = "", description = ""} = req.body; 
        
        const validationInfoList = []; 

        if (!dataValidator.stringIsNotEmpty(title))
        {
            validationInfoList.push(createErrorDetail("TITLE_EMPTY", "Class title must not be empty."));      
        }

        if (validationInfoList.length > 0) {
            throw new ErrorResponseException(400, "Invalid data.", validationInfoList, null);
        }   
        
        const id = uuid();
        
        await ClassRepository.createClass({
            id,
            title,
            description,
            teacher_id : req.user.id
        })

        return res.status(201).send({
            status: 201,
            message: "Class created successfully.",
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

const getAllClasses = async (req, res) => {
    try {

        const data = await ClassRepository.getClasses(req.user);

        return res.status(200).send({
            status: 200,
            message: "Successfully fetched all classes.",
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

const getClassByID = async (req, res) => {
    try {

        const { id } = req.params;

        const data = await ClassRepository.getClassByID(req.user, id)

        if (!data){
            throw new ErrorResponseException(404, "Class not found.");
        }

        return res.status(200).send({
            status: 200,
            message: "Successfully fetched class data.",
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

const updateClass = async (req, res) => {
    try {

        const {id} = req.params;
        const {title = "", description = ""} = req.body; 
        
        const validationInfoList = []; 

        if (!dataValidator.stringIsNotEmpty(title))
        {
            validationInfoList.push(createErrorDetail("TITLE_EMPTY", "Class title must not be empty."));      
        }

        if (validationInfoList.length > 0) {
            throw new ErrorResponseException(400, "Invalid data.", validationInfoList, null);
        }   
        
        const success = await ClassRepository.updateClassData(req.user, id, {
            title,
            description,
        })

        if (!success){
            throw new ErrorResponseException(404, "Class not found.");
        }

        return res.status(200).send({
            status: 200,
            message: "Class updated successfully.",
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

const deleteClass = async (req, res) => {
    try {

        const {id} = req.params;
                
        const success = await ClassRepository.deleteClass(req.user, id);
        
        if (!success){
            throw new ErrorResponseException(404, "Class not found.");
        }

        return res.status(200).send({
            status: 200,
            message: "Class deleted successfully.",
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
    createNewClass, 
    getAllClasses, 
    getClassByID, 
    updateClass, 
    deleteClass
}