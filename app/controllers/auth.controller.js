const User = require('../models/user')
const { ErrorResponseException } = require('../helpers/errors/error_response');

const test = async (req, res) => {
    try {
        const abc = await User.query();
        if (abc.length == 0){
            throw new ErrorResponseException(404, "message", "errors", "type");
        }

        return res.json({
            status : 200, 
            message : "wkkw", 
            data : abc
        })

        
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
};

module.exports = {
    test
}