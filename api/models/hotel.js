import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
{
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name:
    {
        type: String,
        required: true
    },
    type:
    {
        type: String,
        required: true
    },
    city:
    {
        type: String,
        required: true
    },
    address:
    {
        type: String,
        required: true
    },
    distance:
    {
        type: String,
    },
    photos:
    {
        type: [String],
    },
    description:
    {
        type: String,
        required: true
    },
    // title:
    // {
    //     type: String,
    //     required: true
    // },
    rating:
    {
        type: Number,
        min: 0,
        max: 5
    },
    rooms:
    {
        type: [String],
    },
    price:
    {
        type: Number,
        required: true
    },
    featured:
    {
        type: Boolean,
        default: false
    },
    pets:
    {
        type: Boolean,
        default: false
    },
    children:
    {
        type: Boolean,
        default: false
    }
});

export default mongoose.model("Hotel", HotelSchema);