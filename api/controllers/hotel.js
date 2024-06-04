import hotel from "../models/hotel.js";
import Room from "../models/roomModel.js";
import User from "../models/user.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(
{
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const createHotel = async (req, res, next) =>
{
    const newHotel = new hotel(req.body);
    try
    {
        const savedHotel = await newHotel.save();
        await User.findByIdAndUpdate(newHotel.user, {$push: {properties: newHotel._id}}, {new: true});
        res.status(200).json(savedHotel);
    }
    catch (error)
    {
        next(error);
    }
};

export const updateHotel = async (req, res, next) =>
{
    try
    {
        const updatedHotel = await hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedHotel);
    }
    catch (error)
    {
        next(error);
    }
};

const extractPublicIdFromUrl = (imageUrl) => 
{
    const matches = imageUrl.match(/\/([^/]+)\.[a-z]+$/);
    return matches ? `Bookit/properties/${matches[1]}` : null;
};

export const deleteHotel = async (req, res, next) =>
{
    try
    {
        const property = await hotel.findById(req.params.id);
        try 
        {
            (property.photos.map((photo) => 
            {
                const publicId = extractPublicIdFromUrl(photo);
                console.log(publicId);
                return cloudinary.uploader.destroy(publicId);
            }));
        } 
        catch (error)
        {
            console.error('Error deleting photo from Cloudinary:', error);
        }

        await User.findByIdAndUpdate(property.user, {$pull: {properties: req.params.id}}, {new: true});
        await hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted.");
    }
    catch (error)
    {
        next(error);
    }
};

export const getHotel = async (req, res, next) =>
{
    try
    {
        const hotelData = await hotel.findById(req.params.id);
        res.status(200).json(hotelData);
    }
    catch (error)
    {
        next(error);
    }
};

export const getAllHotels = async (req, res, next) =>
{
    const {min, max, city, featured} = req.query;
    try
    {
        if (featured)
        {
            const hotelsData = await hotel.find({featured}).limit(req.query.limit);
            res.status(200).json(hotelsData);
        }
        else
        {
            const hotelsData = await hotel.find({city: city, price: {$gt:min || 1, $lt: max || 9999}}).limit(req.query.limit);
            res.status(200).json(hotelsData);
        }
    }
    catch (error)
    {
        next(error);
    }
};

export const getHotelsByType = async (req, res, next) =>
    {
        const {type} = req.query;
        try
        {
            const hotelsData = await hotel.find({type: type}).limit(req.query.limit);
            res.status(200).json(hotelsData);
        }
        catch (error)
        {
            next(error);
        }
    };

export const countByCity = async (req, res, next) =>
{
    const cities = req.query.cities.split(",");
    try
    {
        const list = await Promise.all(cities.map(city => 
        {
            return hotel.countDocuments({city: city});
        }));

        res.status(200).json(list);
    }
    catch (error)
    {
        next(error);
    }
};

export const countByType = async (req, res, next) =>
{
    try
    {
        const hotelCount = await hotel.countDocuments({type: "hotel"});
        const apartmentCount = await hotel.countDocuments({type: "apartment"});
        const resortCount = await hotel.countDocuments({type: "resort"});
        const villaCount = await hotel.countDocuments({type: "villa"});
        const cabinCount = await hotel.countDocuments({type: "cabin"});
        res.status(200).json(
        [
            {type: "hotel", count: hotelCount},
            {type: "apartments", count: apartmentCount},
            {type: "resorts", count: resortCount},
            {type: "villas", count: villaCount},
            {type: "cabins", count: cabinCount}
        ]);
    }
    catch (error)
    {
        next(error);
    }
};

export async function getHotelRooms(req, res, next)
{
    try
    {
        const hotel = await hotel.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map((room) => 
        {
            return Room.findById(room);
        }));
        res.status(200).json(list);
    }
    catch (error)
    {
        next(error);
    }
}

export const getUserProperties = async (req, res, next) =>
{
    try
    {
        const user = await User.findById(req.params.id);
        res.status(200).json(user.properties);
    }
    catch (error)
    {
        next(error);
    }
};