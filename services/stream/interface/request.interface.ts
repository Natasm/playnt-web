export interface MovieRequest {
    name: string
    imdb: string
    imagePath: string
    media: MediaRequest[]
}

export interface MediaRequest {
    magnet: string
    type: string
    resolution: string
}

export interface SerieRequest {
    name: string
    imdb: string
    imagePath: string
    seasons: SeasonRequest[]
}

export interface SeasonRequest {
    seasonNumber: number
    episodes: EpisodeRequest[]
}

export interface EpisodeRequest {
    episodeNumber: number
    media: MediaRequest[]
}

export interface UpsertMovieRequest {
    movie: MovieRequest
}

export interface UpsertSerieRequest {
    serie: SerieRequest
}

export interface UpsertUserStreamRequest {
    userId: number
    watchedTill: number
    movieMediaId?: number
    episodeMediaId?: number
    episodeId?: number
    seasonId?: number
}

export interface LoadTorrentRequest {
    magnet: string
    movieMediaId?: number
    episodeMediaId?: number
    episodeNumber?: number
}

export interface DeleteUserStreamRequest {
    id: number
}