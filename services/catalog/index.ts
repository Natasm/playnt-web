import axios from 'axios'
import { FindMovieRequest, FindSerieRequest, PostUserStreamRequest } from './interface/request.interface'
import { MovieCatalogResponse, SerieCatalogResponse } from './interface/response.interface'
import { MovieWebScraper, SerieWebScraper } from './interface/webscraper.interface'

const URL_API = process.env.NEXT_PUBLIC_URL_API

export const getCatalogList = async (page: number) => {
    return axios.get(`${URL_API}/catalog?page=${page}`)
}

export const getCatalogListBySearch = async (search: string, page: number) => {
    return axios.get(`${URL_API}/catalog?search=${search}&page=${page}`)
}

export const postMovieWebscraper = async(movieWebScraper: MovieWebScraper) => {
    return axios.post<MovieCatalogResponse>(`${URL_API}/catalog/webscraper/movie`, movieWebScraper)
}

export const findMovie = async (findMovieRequest: FindMovieRequest) => {
    return axios.post<MovieCatalogResponse>(`${URL_API}/catalog/movie/find`, findMovieRequest)
}

export const postSerieWebscraper = async(serieWebScraper: SerieWebScraper) => {
    return axios.post<SerieCatalogResponse>(`${URL_API}/catalog/webscraper/serie`, serieWebScraper)
}

export const findSerie = async (findSerieRequest: FindSerieRequest) => {
    return axios.post<SerieCatalogResponse>(`${URL_API}/catalog/serie/find`, findSerieRequest)
}

export const postUserStream = async(postUserStreamRequest: PostUserStreamRequest) => {
    return axios.post(`${URL_API}/userStream`, postUserStreamRequest)
}