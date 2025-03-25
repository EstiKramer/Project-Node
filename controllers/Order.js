
import { orderModel } from "../models/Order.js";
import { userModel } from "../models/User.js";

// פונקציה לקבלת כל ההזמנות
export const getAllOrders = async (req, res) => {
    try {
        let result = await orderModel.find();
        res.json(result);
    } catch (err) {
        res.status(400).json({ title: "cannot get all", message: err.message });
    }
};
export const getorderUsertId = async (req, res) => {
    let { userId } = req.params;
    try {
        let result = await orderModel.find({ userId: userId });
        res.json(result);
    }
    catch(err) {
        res.status(400).json({title:"cannot get all by user id",message:err.message})
    }
}

// פונקציה להוספת הזמנה
export const addOrder = async (req, res) => {
    let { body } = req;
    // if (!body.userId || !body.products || !body.products.length)
    //     return res.status(404).json({ title: "cannot add registration", message: "missing parameters" });

    if (!body.address || body.address.trim() === "") {
        return res.status(400).json({
            title: "invalid address",
            message: "Address is required"
        });
    }

    // בדיקת תקינות המחירים
    if (body.pricesend && body.pricesend <= 0) {
        return res.status(400).json({
            title: "invalid price",
            message: "Shipping price must be a positive number"
        });
    }

    if (body.finallprice && body.finallprice <= 0) {
        return res.status(400).json({
            title: "invalid price",
            message: "Final price must be a positive number"
        });
    }

    try {
        let user = await userModel.findById(body.userId);
        if (!user)
            return res.status(404).json({ title: "no such user", message: "" });

        let newOrder = new orderModel(body);
        await newOrder.save();
        res.json(newOrder);
    } catch (err) {
        res.status(400).json({ title: "", message: err.message });
    }
};

// פונקציה למחיקת הזמנה
export const deleteOrder = async (req, res) => {
    let { id } = req.params; 

    try {
        let deletedOrder = await orderModel.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({
                title: "Order not found",
                message: `No order found with ID: ${id}`
            });
        }

        res.json({
            title: "Order deleted successfully",
            message: `Order with ID: ${id} was deleted`,
            deletedOrder
        });
    } catch (err) {
        res.status(400).json({
            title: "Error deleting order",
            message: err.message
        });
    }
};
export const updateOrderDispatched = async (req, res) => {
    let { id } = req.params; 

    try {
        let updatedOrder = await orderModel.findByIdAndUpdate(id, { isdispatched: true }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({
                title: "Order not found",
                message: `No order found with ID: ${id}`
            });
        }

        res.json({
            title: "Order dispatched successfully",
            message: `Order with ID: ${id} has been dispatched.`,
            updatedOrder
        });
    } catch (err) {
        res.status(400).json({
            title: "Error updating order",
            message: err.message
        });
    }
};
    
 