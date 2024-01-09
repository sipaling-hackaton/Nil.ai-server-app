const createErrorDetail = (key, message) => {
    return {error : key, message}   
}


class ErrorResponseException extends Error {
    constructor(status, message, errors, type) {
      super(message);
      this.status = status;
      this.errors = errors;
      this.type = type;
    } 
  }



module.exports = {
    ErrorResponseException, 
    createErrorDetail
};