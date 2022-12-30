import { TMDBFindResponseDto } from "../../services/catalog/interface/response.interface"
import { MovieResponse } from "../../services/stream/interface/response.interface"

interface MovieChoicedStateInterface {
    movie?: MovieResponse
    tmdb?: TMDBFindResponseDto
}

export class MovieChoicedState {
    movie?: MovieResponse
    tmdb?: TMDBFindResponseDto

    constructor(movie: MovieChoicedStateInterface) {
        this.movie = movie.movie
        this.tmdb = movie.tmdb
    }
}