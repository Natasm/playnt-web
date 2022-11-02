import { ErrorInterface } from "../interface/error"

export class ErrorState {
    errorMessage: string
    severity: string

    constructor(error: ErrorInterface) {
        this.errorMessage = error.errorMessage
        this.severity = error.severity
    }
}
