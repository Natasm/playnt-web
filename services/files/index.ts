import axios from 'axios'
import { Files } from './interface/file'

const URL_API_STREAM = process.env.NEXT_PUBLIC_URL_API_STREAM

export const getDirectoryOrFileListStream = async () => {
    return axios.get<Files>(`${URL_API_STREAM}/cache`)
}

export const deleteDirectoryOrFileListStream = async (listNamesToDelete: any[]) => {
    return axios.delete(`${URL_API_STREAM}/cache`, { data: { names: listNamesToDelete }})
}