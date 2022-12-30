import axios from "axios"
import { LoadTorrentRequest } from "./interface/request.interface"
import { LoadTorrentResponse } from "./interface/response.interface"

const API_STREAM_URL = process.env.NEXT_PUBLIC_API_STREAM_URL

export const loadTorrent = async (loadTorrentRequest: LoadTorrentRequest): Promise<LoadTorrentResponse> => {
    
    const response = await axios.post<LoadTorrentResponse>(`${API_STREAM_URL}/torrent/load`, loadTorrentRequest)

    return response.data
}