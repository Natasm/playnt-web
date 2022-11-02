import axios from 'axios';

const URL_API_AUTH = process.env.NEXT_PUBLIC_URL_API_AUTH

export const login = async (email: string, password: string) => {
    return axios.post(`${URL_API_AUTH}/userPlaynt/find`, { 
        email: email, 
        password: password 
    })
}