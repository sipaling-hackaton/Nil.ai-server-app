const AssignmentRepository = require("../../repository/assignment.repository");
const { v4: uuid } = require("uuid");
const { ErrorResponseException, createErrorDetail } = require('../../helpers/errors/error_response');
const dataValidator = require('../../helpers/validator');

const createNewAssignment = async (req, res) => {
    try {

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


const getAllAssignments = async (req, res) => {
    try {
        
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

const deleteAssignment = async (req, res) => {
    try {
        
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




