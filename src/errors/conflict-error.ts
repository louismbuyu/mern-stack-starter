import {StatusError} from "./status-error";
import {ErrorType} from "./types/error-type";

export class ConflictError extends StatusError {
    constructor(message: string) {
        super(409, message);
        this.type = ErrorType.CONFLICT_ERROR;
    }
}