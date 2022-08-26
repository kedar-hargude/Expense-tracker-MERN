class CustomError extends Error{
    constructor(errorCode, message){
        super(message);
        this.code = errorCode;
    }
}

module.exports = CustomError;