class CustomErrorHandler extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }

    static create(status, message) {
        return new CustomErrorHandler(status, message);
    }

    static alreadyExist(message) {
        return this.create(409, message);
    }

    static wrongCredentials(message = "Username or password is wrong!") {
        return this.create(401, message);
    }

    static unAuthorized(message = "Unauthorized Access") {
        return this.create(403, message);
    }

    static notFound(message = "404 Not Found") {
        return this.create(404, message);
    }

    static badRequest(message = "Bad Request") {
        return this.create(400, message);
    }

    static forbidden(message = "Forbidden") {
        return this.create(403, message);
    }

    static serverError(message = "Internal Server Error") {
        return this.create(500, message);
    }

    static validationError(message = "Validation Error") {
        return this.create(422, message);
    }
}

export default CustomErrorHandler;
