import axios from "axios"
import { UpsertSerieRequest } from "./interface/request.interface"
import { SerieResponse } from "./interface/response.interface"

const API_STREAM_URL = process.env.NEXT_PUBLIC_API_STREAM_URL

export const upsertSerie = async (upsertSerieRequest: UpsertSerieRequest): Promise<SerieResponse> => {
    
    const response = await axios.post<SerieResponse>(`${API_STREAM_URL}/serie`, upsertSerieRequest)

    return response.data
}