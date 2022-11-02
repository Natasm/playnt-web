import { TorrentInterface } from "../interface/torrent"

export class Torrent {
    infoHash: string
    uriStreamFile: string

    constructor(torrentInterface: TorrentInterface) {
        this.infoHash = torrentInterface.infoHash
        this.uriStreamFile = torrentInterface.uriStreamFile
    }
}