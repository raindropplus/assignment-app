export class GeneralError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }

    getCode() { return 400; }
}

export class BadRequest extends GeneralError {
    constructor(message) {
        super(message);
        this.name = 'BadRequest';
    }
    getCode() { return 400; }
}

export class NotFound extends GeneralError {
    constructor(message) {
        super(message);
        this.name = 'NotFound';
    }

    getCode() { return 404; }    
}

export class AppError extends Error {
    constructor(statusCode, status, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
    }
}