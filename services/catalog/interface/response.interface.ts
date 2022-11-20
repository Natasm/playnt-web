export interface MediaCatalogResponse {
    id: number;
    magnet: string;
    type: string;
    resolution: string;
    files: FileCatalogResponse[];
}

export interface FileCatalogResponse {
    id: number;
    name: string;
}

export interface MovieCatalogResponse {
    id: number;
    name: string;
    imagePath: string;
    imdb: string;
    media: MediaCatalogResponse[];
}

export interface SerieCatalogResponse {
    id: number;
    name: string;
    imagePath: string;
    imdb: string;
    seasons: SeasonCatalogResponse[];
}

export interface SeasonCatalogResponse {
    id: number;
    seasonNumber: number;
    episodes: EpisodeCatalogResponse[];
}

export interface EpisodeCatalogResponse {
    id: number;
    episodeNumberRange: string;
    media: MediaCatalogResponse[];
}

export interface UserStreamWatchingResponse {
    id: number;
    watchedTill: number;
    watchingMovie?: MovieCatalogResponse;
    watchingSerie?: SerieCatalogResponse;
}