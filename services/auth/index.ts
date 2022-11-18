import axios from 'axios';

const URL_API_AUTH = process.env.NEXT_PUBLIC_URL_API

export const login = async (email: string, password: string) => {
    return axios.post(`${URL_API_AUTH}/auth/signIn`, { 
        email: email, 
        password: password 
    })
}