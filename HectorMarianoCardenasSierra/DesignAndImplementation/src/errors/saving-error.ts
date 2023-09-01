
import { CustomError } from "./custom-error";

export class SavingError extends CustomError {
    statusCode = 500;

    constructor(public message: string) {
        super(message)

        Object.setPrototypeOf(this, SavingError.prototype);
    }
    serializeErrors(){
        return [{ message: this.message}]
    }
}