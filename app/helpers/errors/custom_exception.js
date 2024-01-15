class ForeignKeyViolationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ForeignKeyViolationError";
        this.args = {
            nativeError: {
                message: message,
            },
        };
    }
}

module.exports = {
    ForeignKeyViolationError
}