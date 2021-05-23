import {ErrorType} from "./types/error-type";

export class StatusError extends Error {
    status: number;
    type?: ErrorType;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}