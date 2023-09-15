import axios from "axios";
import { API_URL } from "../utils/constants";

export interface ShipmentData {
    trackingNumber: number,
    senderName: string,
    senderAddress: string,
    recipientName: string,
    recipientAddress: string,
    description: string,
    status: string
}
function shipments(
    trackingNumber: number,
    senderName: string,
    senderAddress: string,
    recipientName: string,
    recipientAddress: string,
    description: string,
    status: string
) {
    return { trackingNumber, senderName, senderAddress, recipientName, recipientAddress, description, status }
}
const headers = {
    "x-access-token": localStorage.getItem("token") || "",
    'Content-Type': 'application/json',
};
export const getShipments = async (): Promise<ShipmentData[]> => {
    const response = await axios.get(`${API_URL}/shipment/get`, { headers });

    return response.data.shipment.map((shipment: ShipmentData) => shipments(shipment.trackingNumber, shipment.senderName, shipment.senderAddress, shipment.recipientName, shipment.recipientAddress, shipment.description, shipment.status))
}
