import {StatusError} from "./status-error";
import {ErrorType} from "./types/error-type";

export class BadRequestError extends StatusError {
    constructor(message: string) {
        super(400, message);
        this.type = ErrorType.BAD_REQUEST_ERROR;
    }
}