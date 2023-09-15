import axios from 'axios'
import { API_URL } from '../utils/constants'

type manageStatusRequest = {
    trackingNumber: string,
    status: string,
}
type manageStatusResponse = {
    status: Number,
    message: String,
}
const headers = {
    "x-access-token": localStorage.getItem("token") || "",
    'Content-Type': 'application/json',
};
export const manageStatus = async (request: manageStatusRequest): Promise<manageStatusResponse> => {
    const response = await axios.post(`${API_URL}/shipment/manageStatus`, request, { headers });
    return response.data
}