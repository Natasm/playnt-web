import axios from 'axios'

const URL_API = process.env.NEXT_PUBLIC_URL_API

export const getSubtitles = async (query: string, page: number) => {
    return axios.get(`${URL_API}/subtitle?query=${query}&page=${page}`)
}

export const downloadSubtitle = async (file_id: number, format: string = 'webvtt') => {

    const body = {
        file_id: file_id,
        format: format
    }

    return axios.post(`${URL_API}/subtitle/download`, body)
}