import axios from "axios"
import { UpsertMovieRequest } from "./interface/request.interface"
import { MovieResponse } from "./interface/response.interface"

const API_STREAM_URL = process.env.NEXT_PUBLIC_API_STREAM_URL

export const upsertMovie = async (upsertMovieRequest: UpsertMovieRequest): Promise<MovieResponse> => {
    
    const response = await axios.post<MovieResponse>(`${API_STREAM_URL}/movie`, upsertMovieRequest)

    return response.data
}