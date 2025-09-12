export class ApiError extends Error {
    status: number // this just extends the error/extended field in the Error Object
    isOperational: boolean // this just extends the error/extended field in the Error Object
    constructor(message: string, status: number, isOperational = true) { // the items in this line are the args expectation: ApiErro(message, status, isOperationl <- though not necessarily unless false)
        super(message) // no idea what super means... But this binds the value of message to message
        this.status = status // binds input status to filed status in this instance of ApiError
        this.isOperational = isOperational // same as status
        Object.setPrototypeOf(this, ApiError.prototype) // Not quite sure, i feel like it finalizes the object based on the args?
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string) {
        super(message, 404, true)
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }
}

export class ValidationError extends ApiError {
    errorData: Record<string, string>[]
    constructor(data: Record<string, string>[]) {
        super("Validation Error", 400, true)
        this.errorData = data
        Object.setPrototypeOf(this, ValidationError.prototype)
    }
}