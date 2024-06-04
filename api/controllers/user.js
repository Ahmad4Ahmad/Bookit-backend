import user from "../models/user.js";

export const updateUser = async (req, res, next) => 
{
    try {
        const userId = req.params.id;
        const userDataToUpdate = req.body; // Contains the updated user data

        // Find the user by ID and update its data
        const updatedUser = await user.findByIdAndUpdate(userId, userDataToUpdate, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // User data updated successfully
        res.status(200).json(updatedUser);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteUser = async (req, res, next) =>
{
    try
    {
        await user.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
    }
    catch (error)
    {
        next(error);
    }
};

export const getUser = async (req, res, next) =>
{
    try
    {
        const userData = await user.findById(req.params.id);
        res.status(200).json(userData);
    }
    catch (error)
    {
        next(error);
    }
};

export const getAllUsers = async (req, res, next) =>
{
    try
    {
        const usersData = await user.find();
        res.status(200).json(usersData);
    }
    catch (error)
    {
        next(error);
    }
};