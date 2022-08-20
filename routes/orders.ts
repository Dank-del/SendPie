import { Request, Response } from "express";
import { createNewOrder, fetchOrderById, fetchUser, updateDeliveryPersonByOrderId } from "../database/methods";
import { IsEmpty, IsValidUser } from "../validation/checks";

export async function makeOrder(req: Request, res: Response) {
    const username = req.body.username;
    const password = req.body.password;
    const data = req.body.data;

    if (IsEmpty(username) || IsEmpty(password) || IsEmpty(data)) {
        return res.status(400).json({
            success: false,
            message: "Username, password and data are required"
        })
    }

    const isUserValid = await IsValidUser(username, password);
    if (!isUserValid) {
        return res.status(400).json({
            success: false,
            message: "Invalid username or password"
        })
    }

    const order = await createNewOrder(username, data);
    const fetchedOrder = await fetchOrderById(order.orderId);
    return res.status(200).json(fetchedOrder);
}

export async function getOrder(req: Request, res: Response) {
    // console.log(req.body);
    const orderId = req.body.orderId;

    if (IsEmpty(orderId)) {
        return res.status(400).json({
            success: false,
            message: "order id required"
        })
    }

    const order = await fetchOrderById(orderId);
    if (order == null) {
        return res.status(404).json({
            success: false,
            message: "order not found"
        })
    }

    return res.status(200).json({
        success: true,
        order: order
    });
}

export async function updateDeliveryPerson(req: Request, res: Response) {
    const orderId = req.body.orderId;
    const personUsername = req.body.personUsername;

    if (IsEmpty(orderId) || IsEmpty(personUsername)) {
        return res.status(400).json({
            success: false,
            message: "order id and username required"
        })
    }

    const person = await fetchUser(personUsername);
    if (person === null) {
        return res.status(400).json({
            success: false,
            message: "User not found"
        })
    }

    const order = await fetchOrderById(orderId);
    if (!order) {
        return res.status(404).json({
            success: false,
            message: "order not found"
        })
    }

    await updateDeliveryPersonByOrderId(orderId, personUsername);
    return res.status(200).json({
        success: true,
        message: "order updated",
        order: await fetchOrderById(orderId)
    })
}