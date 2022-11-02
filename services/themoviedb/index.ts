import axios from "axios"

const URL_API_THEMOVIEDB = process.env.NEXT_PUBLIC_URL_API_THEMOVIEDB
const API_KEY = process.env.NEXT_PUBLIC_APIKEY_THEMOVIEDB

export const getMoviesByPopularityTheMovieDB = () => {
    const url = `${URL_API_THEMOVIEDB}discover/movie?sort_by=popularity.desc&page=1&api_key=${API_KEY}&language=pt-BR`
    return axios.get(url)
}