import axios from 'axios'
import { API_URL } from '../utils/constants'

type registerUserRequest = {
    senderName: string,
    senderAddress: string,
    recipientName: string,
    recipientAddress: string,
    description: string
}
type registerUserResponse = {
    status: Number,
    message: String,
}
const headers = {
    "x-access-token": localStorage.getItem("token") || "",
    'Content-Type': 'application/json',
};
export const createShipment = async (request: registerUserRequest): Promise<registerUserResponse> => {
    const response = await axios.post(`${API_URL}/shipment/create`, request, { headers });
    return response.data
}