import axios from 'axios'
import { CacheResponse } from './interface/response.interface'

const URL_API_STREAM = process.env.NEXT_PUBLIC_API_STREAM_URL

export const getDirectoryOrFileListStream = async () => {
    return axios.get<CacheResponse>(`${URL_API_STREAM}/cache`)
}

export const deleteDirectoryOrFileListStream = async (listNamesToDelete: any[]) => {
    return axios.delete(`${URL_API_STREAM}/cache`, { data: { names: listNamesToDelete }})
}