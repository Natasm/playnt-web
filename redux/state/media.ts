import { FileInfo } from "../../services/torrent/interface/torrent"

interface MediaStateInterface {
    mediaId?: number
    infoHash?: string
    infoFiles?: FileInfo[]
}

export class MediaState {
    mediaId?: number
    infoHash: string
    infoFiles: FileInfo[]

    constructor(media: MediaStateInterface) {
        this.mediaId = media.mediaId
        this.infoHash = media.infoHash || ""
        this.infoFiles = media.infoFiles || []
    }
}