import axios from "axios"
import { UserResponse } from "./interface/response.interface"

const API_STREAM_URL = process.env.NEXT_PUBLIC_API_STREAM_URL

export const findUserByCustomerId = async (customerId: number): Promise<UserResponse> => {
    
    const response = await axios.post<UserResponse>(`${API_STREAM_URL}/user/find/customer`, { customerId })

    return response.data
}