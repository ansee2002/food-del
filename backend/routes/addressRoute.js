import express from "express";
import { addAddress, getAddresses, updateAddress, deleteAddress, getAddressById } from "../controllers/addressController.js";
import authMiddleware from "../middleware/auth.js";

const addressRouter = express.Router();

addressRouter.post("/add", authMiddleware, addAddress);
addressRouter.get("/list", authMiddleware, getAddresses);
addressRouter.patch("/update/:addressId", authMiddleware, updateAddress);
addressRouter.delete("/delete/:id", authMiddleware, deleteAddress);
addressRouter.get("/:id", authMiddleware, getAddressById);

export default addressRouter;
