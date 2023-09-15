import { PrismaClient } from "@prisma/client";
import { getUserByEmail } from "./userController";
const prisma = new PrismaClient();
export const createShipment = async (
    senderName: string,
    senderAddress: string,
    recipientName: string,
    recipientAddress: string,
    description: string,
    email: string
) => {

    const user = await getUserByEmail(email)

    // Find the highest existing tracking number
    const highestTrackingNumber = await prisma.shipment.findFirst({
        orderBy: {
            trackingNumber: 'desc'
        }
    });

    // Calculate the next tracking number
    const nextTrackingNumber = highestTrackingNumber ? highestTrackingNumber.trackingNumber + 1 : 100000;
    const shipment = await prisma.shipment.create({
        data: {
            senderName,
            senderAddress,
            recipientName,
            recipientAddress,
            description,
            trackingNumber: nextTrackingNumber,
            createdById: user?.id!
        }
    }).catch((e: any) => {
        throw e;
    })
        .finally(async () => {
            await prisma.$disconnect();
        });

    return {
        status: 200,
        message: "Shipment created successfully",
        user: {
            senderName: shipment.senderName,
            senderAddress: shipment.senderAddress,
            recipientName: shipment.recipientName,
            recipientAddress: shipment.recipientAddress,
            description: shipment.description,
            createdById: shipment.createdById
        }
    }
}

export const getShipment = async (email: string) => {

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    const shipments = await prisma.shipment.findMany({
        where: {
            createdById: user?.id
        },
        select: {
            trackingNumber: true,
            senderName: true,
            senderAddress: true,
            recipientName: true,
            recipientAddress: true,
            description: true,
            status: true,
        }
    }).catch((e: any) => {
        throw e;
    })
        .finally(async () => {
            await prisma.$disconnect();
        });

    return {
        status: 200,
        shipment: shipments
    }
}

export const manageShipmentStatus = async (trackingNumber: string, status: string, email: string) => {

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    const trackingNumberInt = parseInt(trackingNumber)
    const manageStatus = await prisma.shipment.update({
        where: {
            trackingNumber: trackingNumberInt
        },
        data: {
            createdById: user?.id,
            status
        }
    }).catch((e: any) => {
        throw e;
    })
        .finally(async () => {
            await prisma.$disconnect();
        });

    return {
        status: 200,
        message: "Status changed successfully"
    }
}