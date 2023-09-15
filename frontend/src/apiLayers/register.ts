import axios from 'axios'
import { API_URL } from '../utils/constants'

type registerUserRequest = {
    name: String,
    email: String,
    password: String
}
type registerUserResponse = {
    status: Number,
    message: String,
}
export const registerUser = async (request: registerUserRequest): Promise<registerUserResponse> => {
    const response = await axios.post(`${API_URL}/user/registerUser`, request);
    return response.data
}