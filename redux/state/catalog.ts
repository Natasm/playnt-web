interface CatalogStateInterface {
    titles?: any[],
    page?: number
    hasMoreItems?: boolean
}

export class CatalogState {
    titles: any[]
    page: number
    hasMoreItems: boolean

    constructor(catalog: CatalogStateInterface) {
        this.titles = catalog.titles || []
        this.page = catalog.page || 1
        this.hasMoreItems = catalog.hasMoreItems || true
    }
}