interface ContextStateInterface {
    loading?: boolean,
    scrollTopPosition?: number,
    search?: string,
    catalogSource?: number,
    routeActionTriggered?: string
}

export class ContextState {
    loading: boolean
    scrollTopPosition: number
    search: string
    catalogSource: number
    routeActionTriggered: string

    constructor(context: ContextStateInterface) {
        this.loading = context.loading ? true : false
        this.scrollTopPosition = context.scrollTopPosition || 0
        this.search = context.search || ""
        this.catalogSource = context.catalogSource || 1
        this.routeActionTriggered = context.routeActionTriggered || ""
    }
}