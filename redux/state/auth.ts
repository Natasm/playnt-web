import { AuthInterface } from "../interface/auth"

export class AuthState{
    token: string

    constructor(authInterface: AuthInterface) {
        this.token = authInterface.token
    }
}
