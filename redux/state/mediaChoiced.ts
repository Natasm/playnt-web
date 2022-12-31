interface MediaChoicedStateInterface {
    movieMediaId?: number,
    movieId?: number,
    episodeMediaId?: number,
    episodeId?: number,
    seasonId?: number,
    serieId?: number
}

export class MediaChoicedState {
    movieMediaId?: number
    movieId?: number
    episodeMediaId?: number
    episodeId?: number
    seasonId?: number
    serieId?: number

    constructor(media: MediaChoicedStateInterface) {
        this.movieMediaId = media.movieMediaId
        this.movieId = media.movieId
        this.episodeMediaId = media.episodeMediaId
        this.episodeId = media.episodeId
        this.seasonId = media.seasonId
        this.serieId = media.serieId
    }
}