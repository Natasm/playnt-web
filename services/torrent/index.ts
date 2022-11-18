import axios from "axios"

import { isVideoFile } from "../../utils/video";
import { FileInfo, PostTorrentRequest, Torrents } from "./interface/torrent";

const URL_API_STREAM = process.env.NEXT_PUBLIC_URL_API_STREAM

export const postTorrent = async (postTorrentRequest: PostTorrentRequest) => {
    
    var infoHash = '';
    let infoFiles: FileInfo[] = [];

    try { 
        infoHash = postTorrentRequest.magnet?.split('magnet:?xt=urn:btih:')[1]?.split('&')[0] 
    } 
    catch (e) {
        return { error: 'Não foi possível fragmentar link' }
    }

    await axios.post(`${URL_API_STREAM}/torrent`, postTorrentRequest).then(async (res) => {
        
        infoHash = res.data.torrent.infoHash

        for (var name of res.data.files.names) {
            if(isVideoFile(name)) {
                const element = {
                    name: name,
                    uri: `${URL_API_STREAM}/torrent/stream?infohash=${infoHash}&filename=${name.replace(/ /g, '%20')}`
                }
                infoFiles.push(element)
            }
        }

    }).catch((err) => {
        console.log(err)
        return { error: err }
    })

    return { 
        infoHash: infoHash,
        infoFiles: infoFiles
    }
}

export const getTorrents = async (): Promise<Torrents> => {
    const res = await axios.get<Torrents>(`${URL_API_STREAM}/torrent`)
    return res.data
}