import axios from "axios"
import { DeleteUserStreamRequest, UpsertUserStreamRequest } from "./interface/request.interface"
import { UserStreamResponse } from "./interface/response.interface"

const API_STREAM_URL = process.env.NEXT_PUBLIC_API_STREAM_URL

export const upsertUserStream = async (upsertUserStreamRequest: UpsertUserStreamRequest): Promise<UserStreamResponse> => {

    const response = await axios.post<UserStreamResponse>(`${API_STREAM_URL}/userStream`, upsertUserStreamRequest)

    return response.data
}

export const findAllUserStream = async (userId: number): Promise<UserStreamResponse[]> => {
    
    const response = await axios.post<UserStreamResponse[]>(`${API_STREAM_URL}/userStream/findAll`, { userId })

    return response.data
}

export const deleteUserStream = async (deleteUserStreamRequest: DeleteUserStreamRequest): Promise<boolean> => {

    const response = await axios.delete(`${API_STREAM_URL}/userStream`, { data: deleteUserStreamRequest })

    if (response.status == 200) {
        return true
    } else {
        return false
    }
}