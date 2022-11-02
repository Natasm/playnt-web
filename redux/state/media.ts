import { MediaInterface, MediaOfflineInterface, MediaPageInterface } from "../interface/media"

export class Media {
    media: any[]
    mediaChoiced: {}
    mediaChoicedFiles: any[]

    constructor(mediaInterface: MediaInterface) {
        this.media = mediaInterface.media
        this.mediaChoiced = mediaInterface.mediaChoiced
        this.mediaChoicedFiles = mediaInterface.mediaChoicedFiles
    }
}

export class MediaPage {
    page: number
    hasMoreItems: boolean

    constructor(mediaPageInterface: MediaPageInterface) {
        this.page = mediaPageInterface.page
        this.hasMoreItems = mediaPageInterface.hasMoreItems
    }
}

export class MediaOffline {
    media: any[]
    mediaChoiced: {}
    mediaChoicedFiles: any[]
    isMediaOffline: boolean

    constructor(mediaOfflineInterface: MediaOfflineInterface) {
        this.media = mediaOfflineInterface.media
        this.mediaChoiced = mediaOfflineInterface.mediaChoiced
        this.mediaChoicedFiles = mediaOfflineInterface.mediaChoicedFiles
        this.isMediaOffline = mediaOfflineInterface.isMediaOffline
    }
}