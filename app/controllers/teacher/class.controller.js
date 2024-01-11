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

}

const getClassByID = async (req, res) => {

}

const updateClass = async (req, res) => {

}

const deleteClass = async (req, res) => {

}

module.exports = {
    createNewClass, 
    getAllClasses, 
    getClassByID, 
    updateClass, 
    deleteClass
}