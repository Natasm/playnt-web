import { MovieCatalogResponse } from "../../services/catalog/interface/response.interface";

interface MovieCatalogChoicedStateInterface {
    movie?: MovieCatalogResponse
}

export class MovieCatalogChoicedState {
    movie?: MovieCatalogResponse

    constructor(movie: MovieCatalogChoicedStateInterface) {
        this.movie = movie.movie
    }
}