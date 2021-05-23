import {StatusError} from "./status-error";
import {ErrorType} from "./types/error-type";

export class NotFoundError extends StatusError {
    constructor(message: string) {
        super(404, message);
        this.type = ErrorType.NOT_FOUND_ERROR;
    }
}