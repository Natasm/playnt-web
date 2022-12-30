import { MovieSerieCatalogResponse } from "../../services/catalog/interface/response.interface"

interface CatalogStateInterface {
    titles?: MovieSerieCatalogResponse[]
    page?: number
    hasMoreTitles?: boolean
}

export class CatalogState {
    titles: MovieSerieCatalogResponse[]
    page: number
    hasMoreTitles: boolean

    constructor(catalog: CatalogStateInterface) {
        this.titles = catalog.titles || []
        this.page = catalog.page || 1
        this.hasMoreTitles = catalog.hasMoreTitles ? true : false
    }
}