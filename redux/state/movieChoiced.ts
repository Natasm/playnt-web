import { MovieCatalogResponse } from "../../services/catalog/interface/response.interface";

interface MovieChoicedStateInterface {
    movie?: MovieCatalogResponse
}

export class MovieChoicedState {
    movie?: MovieCatalogResponse

    constructor(movie: MovieChoicedStateInterface) {
        this.movie = movie.movie
    }
}