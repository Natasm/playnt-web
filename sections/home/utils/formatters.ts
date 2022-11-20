import { MovieCatalogResponse } from "../../../services/catalog/interface/response.interface";

export function castMovieCatalogResponse(obj: any) {
    return <MovieCatalogResponse> obj
}