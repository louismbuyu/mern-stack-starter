import {StatusError} from "./status-error";
import {ErrorType} from "./types/error-type";

export class UnauthorizedError extends StatusError {
    constructor(message: string) {
        super(401, message);
        this.type = ErrorType.UNAUTHORIZED_ERROR;
    }
}