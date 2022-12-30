interface MediaChoicedStateInterface {
    movieMediaId?: number,
    episodeMediaId?: number,
    episodeId?: number,
    seasonId?: number
}

export class MediaChoicedState {
    movieMediaId?: number
    episodeMediaId?: number
    episodeId?: number
    seasonId?: number

    constructor(media: MediaChoicedStateInterface) {
        this.movieMediaId = media.movieMediaId
        this.episodeMediaId = media.episodeMediaId
        this.episodeId = media.episodeId
        this.seasonId = media.seasonId
    }
}