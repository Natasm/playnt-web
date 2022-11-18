interface ContextStateInterface {
    loading?: boolean,
    scrollTopPosition?: number,
    search?: string,
    routeActionTriggered?: string
}

export class ContextState {
    loading: boolean
    scrollTopPosition: number
    search: string
    routeActionTriggered: string

    constructor(context: ContextStateInterface) {
        this.loading = context.loading || false
        this.scrollTopPosition = context.scrollTopPosition || 0
        this.search = context.search || ""
        this.routeActionTriggered = context.routeActionTriggered || ""
    }
}