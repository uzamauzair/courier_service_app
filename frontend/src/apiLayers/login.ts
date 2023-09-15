import axios from 'axios'
import { API_URL } from '../utils/constants'

type loginUserRequest = {
    email: String,
    password: String
}
type loginUserResponse = {
    status: Number,
    message: string,
    user: string
}
export const LoginUser = async (request: loginUserRequest): Promise<loginUserResponse> => {
    const response = await axios.post(`${API_URL}/user/login`, request);
    return response.data
}