import axios from 'axios'

const URL_API = process.env.NEXT_PUBLIC_URL_API

export const getListMedia = async (page: number) => {
    return axios.get(`${URL_API}/catalog?page=${page}`)
}

export const getListMediaBySearch = async (search: string, page: number) => {
    return axios.get(`${URL_API}/catalog?search=${search}&page=${page}`)
}