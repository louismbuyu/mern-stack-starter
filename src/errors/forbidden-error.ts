import {StatusError} from "./status-error";
import {ErrorType} from "./types/error-type";

export class ForbiddenError extends StatusError {
    constructor(message: string) {
        super(403, message);
        this.type = ErrorType.FORBIDDEN_ERROR;
    }
}