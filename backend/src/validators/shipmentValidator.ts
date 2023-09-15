import { Response } from "express";

export function validateCreateShipment(senderName: string,
    senderAddress: string,
    recipientName: string,
    recipientAddress: string,
    description: string, res: Response) {

    if (!senderName || senderName.split(" ").join("").length === 0) {
        return {
            status: 500, message: "Sender name is invalid", user: null
        };
    }
    if (!senderAddress || senderAddress.split(" ").join("").length === 0) {
        return {
            status: 500, message: "Sender Address is invalid", user: null
        };
    }
    if (!recipientName || recipientName.split(" ").join("").length === 0) {
        return {
            status: 500, message: "Recipient name is invalid", user: null
        };
    }
    if (!recipientAddress || recipientAddress.split(" ").join("").length === 0) {
        return {
            status: 500, message: "Recipient Address is invalid", user: null
        };
    }
    if (!description || description.split(" ").join("").length === 0) {
        return {
            status: 500, message: "Description is invalid", user: null
        };
    }
    return { status: 200, Success: true }
}

export function validateManageStatus(trackingNumber: string, status: string, res: Response) {
    if (!trackingNumber || trackingNumber.split(" ").join("").length === 0) {
        return {
            status: 500, message: "Tracking Number is invalid", user: null
        };
    }
    if (!status || status.split(" ").join("").length === 0) {
        return {
            status: 500, message: "Status is invalid", user: null
        };
    }
    return { status: 200, Success: true }
}