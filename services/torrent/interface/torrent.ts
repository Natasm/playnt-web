import { Files } from "./file"

export interface FileInfo{
    name: string
    uri: string
}

export interface Torrent {
    ID: number
    infoHash: string
    nameDir: string
    pathDir: string
    downloaded: boolean
}

export interface TorrentItem {
    torrent: Torrent
    files: Files
}

export interface Torrents {
    torrents: TorrentItem[]
}