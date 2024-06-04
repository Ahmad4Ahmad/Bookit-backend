import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
{
    username:
    {
        type: String,
        required: true,
        unique: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    password:
    {
        type: String,
        required: true
    },
    isAdmin:
    {
        type: Boolean,
        default: false
    },
    country:
    {
        type: String,
        // required: true
    },
    img:
    {
        type: String,
        default: "https://res.cloudinary.com/dvhclgitc/image/upload/v1714405781/Bookit/assets/avatar-user_iaxnvn.png"
    },
    city:
    {
        type: String,
        // required: true
    },
    birth:
    {
        type: Date,
    },
    gender:
    {
        type: String,
    },
    phone:
    {
        type: String,
        // required: true
    },
    properties:
    [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Hotel"
    }]
},
{
    timestamps: true
});

export default mongoose.model("User", UserSchema);