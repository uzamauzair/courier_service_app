import { Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { validateCreateShipment, validateManageStatus } from "../validators/shipmentValidator";
import { createShipment, getShipment, manageShipmentStatus } from "../controllers/shipmentController";

const route = Router();

route.post("/create", async (req, res, next) => {
    const token = req.headers['x-access-token'] as string
    // const token = req.headers['x-access-token'];

    try {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload
        const email = decoded.email;

        const { senderName, senderAddress, recipientName, recipientAddress, description }: { senderName: string; senderAddress: string; recipientName: string; recipientAddress: string; description: string } = req.body;

        const validShipment = validateCreateShipment(senderName, senderAddress, recipientName, recipientAddress, description, res);

        if (validShipment.status == 500) {  //status code 
            return res.status(500).json(validShipment);
        }
        else {
            const user = await createShipment(senderName, senderAddress, recipientName, recipientAddress, description, email);
            return res.status(user.status).json({
                status: user.status,
                message: user.message,
                user: user.user,
            });
        }
    } catch (error) {
        return res.status(500).send(error);
    }

});
route.post("/manageStatus", async (req, res, next) => {
    const token = req.headers['x-access-token'] as string

    try {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload
        const email = decoded.email;

        const { trackingNumber, status }: { trackingNumber: string; status: string; } = req.body;

        const validStatusManage = validateManageStatus(trackingNumber, status, res);

        if (validStatusManage.status == 500) {  //status code 
            return res.status(500).json(validStatusManage);
        }
        else {
            const statusManage = await manageShipmentStatus(trackingNumber, status, email);
            return res.status(statusManage.status).json({
                status: statusManage.status,
                message: statusManage.message,
            });
        }
    } catch (error) {
        return res.status(500).send(error);
    }

});
route.get("/get", async (req, res, next) => {
    const token = req.headers['x-access-token'] as string
    try {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload
        const email = decoded.email;
        console.log("Email ", email);

        const shipment = await getShipment(email);

        return res.status(shipment.status).json({
            status: shipment.status,
            shipment: shipment.shipment,
        });

    } catch (error) {
        return res.status(500).send(error);
    }

});

export default route
