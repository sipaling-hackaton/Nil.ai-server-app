const moment = require('moment')

const isValidEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
};

const isSecurePassword = (password) => {
    return password.length >= 8;
}

const stringIsNotEmpty = (string) => {
    return string.length > 0;
};

const isValidDateTime = (date) => {
    return moment(date).isValid();
}

const isInteger = (input) => {
    return /^\d+$/.test(input);
  }


module.exports = {
    isValidEmail,
    isSecurePassword,
    stringIsNotEmpty, 
    isValidDateTime,
    isInteger
}