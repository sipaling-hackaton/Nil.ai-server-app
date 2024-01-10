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


module.exports = {
    isValidEmail,
    isSecurePassword,
    stringIsNotEmpty
}