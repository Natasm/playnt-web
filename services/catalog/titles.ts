import axios from 'axios'
import { FindCatalogTMDBRequest } from './interface/request.interface'
import { MovieSerieCatalogResponse, TMDBFindResponseDto, TMDBMoviePopularityResponseDto } from './interface/response.interface'

const API_CATALOG_URL = process.env.NEXT_PUBLIC_API_CATALOG_URL

export const getMoviesByPopularity = async (page: number = 1): Promise<TMDBMoviePopularityResponseDto> => {
    
    const response = await axios.get<TMDBMoviePopularityResponseDto>(`${API_CATALOG_URL}/catalog/movie/popularity?page=${page}`)

    return response.data
}

export const getCatalogList = async (page: number, catalogSource: number = 1): Promise<MovieSerieCatalogResponse[]> => {
    const params = `?page=${page}&catalogSource=${catalogSource}`
    
    const response = await axios.get<MovieSerieCatalogResponse[]>(`${API_CATALOG_URL}/catalog${params}`, { timeout: 40000 })

    return response.data
}

export const getCatalogListBySearch = async (search: string, page: number, catalogSource: number = 1): Promise<MovieSerieCatalogResponse[]> => {
    const params = `?search=${search}&page=${page}&catalogSource=${catalogSource}`
    
    const response = await axios.get<MovieSerieCatalogResponse[]>(`${API_CATALOG_URL}/catalog${params}`, { timeout: 40000 })

    return response.data
}

export const findCatalogTMDB = async (findCatalogRequest: FindCatalogTMDBRequest): Promise<TMDBFindResponseDto> => {
    
    const response = await axios.post<TMDBFindResponseDto>(`${API_CATALOG_URL}/catalog/tmdb/find`, findCatalogRequest)

    return response.data
}

