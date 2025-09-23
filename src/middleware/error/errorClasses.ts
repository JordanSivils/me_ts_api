export class ApiError extends Error {
    status: number // this just extends the error/extended field in the Error Object
    reason: string
    ok: boolean
    isOperational: boolean // this just extends the error/extended field in the Error Object
    constructor(status: number, reason: string, message: string, isOperational = true) { // the items in this line are the args expectation: ApiErro(message, status, isOperationl <- though not necessarily unless false)
        super(message) // no idea what super means... But this binds the value of message to message
        this.reason = reason
        this.ok = false
        this.status = status // binds input status to filed status in this instance of ApiError
        this.isOperational = isOperational // same as status
        Object.setPrototypeOf(this, ApiError.prototype) // Not quite sure, i feel like it finalizes the object based on the args?
    }
}