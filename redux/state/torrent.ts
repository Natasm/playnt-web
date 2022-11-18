interface TorrentStateInterface {
    infoHash?: string
    uriStreamFile?: string
}

export class TorrentState {
    infoHash?: string
    uriStreamFile?: string

    constructor(torrent: TorrentStateInterface) {
        this.infoHash = torrent.infoHash
        this.uriStreamFile = torrent.uriStreamFile
    }
}