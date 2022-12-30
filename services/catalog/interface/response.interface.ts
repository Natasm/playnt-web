export interface MoviePopularityResponse {
    poster_path: string
}

export interface MediaCatalogResponse {
    magnet: string;
    type: string;
    resolution: string;
}

export interface MovieCatalogResponse {
    name: string;
    imagePath: string;
    imdb: string;
    media: MediaCatalogResponse[];
}

export interface SerieCatalogResponse {
    name: string;
    imagePath: string;
    imdb: string;
    seasons: SeasonCatalogResponse[];
}

export interface SeasonCatalogResponse {
    seasonNumber: number;
    episodes: EpisodeCatalogResponse[];
}

export interface EpisodeCatalogResponse{
    episodeNumber: number;
    media: MediaCatalogResponse[];
}

export interface MovieSerieCatalogResponse {
    movie?: MovieCatalogResponse
    serie?: SerieCatalogResponse
}

export interface TMDBMovieResultsResponseDto {
    adult: boolean
    backdrop_path: string
    title: string
    original_title: string
    overview: string
    poster_path: string
    vote_average: number
}

export interface TMDBTvResultsResponseDto {
    adult: boolean
    backdrop_path: string
    name: string
    original_name: string
    overview: string
    poster_path: string
    vote_average: number
}

export interface TMDBEpisodeResponseDto {
    episode_number: number 
    name: string,
    overview: string,
    still_path: string
}

export interface TMDBFindResponseDto {
    movie_results: TMDBMovieResultsResponseDto[]
    tv_results: TMDBTvResultsResponseDto[]
    episodes: TMDBEpisodeResponseDto[]
}

export interface TMDBMoviePopularityDto {
    poster_path: string
}

export interface TMDBMoviePopularityResponseDto {
    page: number,
    results: TMDBMoviePopularityDto[]
}