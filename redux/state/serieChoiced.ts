import { SerieCatalogResponse } from "../../services/catalog/interface/response.interface";

interface SerieChoicedStateInterface {
    serie?: SerieCatalogResponse
}

export class SerieChoicedState {
    serie?: SerieCatalogResponse

    constructor(serie: SerieChoicedStateInterface) {
        this.serie = serie.serie
    }
}