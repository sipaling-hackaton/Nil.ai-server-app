const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { ErrorResponseException, createErrorDetail } = require('../helpers/errors/error_response');
const dataValidator = require('../helpers/validator');

const login = async (req, res) => {
    try {

        const { email = "", password = "" } = req.body;
        
        const user = await User.query()
            .where({email})
            .first();

        if (!user){
            throw new ErrorResponseException(401, "Incorrect credentials.");
        }


        if (!(await bcrypt.compare(password, user.password))) {
            throw new ErrorResponseException(401, "Incorrect credentials.");
        }   
        
        const token = jwt.sign({id : user.id}, process.env.JWT_SECRET, {
            expiresIn: 86400,
          }); 

          return res.status(200).send({
            status: 200,
            message: "Login berhasil.",
            data: {
              token,
            },
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

const register = async (req, res) => {
    try {

        const { 
            email = "",
            name = "",
            password = "", 
         } = req.body;

         const validationInfoList = [];

        if (!dataValidator.stringIsNotEmpty(name))
        {
            validationInfoList.push(createErrorDetail("NAME_EMPTY", "Name must not be empty."));      
        }

        if (!dataValidator.isValidEmail(email))
        {
            validationInfoList.push(createErrorDetail("EMAIL_INVALID", "Invalid email address."));      
        }

        if (!dataValidator.isSecurePassword(password))
        {
            validationInfoList.push(createErrorDetail("PASSWORD_INVALID", "Password must be at least 8 characters long."));      
        }
  
        if (validationInfoList.length > 0) {
            throw new ErrorResponseException(400, "Invalid data.", validationInfoList, null);
        }      

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await User.query().insert({name, email, password : hashedPassword});

        return res.status(201).send({
            status: 201,
            message: "Registration successful.",
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
    login,
    register
}