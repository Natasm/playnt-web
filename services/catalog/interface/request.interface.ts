export interface FindMovieRequest {
    id: number
}

export interface FindSerieRequest {
    id: number
    season: number
}

export interface PostUserStreamRequest {
    userId: number;
    mediaId: number;
    filename: string;
    watchedTill: number;
}