const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { ErrorResponseException } = require('../helpers/errors/error_response');

const authenticated = async (req, res, next) => {

    try {
        const user = jwt.verify(
          req.headers.authorization.split(" ")[1],
          process.env.JWT_SECRET
        );

        req.user = user;
        const { id }= user;

        const userData = await User.query().where({ id }).first();
        if (!userData){
            throw new ErrorResponseException(401, "Unauthenticated");
        }

        next();

      } catch (err){
        return res.status(401).send({
          status: 401,
          message: "Unauthenticated."
        });
    }  

}


module.exports = {
    authenticated
}