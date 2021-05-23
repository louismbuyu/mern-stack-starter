import { HttpException } from "../../errors/http-exception";
import { NextFunction, Request, Response } from 'express';

function errorMiddleware(error: any, request: Request, res: Response, next: NextFunction) {

    if (error?.code === 11000) {
        error.status = 409;
        error.message = `${Object.entries(error.keyValue).map(([key, val]) => `${key}: ${val} already exists`)}`
    }

    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    return res.status(status).send({ message })
}

export default errorMiddleware;