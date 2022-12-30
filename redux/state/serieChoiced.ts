import { TMDBFindResponseDto } from "../../services/catalog/interface/response.interface"
import { SerieResponse } from "../../services/stream/interface/response.interface"

interface SerieChoicedStateInterface {
    serie?: SerieResponse
    tmdb?: TMDBFindResponseDto
}

export class SerieChoicedState {
    serie?: SerieResponse
    tmdb?: TMDBFindResponseDto

    constructor(serie: SerieChoicedStateInterface) {
        this.serie = serie.serie
        this.tmdb = serie.tmdb
    }
}