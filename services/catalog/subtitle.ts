import axios from 'axios'

const API_CATALOG_URL = process.env.NEXT_PUBLIC_API_CATALOG_URL

export const getSubtitles = async (query: string, page: number) => {
    return axios.get(`${API_CATALOG_URL}/subtitle?query=${query}&page=${page}`)
}

export const downloadSubtitle = async (file_id: number, format: string = 'webvtt') => {
    return axios.post(`${API_CATALOG_URL}/subtitle/download`, { file_id, format })
}