interface AuthStateInterface {
    token?: string
    userId?: number
}

export class AuthState {
    token?: string
    userId?: number

    constructor(auth: AuthStateInterface) {
        this.token = auth.token
        this.userId = auth.userId
    }
}
