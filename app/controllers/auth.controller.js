const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { ErrorResponseException } = require('../helpers/errors/error_response');

// const test = async (req, res) => {
//     try {
//         const abc = await User.query();
//         if (abc.length == 0){
//             throw new ErrorResponseException(404, "message", "errors", "type");
//         }

//         return res.json({
//             status : 200, 
//             message : "wkkw", 
//             data : abc
//         })

        
//     } catch (err){
//         if (err instanceof ErrorResponseException){
//             return res.status(err.status).send({
//                 status: err.status,
//                 ...(err.type !== null && { type : err.type }),
//                 message: err.message,
//                 ...(err.errors !== null && { errors : err.errors}),
//               });
//         }
//         console.error(err);
//         return res.status(500).send({
//           code: 500,
//           message: "Internal server error."
//         });
//     }
// };


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
          code: 500,
          message: "Internal server error."
        });
    }
}


module.exports = {
    login
}