import express from "express";
import { createHotel, updateHotel, deleteHotel, getHotel, getAllHotels, countByCity, countByType, getHotelRooms, getUserProperties, getHotelsByType } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
router.post("/", createHotel);
router.put("/:id",  updateHotel);
router.delete("/delete/:id", deleteHotel);
router.get("/countByCity", countByCity);
router.get("/:id", getHotel);
router.get("/properties/:id", getUserProperties);
router.get("/", getAllHotels);
router.get("/find/propertiesByType", getHotelsByType);
router.get("/types/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;