export interface MovieResponse {
    id: number
    name: string
    imdb: string
    imagePath: string
    media: MovieMediaResponse[]
}

export interface MovieMediaResponse {
    id: number
    magnet: string
    type: string
    resolution: string
}

export interface SerieResponse {
    id: number
    name: string
    imdb: string
    imagePath: string
    seasons: SeasonResponse[]
}

export interface SeasonResponse {
    id: number
    seasonNumber: number
    episodes: EpisodeResponse[]
}

export interface EpisodeResponse {
    id: number
    episodeNumber: number
    media: EpisodeMediaResponse[]
}

export interface EpisodeMediaResponse {
    id: number
    magnet: string
    type: string
    resolution: string
}

export interface UserResponse {
    id: number,
    customerId: number
}

export interface UserStreamResponse {
    id: number,
    userId: number,
    watchedTill: number,

    movieMediaId?: number,
    movieMedia?: MovieMediaUserStreamResponse,
    
    episodeMediaId?: number,
    episodeMedia?: EpisodeMediaUserStreamResponse,
    episodeId?: number,
    episode: EpisodeUserStreamResponse,
}

export interface MovieMediaUserStreamResponse {
    id: number
    magnet: string
    type: string
    resolution: string
    filename: string
    movie: MovieResponse
}

export interface EpisodeMediaUserStreamResponse {
    id: number
    magnet: string
    type: string
    resolution: string
    filename: string
    episodes: EpisodeUserStreamResponse[]
}

export interface EpisodeUserStreamResponse {
    id: number
    episodeNumber: number
    season: SeasonUserStreamResponse
}

export interface SeasonUserStreamResponse {
    id: number
    seasonNumber: number
    serie: SerieResponse
}

export interface LoadTorrentResponse {
    fileName: string
    infoHash: string
}

export interface CacheResponse {
    names: string[]
}