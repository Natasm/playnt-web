import { SerieCatalogResponse } from "../../services/catalog/interface/response.interface";

interface SerieCatalogChoicedStateInterface {
    serie?: SerieCatalogResponse
}

export class SerieCatalogChoicedState {
    serie?: SerieCatalogResponse

    constructor(serie: SerieCatalogChoicedStateInterface) {
        this.serie = serie.serie
    }
}